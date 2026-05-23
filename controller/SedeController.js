import { SedeService } from "../service/SedeService.js";
import { crearSedeSchema, idSchema } from "./Schemas.js";

export class SedeController {

    constructor(sedeService = new SedeService()){
        this.sedeService = sedeService;
    }

<<<<<<< HEAD
    Create(req, res){
        return res.status(201).json(this.sedeService.create(req.body))
    }
    
    FindAll(req, res) {
        return res.json(this.sedeService.findAll())
    }

    FindById(req, res){
        return res.json(this.sedeService.FindById(idSchema(req.data.id)))
=======
    create = async (req, res) => {
        var respuesta = await this.sedeService.create(req.body)
        return res.status(201).json({ status: "success", data: respuesta})
    }
    
    findAll = async (req, res) => {
        res.json(await this.sedeService.findAll())
>>>>>>> develop
    }
}