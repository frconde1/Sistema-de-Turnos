import express from "express"
import { SedeController } from "../controller/SedeController.js";

const sedeController = new SedeController();

const router = express.Router()

router.route('')
    .get(async (req, res, next) => await sedeController.FindAll(req, res, next))
    .post(async (req, res, next) => await sedeController.Create(req, res, next))

router.route('/:id')
    .get(async (req, res, next) => await sedeController.FindById(req, res, next))
    .put(async (req, res, next) => await sedeController.Update(req, res, next))


export default router
