import UsuarioService from "../service/UsuarioService.js" 

export default class UsuarioController {
    constructor(usuarioService = new UsuarioService) {
        this.usuarioService = usuarioService;
    }

   async Create(req, res) {
        const usuario = await this.usuarioService.Create(req.body);
        return res.status(201).json(usuario)
    }

  async FindAll(req, res) {
    const usuarios = await this.usuarioService.FindAll()

    return res.status(200).json(usuarios); 
  }
}
