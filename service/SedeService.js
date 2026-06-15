import z from "zod";
import Sede from "../domain/Sede.js";
import { InputError, ResourceNotFoundError } from "../errors/Errors.js";
import { SedeRepository } from "../repository/SedeRepository.js";
import { stringSchema, ValidarZodSchema } from "./zodSchemas.js";

const sedeSchema = 
    z.object({
        nombre: stringSchema("nombre"),
        direccion: stringSchema("direccion")
    })

export default class SedeService {
    constructor(sedeRepository = new SedeRepository()) {
        this.repository = sedeRepository;
    }

    async FindAll() {
        return await this.repository.FindAll();
    }

    async FindById(id) {
        const sede = await this.repository.FindById(id); 
		if(sede == null)
			throw new ResourceNotFoundError("La sede buscada no existe");
		return sede;
    }

    async Create(req) {
        ValidarZodSchema(sedeSchema, req);
        const sede = new Sede(req.nombre,req.direccion);
        await this.repository.Save(sede);
        return sede;
    }

    async Update(id, req){
        ValidarZodSchema(sedeSchema, req);
        
        const sede = await this.FindById(id);

        sede.nombre    = req.nombre;
        sede.direccion = req.direccion;

        await  this.repository.Save(sede)
        return sede;
    }

}