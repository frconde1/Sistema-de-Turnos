import Especialidad from "../domain/Especialidad.js";

export default class EspecialidadMapper {
	/**@param {Especialidad} especialidad */
	static toSchema(especialidad){
		return {
			nombre: especialidad.nombre,
			costo: 	especialidad.costo,
			duracionEnMins: especialidad.duracionEnMins
		}
	}
	
	/**@return {Especialidad}*/
	static toEntity({nombre, duracionEnMins, costo, _id}){
		const especialdiad = new Especialidad(nombre, duracionEnMins, costo);
		especialdiad.id = _id.toString();
		return especialdiad;
	}
}