import z from "zod";
import { fechaSchema, idSchema, numberSchema, paginacionSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import { EstadoTurno } 	from "../domain/Enums.js"


import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js"
import CambioEstadoTurnoDTO from "../domain/DTOs/CambioEstadoTurnoDTO.js"

import TurnoRepository 	from "../repository/TurnoRepository.js"

import MedicoService	from "./MedicoService.js"
import PacienteService	from "./PacienteService.js"
import SedeService		from "./SedeService.js"
import PracticaService	from "./PracticaService.js"
import Turno from "../domain/Turno.js";
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";
import Medico from "../domain/Medico.js";


const crearTurnoSchema =
	z.object({
		medico: 	idSchema("medico"),
		sede: 		idSchema("sede"),
		paciente:	idSchema("paciente"),
		practica: 	idSchema("práctica"),
		fechaHora: 	fechaSchema()
	});

const actualizarTurnoSchema =
	z.object({
		medico:    idSchema("medico"),
		paciente:  idSchema("paciente"),
		sede: 	   idSchema("medico"),
		practica:  idSchema("práctica"),
		costo:	   numberSchema("costo"),
		fechaHora: fechaSchema()
	});


// todo, revisar cuando cambia el estado
const actualizarEstadoTurnoSchema =
	z.object({
		estado:  z.enum(EstadoTurno, "el dato estado debe ser un estado de turno válido"),
		usuario: idSchema("usuario"),
		motivo:  stringSchema("motivo")
	});


const filtrosTurnoSchema =
	z.object({
		medico:		 idSchema("medico")	 .optional(),
		paciente:	 idSchema("paciente").optional(),
		sede:		 idSchema("sede")	 .optional(),
		practica:	 idSchema("practica").optional(),
		estado:		 z.enum(EstadoTurno, "el dato estado debe ser un estado de turno válido").optional(),
		ordenCosto:	 z.boolean("ordenCosto debe ser un booleano (asc. o desc.)").optional(),
		ordenFecha:	 z.boolean("ordenFecha debe ser un booleano (asc. o desc.)").optional(),
		fechaInicio: fechaSchema().optional(),
		fechaFin:	 fechaSchema().optional()
	})



export default class TurnoService {
	constructor(
		turnoRepository = new TurnoRepository(), 

		medicoService 	= new MedicoService(),
		pacienteService = new PacienteService(),
		sedeService		= new SedeService(),
		practicaService	= new PracticaService()
	) {
		this.repository 	 = turnoRepository;
		this.medicoService 	 = medicoService;
		this.practicaService = practicaService;
		this.sedeService 	 = sedeService;
		this.pacienteService = pacienteService;
		
		// Servicio Mockeado
		this.usuarioService = {FindById(id){return new Usuario(id)}}
	}

	async FindAll(filtros) {
		ValidarZodSchema(filtrosTurnoSchema, filtros);
		ValidarZodSchema(paginacionSchema,   filtros);

		return (await this.repository.FindAll(filtros)).map(t => new TurnoDTO(t));
	}

	async FindById(id){
		const turno = await this.repository.FindById(id);
		if(turno == null)
			throw new ResurceNotFoundError("EL turno buscado no existe");
		return turno;
	}

	async Create(req){
		const medico 	= await this.medicoService	.FindById(req.medico)
		const paciente 	= await this.pacienteService.FindById(req.paciente)
		const sede 		= await this.sedeService	.FindById(req.sede)
		const practica 	= await this.practicaService.FindById(req.practica)

		const turno = new Turno(
			medico, 
			paciente, 
			req.fechaHora, 
			sede, 
			practica, 
			EstadoTurno.CONFIRMADO, 
			[], 
			practica.PrecioFinal(paciente)
		);
		
		this.ValidarTurno(turno);

		turno.CambiarEstado(EstadoTurno.CONFIRMADO, paciente.usuario, "creacion del turno");
		await this.repository.Save(turno);
		return new TurnoDTO(turno);
	}

	async Delete(id){
		await this.repository.Delete(id);
	}

	async Update(id, req){
		ValidarZodSchema(actualizarTurnoSchema, req);
		
		const {medico, paciente, sede, practica, costo, fechaHora} = req;
		
		const turno = await this.FindById(id)

		turno.medico 	= this.medicoService(medico);
		turno.paciente 	= this.pacienteService(paciente);
		turno.sede 		= this.sedeService(sede);
		turno.practica 	= this.practicaService(practica);
		turno.costo		= costo;
		turno.fechaHora	= fechaHora;

		await this.repository.Save(turno);
		return new TurnoDTO(turno);
	}

	async UpdateStatus(id, req){

	}

	/** @param {Turno} turno */
	async ValidarTurno(turno){
		const {medico, practica, fechaHora} = turno;


		const medicoDisponible = medico.validarDisponibilidad(fechaHora, practica.duracionEnMins)
		
		const superpuesto = (t1, t2) => t1.fechaHora < t2.FechaFinalizacion() && t2.fechaHora < t1.FechaFinalizacion();

		if(!medicoDisponible)
			throw new InputError("El medico no se no se encuentra disponible en esa fecha y hora");
		
		const turnosMedico = await this.repository.FindReservadoByMedico(medico.id);
		const turnoSuperpuesto = turnosMedico.some(t => superpuesto(t, turno))

		if(turnoSuperpuesto)
			throw new InputError("El medico ya tiene un turno a esa hora");
	}

}
