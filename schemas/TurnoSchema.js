import mongoose from "mongoose";
import Turno 	from "../domain/Turno.js";
import { EstadoTurno } from "../domain/Enums.js";

const CambioEstadoSchema = new mongoose.Schema({
    fechaHora: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: Object.values(EstadoTurno),
        required: true
    },
    turno: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Turno', 
        required: true 
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    motivo: {
        type: String,
        required: true
    }
}, { _id: false });


const TurnoSchema = new mongoose.Schema({
    medico: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medico', 
        required: true 
    },
    paciente: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente', 
        required: true 
    },
    fechaHora: { 
        type: Date, 
        required: true 
    },
    sede: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sede', 
        required: true 
    },
    practica: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Practica', 
        required: true 
    },
    estado: { 
        type: String,
        enum: Object.values(EstadoTurno),
        required: true
    },
    historialEstados: [
        CambioEstadoSchema
    ],
    costo: {
        type: Number, 
        required: true 
    }
});

const TurnoModel = mongoose.model('Turno', TurnoSchema);

export default TurnoModel;