export class MedicosRepository {
    medicos;

    constructor() {
        this.medicos = []
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

}