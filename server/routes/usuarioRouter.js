import express          from "express"
import UsuarioController  from "../controller/UsuarioController.js"
import { verificarToken } from "../middleware/auth.js"

const controller = new UsuarioController();
const router = express.Router();

router.route('/login')
    .post(async (req, res) => await controller.Login(req, res))

router.use(verificarToken)

router.route('')
    .get (async (req, res) => await controller.FindAll(req, res))
    .post(async (req, res) => await controller.Create(req, res))

router.route('/:id')
    .get (async (req, res) => await controller.FindById(req, res))
    .put (async (req, res) => await controller.Update(req, res))


export default router;
