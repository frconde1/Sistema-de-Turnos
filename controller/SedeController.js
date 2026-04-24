import { SedeService } from "../service/SedeService.js";

export class SedeController {

    constructor(sedeService = new SedeService()){
        this.sedeService = sedeService;
    }

    create = (req, res) => {
        var respuesta = this.sedeService.create(req.body)
        return res.status(201).json({ status: "success", data: respuesta})
    }
    
    findAll = async (req, res) => {
        res.json(this.sedeService.findAll())
    }
    
}