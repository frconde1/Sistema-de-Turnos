export default class UsuarioController {
    constructor(usuarioService = new UsuarioService) {
        this.usuarioService = usuarioService;
    }

   async Create(req, res) {
        const usuario = await this.usuarioService.Create(req.body);
        return res.status(201).json(usuario)
    }
}