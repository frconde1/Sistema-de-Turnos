import PracticaService from "../service/PracticaService.js"
import { numberSchema, stringSchema } from "../service/zodSchemas.js";

export default class PracticaController {
	constructor(practicaService = new PracticaService()) {
		this.service = practicaService;
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Create(req, res) {
		let practica = await this.service.Create(req.body);
		return res.status(200).json(practica)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll(req, res) {
		let practicas = await this.service.FindAll();
		return res.status(200).json(practicas)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		let practica = await this.service.FindById(req.params.id);
		return res.status(200).json(practica)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		let practica = await this.service.Update(req.params.id, req.body);
		return res.status(200).json(practica)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Delete(req, res) {
		await this.service.Delete(req.params.id);
	}
}