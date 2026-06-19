import mongoose from "mongoose";
import { NivelCobertura } from "../domain/Enums.js";


const CoberturaEspecialidadSchema = new mongoose.Schema({
    especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especialidad',
		required: true
    },
    cobertura: {
        type: String,
        enum: Object.values(NivelCobertura),
		required: true
    }
}, { _id: false });

const CoberturaPracticaSchema = new mongoose.Schema({
    practica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practica',
		required: true
    },
    cobertura: {
        type: String,
        enum: Object.values(NivelCobertura),
		required: true
    }
}, { _id: false });


const PlanSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	coberturasEspecialidad: [CoberturaEspecialidadSchema],
	coberturasPractica: [CoberturaPracticaSchema]
})

const PlanModel = mongoose.model('Plan', PlanSchema)
export default PlanModel