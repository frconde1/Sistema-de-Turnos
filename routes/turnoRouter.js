import express          from "express"
import TurnoController  from "../controller/TurnoController.js"

const turnoController = new TurnoController();
const router = express.Router();

router.route('')
    .get ((req, res) => turnoController.FindAll(req, res))
    .post((req, res) => turnoController.Create(req, res))

router.route('/:id')
    .get((req, res) => turnoController.FindById(req, res))
    .delete((req, res) => turnoController.Delete(req, res))
    .patch((req, res) => turnoController.Update(req, res))

export default router;