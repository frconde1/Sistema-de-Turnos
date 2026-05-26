import z from "zod";
import Especialidad from "../domain/Especialidad.js";
import { InputError, ResurceNotFoundError } from "../errors/Errors.js";
import EspecialidadRepository from "../repository/EspecialidadRepository.js";
import { intergerSchema, numberSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";


const crearEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costoConsulta: 	numberSchema("costoConsulta").nonnegative("el costo debe ser mayor a 0"),
	duracionMins: intergerSchema("duracionMins").nonnegative("la duracionMins debe ser mayor a 0")
});

const actualizarEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costoConsulta:  numberSchema("costoConsulta").nonnegative("el costo debe ser mayor a 0"),
	duracionMins: intergerSchema("duracionMins").nonnegative("la duracionMins debe ser mayor a 0")
});

export default class EspecialidadService {
	constructor(
		especialidadRepository = new EspecialidadRepository()
	){
		this.repository = especialidadRepository
	}

	async Create(request){
		ValidarZodSchema(crearEspecialidadSchema, request);

		const {duracionMins, nombre, costoConsulta} = request;

		let especialidad = new Especialidad(
			nombre,
			duracionMins,
			costoConsulta
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
			throw new ResurceNotFoundError("La especialidad buscada no existe");
		return especialidad;
	}

	async Update(id, request){
		ValidarZodSchema(actualizarEspecialidadSchema, request);
		
		let especialidad = await this.FindById(id);

		const {duracionMins, nombre, costoConsulta} = request;

		especialidad.nombre   		= nombre;
		especialidad.duracionEnMins = duracionMins;
		especialidad.costoConsulta  = costoConsulta;

		await this.repository.Save(especialidad);
		return especialidad;
	}
}