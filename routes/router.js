import express from "express"
import medicoRouter from "./medicoRouter.js"

const router = express.Router()

// Configuración de paths bases para cada recurso
router.use('/medicos', medicoRouter)

export default router