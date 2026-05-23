import express from "express"
import { SedeController } from "../controller/SedeController.js";

const sedeController = new SedeController();

const router = express.Router()

router.route('')
    .get(async (req, res) => await sedeController.findAll(req, res))
    .post(async (req, res) => await sedeController.create(req, res))

export default router
