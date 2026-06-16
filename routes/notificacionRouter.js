import express from "express"
import NotificacionController from "../controller/NotificacionController.js"

const controller = new NotificacionController();
const router = express.Router();

router.route('')
	.get(async (req, res, next)  => await controller.FindAll(req, res, next))

router.route('/:idNot')
	.put(async (req, res, next) => await controller.Leer(req, res, next));

export default router;
