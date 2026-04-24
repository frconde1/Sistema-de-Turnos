import DisponibilidadHoraria 	from "./DisponibilidadHoraria.js";
import Especialidad 			from "./Especialidad.js";
import Practica 				from "./Practica.js";
import Sede 					from "./Sede.js";
import Usuario 					from "./Usuario.js";

export default class Medico {
	id;
	usuario;
	matricula;
	nombre;
	especialidades;
	practicas;
	sedes;
	disponibilidades;

	/**
	 * @param {String} id 
	 * @param {Usuario} usuario 
	 * @param {String} matricula 
	 * @param {String} nombre 
	 * @param {Especialidad[]} especialidades 
	 * @param {Practica[]} practicas 
	 * @param {Sede[]} sedes 
	 * @param {DisponibilidadHoraria[]} disponibilidades 
	 */
	constructor(id, usuario, matricula, nombre, especialidades, practicas, sedes, disponibilidades) {
		this.id = id;
		this.usuario = usuario;
		this.matricula = matricula;
		this.nombre = nombre;
		this.especialidades = especialidades;
		this.practicas = practicas;
		this.sedes = sedes;
		this.disponibilidades = disponibilidades;
	}

	/** @param {DisponibilidadHoraria} disponibilidad */
	agregarDisponibilidad(disponibilidad) {
		this.disponibilidades.push(disponibilidad)
	}

	/** @param {DisponibilidadHoraria} disponibilidad */
	eliminarDisponibilidad(disponibilidad) {
		this.disponibilidades = this.disponibilidades.filter(
			d => d !== disponibilidad
		)
	}

}