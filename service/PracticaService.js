import z from "zod";
import Practica 			from "../domain/Practica.js";
import { InputError, ResurceNotFoundError } 		from "../errors/Errors.js";
import PracticaRepository 	from "../repository/PracticaRepository.js";
import { intergerSchema, numberSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";


const crearPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costoConsulta: 	numberSchema("costoConsulta").nonnegative("el costo debe ser mayor a 0"),
	duracionMins: intergerSchema("duracionMins").nonnegative("la duracionMins debe ser mayor a 0")
});

const actualizarPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costoConsulta: 	numberSchema("costoConsulta").nonnegative("el costo debe ser mayor a 0"),
	duracionMins: intergerSchema("duracionMins").nonnegative("la duracionMins debe ser mayor a 0")
});


export default class PracticaService {
	constructor(
		practicaRepository = new PracticaRepository()
	) {
		this.repository = practicaRepository;
	}


	async FindAll(){
		return await this.repository.FindAll();
	}

	async FindById(id) {
		const practica = await this.repository.FindById(id); 
		if(practica == null)
			throw new ResurceNotFoundError("La practica buscada no existe");
		return practica;
	}

	/** @returns {Practica} */
	async Create(request) {
		ValidarZodSchema(crearPracticaSchema, request);

		const practica = this.CreatePractica(request);
		
		await this.repository.Save(practica);
		return practica;
	}

	async Update(id, request){
		ValidarZodSchema(actualizarPracticaSchema, request);
		
		const practica = await this.FindById(id);

		const {codigo, duracionMins, nombre, costoConsulta} = request;

		practica.codigo	= codigo
		practica.nombre = nombre;
		practica.costo  = costoConsulta;
		practica.duracionEnMins = duracionMins;

		await this.repository.Save(practica);
		return practica;
	}


	/** @returns {Practica} */
	CreatePractica(reqBody){
		const {codigo, nombre, duracionMins, costoConsulta} = reqBody;
		return new Practica(codigo, nombre, duracionMins, costoConsulta);
	}
}
