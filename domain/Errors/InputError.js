export default class InputError extends Error {

	/**
	 * @param {Number} codigo 
	 * @param {String} texto 
	 */
	constructor(codigo, texto){
		super(texto)
		this.name = "Error de input";
		this.codigo = codigo;
	}
}