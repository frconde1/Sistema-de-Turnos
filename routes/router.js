import express from "express"
import medicoRouter from "./medicoRouter.js"
import sedeRouter from "./sedeRouter.js"
import turnoRouter		from "./turnoRouter.js"
import practicaRouter	from "./practicaRouter.js"

const router = express.Router();

// Configuración de paths bases para cada recurso
router.use('/medicos', medicoRouter)
router.use('/sedes', sedeRouter)
router.use('/turnos',	turnoRouter);
router.use('/practicas', practicaRouter);

export default router;