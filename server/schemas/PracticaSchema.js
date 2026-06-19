import mongoose from "mongoose";

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
    costo: {
        type: Number,
        required: true
    }
});

const PracticaModel = mongoose.model('Practica', PracticaSchema);

export default PracticaModel;