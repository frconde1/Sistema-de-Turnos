import Usuario from "../domain/Usuario.js"

export default class UsuarioMapper{
	
	/**@returns {Usuario} */
	static toEntity({username, password, _id}){
		const usuario = new Usuario(username, password);
		usuario.id = _id.toString();
		return usuario;
	}

	/**@param {Usuario} usuario*/
	static toSchema({username, password}){
		return {
			username: username,
			password: password
		}
	}
}