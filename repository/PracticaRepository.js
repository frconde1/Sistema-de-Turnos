import Practica 		from "../domain/Practica.js";
import { InputError } 	from "../errors/Errors.js";

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
	FindAll() {
		return this.practicas;
	}

	/** 
	 * @param {Practica} practica 
	 * @returns {Practica}
	*/
	Save(practica) {
		practica.id = practica.id ?? (this.nextId++).toString();
        this.practicas[practica.id] = practica;
		return practica;
	}

	/**
	 * @param {String} practicaId 
	 * @returns {Practica}
	 */
	FindPracticaById(practicaId) {
		let practica = this.practicas.find(p => p ? p.id == practicaId : false);
		
		if (!practica) 
			throw new InputError("La practica buscada no existe")

		return practica 
	}
	

}

