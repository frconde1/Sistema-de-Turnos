import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/auth/AuthContext';
import axios from 'axios';
import { Card, Button, Pagination } from 'react-bootstrap';
import { NotificationItem } from '../features/NotificationItem';
import { formatNotificationDate } from '../utils/dateFormatter';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../context/auth/NotificationContext';

export default function NotificationsPage() {
  const { usuario } = useAuth();
  const { marcarComoLeida } = useNotification();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = useCallback(async (p = 1) => {
    if (!usuario) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get(`/notificaciones?destinatario=${usuario.id}&pagina=${p}&tamano=${size}`);
      const { notificaciones, totalNotificaciones } = resp.data;
      const mapped = notificaciones.map(n => ({
        id: n.id,
        mensaje: n.mensaje,
        fecha: n.fechaHoraCreacion,
        formattedDate: formatNotificationDate(n.fechaHoraCreacion),
        remitente: n.remitente,
        leida: n.leida
      }));
      setNotifications(mapped);
      setTotal(totalNotificaciones ?? 0);
      setPage(p);
    } catch (err) {
      console.error('Error loading notifications page', err);
      setError('Error al cargar notificaciones');
    } finally {
      setLoading(false);
    }
  }, [usuario, size]);

  useEffect(() => {
    loadPage(1);
  }, [loadPage, location.key]);

  const handleMarkAsRead = async (notificationId) => {
    await marcarComoLeida(notificationId);
    await loadPage(page);
  };

  const handlePrev = () => {
    if (page > 1) loadPage(page - 1);
  };
  const handleNext = () => {
    const maxPage = Math.max(1, Math.ceil(total / size));
    if (page < maxPage) loadPage(page + 1);
  };

  return (
    <div className="container py-4">
      <h3>Todas las notificaciones</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Card>
        <Card.Body>
          {loading && <div>Cargando...</div>}
          {!loading && notifications.length === 0 && <div>No hay notificaciones.</div>}
          {!loading && notifications.map(n => (
            <div key={n.id} className="mb-2">
              <NotificationItem notification={n} onMarkAsRead={handleMarkAsRead} />
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">Total: {total}</small>
            <div>
              <Button variant="secondary" size="sm" className="me-2" onClick={handlePrev} disabled={page === 1}>Anterior</Button>
              <Button variant="secondary" size="sm" onClick={handleNext} disabled={page >= Math.ceil(total/size)}>Siguiente</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
