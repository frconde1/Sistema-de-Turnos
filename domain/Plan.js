import { InputError } from "../errors/Errors.js";
import CoberturaEspecialidad	from "./CoberturaEspecialidad.js";
import CoberturaPractica		from "./CoberturaPractica.js";
import { NivelCobertura } 		from "./Enums.js";
import Especialidad 			from "./Especialidad.js";
import Practica 				from "./Practica.js";

export default class Plan {
	/**@type {String} */
	id; 
	nombre;
	coberturasEspecialidad;
	coberturasPracticas;

	/**
	 * @param {String} nombre 
	 * @param {CoberturaEspecialidad[]} coberturasEspecialidad 
	 * @param {CoberturaPractica[]} coberturasPracticas 
	 */
	constructor(nombre, coberturasEspecialidad, coberturasPracticas) {
		this.nombre = nombre;
		this.coberturasEspecialidad = coberturasEspecialidad;
		this.coberturasPracticas = coberturasPracticas;
	}

	/**
	 * @param	{Especialidad | Practica} elementoCobertura 
	 * @returns	{NivelCobertura | null}
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

		return null;
	}

	}

