import InputError 		from "../domain/Errors/InputError.js";
import PracticaService	from "../service/PracticaService.js"

export default class PracticaController {
	
	/** @param {PracticaService} practicaService */
	constructor(practicaService = new PracticaService()){
		this.practicaService = practicaService;
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	Create (req, res) {
		var practicaDTO = this.practicaService.Create(req.body);
		return res.status(201).json({ status: "success", data: practicaDTO});
	}
	
	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll (req, res) {
		return res.json(this.practicaService.FindAll());
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async UpdateStatus(req, res) {
		try {
			let practica = this.practicaService.UpdateStatus(req.params.id, req.body)
			return res.status(200).json({status: "success"}) 

		} catch (error) {
			let codigo = error.code ? error.code : 500;

			return res.status(codigo).json(
				{
					status:error, 
					reason:error.message
				});
		}
	}
}

