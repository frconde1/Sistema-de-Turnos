import SedeService from "../service/SedeService.js";

export class SedeController {

    constructor(sedeService = new SedeService()){
        this.service = sedeService;
    }

    async FindAll(req, res, next) {
        try {
            return res.json(await this.service.FindAll());
        } catch (error) {
            next(error);
        }
    }

    async FindById(req, res, next) {
        try {
            return res.json(await this.service.FindById(req.params.id));
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

    async Update(req, res, next) {
        try {
            return res.status(201).json(await this.service.Update(req.params.id, req.body));
        } catch (error) {
            next(error);
        }
    }
}