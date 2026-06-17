import z from "zod";
import CoberturaEspecialidad from "../domain/CoberturaEspecialidad.js";
import CoberturaPractica from "../domain/CoberturaPractica.js";
import PlanRepository from "../repository/PlanRepository.js";
import { idSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import Plan from "../domain/Plan.js";
import { BadRequestError, ResourceNotFoundError } from "../errors/Errors.js";
import EspecialidadService from "./EspecialidadService.js";
import PracticaService from "./PracticaService.js";
import { NivelCobertura } from "../domain/Enums.js";



const crearPlanSchema = z.object({
	nombre: stringSchema("nombre")
});

const actualizarPlanSchema = z.object({
	nombre: stringSchema("nombre")
});

const agregarEspecialidadSchema = z.object({
	especialidad: idSchema("especialidad"),
	cobertura: z.enum(Object.values(NivelCobertura))
})

const agregarPracticaSchema = z.object({
	practica: idSchema("practica"),
	cobertura: z.enum(Object.values(NivelCobertura))
})

export default class PlanService{
	constructor(
		planRepository = new PlanRepository(),
		especialidadService = new EspecialidadService(),
		practicaService = new PracticaService()
	) {
		this.repository = planRepository;
		this.especialidadService = especialidadService;
		this.practicaService = practicaService;
	}

	async FindAll() {
		return await this.repository.FindAll();
	}
	
	async Create(req) {
		ValidarZodSchema(crearPlanSchema, req);
		
		const { nombre } = req;
		const plan = new Plan(nombre, [], []);

		await this.repository.Save(plan);
		return plan;
	}
	
	async FindById(id) {
		const plan = await this.repository.FindById(id)
		if(plan == null)
			throw new ResourceNotFoundError("el plan buscado no existe");
		return plan;
	}
	
	async Update(id, req) {
		ValidarZodSchema(actualizarPlanSchema, req);

		const { nombre } = req;
		const plan = await this.FindById(id);
		plan.nombre = nombre;
		
		await this.repository.Save(plan)
		return plan
	}
	
	async FindAllEspecialidades(id) {
		const plan = await this.FindById(id);
		return plan.coberturasEspecialidad;
	}
	
	async AddEspecialidad(id, req) {
		ValidarZodSchema(agregarEspecialidadSchema, req);
		const plan 			= await this.FindById(id);
		const especialidad 	= await this.especialidadService.FindById(req.especialidad);

		if(plan.coberturasEspecialidad.some(c => c.especialidad.id == especialidad.id))
			throw new BadRequestError("la especialidad ya se encuentra asignada");

		plan.coberturasEspecialidad.push(
			new CoberturaEspecialidad(
				especialidad,
				req.cobertura
			)
		);

		await this.repository.Save(plan);
		return plan;
	}
	
	async RemoveEspecialidad(id, idEsp) {
		const plan = await this.FindById(id);
		plan.coberturasEspecialidad = plan.coberturasEspecialidad.filter(c => c.especialidad.id != idEsp);
		await this.repository.Save(plan);
		return plan;
	}
	
	async FindAllPracticas(id) {
		const plan = await this.FindById(id);
		return plan.coberturasPractica;
	}
	
	async AddPractica(id, req) {
		ValidarZodSchema(agregarPracticaSchema, req);
		const plan 		= await this.FindById(id);
		const practica 	= await this.practicaService.FindById(req.practica);

		if(plan.coberturasPractica.some(c => c.practica.id == practica.id))
			throw new BadRequestError("la practica ya se encuentra asignada");

		plan.coberturasPractica.push(
			new CoberturaPractica(
				practica,
				req.cobertura
			)
		);

		await this.repository.Save(plan);
		return plan;
	}
	
	async RemovePractica(id, idPra) {
		const plan = await this.FindById(id);
		plan.coberturasPractica = plan.coberturasPractica.filter(c => c.practica.id != idPra);
		await this.repository.Save(plan);
		return plan;
	}
	
}