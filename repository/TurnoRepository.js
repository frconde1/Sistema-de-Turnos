import Turno 			from "../domain/Turno.js";
import { InputError }	from "../errors/Errors.js";

export default class TurnoRepository {
	
	/**@type {Turno[]} */
	turnos;
	/**@type {Number} */
	nextID;

	constructor() {
		if(TurnoRepository.instance)
			return TurnoRepository.instance;

		this.turnos = []
		this.nextId = 0;

		TurnoRepository.instance = this;
	}

	/** @returns {Turno[]}*/
	FindAll() {
		return this.turnos;
	}

	/** @returns {Turno[]}*/
	FindPaginado(numeroPagina, limitePorPagina, filtros) {
		const {medico, paciente, sede, practica, estado} = filtros;
		
		let turnos = this.FindAll();

		if(medico)	 turnos = turnos.filter((t => t.medico.id 	== medico	));
		if(paciente) turnos = turnos.filter((t => t.paciente.id == paciente	));
		if(sede)	 turnos = turnos.filter((t => t.sede.id 	== sede		));
		if(practica) turnos = turnos.filter((t => t.practica.id == practica ));
		if(estado)	 turnos = turnos.filter((t => t.estado 		== estado	));

        const inicio = (numeroPagina - 1) * limitePorPagina;
        const fin 	 = inicio + limitePorPagina;

        return {
            turnos: 	 turnos.slice(inicio, fin),
            totalTurnos: turnos.length
        }
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
			throw new InputError("El turno no existe")
	}

	/**
	 * @param {String} turnoId 
	 * @returns {Turno}
	 */
	FindTurnoById(turnoId) {
		let turno = this.turnos.find(t => t ? t.id == turnoId : false);
		
		if (!turno) 
			throw new InputError("El turno buscado no existe")

		return turno 
	}
	

}

