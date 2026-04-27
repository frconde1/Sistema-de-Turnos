export class MedicosRepository {
    medicos;

    constructor() {
        // se hace singleton por el momento
		if(MedicosRepository.instance)
			return MedicosRepository.instance;

		this.medicos = []
		this.nextId = 0;

		MedicosRepository.instance = this;
    }

    findAll() {
        return this.medicos;
    }

    Save(medico) {
        medico.id = medico.id ?? (this.nextId++).toString();
        this.medicos[medico.id] = medico;
		return medico;
    }

    findMedicoById(medicoId) {
        let medico = this.medicos.find(t => t ? t.id == medicoId : false);
		
		if (!medico) 
			throw new Error("El medico no existe")

		return medico 
    }

    agregarDisponibilidad(medicoId, disponibilidad) {
        const medico = this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarDisponibilidad(disponibilidad)
        }
    } 

    agregarSede(medicoId, sede) {
        const medico = this.findMedicoById(medicoId)
        if (medico) {
            medico.agregarSede(sede)
        }
    }

}