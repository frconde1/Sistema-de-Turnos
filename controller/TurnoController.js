import  TurnoService  from "../service/TurnoService.js"

export default class TurnoController {

    constructor(turnoService = new TurnoService()){
        this.turnoService = turnoService;
    }

    create = (req, res) => {
        var turno = this.turnoService.create(req.body)
        return res.status(201).json({ status: "success", data: turno})
    }
    
    findAll = async (req, res) => {
        res.json(this.turnoService.findAll())
    }
    updateStatus = async (req, res) => {
      try {
        let turno = this.turnoService.updateStatus(req.params.id, req.body)
        return res.status(200).json({status: "success"}) 
      } catch (error) {
        return res.status(404).json({status:"Error", reason:error.message});

      }
    }
    
}

