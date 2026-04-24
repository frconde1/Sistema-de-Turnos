import express from "express"
import { SedeController } from "../controller/SedeController.js";

const sedeController = new SedeController();

const router = express.Router()

router.route('')
    .get((req, res) => sedeController.findAll(req, res))
    .post((req, res) => sedeController.create(req, res))

export default router
