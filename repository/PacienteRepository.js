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

    async Save(paciente) {
		if (paciente.id) 
			await PacienteModel.findByIdAndUpdate(paciente.id, PacienteMapper.toSchema(paciente), { upsert: true });
		else {
			const created = await PacienteModel.create(PacienteMapper.toSchema(paciente));
			paciente.id = created._id.toString();
		}
		return paciente;
    }

}