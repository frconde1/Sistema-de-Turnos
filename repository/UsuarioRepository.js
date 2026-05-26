import { UsuarioModel } from "../schemas/UsuarioSchema";


export default class UsuarioRepository {
    /**@type {Usuario[]} */
	usuarios;
	/**@type {Number} */
	nextID;

	constructor() {
		if(UsuarioRepository.instance)
			return UsuarioRepository.instance;

		this.usuarios = []
		this.nextId = 0;

		UsuarioRepository.instance = this;
	}

    /** @returns {Usuario[]}*/
	async FindAll() {
		return this.usuarios;
	}

    async Save(usuario) {
        await UsuarioModel.create(usuario);
        return usuario;

    }
}