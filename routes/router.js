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


const router = express.Router();

//paths de healthcheck
router.use('/health', healthRouter);

// Configuración de paths bases para cada recurso
router.use('/medicos',			medicoRouter)
router.use('/sedes',			sedeRouter)
router.use('/turnos',			turnoRouter);
router.use('/practicas',		practicaRouter);
router.use('/pacientes',		pacienteRouter);
router.use("/especialidades",	especialidadRouter)
router.use("/planes",			planRouter)
router.use("/obrasSociales",	obrasocialRouter)
router.use('/usuarios', 		usuarioRouter);


export default router;
