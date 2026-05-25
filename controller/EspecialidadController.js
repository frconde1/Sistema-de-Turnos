import z from "zod";
import { numberSchema, stringSchema } from "../service/zodSchemas.js";
import EspecialidadService from "../service/EspecialidadService.js";

export default class EspecialidadController {
	constructor(especialidadService = new EspecialidadService()) {
		this.service = especialidadService;
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Create(req, res) {
		let especialidad = await this.service.Create(req.body);
		return res.status(200).json(especialidad)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll(req, res) {
		let especialidades = await this.service.FindAll();
		return res.status(200).json(especialidades)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		let especialidad = await this.service.FindById(req.params.id);
		return res.status(200).json(especialidad)
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		let especialidad = await this.service.Update(req.params.id, req.body);
		return res.status(200).json(especialidad)
	}
}