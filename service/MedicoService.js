import { Medico } from "../domain/Medico.js";
import { MedicosRepository } from "../repository/MedicosRepository.js";

export class MedicoService {
    constructor(medicosRepository = new MedicosRepository) {
        this.medicosRepository = medicosRepository;
    }

    create(medicoReq) {
        //TODO validaciones
        const medico = new Medico(
            Date.now(),
            medicoReq.usuario,
            medicoReq.matricula,
            medicoReq.nombre
        )

        return this.medicosRepository.create(medico)
    }

    findAll() {
        return this.medicosRepository.findAll();
    }

    agregarDisponibilidad(medicoId, body) {
        this.medicosRepository.agregarDisponibilidad(medicoId, body.disponibilidad)
    }

    agregarSede(medicoId, body) {
        this.medicosRepository.agregarSede(medicoId, body.sede)
    }
}