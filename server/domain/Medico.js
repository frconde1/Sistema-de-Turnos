import DisponibilidadHoraria 	from "./DisponibilidadHoraria.js";
import { DiaSemana } from "./Enums.js";
import Especialidad 			from "./Especialidad.js";
import Practica 				from "./Practica.js";
import Sede 					from "./Sede.js";
import Usuario 					from "./Usuario.js";

export default class Medico {
	/**@type {String} */
	id;
	usuario;
	matricula;
	nombre;
	especialidades;
	practicas;
	sedes;
	disponibilidades;

	/**
	 * @param {Usuario} usuario 
	 * @param {String} matricula 
	 * @param {String} nombre 
	 * @param {Especialidad[]} especialidades 
	 * @param {Practica[]} practicas 
	 * @param {Sede[]} sedes 
	 * @param {DisponibilidadHoraria[]} disponibilidades 
	 */
	constructor(usuario, matricula, nombre, especialidades = [], practicas = [], sedes = [], disponibilidades = []) {
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
		this.disponibilidades = this.disponibilidades.filter(d =>
   			!(
				d.diaSemana === disponibilidad.diaSemana &&
				d.horaDesde === disponibilidad.horaDesde &&
				d.horaHasta === disponibilidad.horaHasta
			)
		)		
	}

	validarDisponibilidad(fechaHora, duracionMinutos) {
		const diaSemana = Object.values(DiaSemana)[fechaHora.getDay()];

		return this.disponibilidades
			.filter(d => d.diaSemana === diaSemana)
			.some(d => d.incluyeRangoHorario(fechaHora, duracionMinutos))
	}

    agregarSede(sede) {
        this.sedes.push(sede)
    }

}