import express from "express"
import medicoRouter from "./medicoRouter.js"
import sedeRouter from "./sedeRputer.js"

const router = express.Router()

// Configuración de paths bases para cada recurso
router.use('/medicos', medicoRouter)
router.use('/sedes', sedeRouter)

export default router