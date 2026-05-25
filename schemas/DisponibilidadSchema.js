import mongoose from "mongoose"

const DisponibilidadSchema = new mongoose.Schema({
    diaSemana: {
        type: String,
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

export default DisponibilidadSchema