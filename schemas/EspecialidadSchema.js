import mongoose from "mongoose";
import Especialidad from "../domain/Especialidad.js";

const EspecialidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    duracionEnMins: {
        type: Number,
        required: true
    },
    costoConsulta: {
        type: Number,
        required: true
    }
});

EspecialidadSchema.loadClass(Especialidad);

export const EspecialidadModel = mongoose.model('Especialidad', EspecialidadSchema)