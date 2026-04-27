import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js";
import { EstadoTurno } 		from "../domain/Enums.js";
import Medico 				from "../domain/Medico.js";
import Paciente 			from "../domain/Paciente.js";
import Sede 				from "../domain/Sede.js";
import Turno				from "../domain/Turno.js";
import { InputError } 		from "../errors/Errors.js";
import TurnoRepository		from "../repository/TurnoRepository.js";
import PracticaService 		from "./PracticaService.js";
import { MedicoService }	from "./MedicoService.js";
import { SedeService } 		from "./SedeService.js";
import CambioEstadoTurnoDTO from "../domain/DTOs/CambioEstadoTurnoDTO.js";
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";
import Usuario from "../domain/Usuario.js";

export default class TurnoService {
	/**
	 *	@param {TurnoRepository} turnoRepository 
	 * 	@param {MedicoService} medicoService
	*/
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
		if(typeof id !== "string" || id.length === 0 || Number(id) === NaN)
			throw new InputError(`Error al enviar el ID de ${name}`);
	}
	
	
	ValidarDatosTurno(datosTurnoNuevo){
		if(!datosTurnoNuevo || typeof datosTurnoNuevo !== "object" || Array.isArray(datosTurnoNuevo))
            throw new InputError("No se envio un objeto como body de la request");
        
		const { medico, sede, practica, fechaHora, estado, costo } = datosTurnoNuevo;

		this.ValidarId(medico,	 "medico");
		this.ValidarId(medico,	 "paciente");
		this.ValidarId(sede, 	 "sede");
		this.ValidarId(practica, "practica");

		if(typeof fechaHora !== "string" || Date.parse(fechaHora) === NaN)
			throw new InputError("la fecha es invalida");
        if(typeof estado !== "number" || !Number.isInteger(estado) || !(-1 < estado && estado < 5) ) 
			throw new InputError("el estado es invalido");
        if(typeof costo !== "number" || costo < 0)
			throw new InputError("el costo es invalido");
	}

	CreateTurno(reqBody){
		let sede  	  = this.sedeService.findAll().filter(s => s.id == reqBody.sede)[0];

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

	//////////////////////
	//		 REST		//
	//////////////////////

	/** @returns {TurnoDTO} */
	Create(reqBody){
		
		this.ValidarDatosTurno(reqBody);

		const nuevoTurno = this.CreateTurno(reqBody);
		
		// validar la disponibilidad del medico

		const medico = this.medicoService.FindById(reqBody.medico);
		this.ValidarDisponibilidad(nuevoTurno, medico);


		// validamos que no hay turnos superpuestos
		const turnosSuperpuestos = this.FindTurnosByMedico(medico.id)
		.filter(t => t.estado 	 != EstadoTurno.CANCELADO && t.estado != EstadoTurno.REALIZADO)
		.some(t => t.fechaHora 	 < nuevoTurno.FechaFinalizacion() && nuevoTurno.fechaHora < t.FechaFinalizacion());

		if(turnosSuperpuestos)
			throw new InputError("se esta solicitando un horario con un turno ya asignado");

		const nuevoEstado = new CambioEstadoTurno(
			new Date(),
			reqBody.estado,
			nuevoTurno,
			this.pacienteService.FindById(reqBody.paciente).usuario,
			"creacion de turno"
		);

		// TODO: notificar al medico 
		// Al reservar un turno, se notifica al médico 
		// indicando paciente y servicio solicitado 
		// (especialidad o práctica)

		nuevoTurno.CambiarEstado(nuevoEstado);
		this.turnoRepository.Save(nuevoTurno);
		return new TurnoDTO(nuevoTurno);
	}

	Find(id){
		this.ValidarId(id, "turno");
		return new TurnoDTO(this.FindById(id));
	}

	Delete(id){
		this.turnoRepository.Delete(id);
	}

	Update(id, reqBody){
		this.ValidarDatosTurno(reqBody);
		
		this.ValidarId(id, "turno");
		const turnoViejo = this.FindById(id);
		
		const turnoNuevo = this.CreateTurno(reqBody);
		
		
		turnoViejo.CambiarReferenciasDeEstados(turnoNuevo);
		turnoNuevo.historialEstados = turnoViejo.historialEstados
		turnoNuevo.id = id;

		this.turnoRepository.Save(turnoNuevo);
		return new TurnoDTO(turnoNuevo);
	}

	FindAll(){
		return this.turnoRepository.FindAll().map(t => new TurnoDTO(t));
	}

	FindPaginado({numeroPagina = 1, limitePorPagina = 10, filtros = {}} = {}) {

		let {turnos, totalTurnos} = this.turnoRepository.FindPaginado(numeroPagina, limitePorPagina, filtros)
		
		const totalPaginas = totalTurnos === 0 ? 0 : Math.ceil(totalTurnos / limitePorPagina)
		
		turnos = turnos.map(t => new TurnoDTO(t));
		return {
		    turnos,
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
		// Al dar de baja un turno, debería poder 
		// hacerse solo hasta una hora antes del horario del mismo.
		this.ValidarId(id, "turno");
		const turno = this.FindById(id);
		
		this.ValidarDatosEstado(reqBody);
		const nuevoEstado = new CambioEstadoTurno(
			new Date(),
			reqBody.estado,
			turno,
			this.usuarioService.FindById(reqBody.usuario),
			reqBody.motivo
		);

		if(nuevoEstado.estado == EstadoTurno.CANCELADO)
			if((turno.fechaHora - nuevoEstado.fechaHoraIngreso) / (1000 * 60 * 60) <= 1)
				throw new InputError("se quiere cancelar con menos de 1 hora de anticipacion");
		
		// TODO: notificar al paciente
		// Al aceptar un turno, se notifica al paciente
		
		// TODO: notificar en caso de cancelacion
		// Ante cancelaciones de turnos, se notifica a la contraparte correspondiente.


		turno.CambiarEstado(nuevoEstado);
		this.turnoRepository.Save(turno);
		return new CambioEstadoTurnoDTO(nuevoEstado)
	}
}