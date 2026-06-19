import express from "express"
import PacienteController from "../controller/PacienteController.js"

const controller = new PacienteController();
const router = express.Router();

router.route('')
    .get(async (req, res, next)  => await controller.FindAll(req, res, next))
    .post(async (req, res, next) => await controller.Create(req, res, next))

router.route('/:id')
    .get(async (req, res, next) => await controller.FindById(req, res, next))
    .put(async (req, res, next) => await controller.Update(req, res, next))


router.route('/:id/turnos')
    .get(async (req, res, next) => await controller.FindTurnosById(req, res, next));

router.route('/:id/obraSocial')
    .put(async (req, res, next) => await controller.UpdateObraSocial(req, res, next));

router.route('/:id/plan')
    .put(async (req, res, next) => await controller.UpdateObraPlan(req, res, next));



export default router;