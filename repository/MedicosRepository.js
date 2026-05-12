import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import Especialidad from "../domain/Especialidad.js";
import Medico from "../domain/Medico.js";
import Practica from "../domain/Practica.js";
import Sede from "../domain/Sede.js";
import { InputError } from "../errors/Errors.js";

export class MedicosRepository {
    medicos;

    constructor() {
        // se hace singleton por el momento
		if(MedicosRepository.instance)
			return MedicosRepository.instance;

		this.medicos = []
		this.nextId = 10;

        var medico1 = new Medico(
            "favaloro_capo",
            "123-123",
            "Favaloro",
            [new Especialidad(1, "Cardio", 60, 500)],
            [new Practica(1, "Cardio", 60, 500)],
            [new Sede(1, "Sede1", "Calle Falsa 123")],
            [new DisponibilidadHoraria(1, "08:00", "23:00")]
        )
        medico1.id = 1;

        this.medicos.push(medico1)

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