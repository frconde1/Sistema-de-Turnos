import Practica from "../domain/Practica.js";

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
		console.log(this.practicas)
		console.log("\n");
		let practica = this.practicas.find(p => {
			if(p)
				return p.id == practicaId
			return false
		});
		
		if (!practica) 
			throw new Error("La practica no existe")

		return practica 
	}
	

}

