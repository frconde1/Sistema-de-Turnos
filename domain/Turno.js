import { EstadoTurno }		from "./Enums.js";
import CambioEstadoTurno 	from "./CambioEstadoTurno.js"
import Medico 				from "./Medico.js";
import Paciente 			from "./Paciente.js";
import Sede 				from "./Sede.js";
import Practica 			from "./Practica.js";
import Usuario 				from "./Usuario.js";

export default class Turno {
	/**@type {String} */
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

	/**@returns {Date} */
	FechaFinalizacion(){
		const fechaFinalizacion = new Date(this.fechaHora);
		fechaFinalizacion.setMinutes(fechaFinalizacion.getMinutes() + this.practica.duracionEnMins);
		return fechaFinalizacion;
	}

	/**
	 * @param {EstadoTurno} nuevoEstado 
	 * @param {Usuario} quien 
	 * @param {String} motivo 
	 */
	CambiarEstado(nuevoEstado, quien, motivo) { 
		this.estado = nuevoEstado.estado;

		this.historialEstados.push(
			new CambioEstadoTurno(
				new Date(),
				nuevoEstado,
				this,
				quien,
				motivo
			)
		);
	}
}
