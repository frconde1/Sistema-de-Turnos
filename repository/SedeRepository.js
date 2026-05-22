import Sede from "../domain/Sede.js";
import { SedeModel } from "../schemas/SedeSchema.js";

export class SedeRepository {
    sedes;

    constructor() {
		if(SedeRepository.instance)
			return SedeRepository.instance;

        this.sedes = []
        this.sedes.push(new Sede(1, "Sede1", "Calle Falsa 123"))
        this.sedes.push(new Sede(2, "Sede2", "Calle Muy Falsa 123"))

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

    findById(id) {
        // return this.sedes.find(e => e.id == id)
        return SedeModel.findById(id);
    }
}