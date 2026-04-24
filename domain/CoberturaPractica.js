import { NivelCobertura } 	from "./Enums.js";
import Practica 			from "./Practica.js"

export default class CoberturaPractica {
	practica;
	nivel;

	/**
	 * @param {Practica} practica 
	 * @param {NivelCobertura} nivel 
	 */
	constructor(practica, nivel) {
		this.practica = practica;
		this.nivel = nivel;
	}
}
