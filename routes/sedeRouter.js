import express from "express"
import { SedeController } from "../controller/SedeController.js";

const sedeController = new SedeController();

const router = express.Router()

router.route('')
    .get((req, res) => sedeController.FindAll(req, res))
    .post((req, res) => sedeController.Create(req, res))

export default router
