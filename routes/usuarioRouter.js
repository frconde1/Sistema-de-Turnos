import express          from "express"
import UsuarioController  from "../controller/UsuarioController.js"

const usuarioController = new UsuarioController();
const router = express.Router();

router.route('')
    .get (async (req, res) => await usuarioController.FindAll(req, res))
    .post(async  (req, res) => await usuarioController.Create(req, res))

export default router;
