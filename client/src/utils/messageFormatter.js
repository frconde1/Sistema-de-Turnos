export const fomatearNotificacion = (notification) => {
    const { mensaje, remitente } = notification;
    
    if (!mensaje) return '';
    
    try {
        const parsedMessage = JSON.parse(mensaje);
        
        if (parsedMessage.paciente && parsedMessage.servicio) {
            return `Nueva reserva para ${parsedMessage.servicio?.nombre || 'servicio'}`;
        }
        if (parsedMessage.medico) {
            const actionType = notification.mensaje.includes('cancelado') ? 'cancelada' : 
                             notification.mensaje.includes('confirmado') ? 'confirmada' : 'actualizada';
            return `Tu turno ha sido ${actionType}`;
        }
        return mensaje;
    } catch (e) {
        if (remitente?.nombre) {
            return `${remitente.nombre}: ${mensaje}`;
        }
        return mensaje;
    }
};


export const extraerInfoTurno = (notification) => {
    const { mensaje, remitente } = notification;
    
    if (!mensaje || !remitente) return null;
    
    try {
        const parsed = JSON.parse(mensaje);
        
        const turnoInfo = {
            doctor: remitente.nombre || null,
            location: parsed.sede?.nombre || null,
            time: parsed.fechaHora || null,
            practice: parsed.practica?.nombre || null,
            cost: parsed.costo || null
        };
        
        if (turnoInfo.doctor) {
            return turnoInfo;
        }
        return null;
    } catch (e) {
        return remitente.nombre ? { doctor: remitente.nombre } : null;
    }
};
