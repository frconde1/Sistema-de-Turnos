import ObraSocialService from "../service/ObraSocialService.js";

export default class ObraSocialController {
	constructor(obraSocialService = new ObraSocialService()){
		this.service = obraSocialService;
	}


	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll(req, res) {
		return res.json(await this.service.FindAll());
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		return res.json(await this.service.FindById(req.params.id));
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Create(req, res) {
		return res.json(await this.service.Create(req.body));
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		return res.json(await this.service.Update(req.params.id, req.body));
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async AgregarPlan(req, res) {
		return res.json(await this.service.AgregarPlan(req.params.id, req.body));
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async EliminarPlan(req, res) {
		return res.json(await this.service.EliminarPlan(req.params.id, req.params.idPlan));
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAllPlanes(req, res) {
		return res.json(await this.service.FindAllPlanes(req.params.id));
	}

}