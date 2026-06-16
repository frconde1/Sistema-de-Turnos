import mongoose from "mongoose";
import NotificacionMapper from "../mappers/NotificacionMapper.js";
import NotificacionModel from "../schemas/NotificacionSchema.js";

export default class NotificationRepository {
	constructor(){}

	/**@param {Boolean | null} leida  */
  	async FindAll(filtros) {
		
		const {pagina = 1, tamano = 10, remitente, destinatario, leida} = filtros;
		
		const filtrosMDB = {};
		
		if(remitente) 	 filtrosMDB.remitente = remitente;
		if(destinatario) 	 filtrosMDB.destinatario = destinatario;
    if(leida !== undefined) filtrosMDB.leida = leida
    
    const notificaciones = await NotificacionModel
				.find(filtrosMDB)
				.skip((pagina - 1) * tamano)
				.limit(tamano)
				.populate(NotificacionMapper.populate)


        return {
			notificaciones: notificaciones.map(NotificacionMapper.toEntity),
            totalNotificaciones: await NotificacionModel.countDocuments()
        }
	}

    async Save(notifiacion) {
		if (notifiacion.id) 
			await NotificacionModel.findByIdAndUpdate(notifiacion.id, NotificacionMapper.toSchema(notifiacion), { upsert: true });
		else {
			const created = await NotificacionModel.create(NotificacionMapper.toSchema(notifiacion));
			notifiacion.id = created._id.toString();
		}
		return notifiacion;
    }

}
