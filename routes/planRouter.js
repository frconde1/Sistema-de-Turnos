import express				from "express"
import PlanController from "../controller/PlanController.js";

const controller = new PlanController();
const router = express.Router();

router.route('')
	.get (async (req, res, next) => await controller.FindAll(req, res, next))
	.post(async (req, res, next) => await controller.Create(req, res, next))

router.route('/:id')
	.get(async (req, res, next) => await controller.FindById(req, res, next))
	.put(async (req, res, next) => await controller.Update(req, res, next))


router.route('/:id/especialidades')
	.get(async (req, res, next) => await controller.FindAllEspecialidades(req, res, next))
	.post(async (req, res, next) => await controller.AddEspecialidad(req, res, next))

router.route('/:id/especialidades/:idEsp')
	.delete(async (req, res, next) => await controller.RemoveEspecialidad(req, res, next))

router.route('/:id/practicas')
	.get(async (req, res, next) => await controller.FindAllPracticas(req, res, next))
	.post(async (req, res, next) => await controller.AddPractica(req, res, next))

router.route('/:id/practicas/:idPra')
	.delete(async (req, res, next) => await controller.RemovePractica(req, res, next))

export default router;