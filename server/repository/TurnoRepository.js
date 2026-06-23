import Turno 			from "../domain/Turno.js";
import TurnoModel  		from "../schemas/TurnoSchema.js";
import TurnoMapper 		from "../mappers/TurnoMapper.js";
import mongoose 		from "mongoose";
import { EstadoTurno } from "../domain/Enums.js";
import { InputError, ResourceNotFoundError } from "../errors/Errors.js";

export default class TurnoRepository {
	constructor() {}

	async FindAll(filtros) {
		
		const {pagina = 1, tamano = 10, medico, paciente, sede, practica, estado, ordenCosto, ordenFecha, fechaInicio, fechaFin} = filtros;
		
		const filtrosMDB = {};
		
		if(medico) 	 filtrosMDB.medico		= medico;
		if(paciente) filtrosMDB.paciente	= paciente;
		if(sede) 	 filtrosMDB.sede		= sede;
		if(practica) filtrosMDB.practica	= practica;
		if(estado)	 filtrosMDB.estado		= estado;
		
		if(fechaInicio || fechaFin) filtrosMDB.fecha = {};
		if(fechaInicio) filtrosMDB.fecha.$gte = fechaInicio;
		if(fechaFin) 	filtrosMDB.fecha.$lte = fechaFin;


		const sort = {};
		if (ordenFecha != null) sort.fechaHora 	= ordenFecha ? 1 : -1;
		if (ordenCosto != null) sort.costo 		= ordenCosto ? 1 : -1;


		const turnos = await TurnoModel
				.find(filtrosMDB)
				.sort(sort)
				.skip((pagina - 1) * tamano)
				.limit(tamano)
				.populate(TurnoMapper.populate)


        return {
			turnos: turnos.map(TurnoMapper.toEntity),
            totalTurnos: await TurnoModel.countDocuments(filtrosMDB) //el total de turnos que cumple con los filtros, sino te da el total sin el filtro
        }
	}

	async FindReservadoByMedico(id){
		return (await TurnoModel
			.find({
				medico: id, 
				estado: EstadoTurno.CONFIRMADO
			})
			.populate(TurnoMapper.populate))
			.map(TurnoMapper.toEntity);
	}

	/** 
	 * @param {Turno} turno 
	 * @returns {Turno}
	*/
	async Save(turno) {
		if (turno.id){
			// turno.id = new mongoose.Types.ObjectId().toString();
			await TurnoModel.findByIdAndUpdate(turno.id, TurnoMapper.toSchema(turno), { upsert: true });
		}
		else {
			const created = await TurnoModel.create(TurnoMapper.toSchema(turno));
			turno.id = created._id.toString();
		}
		return turno;
	}

	/** 
	 * @param {String} id 
	 * @returns {Turno}
	*/
	async Delete(id) {
		if(!mongoose.Types.ObjectId.isValid(id)){
			throw new InputError("id no valido");
		}
		
		const turno = await TurnoModel.findByIdAndDelete(id);
		if (!turno) {
			throw new ResourceNotFoundError("Turno no encontrado");
		}
	}

	/**
	 * @param {String} id 
	 * @returns {Turno | undefined}
	 */
	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const turno = await TurnoModel.findById(id).populate(TurnoMapper.populate);
		return turno != null ? TurnoMapper.toEntity(turno) : null
    }
	

}

