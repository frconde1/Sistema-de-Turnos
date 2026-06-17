import mongoose from "mongoose";

const ObraSocialSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	planes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Plan',
		required: true
	}]
});

const ObraSocialModel = mongoose.model('ObraSocial', ObraSocialSchema);

export default ObraSocialModel;