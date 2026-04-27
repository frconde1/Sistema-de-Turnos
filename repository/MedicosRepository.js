import { InputError } from "../errors/Errors.js";

export class MedicosRepository {
    medicos;

    constructor() {
        // se hace singleton por el momento
		if(MedicosRepository.instance)
			return MedicosRepository.instance;

		this.medicos = []
		this.nextId = 0;

		MedicosRepository.instance = this;
    }

    obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {

        let medicos = this.findAll();

        if (filtros.nombre !== undefined) {
            medicos = medicos
                .filter(m => m.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()))
        }

        if (filtros.especialidad !== undefined) {
            medicos = medicos
                .filter(m => m.especialidades.
                    some(e => e.nombre.toLowerCase().includes(filtros.especialidad.toLowerCase())))
        }

        if (filtros.practica !== undefined) {
            medicos = medicos
                .filter(m => m.practicas.
                    some(p => p.nombre.toLowerCase().includes(filtros.practica.toLowerCase())))
        }

        if (filtros.sede !== undefined) {
            medicos = medicos
                .filter(m => m.sedes.
                    some(s => s.nombre.toLowerCase().includes(filtros.sede.toLowerCase())))
        }

        const inicio = (numeroPagina - 1) * limitePorPagina;
        const fin = inicio + limitePorPagina;

        return {
            medicos: medicos.slice(inicio, fin),
            totalMedicos: medicos.length
        }
    }



    findAll() {
        return this.medicos;
    }

    Save(medico) {
        medico.id = medico.id ?? (this.nextId++).toString();
        this.medicos[medico.id] = medico;
		return medico;
    }

    findMedicoById(medicoId) {
        let medico = this.medicos.find(t => t ? t.id == medicoId : false);
		
		if (!medico) 
			throw new InputError("El medico no existe")

		return medico 
    }

    agregarDisponibilidad(medicoId, disponibilidad) {
        const medico = this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarDisponibilidad(disponibilidad)
        }
    } 

    agregarSede(medicoId, sede) {
        const medico = this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarSede(sede)
        }
    }

}