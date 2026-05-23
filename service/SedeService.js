import Sede from "../domain/Sede.js";
import { InputError } from "../errors/Errors.js";
import { SedeRepository } from "../repository/SedeRepository.js";

export class SedeService {
    constructor(sedeRepository = new SedeRepository) {
        this.sedeRepository = sedeRepository;
    }

    create(sedeReq) {
        const sede = new Sede(
            null,
            sedeReq.nombre,
            sedeReq.direccion
        )

        return this.sedeRepository.create(sede)
    }

    findAll() {
        return this.sedeRepository.findAll();
    }

<<<<<<< HEAD
    FindById(id) {
        const sede = this.sedeRepository.FindById(id);
        if(sede == undefined)
            throw new InputError("la sede no existe");
        return sede;
=======
    findById(id) {
        return this.sedeRepository.findById(id)
>>>>>>> main
    }

}