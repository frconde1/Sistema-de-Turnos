import z from "zod";
import Practica 			from "../domain/Practica.js";
import { InputError } 		from "../errors/Errors.js";
import PracticaRepository 	from "../repository/PracticaRepository.js";
import { intergerSchema, numberSchema, stringSchema } from "./zodSchemas.js";


const crearPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costo: 	numberSchema("costo").nonnegative("el costo debe ser mayor a 0"),
	duracionMins: intergerSchema("duracionMins").nonnegative("la duracionMins debe ser mayor a 0")
});

const actualizarPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costo:  numberSchema("costo").nonnegative("el costo debe ser mayor a 0"),
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
	async Create(reqBody) {
		ValidarZodSchema(crearPracticaSchema, reqBody);

		const practica = this.CreatePractica(reqBody);
		
		await this.repository.Save(practica);
		return practica;
	}

	async Update(id, request){
		ValidarZodSchema(actualizarPracticaSchema, reqBody);
		
		const practica = await this.FindById(id);

		const {codigo, duracionMins, nombre, costoConsulta} = request;

		practica.codigo	= codigo
		practica.nombre = nombre;
		practica.costo  = costoConsulta;
		practica.duracionTurnoEnMins = duracionMins;

		await this.repository.Save(practica);
		return practica;
	}


	/** @returns {Practica} */
	CreatePractica(reqBody){
		const {codigo, nombre, duracionMins, costo} = reqBody;
		return new Practica(codigo, nombre, duracionMins, costo);
	}
}
