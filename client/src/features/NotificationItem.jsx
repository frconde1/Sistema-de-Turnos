import { Button } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import PropTypes from 'prop-types';
import { fomatearNotificacion, extraerInfoTurno } from "../utils/messageFormatter";


export function NotificationItem({ notification, onMarkAsRead }) {
    const handleMarkAsRead = () => {
        onMarkAsRead(notification.id);
    };

    const formattedMessage = fomatearNotificacion(notification);
    const turnoInfo = extraerInfoTurno(notification);
    const leida = !!notification.leida;

    return (
        <div className={`notification-item d-flex justify-content-between align-items-start gap-2 p-3 border-bottom ${leida ? 'read' : 'unread'}`}>
            {!leida && <div className="notification-dot me-2 mt-2" aria-hidden="true" />}
            <div className="notification-content flex-grow-1">
                <div className="notification-message mb-2 fw-500">
                    {formattedMessage}
                </div>
                
                {/* Display appointment details if available */}
                {turnoInfo && (
                    <div className="turno-info mb-2 small text-muted">
                        {turnoInfo.doctor && (
                            <div>
                                <strong>Doctor:</strong> {turnoInfo.doctor}
                            </div>
                        )}
                        {turnoInfo.location && (
                            <div>
                                <strong>Sede:</strong> {turnoInfo.location}
                            </div>
                        )}
                        {turnoInfo.time && (
                            <div>
                                <strong>Horario:</strong> {new Date(turnoInfo.time).toLocaleString('es-AR')}
                            </div>
                        )}
                        {turnoInfo.practice && (
                            <div>
                                <strong>Práctica:</strong> {turnoInfo.practice}
                            </div>
                        )}
                    </div>
                )}
                
                <div className="notification-metadata d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        {notification.formattedDate}
                    </small>
                </div>
            </div>
            <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleMarkAsRead}
                title="Marcar como leída"
                aria-label="Marcar como leída"
                className="flex-shrink-0"
                disabled={leida}
            >
                <CheckCircle size={18} />
            </Button>
        </div>
    );
}

NotificationItem.propTypes = {
    notification: PropTypes.shape({
        id: PropTypes.string.isRequired,
        mensaje: PropTypes.string.isRequired,
        formattedDate: PropTypes.string,
        remitente: PropTypes.shape({
            nombre: PropTypes.string
        })
    }).isRequired,
    onMarkAsRead: PropTypes.func.isRequired
};
