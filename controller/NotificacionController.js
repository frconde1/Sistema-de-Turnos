import NotificationService from "../service/NotificacionService.js";

export default class NotificacionController {
	constructor(obraSocialService = new NotificationService()){
		this.service = obraSocialService;
	}


	async FindAll(req, res, next) {
		try {
			return res.json(await this.service.FindAll(req.query))
		} catch (error) {
			next(error);
		}

	}
	async Leer(req, res, next) {
		try {
			return res.json(await this.service.Leer(req.params.id, req.params.idNot))
		} catch (error) {
			next(error);
		}
	}
}
