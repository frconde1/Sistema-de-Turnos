import express          from "express"
import TurnoController  from "../controller/TurnoController.js"

const turnoController = new TurnoController();
const router = express.Router();

router.route('')
    .get (async (req, res) => await turnoController.FindAll(req, res))
    .post(async  (req, res) => await turnoController.Create(req, res))
    
router.route('/:id/estado')
    .patch(async (req, res) => await turnoController.UpdateStatus(req, res))

router.route('/:id')
    .get(   async (req, res) => await turnoController.FindById(req, res))
    .delete(async (req, res) => await turnoController.Delete  (req, res))
    .put(   async (req, res) => await turnoController.Update  (req, res))

router.route('/:id/estados')
    .post(async (req, res) => await turnoController.UpdateStatus(req, res))

router.route('/:id/fecha')
    .put( async (req, res) => await turnoController.updateFecha(req, res))


export default router;
