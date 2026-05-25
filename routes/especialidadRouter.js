import express				  from "express"
import EspecialidadController from "../controller/EspecialidadController.js";


const especialidadcontroller = new EspecialidadController();
const router = express.Router();

router.route('')
	.get (async (req, res) => await especialidadcontroller.FindAll(req, res))
	.post(async (req, res) => await especialidadcontroller.Create(req, res))

router.route('/:id')
	.get(async (req, res) => await especialidadcontroller.FindById(req, res))
	.put(async (req, res) => await especialidadcontroller.Update(req, res))


export default router;