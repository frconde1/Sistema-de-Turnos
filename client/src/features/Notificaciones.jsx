import {useState} from "react";
import { useNotification } from "../context/auth/NotificationContext";
import {Button, Offcanvas, Badge, Toast} from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import { NotificationItem } from "./NotificationItem";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth/AuthContext";


export function Notificaciones() {
    const { notifications, marcarComoLeida, cargarNotificaciones } = useNotification();
    const { usuario } = useAuth();
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);

    const noLeidas = notifications.length;
    const navigate = useNavigate();

    const notificacionesAgrupadas = notifications.reduce((groups, notification) => {
        const senderName = notification.remitente?.nombre || "Sin asignar";
        if (!groups[senderName]) {
            groups[senderName] = [];
        }
        groups[senderName].push(notification);
        return groups;
    }, {});


    const handleMarkAsRead = async (notificationId) => {
        try {
            setError(null);
            await marcarComoLeida(notificationId);
        } catch (err) {
            setError("Error al marcar notificación como leída");
        }
    };

    const handleOpenNotifications = async () => {
        if (usuario?.id) {
            await cargarNotificaciones(usuario.id);
        }

        setShow(true);
    };

    return (
        <>
            <Button 
                variant="primary" 
                onClick={handleOpenNotifications}
                aria-label="Notificaciones"
                className="position-relative"
            >
                <BellFill size={20} />
                {noLeidas > 0 && (
                    <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                        {noLeidas}
                    </Badge>
                )}
            </Button>

            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notificaciones</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <div className="p-2 d-flex justify-content-end">
                        <Button variant="link" size="sm" onClick={() => { setShow(false); navigate('/notificaciones'); }}>
                            Ver todas
                        </Button>
                    </div>
                    {error && (
                        <Toast 
                            onClose={() => setError(null)} 
                            show={!!error} 
                            delay={3000} 
                            autohide
                            bg="danger"
                            className="m-3"
                        >
                            <Toast.Body className="text-white">
                                {error}
                            </Toast.Body>
                        </Toast>
                    )}
                    
                    {notifications.length === 0 ? (
                        <div className="p-3">
                            <p>No hay notificaciones.</p>
                        </div>
                    ) : (
                        <div className="notification-list">
                            {Object.entries(notificacionesAgrupadas).map(([senderName, senderNotifications]) => (
                                <div key={senderName} className="notification-group">
                                    <div className="group-header bg-light p-3 border-bottom">
                                        <strong>{senderName}</strong>
                                        <span className="badge bg-secondary ms-2">
                                            {senderNotifications.length}
                                        </span>
                                    </div>
                                    {senderNotifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}