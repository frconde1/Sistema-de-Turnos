import TurnoDTO 			from "../domain/DTOs/TurnoDTO.js";
import Paciente from "../domain/Paciente.js";
import Sede 				from "../domain/Sede.js";
import Turno				from "../domain/Turno.js";
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
	}

	/**
	 * @param {Turno} turno
	 * @returns {TurnoDTO}
	 */
	ToTurnoDTO(turno) {
		return new TurnoDTO(turno);
	}

	/** @returns {TurnoDTO[]} */
	FindAll() {
		return this.turnoRepository.FindAll().map(this.ToTurnoDTO);
	}

	/** @returns {TurnoDTO} */
	Create(reqBody){
		this.ValidarDatos(reqBody);
		
		const turno = new Turno(
			this.medicoService	.FindById(reqBody.medico),
			this.pacienteService.FindById(reqBody.paciente),
			new Date(reqBody.fechaHora),
			this.sedeService	.FindById(reqBody.sede),	 // Mockeado
			this.practicaService.FindById(reqBody.practica),
			reqBody.estado,	// TODO deberia enviarse o es default?
			[],
			reqBody.costo
		)

		this.turnoRepository.Save(turno);
		return new TurnoDTO(turno);
	}

	FindById(id){
		let turno = this.turnoRepository.FindTurnoById(id);
		return new TurnoDTO(turno);
	}

	Delete(id){
		this.turnoRepository.Delete(id);
	}


	Update(id, reqBody){
		this.ValidarDatos(reqBody);
		const turno = new Turno(
			this.medicoService	.FindById(reqBody.medico),
			this.pacienteService.FindById(reqBody.paciente),
			new Date(reqBody.fechaHora),
			this.sedeService	.FindById(reqBody.sede),	 // Mockeado
			this.practicaService.FindById(reqBody.practica),
			reqBody.estado,	// TODO deberia enviarse o es default?
			[],
			reqBody.costo
		)
		turno.id = id;
		this.turnoRepository.Save(turno);
		return new TurnoDTO(turno);
	}

	ValidarDatos(datosTurnoNuevo){
		if(
			!datosTurnoNuevo || 
			typeof datosTurnoNuevo !== "object" || 
			Array.isArray(datosTurnoNuevo)
		) {
            throw new Error("los datos enviados son incorrectos");
        }

		const { fechaHora, estado, costo } = datosTurnoNuevo;

		if(typeof fechaHora !== "string" || Date.parse(fechaHora) === NaN){
			throw new Error("la fecha es invalida");
		}

        if(typeof estado !== "number" || !Number.isInteger(estado) || (estado < 0 || estado > 4) ) {
			throw new Error("el estado es invalido");
		}

        if(typeof costo !== "number" || costo < 0){
			throw new Error("el costo es invalido");
		}
	}
}