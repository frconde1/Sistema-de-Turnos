import express from "express"
import { MedicoController } from "../controller/MedicoController.js"

const medicoController = new MedicoController();

const router = express.Router()

router.route('')
    .get((req, res) => medicoController.findAll(req, res))
    .post((req, res) => medicoController.create(req, res))

router.route('/:id/disponibilidades')
	.get((req, res) => {})
    .post((req, res) => medicoController.agregarDisponibilidad(req, res))


export default router
