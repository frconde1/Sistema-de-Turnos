export default class Usuario {
	id; 
	username;
	password; 

	/**
	 * @param {String} id 
	 * @param {String} username 
	 * @param {String} password 
	 */
	constructor(id, username, password) {
		this.id = id; 
		this.username = username;
		this.password = password; 
	}

}
