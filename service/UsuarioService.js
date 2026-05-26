import UsuarioRepository from "../repository/UsuarioRepository.js"
import z from "zod/v3";
import { UsuarioModel } from "../schemas/UsuarioSchema.js";
import { InputError, BadRequestError } 		from "../errors/Errors.js";
import Usuario from "../domain/Usuario.js";

const usuarioSchema = z.object({
        username: z.string({ required_error: "El nombre de usuario es obligatorio", invalid_type_error: "El nombre de usuario debe ser un string" }).min(1, "El nombre de usuario no puede estar vacío"),
        password: z.string({ required_error: "La contraseña es obligatorio", invalid_type_error: "La contraseña debe ser un string" }).min(1, "La contraseña no puede estar vacío")
})

export default class UsuarioService {
    constructor(usuarioRepository = new UsuarioRepository) {
            this.usuarioRepository = usuarioRepository;
        }

    async Create(reqBody) {
       const resultado = usuarioSchema.safeParse(reqBody);
       if (!resultado.success) {
                   throw new InputError(resultado.error.issues.map(err => err.message).join(", "));
               }
        const usuario = new Usuario(
            null,
            reqBody.username,
            reqBody.password
        )

        return await this.usuarioRepository.Save(usuario);
    }

  async FindAll() {
   return await this.usuarioRepository.FindAll() 
  }
}
