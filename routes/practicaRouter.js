import express          from "express"
import PracticaController  from "../controller/PracticaController.js"

const practicaController = new PracticaController();
const router = express.Router();

router.route('')
	.get (async (req, res) => await practicaController.FindAll(req, res))
	.post(async (req, res) => await practicaController.Create(req, res))

export default router;