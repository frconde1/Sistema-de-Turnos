import z from "zod";
import Practica 			from "../domain/Practica.js";
import { InputError } 		from "../errors/Errors.js";
import PracticaRepository 	from "../repository/PracticaRepository.js";
import { numberSchema, stringSchema } from "./zodSchemas.js";


const crearPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costo: 	numberSchema("costo"),
	duracionMins: numberSchema("duraciónMins")
});

const actualizarPracticaSchema = z.object({
	nombre: stringSchema("nombre"),
	costo:  numberSchema("costo"),
	duracionMins:  numberSchema("duraciónMins")
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
		crearPracticaSchema.safeParse(reqBody);
		this.ValidarDatos(reqBody);

		const practica = this.CreatePractica(reqBody);
		
		await this.repository.Save(practica);
		return practica;
	}

	async Update(id, request){
		actualizarPracticaSchema.safeParse(request);
		this.ValidarDatos(request);
		
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

	ValidarDatos(datosPracticaNueva) {
		const {duracionMins, costo} = datosPracticaNueva;

		if(!Number.isInteger(duracionMins) || duracionMins <= 0)
			throw new InputError("La duracion enviada es invalida");
		if(costo <= 0)
			throw new InputError("El costo enviado es invalido");
	}
}
