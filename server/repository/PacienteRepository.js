import Paciente from "../domain/Paciente.js";
import Usuario from "../domain/Usuario.js";
import PacienteModel from "../schemas/PacienteSchema.js";
import PacienteMapper from "../mappers/PacienteMapper.js"
import mongoose from "mongoose";


export default class PacienteRepository {
	constructor() {}

	async FindAll() {
        const pacientes = await PacienteModel.find().populate(PacienteMapper.populate);
		return pacientes.map(PacienteMapper.toEntity);
	}


	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const paciente = await PacienteModel.findById(id).populate(PacienteMapper.populate)
		return paciente != null? PacienteMapper.toEntity(paciente) : null;
	}

	async FindByUsuarioId(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const paciente = await PacienteModel.findOne({ usuario: id }).populate(PacienteMapper.populate);
		return paciente != null? PacienteMapper.toEntity(paciente) : null;
	}

	/**@param {Paciente} paciente */
    async Save(paciente) {
		await PacienteModel.findOneAndUpdate(
			{_id: paciente.usuario.id},
			{$set: PacienteMapper.toSchema(paciente)},
			{upsert: true}
		);
		return paciente;
    }

}