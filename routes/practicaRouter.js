import express 			  from "express"
import PracticaController from "../controller/PracticaController.js"

const practicaController = new PracticaController();
const router = express.Router();

router.route('')
	.get (async (req, res, next) => await practicaController.FindAll(req, res, next))
	.post(async (req, res, next) => await practicaController.Create(req, res, next))

router.route('/:id')
	.get(async (req, res, next) => await practicaController.FindById(req, res, next))
	.put(async (req, res, next) => await practicaController.Update(req, res, next))

export default router;