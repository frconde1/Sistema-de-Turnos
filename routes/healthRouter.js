import express from "express";
import { healthController } from "../controller/HealthController.js";

const router = express.Router();

router.get("/", healthController.health);

export default router;