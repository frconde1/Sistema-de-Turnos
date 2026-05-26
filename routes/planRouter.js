import express				from "express"
import PlanController from "../controller/PlanController.js";

const controller = new PlanController();
const router = express.Router();

router.route('')
	.get (async (req, res) => await controller.FindAll(req, res))
	.post(async (req, res) => await controller.Create(req, res))

router.route('/:id')
	.get(async (req, res) => await controller.FindById(req, res))
	.put(async (req, res) => await controller.Update(req, res))


router.route('/:id/especialidades')
	.get(async (req, res) => await controller.FindAllEspecialidades(req, res))
	.post(async (req, res) => await controller.AddEspecialidad(req, res))

router.route('/:id/especialidades/:idEsp')
	.delete(async (req, res) => await controller.RemoveEspecialidad(req, res))

	
router.route('/:id/practicas')
	.get(async (req, res) => await controller.FindAllPracticas(req, res))
	.post(async (req, res) => await controller.AddPractica(req, res))

router.route('/:id/practicas/:idPra')
	.delete(async (req, res) => await controller.RemovePractica(req, res))

export default router;