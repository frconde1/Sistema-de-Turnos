export default class Practica {
	/** @type {String} */
	id; 
	codigo; 
	nombre; 
	duracionEnMins;
	costo; 

	/**
	 * @param {String} codigo 
	 * @param {String} nombre 
	 * @param {Number} duracionEnMins 
	 * @param {Number} costo 
	 */
	constructor(codigo, nombre, duracionEnMins, costo) { 
		this.codigo = codigo; 
		this.nombre = nombre; 
		this.costo  = costo; 
		this.duracionEnMins = duracionEnMins; 
	}

	/**
	 * @param {Practica} unaPractica 
	 * @param {Practica} otraPractica 
	 * @returns {Boolean}
	 */
	static EsIgual(unaPractica, otraPractica) {
		return unaPractica.id == otraPractica.id;
	}
}

