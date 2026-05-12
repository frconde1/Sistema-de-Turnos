import express          from "express"
import PracticaController  from "../controller/PracticaController.js"

const practicaController = new PracticaController();
const router = express.Router();

router.route('')
	.get ((req, res) => practicaController.FindAll(req, res))
	.post((req, res) => practicaController.Create(req, res))

export default router;