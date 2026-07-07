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
	async FindAll(req, res, next) {
		try {
			let obrasSociales = await this.service.FindAll();
			return res.status(200).json(obrasSociales)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res, next) {
		try {
			let obraSocial = await this.service.FindById(req.params.id);
			return res.status(200).json(obraSocial)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Create(req, res, next) {
		try {
			let obraSocial = await this.service.Create(req.body);
			return res.status(201).json(obraSocial)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res, next) {
		try {
			let obraSocial = await this.service.Update(req.params.id, req.body);
			return res.status(200).json(obraSocial)
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async AgregarPlan(req, res, next) {
		try {
			return res.json(await this.service.AgregarPlan(req.params.id, req.body));
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async EliminarPlan(req, res, next) {
		try {
			return res.json(await this.service.EliminarPlan(req.params.id, req.params.idPlan));
		} catch (error) {
			next(error)
		}
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAllPlanes(req, res, next) {
		try {
			return res.json(await this.service.FindAllPlanes(req.params.id));
		} catch (error) {
			next(error)
		}
	}

	async FindPrecio(req, res, next) {
		try {
			const { id, idPractica } = req.params;
			return res.json(await this.service.FindPrecio(id, idPractica));
		} catch (error) {
			next(error)
		}
	}

}