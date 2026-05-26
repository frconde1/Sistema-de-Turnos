import Paciente from "../domain/Paciente.js"
import ObraSocialMapper from "../mappers/ObraSocialMapper.js"
import UsuarioMapper from "../mappers/UsuarioMapper.js"
import PlanMapper from "./PlanMapper.js"

export default class PacienteMapper{
	
	static populate = [{path: 'obraSocial', populate: ObraSocialMapper.populate},{path: 'plan'},{path: 'usuario'}]

	/**@returns {Paciente} */
	static toEntity({usuario, dni, nombre, obraSocial, plan, _id}){
		const paciente = new Paciente(
			UsuarioMapper.toEntity(usuario),
			dni, nombre,
			obraSocial? ObraSocialMapper.toEntity(obraSocial) : null,
			plan?	 	PlanMapper		.toEntity(plan) : null
		);
		paciente.id = _id.toString();
		return paciente;
	}

	/**@param {Paciente} paciente*/
	static toSchema({nombre, dni, obraSocial, plan, usuario}){
		return {
			nombre: 	nombre,
			dni: 		dni,
			obraSocial: obraSocial 	? obraSocial.id : null,
			plan: 		plan 		? plan.id 		: null,
			usuario: 	usuario.id
		}
	}
}