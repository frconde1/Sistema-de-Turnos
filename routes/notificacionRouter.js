import express from "express"
import NotificacionController from "../controller/NotificacionController.js"

const controller = new NotificacionController();
const router = express.Router();

router.route('')
	.get(async (req, res)  => await controller.FindAll(req, res))

router.route('/:id')
	.get(async (req, res)  => await controller.FindAllById(req, res))

router.route('/:id/leidas')
	.get(async (req, res) => await controller.FindLeidasById(req, res))

router.route('/:id/noLeidas')
	.get(async (req, res) => await controller.FindNoLeidasById(req, res));

router.route('/:id/noLeidas/:idNot')
	.put(async (req, res) => await controller.Leer(req, res));

export default router;