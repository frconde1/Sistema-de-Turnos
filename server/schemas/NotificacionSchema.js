import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
	destinatario: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
	remitente: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
	mensaje: {
		type: String,
		required: true
	},
	fechaHoraCreacion: {
		type: Date,
		required: true
	},
	fechaHoraLeida: {
		type: Date
	},
	leida: {
		type: Boolean,
		required: true
	},
})

const NotificacionModel = mongoose.model('Notificacion', PlanSchema)
export default NotificacionModel