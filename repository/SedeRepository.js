import Sede from "../domain/Sede.js";

export class SedeRepository {
    sedes;

    constructor() {
		if(SedeRepository.instance)
			return SedeRepository.instance;

        this.sedes = []

		SedeRepository.instance = this;
    }

    /**
     * @param {Sede} sede
     * @returns {Sede}
    */
    create(sede) {
        this.sedes.push(sede)
        sede.id = String(this.sedes.length);
        return sede;
    }

    /**@returns {Array<Sede>} */
    findAll() {
        return new Array(this.sedes);
    }

    /**@returns {Sede}*/
    FindById(id){
        return this.sedes.find(s=> s.id == id);
    }

    findById(id) {
        return this.sedes.find(e => e.id == id)
    }
}