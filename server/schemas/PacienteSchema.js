import mongoose from "mongoose";
import Paciente from "../domain/Paciente.js";

const PacienteSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ObraSocial', 
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plan', 
    }
});


const PacienteModel = mongoose.model('Paciente', PacienteSchema)
export default PacienteModel;