import z from "zod";
import { BadRequestError, InputError } from "../errors/Errors.js";
import NotificationRepository from "../repository/NotificationRepository.js";
import UsuarioService from "./UsuarioService.js";
import { idSchema, stringSchema, ValidarZodSchema, paginacionSchema } from "./zodSchemas.js";
import Notificacion from "../domain/Notificacion.js";


const filtrosNotificacionesSchema =
	z.object({
    remitente:    idSchema("remitente")   .optional(),
    destinatario: idSchema("destinatario").optional(),
    leida:  z.coerce.boolean("leida debe ser un booleano (leida o no leida)").optional()
	})


export default class NotificationService{
	constructor(
		repository = new NotificationRepository(), 
		usuarioService = new UsuarioService()
	){
		this.repository 	= repository,
		this.usuarioService = usuarioService
	}

	async FindAll(filtros) {
    
		ValidarZodSchema(filtrosNotificacionesSchema, filtros);
		ValidarZodSchema(paginacionSchema,   filtros);
		return await this.repository.FindAll(filtros);
	}
	async Leer(id, idNot) {
		const usuario = await this.usuarioService.FindById(id);
		const notificacion = await this.repository.FindById(idNot);
		
		if(notificacion.destinatario.id != usuario.id)
			throw new InputError("la notifiacion no le pertenece al usuario");

		notificacion.marcarComoLeida()
		await this.repository.Save(notificacion)
		return notificacion;
	}

	async Crear(notificacion){
		await this.repository.Save(notificacion);
	}
}
