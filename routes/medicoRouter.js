import express from "express"
import { MedicoController } from "../controller/MedicoController.js"

const medicoController = new MedicoController();

const router = express.Router()

router.route('')
    .get((req, res, next) => medicoController.findAll(req, res, next))
    .post((req, res, next) => medicoController.create(req, res, next))

router.route('/:id/disponibilidades')
    .post((req, res, next) => medicoController.agregarDisponibilidad(req, res, next))
    .delete((req, res) => medicoController.eliminarDisponibilidad(req, res))


router.route('/:id/sedes')
    .post((req, res, next) => medicoController.agregarSede(req, res, next))

export default router
