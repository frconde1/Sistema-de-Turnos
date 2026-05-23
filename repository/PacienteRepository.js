import Paciente from "../domain/Paciente.js";
import Usuario from "../domain/Usuario.js";
import { PacienteModel } from "../schemas/PacienteSchema.js";


export class PacienteRepository {
    constructor() {
        this.pacientes = [];
        this.nextId = 0;
    }

    /** @returns {Paciente[]} */
    async FindAll() {
            return this.pacientes;
        }
    /** 
	 * @param {Paciente} paciente 
	 * @returns {Paciente}
	*/
        async Save(paciente) {
            const nuevoPaciente = {
                usuario: paciente.usuario,
                dni: paciente.dni,
                nombre: paciente.nombre,
                obraSocial: paciente.obraSocial,
                plan: paciente.plan
            };
            if (paciente.id) {
                await PacienteModel.findByIdAndUpdate(paciente.id, nuevoPaciente, { new: true, upsert: true });
            } else {
                const created = await PacienteModel.create(nuevoPaciente);
                paciente.id = created._id.toString();
            }
    
            return paciente;
        }
    
        async FindById(pacienteId) {
            let paciente = await PacienteModel.findById(pacienteId);
            
            if (!paciente) 
                throw new InputError("El paciente no existe")
    
            return paciente 
        }

}