import { EstadoTurno }		from "./Enums.js";
import CambioEstadoTurno 	from "./CambioEstadoTurno.js"
import Medico 				from "./Medico.js";
import Paciente 			from "./Paciente.js";
import Sede 				from "./Sede.js";
import Practica 			from "./Practica.js";
import Usuario 				from "./Usuario.js";

export default class Turno {
	id; 
	medico; 
	paciente;
	fechaHora;
	sede; 
	practica; 
	estado;
	historialEstados;
	costo;

	/** 
	 * @param {Medico} medico 
	 * @param {Paciente} paciente 
	 * @param {Date} fechaHora 
	 * @param {Sede} sede 
	 * @param {Practica} practica 
	 * @param {EstadoTurno} estado 
	 * @param {CambioEstadoTurno[]} historialEstados 
	 * @param {Number} costo 
	 */
	constructor(medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo) { 
		this.medico 		  = medico; 
		this.paciente 		  = paciente;
		this.fechaHora 		  = fechaHora; 
		this.sede 			  = sede; 
		this.practica 		  = practica;
		this.estado 		  = estado; 
		this.historialEstados = historialEstados;
		this.costo 			  = costo; 
	}

	/**
	 * @param {Turno} turnoNuevo 
	 * @returns {CambioEstadoTurno[]} 
	 */
	CambiarReferenciasDeEstados(turnoNuevo){
		return this.historialEstados.forEach(e => {e.turno = turnoNuevo});
	}

	/**@returns {Date} */
	FechaFinalizacion(){
		const fechaFinalizacion = new Date(this.fechaHora);
		fechaFinalizacion.setMinutes(fechaFinalizacion.getMinutes() + this.practica.duracionTurnoEnMins);
		return fechaFinalizacion;
	}

	/** @param {CambioEstadoTurno} nuevoEstado */
	CambiarEstado(nuevoEstado) { 
		this.historialEstados.push(nuevoEstado);
		this.estado = nuevoEstado.estado;
	}
}
