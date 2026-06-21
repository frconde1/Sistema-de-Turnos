export default class Usuario {
	/**@type {String} */
	id; 
	username;
	password;
	/**@type {String} */
	rol

	/**
	 * @param {String} username 
	 * @param {String} password 
	 */
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	/** @param {String} rol */
	Registrar(rol){
		this.rol = rol;
	}
}
