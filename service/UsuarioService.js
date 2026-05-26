const usuarioSchema = z.object({
        username: z.string({ required_error: "El nombre de usuario es obligatorio", invalid_type_error: "El nombre de usuario debe ser un string" }).min(1, "El nombre de usuario no puede estar vacío"),
        contraseña: z.string({ required_error: "La contraseña es obligatorio", invalid_type_error: "La contraseña debe ser un string" }).min(1, "La contraseña no puede estar vacío")
})

export default class UsuarioService {
    constructor(usuarioRepository = new UsuarioRepository) {
            this.usuarioRepository = usuarioRepository;
        }

    async Create(reqBody) {
       const resultado = usuarioSchema.safeParse(reqBody);
       if (!resultado.success) {
                   throw new InputError(result.error.issues.map(err => err.message).join(", "));
               }
        const usuario = new Usuario(
            reqBody.username,
            reqBody.password
        )

        return await this.usuarioRepository.Save(usuario);
    }
}