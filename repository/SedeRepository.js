import Sede from "../domain/Sede.js";

export class SedeRepository {
    sedes;

    constructor() {
        this.sedes = []
        this.sedes.push(new Sede(1, "Sede1", "Calle Falsa 123"))
        this.sedes.push(new Sede(2, "Sede2", "Calle Muy Falsa 123"))
    }

    create(sede) {
        this.sedes.push(sede)
        return sede;
    }

    findAll() {
        return this.sedes;
    }
}