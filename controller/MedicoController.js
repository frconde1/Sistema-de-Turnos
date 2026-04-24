import { MedicoService } from "../service/MedicoService.js"

export class MedicoController {

    constructor(medicoService = new MedicoService()){
        this.medicoService = medicoService;
    }

    create = (req, res) => {
        var medico = this.medicoService.create(req.body)
        return res.status(201).json({ status: "success", data: medico})
    }
    
    findAll = async (req, res) => {
        res.json(this.medicoService.findAll())
    }
    
    agregarDisponibilidad = (req, res) => {
        this.medicoService.agregarDisponibilidad(req.params.id, req.body)
        return res.status(201).json({ status: "success" })
    }
}