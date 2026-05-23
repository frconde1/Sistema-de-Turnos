import mongoose from "mongoose";
import Practica from "../domain/Practica.js";

const PracticaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true
    },
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

PracticaSchema.loadClass(Practica);

export const PracticaModel = mongoose.model('Practica', PracticaSchema)