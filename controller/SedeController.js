import { SedeService } from "../service/SedeService.js";
import { crearSedeSchema, idSchema } from "./Schemas.js";

export class SedeController {

    constructor(sedeService = new SedeService()){
        this.sedeService = sedeService;
    }

    create = async (req, res) => {
        var respuesta = await this.sedeService.create(req.body)
        return res.status(201).json({ status: "success", data: respuesta})
    }
    
    findAll = async (req, res) => {
        res.json(await this.sedeService.findAll())
    }
}