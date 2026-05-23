import Turno 			from "../domain/Turno.js";
import { TurnoModel } from "../schemas/TurnoSchema.js";
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
		const {medico, paciente, sede, practica, estado, ordenCosto, ordenFecha, fechaInicio, fechaFin} = filtros;
		
		let turnos = this.FindAll();

		if(medico)	 turnos = turnos.filter((t => t.medico.id 	== medico	));
		if(paciente) turnos = turnos.filter((t => t.paciente.id == paciente	));
		if(sede)	 turnos = turnos.filter((t => t.sede.id 	== sede		));
		if(practica) turnos = turnos.filter((t => t.practica.id == practica ));
		if(estado)	 turnos = turnos.filter((t => t.estado 		== estado	));
    if (ordenCosto == 0) {
    turnos.sort((a, b) => a.costo - b.costo);
    } else if (ordenCosto == 1) {
    turnos.sort((a, b) => b.costo - a.costo);
    }
    
    if (ordenFecha == 0) {
    turnos.sort((a, b) => new Date(a.fechaHora)- new Date(b.fechaHora));
    } else if (ordenFecha == 1) {
    turnos.sort((a, b) => new Date(b.fechaHora)- new Date(a.fechaHora));
    }

    
    const estaEnRango = (inicio, fin, fecha) => fecha >= inicio && fecha <= fin;

    if (fechaInicio && fechaFin) {
      const hasta = new Date(filtros.fechaFin);
      const desde = new Date(filtros.fechaInicio);
      turnos = turnos.filter(t => estaEnRango(desde, hasta, new Date(t.fechaHora)));
    }
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
	async Save(turno) {
		await TurnoModel.create(turno);
		return turno;
	}

	/** 
	 * @param {String} id 
	 * @returns {Turno}
	*/
	Delete(id) {
    let productoEliminado = this.turnos[id];
		if(!this.turnos[id])
			throw new InputError("El turno no existe")

    delete this.turnos[id];
    return productoEliminado;
	}

	/**
	 * @param {String} turnoId 
	 * @returns {Turno | undefined}
	 */
	FindTurnoById(turnoId) {
		return this.turnos.find(t => t ? t.id == turnoId : false);
	}
	

}

