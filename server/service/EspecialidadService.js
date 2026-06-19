import z from "zod";
import Especialidad from "../domain/Especialidad.js";
import { InputError, ResourceNotFoundError } from "../errors/Errors.js";
import EspecialidadRepository from "../repository/EspecialidadRepository.js";
import { intergerSchema, numberSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";


const crearEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costo: 	numberSchema("costo").nonnegative("el costo debe ser mayor a 0"),
	duracionEnMins: intergerSchema("duracionEnMins").nonnegative("la duracionEnMins debe ser mayor a 0")
});

const actualizarEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costo:  numberSchema("costo").nonnegative("el costo debe ser mayor a 0"),
	duracionEnMins: intergerSchema("duracionEnMins").nonnegative("la duracionEnMins debe ser mayor a 0")
});

export default class EspecialidadService {
	constructor(
		especialidadRepository = new EspecialidadRepository()
	){
		this.repository = especialidadRepository
	}

	async Create(request){
		ValidarZodSchema(crearEspecialidadSchema, request);

		const {duracionEnMins, nombre, costo} = request;

		let especialidad = new Especialidad(
			nombre,
			duracionEnMins,
			costo
		);
		await this.repository.Save(especialidad);
		return especialidad;
	}

	async FindAll(){
		return await this.repository.FindAll();
	}

	async FindById(id){
		const especialidad = await this.repository.FindById(id);
		if(especialidad == null)
			throw new ResourceNotFoundError("La especialidad buscada no existe");
		return especialidad;
	}

	async Update(id, request){
		ValidarZodSchema(actualizarEspecialidadSchema, request);
		
		let especialidad = await this.FindById(id);

		const {duracionEnMins, nombre, costo} = request;

		especialidad.nombre   		= nombre;
		especialidad.duracionEnMins = duracionEnMins;
		especialidad.costo  = costo;

		await this.repository.Save(especialidad);
		return especialidad;
	}
}