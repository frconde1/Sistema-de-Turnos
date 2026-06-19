import mongoose from "mongoose";
import ObraSocialMapper from "../mappers/ObraSocialMapper.js";
import ObraSocialModel from "../schemas/ObraSocialSchema.js";
import ObraSocial from "../domain/ObraSocial.js";


export default class ObraSocialRepository {
	constructor(){}


	/** @returns {ObraSocial[]}*/
	async FindAll() {
		return (await ObraSocialModel.find().populate(ObraSocialMapper.populate)).map(ObraSocialMapper.toEntity);
	}

	/**
	 * @param {String} id 
	 * @returns {ObraSocial}
	 */
	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const obraSocial = await ObraSocialModel.findById(id).populate(ObraSocialMapper.populate);
		return obraSocial != null ? ObraSocialMapper.toEntity(obraSocial) : null
	}
	
	/** 
	 * @param {ObraSocial} obraSocial 
	 * @returns {ObraSocial}
	*/
	async Save(obraSocial) {
		if (obraSocial.id) 
			await ObraSocialModel.findByIdAndUpdate(obraSocial.id, ObraSocialMapper.toSchema(obraSocial), { upsert: true });
		else {
			const created = await ObraSocialModel.create(ObraSocialMapper.toSchema(obraSocial));
			obraSocial.id = created._id.toString();
		}
		return obraSocial;
	}
}