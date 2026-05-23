import Paciente from "../domain/Paciente.js";
import { InputError } from "../errors/Errors.js";
import { PacienteRepository } from "../repository/PacienteRepository.js";
import z from "zod/v3";

const pacienteSchema = z.object({
    usuario: z.string({required_error: "El usuario es obligatorio", invalid_type_error: "El usuario debe ser un string" }).min(1, "El usuario no puede estar vacío"),
    dni: z.string({ required_error: "El dni es obligatorio", invalid_type_error: "El dni debe ser un string" }).min(1, "El dni no puede estar vacío"),
    nombre: z.string({ required_error: "El nombre es obligatorio", invalid_type_error: "El nombre debe ser un string" }).min(1, "El nombre no puede estar vacío")
})

export default class PacienteService {

    constructor(
        pacienteRepository = new PacienteRepository()
    ) {
        this.pacienteRepository = pacienteRepository;
    }


    async Create(reqBody) {
        const resultado = pacienteSchema.safeParse(reqBody);
        const paciente = new Paciente(
                    null, 
                    reqBody.usuario,
                    reqBody.dni,
                    reqBody.nombre,
                    reqBody.obraSocial,
                    reqBody.plan 

                    
                )
        
                return await this.pacienteRepository.Save(paciente)

    }
    
    FindById(id){
		return this.pacienteRepository.FindById(id);
	}

    FindAll() {
        return this.pacienteRepository.FindAll();
    }
}
    
    