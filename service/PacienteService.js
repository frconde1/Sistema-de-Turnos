import z from "zod";
import { InputError, ResurceNotFoundError } from "../errors/Errors.js";
import { idSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";

import PacienteRepository from "../repository/PacienteRepository.js";
import Paciente from "../domain/Paciente.js";

import UsuarioService from "./UsuarioService.js";
import TurnoService from "./TurnoService.js";
import ObraSocialService from "./ObraSocialService.js";
import PlanService from "./PlanService.js";

const crearPacienteSchema = z.object({
    usuario: idSchema("usuario"),
    dni:     stringSchema("dni").regex(/^\d+$/, "El dni solo contiene digitos"),
    nombre:  stringSchema("nombre")
})

const actualizarPacienteSchema = z.object({
    dni:    stringSchema("dni").regex(/^\d+$/, "El dni solo contiene digitos"),
    nombre: stringSchema("nombre")
})

const actualizarPlanSchema = z.object({
    plan: stringSchema("plan").optional()
})

const actualizarObraSocialSchema = z.object({
    obraSocial: stringSchema("obraSocial").optional()
})

export default class PacienteService {

    constructor(
        pacienteRepository = new PacienteRepository(),
        usuarioService     = new UsuarioService(),
        turnoService       = new TurnoService(),
        obraSocialService  = new ObraSocialService(),
        planService        = new PlanService()
    ) {
        this.repository         = pacienteRepository;
        this.usuarioService     = usuarioService;
        this.turnoService       = turnoService;
        this.obraSocialService  = obraSocialService;
        this.planService        = planService;
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

        if(usuario.registrado)
            throw new InputError("El usuario ya se encuentra registrado");
        else 
           usuario.registrado = true;
        await this.usuarioService.actualizar(usuario);

        const paciente = new Paciente(usuario, reqBody.dni, reqBody.nombre, null, null)
        
        await this.repository.Save(paciente);
        return paciente;
    }

    async Update(id, reqBody){
        ValidarZodSchema(actualizarPacienteSchema, reqBody);
        const paciente = await this.FindById(id);

        paciente.nombre = reqBody.nombre;
        paciente.dni    = reqBody.dni;
        
        await this.repository.Save(paciente);
        return paciente;
    }

    async FindTurnosById(id){
        const paciente = await this.FindById(id);
        const turnos = await this.turnoService.FindAll({paciente: paciente.id})
        return turnos;
    }

    async UpdateObraSocial(id, req){
        ValidarZodSchema(actualizarObraSocialSchema, req);
        const paciente = await this.FindById(id);
        
        paciente.obraSocial = req.obraSocial ? await this.obraSocialService.FindById(req.obraSocial) : null

        await this.repository.Save(paciente);
        return paciente;
    }
    async UpdatePlan(id, req){
        ValidarZodSchema(actualizarPlanSchema, req);
        const paciente = await this.FindById(id);
        
        paciente.plan = req.plan ? await this.planService.FindById(req.plan) : null

        await this.repository.Save(paciente);
    }
}
    
    