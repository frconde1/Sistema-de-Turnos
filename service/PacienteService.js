import z from "zod";
import { InputError, ResurceNotFoundError } from "../errors/Errors.js";
import { idSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import PacienteRepository from "../repository/PacienteRepository.js";
import Paciente from "../domain/Paciente.js";
import UsuarioService from "./UsuarioService.js";

const crearPacienteSchema = z.object({
    usuario: idSchema("usuario"),
    dni:     stringSchema("dni").regex(/^\d+$/, "El dni solo contiene digitos"),
    nombre:  stringSchema("nombre")
})

const actualizarPacienteSchema = z.object({
    dni:    stringSchema("dni").regex(/^\d+$/, "El dni solo contiene digitos"),
    nombre: stringSchema("nombre")
})

export default class PacienteService {

    constructor(
        pacienteRepository = new PacienteRepository(),
        usuarioService     = new UsuarioService()
    ) {
        this.repository     = pacienteRepository;
        this.usuarioService = usuarioService;
    }
    
    async FindById(id){
        const paciente = await this.repository.FindById(id);
        if(paciente == null)
            throw new ResurceNotFoundError("el paciente buscado no existe");
        return paciente;
	}

    async FindAll() {
        return await this.repository.FindAll();
    }

    async Create(reqBody) {
        ValidarZodSchema(crearPacienteSchema, reqBody);

        const usuario = await this.usuarioService.FindById(reqBody.usuario);
        const paciente = new Paciente(usuario, reqBody.dni, reqBody.nombre, null, null)
        
        await this.repository.Save(paciente)
        return paciente;
    }

    async Update(id, reqBody){
        ValidarZodSchema(actualizarPacienteSchema, reqBody);
        const paciente = await this.FindById(id);

        paciente.nombre = reqBody.nombre;
        paciente.dni    = reqBody.dni;
        
        this.repository.Save(paciente);
        return paciente;
    }
}
    
    