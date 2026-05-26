import PlanService from "../service/PlanService.js";

export default class PlanController{
	constructor(service = new PlanService()){
		this.service = service;
	}

	async FindAll(req, res) {
		return res.status(200).json(await this.service.FindAll());
	}

	async Create(req, res) {
		return res.status(201).json(await this.service.Create(req.body));
	}

	async FindById(req, res) {
		return res.status(200).json(await this.service.FindById(req.params.id));
	}

	async Update(req, res) {
		return res.status(200).json(await this.service.Update(req.params.id, req.body));
	}

	async FindAllEspecialidades(req, res) {
		return res.status(200).json(await this.service.FindAllEspecialidades(req.params.id));
	}

	async AddEspecialidad(req, res) {
		return res.status(200).json(await this.service.AddEspecialidad(req.params.id, req.body));
	}

	async RemoveEspecialidad(req, res) {
		return res.status(200).json(await this.service.RemoveEspecialidad(req.params.id, req.params.idEsp));
	}

	async FindAllPracticas(req, res) {
		return res.status(200).json(await this.service.FindAllPracticas(req.params.id));
	}

	async AddPractica(req, res) {
		return res.status(200).json(await this.service.AddPractica(req.params.id, req.body));
	}

	async RemovePractica(req, res) {
		return res.status(200).json(await this.service.RemovePractica(req.params.id, req.params.idPra));
	}

}