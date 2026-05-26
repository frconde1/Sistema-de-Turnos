import NotificationService from "../service/NotificacionService.js";

export default class ObraSocialController {
	constructor(obraSocialService = new NotificationService()){
		this.service = obraSocialService;
	}


	async FindAll(req, res) {
		return res.json(await this.service.FindAll())
	}
	async FindAllById(req, res) {
		return res.json(await this.service.FindAllById(req.params.id))
	}
	async FindLeidasById(req, res) {
		return res.json(await this.service.FindLeidasById(req.params.id))
	}
	async FindNoLeidasById(req, res) {
		return res.json(await this.service.FindNoLeidasById(req.params.id))
	}
	async Leer(req, res) {
		return res.json(await this.service.Leer(req.params.id, req.params.idNot))
	}
}