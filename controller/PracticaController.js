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
	async Create(req, res, next) {
		try {
			let practica = await this.service.Create(req.body);
			return res.status(200).json(practica)
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll(req, res, next) {
		try {
			let practicas = await this.service.FindAll();
			return res.status(200).json(practicas)
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res, next) {
		try {
			let practica = await this.service.FindById(req.params.id);
			return res.status(200).json(practica)
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res, next) {
		try {
			let practica = await this.service.Update(req.params.id, req.body);
			return res.status(200).json(practica)
		} catch (error) {
			next(error);
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Delete(req, res, next) {
		try {
			await this.service.Delete(req.params.id);
			return res.status(200).json({ message: "Practica eliminada" });
		} catch (error) {
			next(error);
		}
	}
}