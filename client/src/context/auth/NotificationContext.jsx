import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import { formatNotificationDate } from "../../utils/dateFormatter";



const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const { usuario } = useAuth();

    const cargarNotificaciones = useCallback(async (usuarioId) => {
        setLoading(true);
        try {
            const response = await axios.get(`/notificaciones?destinatario=${usuarioId}&leida=false`);

            const notificaciones = response.data.notificaciones.map(
                (notificacion) => ({
                    id: notificacion.id,
                    mensaje: notificacion.mensaje,
                    fecha: notificacion.fechaHoraCreacion,
                    formattedDate: formatNotificationDate(notificacion.fechaHoraCreacion),
                    remitente: notificacion.remitente,
                    destinatario: notificacion.destinatario,
                    leida: notificacion.leida,
                    fechaHoraLeida: notificacion.fechaHoraLeida
                })
            );

            setNotifications(notificaciones);

        } catch (error) {
            console.error('Error al cargar notificaciones:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const marcarComoLeida = useCallback(async (notificacionId) => {
        setLoading(true);
        try {
            await axios.put(`/notificaciones/${notificacionId}`, { idUsuario: usuario.id });

            if (usuario && usuario.id) cargarNotificaciones(usuario.id);
        } catch (error) {
            console.error('Error al marcar notificación como leída:', error);
        } finally {
            setLoading(false);
        }
    }, [usuario, cargarNotificaciones]);

    const pollingRef = useRef(null);

    useEffect(() => {
        if (!usuario || !usuario.id) return;

        cargarNotificaciones(usuario.id);

        if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
        }

        pollingRef.current = setInterval(() => {
            cargarNotificaciones(usuario.id);
        }, 60 * 1000);

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
                pollingRef.current = null;
            }
        };
    }, [usuario, cargarNotificaciones]);

  return (
    <NotificationContext.Provider value={{ notifications, cargarNotificaciones, marcarComoLeida }}>
      {children}
    </NotificationContext.Provider>
  );
};


export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
}