import Notificacion from "../domain/Notificacion.js"
import UsuarioMapper from "./UsuarioMapper.js"


export default class NotificacionMapper {

	static populate = [{path: "destinatario"}, {path: "remitente"}];

	/**@param {Notificacion} notificacion*/
	static toSchema({destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida, leida}){
		return {
			destinatario: 		destinatario.id,
			remitente: 			remitente.id,
			mensaje: 			mensaje,
			fechaHoraCreacion: 	fechaHoraCreacion, 
			fechaHoraLeida: 	fechaHoraLeida, 
			leida: 				leida
		}
	}

	/**@returns {Notificacion} */
	static toEntity({destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida, leida, _id}){
		const notificacion = new Notificacion(
			UsuarioMapper.toEntity(destinatario),
			UsuarioMapper.toEntity(remitente),
			mensaje,
			fechaHoraCreacion
		)

		notificacion.fechaHoraLeida = fechaHoraLeida;
		notificacion.leida = leida;
		notificacion.id = _id.toString();
		return notificacion;
	}
}