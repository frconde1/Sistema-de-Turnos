import mongoose from "mongoose";
import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import Especialidad from "../domain/Especialidad.js";
import Medico from "../domain/Medico.js";
import Practica from "../domain/Practica.js";
import Sede from "../domain/Sede.js";
import { InputError } from "../errors/Errors.js";
import MedicoMapper from "../mappers/MedicoMapper.js";
import MedicoModel from "../schemas/MedicoSchema.js";

export class MedicosRepository {
    
    constructor() {}

    async obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {

        const filtrosMDB = {};

        if (filtros.nombre !== undefined)       filtrosMDB.nombre       = filtros.nombre;
        if (filtros.especialidad !== undefined) filtrosMDB.especialidad = filtros.especialidad
        if (filtros.practica !== undefined)     filtrosMDB.practica     = filtros.practica
        if (filtros.sede !== undefined)         filtrosMDB.sede         = filtros.sede

        const inicio = (numeroPagina - 1) * limitePorPagina;

        const medicos = await MedicoModel
                        .find(filtrosMDB)
                        .skip(inicio)
                        .limit(limitePorPagina)
                        .populate(MedicoMapper.populate)

        return {
            medicos: medicos,
            totalMedicos: await MedicoModel.countDocuments()
        }
    }

    async findAll() {
        return (await MedicoModel.find().populate(MedicoMapper.populate)).map(MedicoMapper.toEntity);
    }

    async Save(medico) {
        await MedicoModel.findOneAndUpdate(
			{_id: medico.usuario.id},
			{$set: MedicoMapper.toSchema(medico)},
			{upsert: true}
		);
		return medico;
    }

    async findMedicoById(medicoId) {
        let medico = await MedicoModel.findById(medicoId);
		
		if (!medico) 
			throw new InputError("El medico no existe")

		return MedicoMapper.toEntity(medico) 
    }

    async FindByUsuarioId(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const medico = await MedicoModel.findOne({ usuario: id }).populate(MedicoMapper.populate);
		return medico != null? MedicoMapper.toEntity(medico) : null;
	}

    async agregarDisponibilidad(medicoId, disponibilidad) {
        const medico = await this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarDisponibilidad(disponibilidad)
            this.Save(medico)
        }
    } 

    async agregarSede(medicoId, sede) {
        const medico = await this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarSede(sede)
            this.Save(medico)
        }
    }

}