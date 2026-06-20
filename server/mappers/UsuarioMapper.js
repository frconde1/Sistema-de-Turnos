import Usuario from "../domain/Usuario.js"

export default class UsuarioMapper{
	
	/**@returns {Usuario} */
	static toEntity({username, password, registrado, rol, _id}){
		const usuario = new Usuario(username, password);
		usuario.id = _id.toString();
		usuario.registrado = registrado;
		usuario.rol = rol;
		return usuario;
	}

	/**@param {Usuario} usuario*/
	static toSchema({username, password, registrado, rol}){
		return {
			username: 	username,
			password: 	password,
			registrado: registrado,
			rol: rol
		}
	}
}