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
	coberturasPractica;

	/**
	 * @param {String} nombre 
	 * @param {CoberturaEspecialidad[]} coberturasEspecialidad 
	 * @param {CoberturaPractica[]} coberturasPractica
	 */
	constructor(nombre, coberturasEspecialidad, coberturasPractica) {
		this.nombre = nombre;
		this.coberturasEspecialidad = coberturasEspecialidad;
		this.coberturasPractica = coberturasPractica;
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
			for (const cobertura of this.coberturasPractica)
				if (Practica.EsIgual(situacion, cobertura.practica))
					return cobertura.nivel;

		return null;
	}

	}

