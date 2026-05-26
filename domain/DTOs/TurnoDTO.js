import Turno from "../Turno.js";
import CambioEstadoTurnoDTO from "./CambioEstadoTurnoDTO.js";

export default class TurnoDTO {
	/**
	 * @param {Turno} turno 
	 */
	constructor(turno){
		this.id 				= turno.id; 
		this.medico 			= turno.medico; 
		this.paciente 			= turno.paciente;
		this.sede 				= turno.sede; 
		this.practica 			= turno.practica; 

		this.fechaHora 			= turno.fechaHora.toISOString();
		this.estado 			= turno.estado;
		this.historialEstado 	= turno.historialEstados.map(e => new CambioEstadoTurnoDTO(e));
		this.costo 				= turno.costo;
	}
}