import express 			  from "express"
import PracticaController from "../controller/PracticaController.js"

const practicaController = new PracticaController();
const router = express.Router();

router.route('')
	.get (async (req, res) => await practicaController.FindAll(req, res))
	.post(async (req, res) => await practicaController.Create(req, res))

router.route('/:id')
	.get(async (req, res) => await practicaController.FindById(req, res))
	.put(async (req, res) => await practicaController.Update(req, res))

export default router;