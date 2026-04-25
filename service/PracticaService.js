import Practica from "../domain/Practica.js";
import PracticaRepository from "../repository/PracticaRepository.js";

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
		this.validarId(id);
		return this.practicaRepository.FindPracticaById(id);
	}

	/** @param {String} id */
	validarId(id){
		if (typeof id !== "string" || Number(id) == NaN) {
            throw new Error("El id de la practica no es valido");
        }
	}

	/** @returns {Practica} */
	Create(reqBody) {
		// TODO validar
		const practica = new Practica(
			reqBody.codigo, 
			reqBody.nombre, 
			reqBody.duracionTurnoEnMins,
			reqBody.costo
		)
		this.practicaRepository.Save(practica);
		return practica;
	}
}