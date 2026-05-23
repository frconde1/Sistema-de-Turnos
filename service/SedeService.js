import Sede from "../domain/Sede.js";
import { InputError } from "../errors/Errors.js";
import { SedeRepository } from "../repository/SedeRepository.js";

export class SedeService {
    constructor(sedeRepository = new SedeRepository) {
        this.sedeRepository = sedeRepository;
    }

    async create(sedeReq) {
        //TODO validaciones
        const sede = new Sede(
            null,
            sedeReq.nombre,
            sedeReq.direccion
        )

        return await this.sedeRepository.create(sede)
    }

    async findAll() {
        return await this.sedeRepository.findAll();
    }

    async findById(id) {
        return await this.sedeRepository.findById(id)
    }

}