import Plan from "./Plan.js";

export default class ObraSocial { 
	/**@type {String} */
	id;

	nombre; 
	planes; 

	/**
	 * @param {String} nombre 
	 * @param {Plan[]} planes
	 */
	constructor(nombre, planes) {
		this.nombre = nombre ;
		this.planes = planes;
	}
}
