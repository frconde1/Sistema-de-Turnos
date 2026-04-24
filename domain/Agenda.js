import Especialidad	from "./Especialidad.js";
import Medico 		from "./Medico.js";
import Practica 	from "./Practica.js";
import Turno 		from "./Turno.js";

export default class Agenda {
	/**
	* @param {Especialidad | Practica} situacion
	* @param {Medico} medico
	* @returns {Turno[]}
	*/
	GenerarTurnosPara(situacion, medico) {
		//TODO
		let turnos = []
		return turnos;
	}

	/**
	* @param {Medico} medico
	* @returns {Turno[]}
	*/
	RefrescarTurnosPara(medico) {
		//TODO
		let turnos = []
		return turnos;
	}
}
