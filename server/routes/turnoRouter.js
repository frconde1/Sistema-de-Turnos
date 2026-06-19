import express          from "express"
import TurnoController  from "../controller/TurnoController.js"

const turnoController = new TurnoController();
const router = express.Router();

router.route('')
    .get (async (req, res, next) => await turnoController.FindAll(req, res, next))
    .post(async  (req, res, next) => await turnoController.Create(req, res, next))

router.route('/:id/estado')
    .patch(async (req, res, next) => await turnoController.UpdateStatus(req, res, next))

router.route('/:id')
    .get(   async (req, res, next) => await turnoController.FindById(req, res, next))
    .delete(async (req, res, next) => await turnoController.Delete  (req, res, next))
    .put(   async (req, res, next) => await turnoController.Update  (req, res, next))

router.route('/:id/estados')
    .post(async (req, res, next) => await turnoController.UpdateStatus(req, res, next))

router.route('/:id/fecha')
    .put( async (req, res, next) => await turnoController.updateFecha(req, res, next))


export default router;
