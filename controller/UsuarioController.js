import UsuarioService from "../service/UsuarioService.js" 

export default class UsuarioController {
	constructor(usuarioService = new UsuarioService()) {
		this.service = usuarioService;
	}
	
	async FindAll(req, res) {
		const usuarios = await this.service.FindAll()
		return res.status(200).json(usuarios); 
	}

	async FindById(req, res) {
		const usuarios = await this.service.FindById(req.params.id)
		return res.status(200).json(usuarios); 
	}

	async Create(req, res) {
		const usuario = await this.service.Create(req.body);
		return res.status(201).json(usuario)
	}

	async Update(req, res) {
		const usuario = await this.service.Update(req.params.id, req.body)
		return res.status(200).json(usuario)
	}
}
