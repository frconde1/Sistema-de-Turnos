import mongoose from "mongoose";
import UsuarioMapper from "../mappers/UsuarioMapper.js";
import UsuarioModel from "../schemas/UsuarioSchema.js";


export default class UsuarioRepository {
	
	constructor() {}

	async FindAll() {
		return (await UsuarioModel.find()).map(UsuarioMapper.toEntity);
	}


	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const plan = await UsuarioModel.findById(id)
		return plan != null? UsuarioMapper.toEntity(plan) : null;
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
