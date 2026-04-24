import Usuario from "./Usuario";

export default class Notificacion {
	id; 
	destinatario; 
	remitente; 
	mensaje; 
	fechaHoraCreacion; 
	fechaHoraLeida; 
	leida; 

	/**
	 * @param {String} id 
	 * @param {Usuario} destinatario 
	 * @param {Usuario} remitente 
	 * @param {String} mensaje 
	 * @param {Date} fechaHoraCreacion 
	 * @param {Date} fechaHoraLeida 
	 * @param {Boolean} leida
	 */
	constructor(id, destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida, leida) {
		this.id = id; 
		this.destinatario = destinatario; 
		this.remitente = remitente;
		this.mensaje = mensaje;
		this.fechaHoraCreacion = fechaHoraCreacion;
		this.fechaHoraLeida = fechaHoraLeida; 
		this.leida = leida;
	}

	marcarComoLeida() {
		this.fechaHoraLeida = new Date();
		this.leida = true; 
	}
}
