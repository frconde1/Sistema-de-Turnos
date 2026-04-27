import express from "express"
import { MedicoController } from "../controller/MedicoController.js"

const medicoController = new MedicoController();

const router = express.Router()

router.route('')
    .get((req, res) => medicoController.findAll(req, res))
    .post((req, res) => medicoController.create(req, res))

router.route('/:id/disponibilidades')
	.get((req, res) => {})
    .post((req, res, next) => medicoController.agregarDisponibilidad(req, res, next))
    .delete((req, res) => medicoController.eliminarDisponibilidad(req, res))


router.route('/:id/sedes')
    .post((req, res, next) => medicoController.agregarSede(req, res, next))

export default router
