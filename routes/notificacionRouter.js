import express from "express"
import NotificacionController from "../controller/NotificacionController.js"

const controller = new NotificacionController();
const router = express.Router();

router.route('')
	.get(async (req, res, next)  => await controller.FindAll(req, res, next))

router.route('/:id')
	.get(async (req, res, next)  => await controller.FindAllById(req, res, next))

router.route('/:id/leidas')
	.get(async (req, res, next) => await controller.FindLeidasById(req, res, next))

router.route('/:id/noLeidas')
	.get(async (req, res, next) => await controller.FindNoLeidasById(req, res, next));

router.route('/:id/noLeidas/:idNot')
	.put(async (req, res, next) => await controller.Leer(req, res, next));

export default router;