export default class Notificacion {
  id; 
  destinatario; 
  remitente; 
  mensaje; 
  fechaHoraCreacion; 
  fechaHoraLeida; 
  leida; 

  constructor(id, destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida) {
    this.id = id; 
    this.destinatario = destinatario; 
    this.remitente = remitente;
    this.mensaje = mensaje;
    this.fechaHoraCreacion = fechaHoraCreacion;
    this.fechaHoraLeida = fechaHoraLeida; 
    this.leida = false;
  }

  marcarComoLeida() {
    this.leida = true; 
  
  }
}
