import { EstadoTurno } 		from "../domain/Enums.js";
import { MedicoService }	from "./MedicoService.js";
import { SedeService } 		from "./SedeService.js";
import PracticaService 		from "./PracticaService.js";
import TurnoRepository		from "../repository/TurnoRepository.js";
import Turno				from "../domain/Turno.js";
import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js";
import Medico 				from "../domain/Medico.js";
import Paciente 			from "../domain/Paciente.js";
import { InputError, BadRequestError } 		from "../errors/Errors.js";
import CambioEstadoTurnoDTO from "../domain/DTOs/CambioEstadoTurnoDTO.js";
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";
import Usuario from "../domain/Usuario.js";
import z from "zod/v3";

//coerse convierte "123" a 123
//refine agrega una validacion personalizada
//lo del !Number.isNaN(Date.parse(v)) es porque, por ejemplo Date.parse("2026-05-04T12:40:00") devuelve un numero
//caso contrario devuelve NaN, por eso me fijo que sea !NaN
const turnoSchema = z.object({
    medico: z.coerce.number().int().nonnegative({ message: "Error al enviar el ID de medico" }),
    paciente: z.coerce.number().int().nonnegative({ message: "Error al enviar el ID de paciente" }),
    sede: z.coerce.number().int().nonnegative({ message: "Error al enviar el ID de sede" }),
    practica: z.coerce.number().int().nonnegative({ message: "Error al enviar el ID de practica" }),
    fechaHora: z.string()
        .refine((v) => !Number.isNaN(Date.parse(v)), { message: "la fecha es invalida" })
        .refine((v) => new Date(v + "-03:00") >= new Date(), { message: "la fecha no puede ser anterior a hoy" }),
    estado: z.nativeEnum(EstadoTurno, { errorMap: () => ({ message: "el estado es invalido" }) }),
    costo: z.number().nonnegative({ message: "el costo es invalido" })
});

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
		// El día previo al turno, se envía un 
		// recordatorio tanto al paciente como al médico
	}

	//////////////////////
	//		UTILS		//
	//////////////////////


	/** 
	 * @param {String} id 
	 * @param {String} name
	*/
	ValidarId(id, name){
		id = Number(id);
		if(Number.isNaN(id) || !Number.isInteger(id) || id < 0)
			throw new InputError(`Error al enviar el ID de ${name}`);
	}
	
	
	ValidarDatosTurno(datosTurnoNuevo){
		if(!datosTurnoNuevo || typeof datosTurnoNuevo !== "object" || Array.isArray(datosTurnoNuevo))
            throw new InputError("No se envio un objeto como body de la request");
        
		const result = turnoSchema.safeParse(datosTurnoNuevo);
		if (!result.success) {
			throw new InputError(result.error.issues.map(i => i.message).join(", "));
		}
	}

	CreateTurno(reqBody){
		let sede  	  = this.sedeService.findById(reqBody.sede);
		console.log(sede);

		if (!sede) throw new InputError("La sede ingresada no existe");
		
		let medico    = this.medicoService	.FindById(reqBody.medico	);
		let paciente  = this.pacienteService.FindById(reqBody.paciente	);
		let practica  = this.practicaService.FindById(reqBody.practica	);
		let fechaHora = new Date(reqBody.fechaHora + "-03:00");
		let estado	  = reqBody.estado;
		let costo	  = reqBody.costo;

		return new Turno(medico, paciente, fechaHora, sede, practica, estado, [], costo);
	}

	FindById(id){
		return this.turnoRepository.FindTurnoById(id);
	}

	FindTurnosByMedico(id){
		return this.turnoRepository.FindAll().filter(t => t.medico.id == id);
	}

	/**
	 * @param {Turno} turno 
	 * @param {Medico} medico 
	 */
	ValidarDisponibilidad(turno, medico){
		if (!medico.validarDisponibilidad(turno.fechaHora, turno.practica.duracionTurnoEnMins))
			throw new InputError("El médico no se encuentra disponible en ese horario");
	}

	
	/** @param {{ estado: Number, usuario: string, motivo: string}} reqBody */
	ValidarDatosEstado(reqBody) {
		const {estado, usuario, motivo} = reqBody;

		this.ValidarId(usuario, "usuario");
        if(typeof estado !== "number" || !Number.isInteger(estado) || !(-1 < estado && estado < 5))
			throw new InputError("el estado es invalido");
        if(typeof motivo !== "string" || motivo === "")
			throw new InputError("el motivo es invalido");
	}

	ValidarQuery(numeroPagina, limitePorPagina, {medico, paciente, sede, practica, estado}){
		if(numeroPagina < 1 || !Number.isInteger(numeroPagina))
			throw new BadRequestError(`El numero de pagina debe ser un entero positivo`);
		if(limitePorPagina < 1 || !Number.isInteger(limitePorPagina))
			throw new BadRequestError(`El limite de pagina debe ser un entero positivo`);

		if(medico	) this.ValidarId(medico,   "medico"	 )
		if(paciente ) this.ValidarId(paciente, "paciente")
		if(sede		) this.ValidarId(sede, 	   "sede"	 )
		if(practica ) this.ValidarId(practica, "practica")
						
		if(estado){
			const numero = Number(estado)
			if (Number.isNaN(numero) || !Number.isInteger(numero) || !(-1 < numero && numero < 5))
				throw new BadRequestError(`El parámetro estado debe ser un numero entero en el rango [0,4]`);
		}
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
		this.modificarTurno(turnoViejo, reqBody);
		this.turnoRepository.Save(turnoViejo);
		return new TurnoDTO(turnoViejo);
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
		const estado	= reqBody.estado;
		const costo 	= reqBody.costo;
		
		// TODO agregar lógica de costo en el turno
		const turno = new Turno(medico, paciente, fechaHora, sede, practica, EstadoTurno.RESERVADO, new Array(), costo);

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
		if(medico != undefined && medico == turno.medico.id) turno.medico    = this.medicoService	 .FindById(medico)
			else throw new InputError("El medico debe ser el mismo");
		if(sede 	 != undefined) turno.sede 	   = this.sedeService	 .FindById(sede)
		if(paciente  != undefined) turno.paciente  = this.pacienteService.FindById(paciente);
		if(practica  != undefined) turno.practica  = this.practicaService.FindById(practica)
		if(fechaHora != undefined) turno.fechaHora = new Date(fechaHora);
		this.validarTurno(turno);
	}

	getTurnoById(id){
		const turno = this.turnoRepository.FindTurnoById(id);
		if(turno == undefined)
				throw new InputError("El turno buscado no existe")
		return turno;
	}
}
