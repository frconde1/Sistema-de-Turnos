import express				  from "express"
import EspecialidadController from "../controller/EspecialidadController.js";


const especialidadcontroller = new EspecialidadController();
const router = express.Router();

router.route('')
	.get (async (req, res, next) => await especialidadcontroller.FindAll(req, res, next))
	.post(async (req, res, next) => await especialidadcontroller.Create(req, res, next))

router.route('/:id')
	.get(async (req, res, next) => await especialidadcontroller.FindById(req, res, next))
	.put(async (req, res, next) => await especialidadcontroller.Update(req, res, next))


export default router;