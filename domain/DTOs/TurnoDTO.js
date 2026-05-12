import Turno from "../Turno.js";
import CambioEstadoTurnoDTO from "./CambioEstadoTurnoDTO.js";

export default class TurnoDTO {
	/**
	 * @param {Turno} turno 
	 */
	constructor(turno){
		this.id 				= turno.id; 
		this.medico 			= turno.medico.id; 
		this.paciente 			= turno.paciente.id;
		this.sede 				= turno.sede.id; 
		this.practica 			= turno.practica.id; 

		this.fechaHora 			= turno.fechaHora.toISOString();
		this.estado 			= turno.estado;
		this.historialEstado 	= turno.historialEstados.map(e => new CambioEstadoTurnoDTO(e));
		this.costo 				= turno.costo;
	}
}