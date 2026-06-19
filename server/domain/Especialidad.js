export default class Especialidad {
	/**@type {String} */
	id; 
	nombre; 
	duracionEnMins; 
	costo; 

	/**
	 * @param {String} nombre 
	 * @param {Number} duracionEnMins 
	 * @param {Number} costo 
	 */
	constructor(nombre, duracionEnMins, costo) { 
		this.nombre = nombre; 
		this.costo  = costo; 
		this.duracionEnMins = duracionEnMins; 
	}

	/**
	 * @param {Especialidad} unaEspecialidad 
	 * @param {Especialidad} otraEspecialidad 
	 * @returns {Boolean}
	 */
	static EsIgual(unaEspecialidad, otraEspecialidad) {
		return unaEspecialidad.id == otraEspecialidad.id;
	} 

}
