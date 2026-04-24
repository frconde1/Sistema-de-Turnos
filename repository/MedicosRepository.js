import { Medico } from "../domain/Medico.js";

export class MedicosRepository {
    medicos;

    constructor() {
        this.medicos = []
        this.medicos.push(new Medico(1, "Usuario01", "123-123", "Favaloro"))
    }

    findAll() {
        return this.medicos;
    }

    create(medico) {
        this.medicos.push(medico)
        return medico;
    }

    findMedicoById(medicoId) {
        return this.medicos.find(m => m.id == medicoId)
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