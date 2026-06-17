import PlanService from "../service/PlanService.js";

export default class PlanController{
	constructor(service = new PlanService()){
		this.service = service;
	}

	async FindAll(req, res, next) {
		try {
			return res.status(200).json(await this.service.FindAll());
		} catch (error) {
			next(error);
		}
	}

	async Create(req, res, next) {
		try {
			return res.status(201).json(await this.service.Create(req.body));
		} catch (error) {
			next(error);
		}
	}

	async FindById(req, res, next) {
		try {
			return res.status(200).json(await this.service.FindById(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	async Update(req, res, next) {
		try {
			return res.status(200).json(await this.service.Update(req.params.id, req.body));
		} catch (error) {
			next(error);
		}
	}

	async FindAllEspecialidades(req, res, next) {
		try {
			return res.status(200).json(await this.service.FindAllEspecialidades(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	async AddEspecialidad(req, res, next) {
		try {
			return res.status(200).json(await this.service.AddEspecialidad(req.params.id, req.body));
		} catch (error) {
			next(error);
		}
	}

	async RemoveEspecialidad(req, res, next) {
		try {
			return res.status(200).json(await this.service.RemoveEspecialidad(req.params.id, req.params.idEsp));
		} catch (error) {
			next(error);
		}
	}

	async FindAllPracticas(req, res, next) {
		try {
			return res.status(200).json(await this.service.FindAllPracticas(req.params.id));
		} catch (error) {
			next(error);
		}
	}

	async AddPractica(req, res, next) {
		try {
			return res.status(200).json(await this.service.AddPractica(req.params.id, req.body));
		} catch (error) {
			next(error);
		}
	}

	async RemovePractica(req, res, next) {
		try {
			return res.status(200).json(await this.service.RemovePractica(req.params.id, req.params.idPra));
		} catch (error) {
			next(error);
		}
	}

}