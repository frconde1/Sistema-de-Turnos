import express from "express"
import medicoRouter from "./medicoRouter.js"
import turnoRouter from "./turnoRouter.js"

const router = express.Router();

// Configuración de paths bases para cada recurso
router.use('/medicos', medicoRouter);
router.use('/turnos', turnoRouter);

export default router;
