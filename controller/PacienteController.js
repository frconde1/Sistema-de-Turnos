import PacienteService from "../service/PacienteService.js";

export default class PacienteController {

    constructor(pacienteService = new PacienteService()) {
        this.pacienteService = pacienteService;
    }


    async FindAll(req, res, next) {
        try {
            const resultado = await this.pacienteService.FindAll();
            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async FindById(req, res, next) {
        try {
            const resultado = await this.pacienteService.FindById(req.params.id);
            return res.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }

    async Create(req, res, next) {
        try {
            const paciente = await this.pacienteService.Create(req.body);
            return res.status(201).json(paciente);
        } catch (error) {
            next(error);
        }
    }

    async Update(req, res, next) {
        try {
            const paciente = await this.pacienteService.Update(req.params.id, req.body);
            return res.status(200).json(paciente);
        } catch (error) {
            next(error);
        }
    }

    async FindTurnosById(req, res, next){
        try {
            const turnos = await this.pacienteService.FindTurnosById(req.params.id);
            return res.status(200).json(turnos);
        } catch (error) {
            next(error);
        }
    }


    async UpdateObraSocial(req, res, next){
        try {
            const paciente = await this.pacienteService.UpdateObraSocial(req.params.id, req.body);
            return res.status(200).json(paciente);
        } catch (error) {
            next(error);
        }
    }

    async UpdateObraPlan(req, res, next){
        try {
            const paciente = await this.pacienteService.UpdatePlan(req.params.id, req.body);
            return res.status(200).json(paciente);
        } catch (error) {
            next(error);
        }
    }

}