export default class Usuario {
	/**@type {String} */
	id; 
	username;
	password; 

	/**
	 * @param {String} username 
	 * @param {String} password 
	 */
	constructor(username, password) {
		this.username = username;
		this.password = password; 
	}

}
