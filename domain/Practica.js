export default class Practica {
	id; 
	codigo; 
	nombre; 
	duracionTurnoEnMins;
	costo; 

	/**
	 * @param {String} id 
	 * @param {String} codigo 
	 * @param {String} nombre 
	 * @param {Number} duracionTurnoEnMins 
	 * @param {Number} costo 
	 */
	constructor(id, codigo, nombre, duracionTurnoEnMins, costo) { 
		this.id = id;
		this.codigo = codigo; 
		this.nombre = nombre; 
		this.duracionTurnoEnMins = duracionTurnoEnMins; 
		this.costo = costo; 
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

