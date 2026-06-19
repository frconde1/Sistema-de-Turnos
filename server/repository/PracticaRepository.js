import mongoose 	  from "mongoose";
import Practica 	  from "../domain/Practica.js";
import { InputError } from "../errors/Errors.js";
import PracticaModel  from "../schemas/PracticaSchema.js";
import PracticaMapper from "../mappers/PracticaMapper.js";

export default class PracticaRepository {
	constructor() {}

	/** @returns {Practica[]}*/
	async FindAll() {
		return (await PracticaModel.find()).map(PracticaMapper.toEntity);
	}

	/**
	 * @param {String} id 
	 * @returns {Practica}
	 */
	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const practica = await PracticaModel.findById(id);
		return practica != null ? PracticaMapper.toEntity(practica) : null
	}
	
	/** 
	 * @param {Practica} practica 
	 * @returns {Practica}
	*/
	async Save(practica) {
		if (practica.id) 
			await PracticaModel.findByIdAndUpdate(practica.id, PracticaMapper.toSchema(practica), { upsert: true });
		else {
			const created = await PracticaModel.create(PracticaMapper.toSchema(practica));
			practica.id = created._id.toString();
		}
		return practica;
	}
}

