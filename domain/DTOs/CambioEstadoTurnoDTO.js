import CambioEstadoTurno from "../CambioEstadoTurno.js";

export default class CambioEstadoTurnoDTO {
	
	/** @param {CambioEstadoTurno} cambioEstado */
	constructor(cambioEstado){
		this.fechaHoraIngreso 	= cambioEstado.fechaHoraIngreso.toISOString();
		this.estado 			= cambioEstado.estado;
		this.turno 				= cambioEstado.turno.id; 
		this.usuario 			= cambioEstado.usuario; 
		this.motivo 			= cambioEstado.motivo;
	}
}