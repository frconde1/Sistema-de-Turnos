import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js";
import Paciente 			from "../domain/Paciente.js";
import Sede 				from "../domain/Sede.js";
import Turno				from "../domain/Turno.js";
import { InputError } 		from "../errors/Errors.js";
import TurnoRepository		from "../repository/TurnoRepository.js";
import { MedicoService }	from "./MedicoService.js";
import PracticaService 		from "./PracticaService.js";

export default class TurnoService {
	/**
	 *	@param {TurnoRepository} turnoRepository 
	 * 	@param {MedicoService} medicoService
	*/
	constructor(
		turnoRepository = new TurnoRepository(), 
		medicoService 	 = new MedicoService(),
		practicaService	 = new PracticaService()
	) {
		this.turnoRepository 	= turnoRepository;
		this.medicoService 		= medicoService
		this.practicaService 	= practicaService
		
		// Servicio Mockeado
		this.sedeService 		= {
			FindById(id){
				return new Sede(id, "test1", "test2")
			}
		}
		
		// Servicio Mockeado
		this.pacienteService 		= {
			FindById(id){
				return new Paciente(id)
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
	validarId(id, name){
		if(typeof id !== "string" || id.length === 0 || Number(id) === NaN)
			throw new InputError(`Error al enviar el ID de ${name}`);
	}
	
	
	ValidarDatos(datosTurnoNuevo){
		if(!datosTurnoNuevo || typeof datosTurnoNuevo !== "object" || Array.isArray(datosTurnoNuevo))
            throw new InputError("No se envio un objeto como body de la request");
        
		const { medico, sede, practica, fechaHora, estado, costo } = datosTurnoNuevo;

		this.validarId(medico,	 "medico");
		this.validarId(sede, 	 "sede");
		this.validarId(practica, "practica");

		if(typeof fechaHora !== "string" || Date.parse(fechaHora) === NaN)
			throw new Error("la fecha es invalida");
        if(typeof estado !== "number" || !Number.isInteger(estado) || !(-1 < estado && estado < 5) ) 
			throw new Error("el estado es invalido");
        if(typeof costo !== "number" || costo < 0)
			throw new Error("el costo es invalido");
	}

	CreateTurno(reqBody){
		let medico    = this.medicoService	.FindById(reqBody.medico	);
		let paciente  = this.pacienteService.FindById(reqBody.paciente	);
		let practica  = this.practicaService.FindById(reqBody.practica	);
		let sede	  = this.sedeService	.FindById(reqBody.sede		);
		let fechaHora = new Date(reqBody.fechaHora);
		let estado	  = reqBody.estado;
		let costo	  = reqBody.costo;

		return new Turno(medico, paciente, fechaHora, sede, practica, estado, [], costo);
	}

	FindById(id){
		return this.turnoRepository.FindTurnoById(id);
	}

	//////////////////////
	//		 REST		//
	//////////////////////

	/** @returns {TurnoDTO} */
	Create(reqBody){
		this.ValidarDatos(reqBody);

		const turno = this.CreateTurno(reqBody);
		
		// TODO: validar la disponibilidad del medico

		// TODO: notificar al medico 
		// Al reservar un turno, se notifica al médico 
		// indicando paciente y servicio solicitado 
		// (especialidad o práctica)

		// TODO: notificar al paciente
		// Al aceptar un turno, se notifica al paciente

		this.turnoRepository.Save(turno);
		return new TurnoDTO(turno);
	}

	Find(id){
		this.validarId(id, "turno");
		return new TurnoDTO(this.FindById(id));
	}

	Delete(id){
		this.turnoRepository.Delete(id);
	}

	Update(id, reqBody){
		this.ValidarDatos(reqBody);
		
		this.validarId(id, "turno");
		const turnoViejo = this.FindById(id);
		
		const turnoNuevo = this.CreateTurno(reqBody);
		
		
		turnoViejo.CambiarReferenciasDeEstados(turnoNuevo);
		turnoNuevo.historialEstados = turnoViejo.historialEstados
		turnoNuevo.id = id;

		// TODO: notificar en caso de cancelacion
		// Ante cancelaciones de turnos, 
		// se notifica a la contraparte correspondiente.

		this.turnoRepository.Save(turnoNuevo);
		return new TurnoDTO(turnoNuevo);
	}

	/** @returns {TurnoDTO[]} */
	FindAll() {
		return this.turnoRepository.FindAll().map(t => new TurnoDTO(t));
	}

}