import express from "express"
import PacienteController from "../controller/PacienteController.js"

const controller = new PacienteController();
const router = express.Router();

router.route('')
    .get(async (req, res)  => await controller.FindAll(req, res))
    .post(async (req, res) => await controller.Create(req, res))

router.route('/:id')
    .get(async (req, res) => await controller.FindById(req, res))
    .put(async (req, res) => await controller.Update(req, res))


router.route('/:id/turnos')
    .get(async (req, res) => await controller.FindTurnosById(req, res));

router.route('/:id/obraSocial')
    .put(async (req, res) => await controller.UpdateObraSocial(req, res));

router.route('/:id/plan')
    .put(async (req, res) => await controller.UpdateObraPlan(req, res));



export default router;