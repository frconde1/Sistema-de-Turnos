import mongoose from "mongoose";
import Medico from "../domain/Medico.js"
import { DiaSemana } from "../domain/Enums.js";


const DisponibilidadSchema = new mongoose.Schema({
    diaSemana: {
        type: String,
        enum: Object.values(DiaSemana),
        required: true
    },
    horaDesde: {
        type: String,
        required: true
    },
    horaHasta: {
        type: String,
        required: true
    }
}, { _id: false });



const MedicoSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
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
    disponibilidades: [DisponibilidadSchema],
})



const MedicoModel = mongoose.model('Medico', MedicoSchema);
export default MedicoModel;