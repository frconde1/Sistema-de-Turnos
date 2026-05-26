import mongoose from "mongoose";
import CoberturaEspecialidad from "../domain/CoberturaEspecialidad.js";
import Especialidad from "../domain/Especialidad.js";
import Plan from "../domain/Plan.js";
import Practica from "../domain/Practica.js";
import PlanModel from "../schemas/PlanSchema.js";

export default class PLanRepository {
	constructor(){}

	async FindAll(){
		const planes = await PlanModel.find()
			.populate('coberturasEspecialidad.especialidad')
			.populate('coberturasPractica.practica');

		return planes.map(this.toEntity);
	}

	async Save(plan){
		if (plan.id) 
			await PlanModel.findByIdAndUpdate(plan.id, this.toSchema(plan), { upsert: true });
		else {
			const created = await PlanModel.create(this.toSchema(plan));
			plan.id = created._id.toString();
		}
		return plan;
	}

	async FindById(id){
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		return this.toEntity(
			await PlanModel.findById(id)
			.populate('coberturasEspecialidad.especialidad')
			.populate('coberturasPractica.practica')
		);
	}


	/**@param {Plan} plan */
	toSchema(plan){
		return {
			nombre: plan.nombre,
			coberturasEspecialidad:
				plan.coberturasEspecialidad.map(c => {
					return {
						especialidad: c.especialidad.id,
						cobertura: c.nivel
					}
				}),
			coberturasPracticas:
				plan.coberturasPracticas.map(c => {
					return {
						practica: c.practica.id,
						cobertura: c.nivel
					}
				})
		}
	}

	toEntity(plan){
		const especialidades = plan.coberturasEspecialidad.map(c => {
			const { nombre, costo, duracionEnMins } = c.especialidad;
			const especialdiad = new Especialidad(nombre, duracionEnMins, costo);
			return new CoberturaEspecialidad(especialdiad, c.cobertura);
		});

		const practicas = plan.coberturasPractica.map(c => {
			const { codigo, nombre, costo, duracionEnMins } = c.practica;
			const practica = new Practica(codigo, nombre, duracionEnMins, costo);
			practica.id = c.practica._id.toString();
			return new CoberturaEspecialidad(practica, c.cobertura);
		});
		
		const planClass = new Plan(
			plan.nombre,
			especialidades,
			practicas
		)
		planClass.id = plan._id.toString();
		return planClass;
	}
}