import Practica from "../domain/Practica.js";

export default class PracticaMapper {
	
	/**@param {Practica} practica  */
	static toSchema(practica){
		return {
			codigo: practica.codigo,
			nombre: practica.nombre,
			costo:  practica.costo,
			duracionEnMins: practica.duracionEnMins
		}
	}

	/**@return {Practica}*/
	static toEntity({codigo, nombre, duracionEnMins, costo, _id}){
		const practica = new Practica(codigo, nombre, duracionEnMins, costo);
		practica.id = _id.toString();
		return practica;
	}
}