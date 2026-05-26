import ObraSocial from "../domain/ObraSocial.js"
import PlanMapper from "./PlanMapper.js"

export default class ObraSocialMapper {

	static populate = 
	{
		path: "planes",
		populate: PlanMapper.populate
	}

	/**@param {ObraSocial} obraSocial */
	static toSchema({nombre, planes}){
		return {
			nombre: nombre,
			planes: planes.map(p => p.id)
		}
	}

	/**@returns {ObraSocial} */
	static toEntity({nombre, planes, _id}){
		const planClass = new ObraSocial(
			nombre,
			planes.map(PlanMapper.toEntity)
		)

		planClass.id = _id.toString();
		return planClass;
	}
}