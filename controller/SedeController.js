import SedeService from "../service/SedeService.js";

export class SedeController {

    constructor(sedeService = new SedeService()){
        this.service = sedeService;
    }

    async FindAll(req, res) {
        return res.json(await this.service.FindAll());
    }

    async FindById(req, res) {
        return res.json(await this.service.FindById(req.params.id));
    }

    async Create(req, res) {
        return res.status(201).json(await this.service.Create(req.body));
    }

    async Update(req, res) {
        return res.status(201).json(await this.service.Update(req.params.id, req.body));
    }
}