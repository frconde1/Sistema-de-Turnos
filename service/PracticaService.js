import Practica 			from "../domain/Practica.js";
import { InputError } 		from "../errors/Errors.js";
import PracticaRepository 	from "../repository/PracticaRepository.js";

export default class PracticaService {
	constructor(
		practicaRepository = new PracticaRepository()
	) {
		this.practicaRepository = practicaRepository;
	}

	/**
	 * @param {String} id
	 * @returns {Practica} 
	 */
	FindById(id) {
		return this.practicaRepository.FindPracticaById(id);
	}

	/** @param {String} id */
	validarId(id){
		if (typeof id !== "string" || Number.isNaN(Number(id))) {
            throw new InputError("El id de la practica no es valido");
        }
	}

	ValidarDatos(datosPracticaNueva) {
		if(!datosPracticaNueva || typeof datosPracticaNueva !== "object" || Array.isArray(datosPracticaNueva))
            throw new InputError("No se envio un objeto como body de la request");
		
		const {codigo, nombre, duracion, costo} = datosPracticaNueva;

		if(typeof codigo !== "string")
			throw new InputError("El codigo enviado es invalido");
		if(typeof nombre !== "string")
			throw new InputError("El nombre enviado es invalido");
		if(typeof duracion !== "number" || !Number.isInteger(duracion) || (duracion < 0))
			throw new InputError("La duracion enviada es invalida");
		if(typeof costo !== "number" || (costo < 0))
			throw new InputError("El costo enviado es invalido");
	}

	/** @returns {Practica} */
	CreatePractica(reqBody){
		const {codigo, nombre, duracion, costo} = reqBody;
		return new Practica(codigo, nombre, duracion, costo);
	}

	/** @returns {Practica} */
	Create(reqBody) {
		this.ValidarDatos(reqBody);

		const practica = this.CreatePractica(reqBody);
		
		this.practicaRepository.Save(practica);
		return practica;
	}
}
