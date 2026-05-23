import Sede from "../domain/Sede.js";
import { SedeModel } from "../schemas/SedeSchema.js";

export class SedeRepository {
    sedes;

    constructor() {
		if(SedeRepository.instance)
			return SedeRepository.instance;

        this.sedes = []

		SedeRepository.instance = this;
    }

    async create(sede) {
        // const sedeModel = new SedeModel(sede);
        await SedeModel.create({
            nombre: sede.nombre,
            direccion: sede.direccion
        });
        // this.sedes.push(sede)
        return sede;
    }

    async findAll() {
        // return this.sedes;
        return await SedeModel.find();
    }

    async findById(id) {
        // return this.sedes.find(e => e.id == id)
        return await SedeModel.findById(id);
    }
}