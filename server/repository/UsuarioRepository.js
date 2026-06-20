import mongoose from "mongoose";
import UsuarioMapper from "../mappers/UsuarioMapper.js";
import UsuarioModel from "../schemas/UsuarioSchema.js";


export default class UsuarioRepository {
	
	constructor() {}

	async FindAll() {
		return (await UsuarioModel.find()).map(UsuarioMapper.toEntity);
	}

	async existeUsuario(username) {
		return await UsuarioModel.exists({ username });
	}

	async FindByUsername(username) {
		const usuario = await UsuarioModel.findOne({ username });
		return usuario ? UsuarioMapper.toEntity(usuario) : null;
	}

	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const usr = await UsuarioModel.findById(id)
		return usr != null? UsuarioMapper.toEntity(usr) : null;
	}

    async Save(usuario) {
		if (usuario.id) 
			await UsuarioModel.findByIdAndUpdate(usuario.id, UsuarioMapper.toSchema(usuario), { upsert: true });
		else {
			const created = await UsuarioModel.create(UsuarioMapper.toSchema(usuario));
			usuario.id = created._id.toString();
		}
		return usuario;
    }
}
