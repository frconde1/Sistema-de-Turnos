import { EstadoTurno } 		from "../domain/Enums.js";
import { InputError } 		from "../errors/Errors.js";
import { MedicoService }	from "./MedicoService.js";
import { SedeService } 		from "./SedeService.js";
import PracticaService 		from "./PracticaService.js";
import TurnoRepository		from "../repository/TurnoRepository.js";
import Turno				from "../domain/Turno.js";
import CambioEstadoTurno 	from "../domain/CambioEstadoTurno.js";
import Medico 				from "../domain/Medico.js";
import Paciente 			from "../domain/Paciente.js";
import Sede 				from "../domain/Sede.js";
import Usuario 				from "../domain/Usuario.js";
import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js";
import CambioEstadoTurnoDTO from "../domain/DTOs/CambioEstadoTurnoDTO.js";
import { da } from "zod/locales";



export default class TurnoService {
	constructor(
		turnoRepository = new TurnoRepository(), 
		medicoService 	= new MedicoService(),
		practicaService	= new PracticaService(),
		sedeService		= new SedeService()
	) {
		this.turnoRepository = turnoRepository;
		this.medicoService 	 = medicoService;
		this.practicaService = practicaService;
		this.sedeService 	 = sedeService;
		
		
		// Servicio Mockeado
		this.pacienteService = {
			FindById(id){
				return new Paciente(id)
			}
		}

		// Servicio Mockeado
		this.usuarioService = {
			FindById(id){
				return new Usuario(id)
			}
		}

		// TODO: recoradorios por dia?
		// El día previo al turno, se envía un recordatorio tanto al paciente como al médico
	}

	//////////////////////
	//		 REST		//
	//////////////////////

	/** @returns {TurnoDTO} */
	Create(reqBody){
		const nuevoTurno = this.CreateTurno(reqBody);
		this.validarTurno(nuevoTurno);
		// TODO: notificar al medico 
		// Al reservar un turno, se notifica al médico 
		// indicando paciente y servicio solicitado 
		// (especialidad o práctica)

		this.turnoRepository.Save(nuevoTurno);
		return new TurnoDTO(nuevoTurno);
	}

	FindById(id){
		return new TurnoDTO(this.getTurnoById(id));
	}

	Delete(id){
		if(this.getTurnoById(id) === undefined)
			throw new InputError("El turno no existe")
		this.turnoRepository.Delete(id);
	}

	Update(id, reqBody){
		const turnoViejo = this.getTurnoById(id);
		this.turnoRepository.Delete(turnoViejo)
		this.modificarTurno(turnoViejo, reqBody)
		this.turnoRepository.Save(turnoNuevo);
		return new TurnoDTO(turnoNuevo);
	}

	FindPaginado({numeroPagina = 1, limitePorPagina = 10, filtros = {}} = {}) {
		this.ValidarQuery(numeroPagina, limitePorPagina, filtros);

		let {turnos, totalTurnos} = this.turnoRepository.FindPaginado(numeroPagina, limitePorPagina, filtros)
		
		const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / limitePorPagina)
		
		turnos = turnos.map(t => new TurnoDTO(t));
		return {
		    /**@type {TurnoDTO[]} */
			turnos ,
		    numeroPagina,
		    limitePorPagina,
		    totalTurnos,
		    totalPaginas
		}
	}	

	/**
	 * @param {String} id 
	 * @param {{ estado: Number, usuario: String, motivo: String}} reqBody 
	 * @returns {CambioEstadoTurnoDTO}
	 */
	UpdateTurnoStatus(id, reqBody){
		const turno = this.getTurnoById(id);
		
		const ahora = new Date()
		const nuevoEstado = new CambioEstadoTurno(
			ahora,
			reqBody.estado,
			turno,
			this.usuarioService.FindById(reqBody.usuario),
			reqBody.motivo
		);

		const menosDe1Hora = ({fechaHora}) => 
			(fechaHora - new Date()) < (1000/*mili*/ * 60/*seg*/ * 60/*min*/)

		if(reqBody.estado == EstadoTurno.CANCELADO && menosDe1Hora(turno))
			throw new InputError("Se quiere cancelar un turno con menos de 1 hora de anticipación")
		
		turno.CambiarEstado(nuevoEstado);

		// TODO: notificar al paciente
		// Al aceptar un turno, se notifica al paciente
		
		// TODO: notificar en caso de cancelacion
		// Ante cancelaciones de turnos, se notifica a la contraparte correspondiente.
		
		this.turnoRepository.Save(turno);
		return new CambioEstadoTurnoDTO(nuevoEstado)
	}

	//////////////////////
	//		UTILS		//
	//////////////////////

	CreateTurno(reqBody){
		const sede  	= this.sedeService	  .FindById(reqBody.sede	);
		const medico    = this.medicoService  .FindById(reqBody.medico	);
		const paciente  = this.pacienteService.FindById(reqBody.paciente);
		const practica  = this.practicaService.FindById(reqBody.practica);
		const fechaHora = new Date(reqBody.fechaHora);
		
		// TODO agregar lógica de costo en el turno
		const turno = new Turno(medico, paciente, fechaHora, sede, practica, EstadoTurno.RESERVADO, new Array(), Number.NaN);

		turno.CambiarEstado(
			new CambioEstadoTurno(
				new Date(),
				EstadoTurno.RESERVADO,
				turno,
				paciente.usuario,
				"creación de turno"
			)
		);
		return turno;
	}

	/**
	 * @param {Medico} medico 
	 * @param {Turno} turno 
	 * @returns {boolean}
	 */
	validarTurno(turno){
		if(turno.fechaHora <= new Date())
			throw new InputError("La fecha y hora especificada ya pasó");
		if(!turno.medico.sedes.some( s => s.id == turno.sede.id))
			throw new InputError("El medico no trabaja en esa sede");
		// TODO APLICAR VALIDACIONES DE LAS PRACTICAS DEL MEDICO 
		//if(!turno.medico.practicas.some( p => p.id == practica.id))
		//	throw new InputError("El medico no se especializa en esa práctica");

		const medicoDisponible = turno.medico.validarDisponibilidad(
			turno.fechaHora, turno.practica.duracionTurnoEnMins
		)

		if(!medicoDisponible)
			throw new InputError("El medico no se no se encuentra disponible en esa fecha y hora");

		const superposicion = (t1, t2) => 
			t1.fechaHora < t2.FechaFinalizacion() && 
			t2.fechaHora < t1.FechaFinalizacion();

		const turnoSuperpuesto = this.turnoRepository.FindAll()
		.filter(t => t.medico.id == turno.medico.id)
		.filter(t => t.estado !== EstadoTurno.CANCELADO) 
		.some(t => superposicion(t, turno))

		if(turnoSuperpuesto)
			throw new InputError("El medico ya tiene un turno a esa hora");
	}

	/**
	 * @param {Turno} turno 
	 */
	modificarTurno(turno, {medico, sede, paciente, practica, fechaHora}){
		if(medico 	 != undefined) turno.medico    = this.medicoService	 .FindById(medico);
		if(sede 	 != undefined) turno.sede 	   = this.sedeService	 .FindById(sede)
		if(paciente  != undefined) turno.paciente  = this.pacienteService.FindById(paciente);
		if(practica  != undefined) turno.practica  = this.practicaService.FindById(practica)
		if(fechaHora != undefined) turno.fechaHora = fechaHora;
		this.validarTurno(turno);
	}

	getTurnoById(id){
		const turno = this.turnoRepository.FindTurnoById(id);
		if(turno == undefined)
				throw new InputError("El turno buscado no existe")
		return turno;
	}
}
