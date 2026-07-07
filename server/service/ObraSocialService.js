import z from "zod";
import ObraSocialRepository from "../repository/ObraSocialRepository.js";
import { idSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import { BadRequestError, ResourceNotFoundError } from "../errors/Errors.js";
import ObraSocial from "../domain/ObraSocial.js";
import PlanService from "./PlanService.js";
import PracticaService from "./PracticaService.js";
import { NivelCobertura } from "../domain/Enums.js";

const crearObraSocialSchema = z.object({
	nombre: stringSchema("nombre")
})

const actualizarObraSocialSchema = z.object({
	nombre: stringSchema("nombre")
})

const agregarPlanSchema = z.object({
	plan: idSchema("plan")
})

export default class ObraSocialService {
	constructor(
		obraSocialRepository = new ObraSocialRepository(),
		planService = new PlanService(),
		practicaService = new PracticaService()
	){
		this.repository  = obraSocialRepository;
		this.planService = planService;
		this.practicaService = practicaService;
	}

	async FindAll(){
		return await this.repository.FindAll();
	}

	async FindById(id){
		const obra = await this.repository.FindById(id);
		if(obra == null)
			throw new ResourceNotFoundError("la obra social buscada no existe");
		return obra;
	}

	async FindAllPlanes(id){
		const obra = await this.repository.FindById(id);
		if(obra == null)
			throw new ResourceNotFoundError("la obra social buscada no existe");
		return obra.planes;
	}

	async FindPrecio(id, idPractica){
		const obra = await this.repository.FindById(id);
		const practica = await this.practicaService.FindById(idPractica);
		

		switch(obra.ObtenerCobertura(practica)) {
			case NivelCobertura.TOTAL:
				return { precioFinal: 0 };
			case NivelCobertura.PARCIAL:
				return { precioFinal: practica.costo * 0.5 };
			case NivelCobertura.NINGUNA:
				return { precioFinal: practica.costo };
			default:
				throw new BadRequestError("Cobertura desconocida");
		}
	}

	async Create(req){
		ValidarZodSchema(crearObraSocialSchema, req);

		const obrasocial = new ObraSocial(req.nombre, []);
		
		await this.repository.Save(obrasocial);
		return obrasocial;
	}

	async Update(id, req){
		ValidarZodSchema(actualizarObraSocialSchema, req);
		
		const obrasocial = await this.FindById(id);
		obrasocial.nombre = req.nombre;

		this.repository.Save(obrasocial);
		return obrasocial;
	}

	async AgregarPlan(id, req){
		ValidarZodSchema(agregarPlanSchema, req);

		const obraSocial = await this.FindById(id);
		const plan 		 = await this.planService.FindById(req.plan);

		if(obraSocial.planes.some(p => p.id == plan.id))
			throw new BadRequestError("el plan ya se encuentra asignado");

		obraSocial.planes.push(plan);
		this.repository.Save(obraSocial);
		return obraSocial;
	}

	async EliminarPlan(id, idPlan){
		const obraSocial = await this.FindById(id);

		obraSocial.planes = obraSocial.planes.filter(p => p.id != idPlan);

		this.repository.Save(obraSocial)
		return obraSocial;
	}
}