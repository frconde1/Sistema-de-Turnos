import TurnoService	from "../service/TurnoService.js"

export default class TurnoController {
	
	/** @param {TurnoService} turnoService */
	constructor(turnoService = new TurnoService()){
		this.turnoService = turnoService;
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	Create (req, res) {
		const turnoDTO = this.turnoService.Create(req.body);
		return res.status(201).json({ status: "success", data: turnoDTO});
	}
	
	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll (req, res) {
		return res.status(200).json({status: "succes", data: this.turnoService.FindAll()});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Delete(req, res) {
		this.turnoService.Delete(req.params.id);
		return res.status(200).json({status: "succes"});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		const turnoDTO = this.turnoService.Find(req.params.id);
		return res.status(200).json({status: "succes", data: turnoDTO});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		let turnoDTO = this.turnoService.Update(req.params.id, req.body);
		return res.status(200).json({status: "succes", data: turnoDTO});
	}
}

