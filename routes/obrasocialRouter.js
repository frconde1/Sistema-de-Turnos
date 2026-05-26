import express				from "express"
import ObraSocialController from "../controller/ObraSocialController.js";

const controller = new ObraSocialController();
const router = express.Router();

router.route('')
	.get (async (req, res) => await controller.FindAll(req, res))
	.post(async (req, res) => await controller.Create(req, res))

router.route('/:id')
	.get(async (req, res) => await controller.FindById(req, res))
	.put(async (req, res) => await controller.Update(req, res))


router.route('/:id/planes')
	.get(async (req, res) => await controller.FindAllPlanes(req, res))
	.post(async (req, res) => await controller.AgregarPlan(req, res))

router.route('/:id/planes/:idPlan')
	.delete(async (req, res) => await controller.EliminarPlan(req, res))


export default router;