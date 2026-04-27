export default class Sede {
	id; 
	nombre;
	direccion;

	/**
	 * @param {String} id 
	 * @param {String} nombre 
	 * @param {String} direccion 
	 */
	constructor(id, nombre, direccion) {
		this.id = id; 
		this.nombre = nombre;
		this.direccion = direccion;
	}
}
