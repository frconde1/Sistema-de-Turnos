import mongoose from "mongoose";
import Paciente from "../domain/Paciente.js";

const PacienteSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }, 
    obraSocial: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    }
});

PacienteSchema.loadClass(Paciente);

export const PacienteModel = mongoose.model('Paciente', PacienteSchema)