import NotificationService from "../service/NotificacionService.js";

export default class NotificacionController {
	constructor(obraSocialService = new NotificationService()){
		this.service = obraSocialService;
	}


	async FindAll(req, res, next) {
		try {
			return res.json(await this.service.FindAll())
		} catch (error) {
			next(error);
		}
	}
	async FindAllById(req, res, next) {
		try {
			return res.json(await this.service.FindAllById(req.params.id))
		} catch (error) {
			next(error);
		}
	}
	async FindLeidasById(req, res, next) {
		try {
			return res.json(await this.service.FindLeidasById(req.params.id))
		} catch (error) {
			next(error);
		}
	}
	async FindNoLeidasById(req, res, next) {
		try {
			return res.json(await this.service.FindNoLeidasById(req.params.id))
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