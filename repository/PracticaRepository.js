import Practica 		from "../domain/Practica.js";
import { InputError } 	from "../errors/Errors.js";
import { PracticaModel } from "../schemas/PracticaSchema.js";

export default class PracticaRepository {
	
	/**@type {Practica[]} */
	practicas;
	/**@type {Number} */
	nextID;

	constructor() {
		// se hace singleton por el momento
		if(PracticaRepository.instance)
			return PracticaRepository.instance;

		this.practicas = []
		this.nextId = 0;

		PracticaRepository.instance = this;
	}

	/** @returns {Practica[]}*/
	async FindAll() {
		return this.practicas;
	}

	/** 
	 * @param {Practica} practica 
	 * @returns {Practica}
	*/
	async Save(practica) {
		await PracticaModel.create({
			codigo: practica.codigo,
			nombre: practica.nombre,
			duracionEnMins: practica.duracionTurnoEnMins,
			costoConsulta: practica.costo
		});
		return practica;
	}

	/**
	 * @param {String} practicaId 
	 * @returns {Practica}
	 */
	async FindPracticaById(practicaId) {
		let practica = await PracticaModel.findById(practicaId);
		
		if (!practica) 
			throw new InputError("La practica buscada no existe")

		return practica 
	}
	

}

