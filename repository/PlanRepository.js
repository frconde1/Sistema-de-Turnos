import mongoose from "mongoose";
import CoberturaEspecialidad from "../domain/CoberturaEspecialidad.js";
import Especialidad from "../domain/Especialidad.js";
import Plan from "../domain/Plan.js";
import Practica from "../domain/Practica.js";
import PlanModel from "../schemas/PlanSchema.js";
import PlanMapper from "../mappers/PlanMapper.js";

export default class PLanRepository {
	constructor(){}

	async FindAll(){
		const planes = await PlanModel.find().populate(PlanMapper.populate);

		return planes.map(PlanMapper.toEntity);
	}

	async Save(plan){
		if (plan.id) 
			await PlanModel.findByIdAndUpdate(plan.id, PlanMapper.toSchema(plan), { upsert: true });
		else {
			const created = await PlanModel.create(PlanMapper.toSchema(plan));
			plan.id = created._id.toString();
		}
		return plan;
	}

	async FindById(id){
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const plan = await PlanModel.findById(id).populate(PlanMapper.populate)

		return plan != null? PlanMapper.toEntity(plan) : null;
	}
}