import Plan from "./Planes/Plan.js";

export default class ObraSocial { 
	id; 
	nombre; 
	planes; 

	/**
	 * @param {String} id 
	 * @param {String} nombre 
	 * @param {Plan[]} planes
	 */
	constructor(id, nombre, planes) {
		this.id = id; 
		this.nombre = nombre ;
		this.planes = [];
	}
}
