
export const formatNotificationDate = (date) => {
    if (!date) return '';
    
    const notifDate = new Date(date);
    const today = new Date();
    
    const isToday = 
        notifDate.getDate() === today.getDate() &&
        notifDate.getMonth() === today.getMonth() &&
        notifDate.getFullYear() === today.getFullYear();
    
    const timeFormatter = new Intl.DateTimeFormat('es-AR', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    if (isToday) {
        return timeFormatter.format(notifDate);
    }
    
    const dateFormatter = new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    return dateFormatter.format(notifDate);
};


export const formatAppointmentDate = (date) => {
    if (!date) return '';
    
    const appointmentDate = new Date(date);
    
    const formatter = new Intl.DateTimeFormat('es-AR', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    return formatter.format(appointmentDate);
};

export const formatHour = (date) => {
    if(!date) return '';
    const appointmentDate = new Date(date);

    const hours = String(appointmentDate.getHours()).padStart(2, '0');
    const minutes = String(appointmentDate.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
}