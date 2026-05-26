import express from "express"
import { SedeController } from "../controller/SedeController.js";

const sedeController = new SedeController();

const router = express.Router()

router.route('')
    .get(async (req, res) => await sedeController.FindAll(req, res))
    .post(async (req, res) => await sedeController.Create(req, res))

router.route('/:id')
    .get(async (req, res) => await sedeController.FindById(req, res))
    .put(async (req, res) => await sedeController.Update(req, res))


export default router
