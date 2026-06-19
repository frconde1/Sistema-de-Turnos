import mongoose from "mongoose";
import Especialidad 	 from "../domain/Especialidad.js";
import EspecialidadModel from "../schemas/EspecialidadSchema.js";
import EspecialidadMapper from "../mappers/EspecialidadMapper.js";


export default class EspecialidadRepository {
	constructor() {}

	async FindAll(){
		let especialidades = await EspecialidadModel.find();
		return especialidades.map(EspecialidadMapper.toEntity);
	}

	async FindById(id){
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const especialidad = await EspecialidadModel.findById(id);

		return especialidad != null ? EspecialidadMapper.toEntity(especialidad) : null;
	}

	/**
	 * @param {Especialidad} especialidad 
	 * @returns {Especialidad}
	 */
	async Save(especialidad){
		if (especialidad.id) 
			await EspecialidadModel.findByIdAndUpdate(especialidad.id, EspecialidadMapper.toSchema(especialidad), { upsert: true });
		else {
			const created = await EspecialidadModel.create(EspecialidadMapper.toSchema(especialidad));
			especialidad.id = created._id.toString();
		}
		return especialidad;
	}
}