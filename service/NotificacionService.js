import z from "zod";
import { BadRequestError } from "../errors/Errors.js";
import NotificationRepository from "../repository/NotificationRepository.js";
import UsuarioService from "./UsuarioService.js";
import { idSchema, stringSchema, ValidarZodSchema } from "./zodSchemas.js";
import Notificacion from "../domain/Notificacion.js";


const crearNotificacionSchema = 
	z.object({
		destinatario: idSchema("usuario destinatario"),
		remitente: idSchema("usuario remitente"),
		mensaje: stringSchema("mensaje")
	})

export default class NotificationService{
	constructor(
		repository = new NotificationRepository(), 
		usuarioService = new UsuarioService()
	){
		this.repository 	= repository,
		this.usuarioService = usuarioService
	}

	async FindAll(filter) {
		return await this.repository.FindAll(filter);
	}

	async FindAllById(id) {
		return await this.repository.FindAllById(id);
	}

	async FindLeidasById(id) {
		return await this.repository.FindAllById(id, {leida: true});
	}

	async FindNoLeidasById(id) {
		return await this.repository.FindAllById(id, {leida: false});
	}

	async Leer(id, idNot) {
		const usuario = await this.usuarioService.FindById(id);
		const notificacion = await this.repository.FindById(idNot);
		
		if(notificacion.remitente.id != usuario.id)
			throw new BadRequestError("la notifiacion no le pertenece al usuario");

		notificacion.marcarComoLeida()
		await this.repository.Save(notificacion)
		return notificacion;
	}

	async Crear(request){
		ValidarZodSchema(request);
		
		const usuarioDestinatario = this.usuarioService.FindById(request.destinatario);
		const usuarioRemitente 	  = this.usuarioService.FindById(request.remitente);
		
		const notifiacion = new Notificacion(
			usuarioDestinatario,
			usuarioRemitente,
			request.mensaje,
			new Date()
		);

		await this.repository.Save(notifiacion);
	}
}