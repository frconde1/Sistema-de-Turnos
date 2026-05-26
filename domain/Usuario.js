export default class Usuario {
	/**@type {String} */
	id; 
	username;
	password;
	registrado = false;

	/**
	 * @param {String} username 
	 * @param {String} password 
	 */
	constructor(username, password) {
		this.username = username;
		this.password = password; 
	}

}
