import mongoose from "mongoose";
import Turno 	from "../domain/Turno.js";


const TurnoSchema = new mongoose.Schema({
    medico: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Medico', required: true 
    },
    
    paciente:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente', required: true 

     },
    fechaHora: { 
        type: Date, required: true 
    },
    sede: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Sede', 
        required: true 
    },
    practica: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Practica', required: true 
        },
    estado: { 
        type: String, required: true 
    },
    historialEstados: 
    [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'CambioEstadoTurno' }],
    costo: {
         type: Number, required: true 
        }



});

TurnoSchema.loadClass(Turno);
    
export const TurnoModel = mongoose.model('Turno', TurnoSchema);