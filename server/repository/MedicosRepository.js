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
        if (filtros.especialidad !== undefined) filtrosMDB.especialidades = filtros.especialidad
        if (filtros.practica !== undefined)     filtrosMDB.practicas      = filtros.practica
        if (filtros.sede !== undefined)         filtrosMDB.sedes          = filtros.sede

        const inicio = (numeroPagina - 1) * limitePorPagina;

        const medicos = await MedicoModel
                        .find(filtrosMDB)
                        .skip(inicio)
                        .limit(limitePorPagina)
                        .populate(MedicoMapper.populate)

        return {
            medicos: medicos,
            totalMedicos: await MedicoModel.countDocuments(filtrosMDB) //el total de medicos que cumple con los filtros, sino te da el total sin el filtro
        }
    }

    async findAll() {
        return (await MedicoModel.find().populate(MedicoMapper.populate)).map(MedicoMapper.toEntity);
    }

    async Save(medico) {
        if (medico.id) {
            await MedicoModel.findByIdAndUpdate(medico.id, MedicoMapper.toSchema(medico), {upsert: true });
        } else {
            const created = await MedicoModel.create(MedicoMapper.toSchema(medico));
            medico.id = created._id.toString();
        }
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