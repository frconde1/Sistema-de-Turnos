import mongoose from "mongoose";
import Medico from "../domain/Medico.js"

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
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'DisponibilidadHoraria', //como no voy a usar a disponibilidad horaria como una entidad diferente le saco el ref
        required: false
    }],
})

MedicoSchema.loadClass(Medico);

export const MedicoModel = mongoose.model('Medico', MedicoSchema)