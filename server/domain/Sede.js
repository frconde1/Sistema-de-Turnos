export default class Sede {
	/**@type {String} */
	id; 
	nombre;
	direccion;

	/**
	 * @param {String} nombre 
	 * @param {String} direccion 
	 */
	constructor(nombre, direccion) {
		this.nombre = nombre;
		this.direccion = direccion;
	}
}
