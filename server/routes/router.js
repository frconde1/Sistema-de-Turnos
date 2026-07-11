import express from "express"

import medicoRouter 		from "./medicoRouter.js"
import sedeRouter 			from "./sedeRouter.js"
import turnoRouter			from "./turnoRouter.js"
import practicaRouter		from "./practicaRouter.js"
import healthRouter 		from "./healthRouter.js"
import pacienteRouter 		from "./pacienteRouter.js"
import especialidadRouter 	from "./especialidadRouter.js"
import planRouter 			from "./planRouter.js"
import obrasocialRouter 	from "./obrasocialRouter.js"
import usuarioRouter 		from "./usuarioRouter.js"
import notificacionRouter 	from "./notificacionRouter.js"

import { verificarToken } from "../middleware/auth.js"


const router = express.Router();

//paths de healthcheck (sin autenticación)
router.use('/health', healthRouter);

// Configuración de paths bases para cada recurso (protegidos)
router.use('/medicos',			verificarToken, medicoRouter)
router.use('/sedes',			verificarToken, sedeRouter)
router.use('/turnos',			verificarToken, turnoRouter);
router.use('/practicas',		verificarToken, practicaRouter);
router.use('/pacientes',		verificarToken, pacienteRouter);
router.use("/especialidades",	verificarToken, especialidadRouter)
router.use("/planes",			verificarToken, planRouter)
router.use("/obrasSociales",	verificarToken, obrasocialRouter)
router.use('/usuarios', 		usuarioRouter);
router.use('/notificaciones',	verificarToken, notificacionRouter)

export default router;
