import mongoose from "mongoose"
import Usuario from "../domain/Usuario.js"

const UsuarioSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }

    

})

UsuarioSchema.loadClass(Usuario);
    
export const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
