import PacienteService from "../service/PacienteService.js";

export default class PacienteController {

    constructor(pacienteService = new PacienteService()) {
        this.pacienteService = pacienteService;
    }


    async FindAll(req, res) {
        const resultado = await this.pacienteService.FindAll();

        return res.status(200).json(resultado);

    }

     async Create(req, res, next)  {
        try {
            const paciente = await this.pacienteService.Create(req.body)
            return res.status(201).json(paciente)
        } catch (error) {
            next(error)
        }
    }
}