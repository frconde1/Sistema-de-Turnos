import z from "zod";
import { stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import { InputError, BadRequestError } 		from "../errors/Errors.js";

import UsuarioRepository from "../repository/UsuarioRepository.js"
import Usuario           from "../domain/Usuario.js";

const usuarioSchema = 
z.object({
    username: stringSchema("username"),
    password: stringSchema("password")
})

export default class UsuarioService {
    constructor(usuarioRepository = new UsuarioRepository()) {
        this.repository = usuarioRepository;
    }

    async FindAll() {
        return await this.repository.FindAll() 
    }

    async FindById(id) {
		const usuario = await this.repository.FindById(id);
		if(usuario == null)
			throw new ResurceNotFoundError("El usuario buscado no existe");
		return usuario;
    }

    async Create(reqBody) {
        ValidarZodSchema(usuarioSchema, reqBody);

        const {username, password} = reqBody;
        const usuario = new Usuario(username, password);

        await this.repository.Save(usuario);
        return usuario;
    }

    async Update(id, reqBody){
        ValidarZodSchema(usuarioSchema, reqBody);
        const {username, password} = reqBody;

        const usuario = await this.repository.FindById(id);

        usuario.username = username;
        usuario.password = password;
        
        await this.repository.Save(usuario);
        return usuario;
    }
}
