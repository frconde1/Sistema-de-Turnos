import mongoose from "mongoose";
import Especialidad 	 from "../domain/Especialidad.js";
import EspecialidadModel from "../schemas/EspecialidadSchema.js";


export default class EspecialidadRepository {
	constructor() {}

	async FindAll(){
		let especialidades = await EspecialidadModel.find();
		return especialidades.map(this.toEntity);
	}

	async FindById(id){
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		return this.toEntity(await EspecialidadModel.findById(id));
	}

	/**
	 * @param {Especialidad} especialidad 
	 * @returns {Especialidad}
	 */
	async Save(especialidad){
		if (especialidad.id) 
			await EspecialidadModel.findByIdAndUpdate(especialidad.id, this.toSchema(especialidad), { new: true, upsert: true });
		else {
			const created = await EspecialidadModel.create(this.toSchema(especialidad));
			especialidad.id = created._id.toString();
		}
		return especialidad;
	}

	/**@param {Especialidad} especialidad  */
	toSchema(especialidad){
		return {
			nombre: 		especialidad.nombre,
			duracionEnMins: especialidad.duracionEnMins,
			costoConsulta: 	especialidad.costoConsulta
		}
	}

	/**@return {Especialidad}*/
	toEntity({nombre, duracionEnMins, costoConsulta, _id}){
		const especialdiad = new Especialidad(nombre, duracionEnMins, costoConsulta);
		especialdiad.id = _id.toString();
		return especialdiad;
	}

}