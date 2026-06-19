import Sede from "../domain/Sede.js"


export default class SedeMapper{
	
	/**@returns {Sede} */
	static toEntity({nombre, direccion, _id}){
		const sede = new Sede(nombre, direccion);
		sede.id = _id.toString();
		return sede;
	}

	/**@param {Sede} sede*/
	static toSchema({nombre, direccion}){
		return {
			nombre: nombre,
			direccion: direccion
		};
	}
}