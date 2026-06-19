import UsuarioService from "../service/UsuarioService.js" 

export default class UsuarioController {
	constructor(usuarioService = new UsuarioService()) {
		this.service = usuarioService;
	}
	
	async FindAll(req, res, next) {
		try {
			const usuarios = await this.service.FindAll()
			return res.status(200).json(usuarios); 
		} catch (error) {
			next(error);
		}
	}

	async FindById(req, res, next) {
		try {
			const usuarios = await this.service.FindById(req.params.id)
			return res.status(200).json(usuarios); 
		} catch (error) {
			next(error);
		}
	}

	async Create(req, res, next) {
		try {
			const usuario = await this.service.Create(req.body);
			return res.status(201).json(usuario)
		} catch (error) {
			next(error);
		}
	}

	async Update(req, res, next) {
		try {
			const usuario = await this.service.Update(req.params.id, req.body)
			return res.status(200).json(usuario)
		} catch (error) {
			next(error);
		}
	}
}
