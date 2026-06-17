import Usuario from "../domain/Usuario.js"

export default class UsuarioMapper{
	
	/**@returns {Usuario} */
	static toEntity({username, password, registrado, _id}){
		const usuario = new Usuario(username, password);
		usuario.id = _id.toString();
		usuario.registrado = registrado;
		return usuario;
	}

	/**@param {Usuario} usuario*/
	static toSchema({username, password, registrado}){
		return {
			username: 	username,
			password: 	password,
			registrado: registrado
		}
	}
}