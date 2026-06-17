import CoberturaEspecialidad from "../domain/CoberturaEspecialidad.js";
import CoberturaPractica from "../domain/CoberturaPractica.js";
import Plan from "../domain/Plan.js";
import EspecialidadMapper from "./EspecialidadMapper.js";
import PracticaMapper from "./PracticaMapper.js";


class CoberturaEspecialidadMapper {
	
	/** @param {CoberturaEspecialidad} cobertura */
	static toSchema({especialidad, nivel}) {
		return {
			especialidad: especialidad.id,
			cobertura: nivel
		}
	}

	/** @returns {CoberturaEspecialidad} */
	static toEntity({especialidad, cobertura}){
		return new CoberturaEspecialidad(
			EspecialidadMapper.toEntity(especialidad),
			cobertura
		)
	}
}

class CoberturaPracticaMapper {
	
	/** @param {CoberturaPractica} cobertura */
	static toSchema({practica, nivel}) {
		return {
			practica: practica.id,
			cobertura: nivel
		}
	}

	/** @returns {CoberturaPractica} */
	static toEntity({practica, cobertura}){
		return new CoberturaPractica(
			PracticaMapper.toEntity(practica),
			cobertura
		)
	}
}

export default class PlanMapper {

	static populate = [{path: 'coberturasPractica.practica'},{path: 'coberturasEspecialidad.especialidad'}]

	/**@param {Plan} plan */
	static toSchema({nombre, coberturasEspecialidad, coberturasPractica}){
		return {
			nombre: nombre,
			coberturasEspecialidad: coberturasEspecialidad.map(CoberturaEspecialidadMapper.toSchema),
			coberturasPractica: 	coberturasPractica.map(CoberturaPracticaMapper.toSchema)
		}
	}

	/**@returns {Plan} */
	static toEntity({nombre, coberturasEspecialidad, coberturasPractica, _id}){
		const planClass = new Plan(
			nombre,
			coberturasEspecialidad.map(CoberturaEspecialidadMapper.toEntity),
			coberturasPractica.map(CoberturaPracticaMapper.toEntity)
		)

		planClass.id = _id.toString();
		return planClass;
	}
}