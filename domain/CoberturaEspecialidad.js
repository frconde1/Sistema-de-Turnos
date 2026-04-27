import { NivelCobertura } 	from "./Enums.js";
import Especialidad 		from "./Especialidad.js"

export default class CoberturaEspecialidad {
	especialidad;
	nivel;

	/**
	 * @param {Especialidad} especialidad 
	 * @param {NivelCobertura} nivel 
	 */
	constructor(especialidad, nivel) {
		this.especialidad = especialidad;
		this.nivel = nivel;
	}
}
