import CambioEstadoTurno from "../CambioEstadoTurno.js";

export default class CambioEstadoTurnoDTO {
	
	/** @param {CambioEstadoTurno} cambioEstado */
	constructor(cambioEstado){
		this.fechaHoraIngreso 	= cambioEstado.fechaHoraIngreso.toDateString();
		this.estado 			= cambioEstado.estado;
		this.turno 				= cambioEstado.turno.id; 
		this.usuario 			= cambioEstado.usuario.id; 
		this.motivo 			= cambioEstado.motivo;
	}
}