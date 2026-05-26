import mongoose from "mongoose";
import NotificacionMapper from "../mappers/NotificacionMapper.js";
import NotificacionModel from "../schemas/NotificacionSchema.js";

export default class NotificationRepository {
	constructor(){}

	/**@param {Boolean | null} leida  */
	async FindAll(leida = null) {
		let notificaciones = [];
		
		if(leida != null)
			notificaciones = await NotificacionModel.find({leida: leida}).populate(NotificacionMapper.populate);
		else
			notificaciones = await NotificacionModel.find().populate(NotificacionMapper.populate);
		
		return notificaciones.map(NotificacionMapper.toEntity);
	}

	async FindById(id) {
		if(!mongoose.Types.ObjectId.isValid(id))
			return null;
		const noti = await NotificacionModel.findById(id)
		return noti != null? NotificacionMapper.toEntity(noti) : null;
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

	async FindAllById(id){
		return (await NotificacionModel
			.find({remitente: id})
			.populate(NotificacionMapper.populate))
			.map(NotificacionMapper.toEntity);
	}

	async FindAllById(id, {leida}){
		return (await NotificacionModel
			.find({remitente: id, leida: leida})
			.populate(NotificacionMapper.populate))
			.map(NotificacionMapper.toEntity);
	}

}