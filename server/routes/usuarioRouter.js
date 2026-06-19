import express          from "express"
import UsuarioController  from "../controller/UsuarioController.js"

const controller = new UsuarioController();
const router = express.Router();

router.route('')
    .get (async (req, res, next) => await controller.FindAll(req, res, next))
    .post(async  (req, res, next) => await controller.Create(req, res, next))

router.route('/:id')
    .get (async (req, res, next) => await controller.FindById(req, res, next))
    .put (async (req, res, next) => await controller.Update(req, res, next))


export default router;
