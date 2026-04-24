import express from "express"
import TurnoController  from "../controller/TurnoController.js"

const turnoController = new TurnoController();

const router = express.Router()

router.route('')
    .get((req, res) => turnoController.findAll(req, res))
    .post((req, res) => turnoController.create(req, res))

router.route('/:id/estado')
    .patch((req, res) => turnoController.updateStatus(req, res))

export default router

