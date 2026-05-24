import mongoose from "mongoose";
import Medico from "../domain/Medico.js"
import DisponibilidadSchema from "./DisponibilidadSchema.js";

const MedicoSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    especialidades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidad'
    }],
    practicas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practica'
    }],
    sedes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede'
    }],
    disponibilidades: [{
        type: DisponibilidadSchema,
        required: false
    }],
})

MedicoSchema.loadClass(Medico);

export const MedicoModel = mongoose.model('Medico', MedicoSchema)