import CoberturaEspecialidad	from "./CoberturaEspecialidad.js";
import CoberturaPractica		from "./CoberturaPractica.js";
import { NivelCobertura } 		from "./Enums.js";
import Especialidad 			from "./Especialidad.js";
import Practica 				from "./Practica.js";

export default class Plan {
	id; 
	nombre;
	coberturasEspecialidad;
	coberturasPracticas;

	/**
	 * @param {String} id 
	 * @param {String} nombre 
	 * @param {CoberturaEspecialidad[]} coberturasEspecialidad 
	 * @param {CoberturaPractica[]} coberturasPracticas 
	 */
	constructor(id, nombre, coberturasEspecialidad, coberturasPracticas) {
		this.id = id; 
		this.nombre = nombre;
		this.coberturasEspecialidad = coberturasEspecialidad;
		this.coberturasPracticas = coberturasPracticas;
	}

	/**
	 * 
	 * @param	{Especialidad | Practica} elementoCobertura 
	 * @returns	{NivelCobertura}
	 */
	ObtenerCobertura(situacion) {
		if (situacion instanceof Especialidad)
			for (const cobertura of this.coberturasEspecialidad)
				if (Especialidad.EsIgual(situacion, cobertura.especialidad))
					return cobertura.nivel;

		if (situacion instanceof Practica)
			for (const cobertura of this.coberturasPracticas)
				if (Practica.EsIgual(situacion, cobertura.practica))
					return cobertura.nivel;

		// no se encontro
		throw new Error("No se ingreso una practica o una especialidad");
	}

	}

