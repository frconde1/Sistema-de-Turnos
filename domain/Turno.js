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
	 * 
	 * @param {String} id 
	 * @param {Medico} medico 
	 * @param {Paciente} paciente 
	 * @param {Date} fechaHora 
	 * @param {Sede} sede 
	 * @param {Practica} practica 
	 * @param {EstadoTurno} estado 
	 * @param {CambioEstadoTurno[]} historialEstados 
	 * @param {Number} costo 
	 */
	constructor(id, medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo) { 
		this.id = id; 
		this.medico = medico; 
		this.paciente = paciente; 
		this.fechaHora = fechaHora; 
		this.sede = sede; 
		this.practica = practica;
		this.estado = estado; 
		this.historialEstados = historialEstados;
		this.costo = costo; 
	}


	/**
	 * @param {EstadoTurno} nuevoEstado 
	 * @param {Usuario} quien 
	 * @param {String} motivo 
	 */
	ActualizarEstado(nuevoEstado, quien, motivo) {
		this.estado = nuevoEstado; 
		this.historialEstados.push(
			new CambioEstadoTurno(this.fechaHora, nuevoEstado, this, quien, motivo)
		);
	}
}
