import mongoose from "mongoose";
import Sede from "../domain/Sede.js";
import SedeMapper from "../mappers/SedeMapper.js";
import SedeModel from "../schemas/SedeSchema.js";

export class SedeRepository {
    constructor() {}

    async Save(sede) {
		if (sede.id) 
			await SedeModel.findByIdAndUpdate(sede.id, SedeMapper.toSchema(sede), { upsert: true });
		else {
			const created = await SedeModel.create(SedeMapper.toSchema(sede));
			sede.id = created._id.toString();
		}
		return sede;
    }

    async FindAll() {
        return (await SedeModel.find()).map(SedeMapper.toEntity);
    }

    async FindById(id) {
        if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const sede = await SedeModel.findById(id);
		return sede != null ? SedeMapper.toEntity(sede) : null
    }
}