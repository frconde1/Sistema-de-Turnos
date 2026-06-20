import z from "zod";
import { stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import { InputError, BadRequestError, ResourceNotFoundError } 		from "../errors/Errors.js";

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
			throw new ResourceNotFoundError("El usuario buscado no existe");
		return usuario;
    }

    async Create(reqBody) {
        ValidarZodSchema(usuarioSchema, reqBody);

        const {username, password} = reqBody;
        const usuario = new Usuario(username, password);

        return await GuardarUsuario(usuario);
    }

    /** @param {Usuario} usuario */
    async GuardarUsuario(usuario){
        if(await this.repository.existeUsuario(usuario.username))
            throw new InputError("el usuario ya existe");
        return await this.repository.Save(usuario);
    }

    async Update(id, reqBody){
        ValidarZodSchema(usuarioSchema, reqBody);
        const {username, password} = reqBody;

        const usuario = await this.repository.FindById(id);

        usuario.username = username;
        usuario.password = password;
        
        try {
            await this.repository.Save(usuario);
        } catch (e) {
            if(e.code == 11000)
                throw new InputError("El usuario ya existe");
            throw e;
        }
        return usuario;
    }

    async actualizar(usuario){
        await this.repository.Save(usuario);
    }

    async Login(reqBody){
        ValidarZodSchema(usuarioSchema, reqBody);
        const usuario = await this.repository.FindByUsername(reqBody.username);
        if(!usuario || usuario.password != reqBody.password)
            throw new InputError("el usuario o contraseña no existe")
        return {rol: usuario.rol, id: usuario.id};
    }
}
