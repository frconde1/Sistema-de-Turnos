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
	 * @param	{Especialidad | Practica} elemento 
	 * @returns	{NivelCobertura}
	 */
	ObtenerCobertura(elemento) {
		const lista = elemento instanceof Especialidad ? this.coberturasEspecialidad : this.coberturasPractica;
		
		const cobertura = lista.find(c => c.id == elemento.id);
		
		if(cobertura)
			return cobertura.nivel;

		return NivelCobertura.NO_CUBIERTA;
	}

	}

