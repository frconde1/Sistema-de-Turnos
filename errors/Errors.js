export class AppError extends Error {
	
	/**
	 * @param {number} codigo 
	 * @param {String} mensaje 
	 */
	constructor(codigo, mensaje) {
		super(mensaje);
		this.name = this.constructor.name;
		this.statusCode = codigo;
		this.timeStamp = new Date().toISOString();
	}
}

export class InputError extends AppError {
	constructor(mensaje){
		super(400, mensaje);
		this.name = "Error de Input"
	}
}

export class NotFoundError extends AppError {
	constructor(mensaje){
		super(404, mensaje);
		this.name = "URL incorrecta";
	}
}

export class BadRequestError extends AppError {
	constructor(mensaje){
		super(400, mensaje);
		this.name = "Error de petición"
	}
}