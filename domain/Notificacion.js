import Usuario from "./Usuario.js";

export default class Notificacion {
	/**@type {String} */
	id; 
	destinatario; 
	remitente; 
	mensaje; 
	fechaHoraCreacion;
	/**@type {Date | null} */
	fechaHoraLeida; 
	leida; 

	/**
	 * @param {Usuario} destinatario 
	 * @param {Usuario} remitente 
	 * @param {String} mensaje 
	 * @param {Date} fechaHoraCreacion 
	 * @param {Date} fechaHoraLeida 
	 * @param {Boolean} leida
	 */
	constructor(destinatario, remitente, mensaje, fechaHoraCreacion) {
		this.destinatario = destinatario; 
		this.remitente = remitente;
		this.mensaje = mensaje;
		this.fechaHoraCreacion = fechaHoraCreacion;
		this.fechaHoraLeida = null;
		this.leida = false;
	}

	marcarComoLeida() {
		this.fechaHoraLeida = new Date();
		this.leida = true; 
	}
}
