import mongoose from "mongoose";
import Practica 		from "../domain/Practica.js";
import { InputError } 	from "../errors/Errors.js";
import { PracticaModel } from "../schemas/PracticaSchema.js";

export default class PracticaRepository {
	constructor() {}

	/** @returns {Practica[]}*/
	async FindAll() {
		return (await PracticaModel.find()).map(this.toEntity);
	}

	/**
	 * @param {String} id 
	 * @returns {Practica}
	 */
	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		let practica = await PracticaModel.findById(id);
		return this.toEntity(practica) 
	}
	
	/** 
	 * @param {Practica} practica 
	 * @returns {Practica}
	*/
	async Save(practica) {
		if (practica.id) 
			await PracticaModel.findByIdAndUpdate(practica.id, this.toSchema(practica), { new: true, upsert: true });
		else {
			const created = await PracticaModel.create(this.toSchema(practica));
			practica.id = created._id.toString();
		}
		return practica;
	}


	/**@param {Practica} practica  */
	toSchema(practica){
		return {
			codigo: practica.codigo,
			nombre: practica.nombre,
			costo:  practica.costo,
			duracionEnMins: practica.duracionEnMins
		}
	}

	/**@return {Practica}*/
	toEntity({codigo, nombre, duracionEnMins, costo, _id}){
		const practica = new Practica(codigo, nombre, duracionEnMins, costo);
		practica.id = _id.toString();
		return practica;
	}
}

