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
            totalNotificaciones: await NotificacionModel.countDocuments(filtrosMDB) //el total de notificaciones que cumple con los filtros, sino te da el total sin el filtro
        }
	}

    async Save(notificacion) {
		if (notificacion.id) 
			await NotificacionModel.findByIdAndUpdate(notificacion.id, NotificacionMapper.toSchema(notificacion), { upsert: true });
		else {
			const created = await NotificacionModel.create(NotificacionMapper.toSchema(notificacion));
			notificacion.id = created._id.toString();
		}
		return notificacion;
    }

  async FindById(id) {
   	if(!mongoose.Types.ObjectId.isValid(id))
			return null;

		const notificacion = await NotificacionModel.findById(id).populate(NotificacionMapper.populate);
		return notificacion != null ? NotificacionMapper.toEntity(notificacion) : null
 
  }

}
