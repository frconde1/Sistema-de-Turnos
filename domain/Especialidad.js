export default class Especialidad {
	id; 
	nombre; 
	duracionEnMins; 
	costoConsulta; 

	/**
	 * @param {String} id 
	 * @param {String} nombre 
	 * @param {Number} duracionEnMins 
	 * @param {Number} costoConsulta 
	 */
	constructor(id, nombre, duracionEnMins, costoConsulta) { 
		this.id =  id; 
		this.nombre = nombre; 
		this.duracionEnMins = duracionEnMins; 
		this.costoConsulta = costoConsulta; 
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
