import Sede from "../domain/Sede.js";
import { SedeRepository } from "../repository/SedeRepository.js";

export class SedeService {
    constructor(sedeRepository = new SedeRepository) {
        this.sedeRepository = sedeRepository;
    }

    create(sedeReq) {
        //TODO validaciones
        const sede = new Sede(
            Date.now(),
            sedeReq.nombre,
            sedeReq.direccion
        )

        return this.sedeRepository.create(sede)
    }

    findAll() {
        return this.sedeRepository.findAll();
    }

}