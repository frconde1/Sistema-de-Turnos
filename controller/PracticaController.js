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
		const practica = this.practicaService.Create(req.body);
		return res.status(201).json({ status: "success", data: practica});
	}
}

