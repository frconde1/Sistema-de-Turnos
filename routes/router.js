import express from "express"
import medicoRouter from "./medicoRouter.js"
import sedeRouter from "./sedeRouter.js"
import turnoRouter		from "./turnoRouter.js"
import practicaRouter	from "./practicaRouter.js"
import healthRouter from "./healthRouter.js"
import pacienteRouter from "./pacienteRouter.js"

const router = express.Router();

//paths de healthcheck
router.use('/health', healthRouter);

// Configuración de paths bases para cada recurso
router.use('/medicos', medicoRouter)
router.use('/sedes', sedeRouter)
router.use('/turnos',	turnoRouter);
router.use('/practicas', practicaRouter);
router.use('/pacientes', pacienteRouter);

export default router;