import express from "express"
import PacienteController from "../controller/PacienteController.js"

const pacienteController = new PacienteController();
const router = express.Router();

router.route('')
    .get(async (req, res) => await pacienteController.FindAll(req, res))
    .post(async (req, res, next) => await pacienteController.Create(req, res, next))

router.route('/:id')
    .get(async (req, res) => await pacienteController.FindById(req, res))

export default router;