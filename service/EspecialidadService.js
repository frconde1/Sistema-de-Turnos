import z from "zod";
import Especialidad from "../domain/Especialidad.js";
import { InputError, ResurceNotFoundError } from "../errors/Errors.js";
import EspecialidadRepository from "../repository/EspecialidadRepository.js";
import { numberSchema, stringSchema } from "./zodSchemas.js";


const crearEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costo:  numberSchema("costo"),
	duracionMins:  numberSchema("duraciónMins")
});

const actualizarEspecialidadSchema = z.object({
	nombre: stringSchema("nombre"),
	costo:  numberSchema("costo"),
	duracionMins:  numberSchema("duraciónMins")
});

export default class EspecialidadService {
	constructor(
		especialidadRepository = new EspecialidadRepository()
	){
		this.repository = especialidadRepository
	}

	async Create(request){
		crearEspecialidadSchema.safeParse(request)
		this.validarRequest(request);

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
		actualizarEspecialidadSchema.safeParse(request);
		this.validarRequest(request);
		let especialidad = await this.FindById(id);

		const {duracionMins, nombre, costoConsulta} = request;

		especialidad.nombre   		= nombre;
		especialidad.duracionEnMins = duracionMins;
		especialidad.costoConsulta  = costoConsulta;

		await this.repository.Save(especialidad);
		return especialidad;
	}

	validarRequest(request) {
		const {duracionMins, costoConsulta} = request;

		if(!Number.isInteger(duracionMins) || duracionMins <= 0)
			throw new InputError("la duracionEnMins en minutos debe ser un entero positivo");
		if(costoConsulta <= 0)
			throw new InputError("el costoConsulta debe ser un numero mayor a 0");
	}
}