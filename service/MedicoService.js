import Medico from "../domain/Medico.js";
import { MedicosRepository } from "../repository/MedicosRepository.js";

export class MedicoService {
    constructor(medicosRepository = new MedicosRepository) {
        this.medicosRepository = medicosRepository;
    }

    create(medicoReq) {
        //TODO validaciones
        const medico = new Medico(
            medicoReq.usuario,
            medicoReq.matricula,
            medicoReq.nombre
        )

        return this.medicosRepository.Save(medico)
    }

    /**
     * @param {String} id 
     * @returns {Medico}
     */
    FindById(id){
        return this.medicosRepository.findMedicoById(id)
    }

    findAll() {
        return this.medicosRepository.findAll();
    }

    agregarDisponibilidad(medicoId, body) {
        this.medicosRepository.agregarDisponibilidad(medicoId, body.disponibilidad)
    }
}