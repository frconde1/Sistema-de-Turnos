import Turno from "../domain/Turno.js";

export default class TurnoRepository {
	
	/**@type {Turno[]} */
	turnos;
	/**@type {Number} */
	nextID;

	constructor() {
		this.turnos = []
		this.nextId = 0;
	}

	/** @returns {Turno[]}*/
	FindAll() {
		return this.turnos;
	}

	/** 
	 * @param {Turno} turno 
	 * @returns {Turno}
	*/
	Save(turno) {
		turno.id = turno.id ?? (this.nextId++).toString();
        this.turnos[turno.id] = turno;
		return turno;
	}

	/** 
	 * @param {String} id 
	 * @returns {Turno}
	*/
	Delete(id) {
		if(this.turnos[id])
			this.turnos[id] = undefined;
		else
			throw new Error("El medico no existe")
	}

	/**
	 * @param {String} turnoId 
	 * @returns {Turno}
	 */
	FindTurnoById(turnoId) {
		let turno = this.turnos.find(t => {
			if(t)
				return t.id == turnoId;
			return false;
		}
		);
		
		if (!turno) 
			throw new Error("El turno no existe")

		return turno 
	}
	

}

