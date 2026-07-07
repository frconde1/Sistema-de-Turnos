import express				from "express"
import ObraSocialController from "../controller/ObraSocialController.js";

const controller = new ObraSocialController();
const router = express.Router();

router.route('')
	.get (async (req, res, next) => await controller.FindAll(req, res, next))
	.post(async (req, res, next) => await controller.Create(req, res, next))

router.route('/:id')
	.get(async (req, res, next) => await controller.FindById(req, res, next))
	.put(async (req, res, next) => await controller.Update(req, res, next))


router.route('/:id/planes')
	.get(async (req, res, next) => await controller.FindAllPlanes(req, res, next))
	.post(async (req, res, next) => await controller.AgregarPlan(req, res, next))

router.route('/:id/planes/:idPlan')
	.delete(async (req, res, next) => await controller.EliminarPlan(req, res, next))
router.route('/:id/practicas/:idPractica')
	.get(async (req, res, next) => await controller.FindPrecio(req, res, next))



export default router;