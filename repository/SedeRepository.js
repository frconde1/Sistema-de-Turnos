import Sede from "../domain/Sede.js";

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

    create(sede) {
        this.sedes.push(sede)
        return sede;
    }

    findAll() {
        return this.sedes;
    }

    findById(id) {
        return this.sedes.find(e => e.id == id)
    }
}