import {z} from "zod"
import { EstadoTurno } from "../domain/Enums.js";
import { InputError } from "../errors/Errors.js";


//////////////////////
//	    COMMONS		//
//////////////////////

const fecha = () => z.iso.datetime({offset: true, message: "la fecha debe ser en formato iso YYYY-MM-DDTHH:mm:ss-03:00"})

const validar = (schema = z.object().optional(), entity = {}) => {
	const parsedSchema = schema.safeParse(entity);
	if(parsedSchema.error)
		throw new InputError(parsedSchema.error.issues[0].message);
	return parsedSchema.data;
}

const id = (name = "") =>{
	return z.string({
		error: (i) => i.input === undefined? 
			`el dato ${name} debe existir y ser el id de ${name}` : 
			`el dato ${name} debe ser un ID de tipo string`
		})
	.nonempty({message: `el dato ${name} no puede ser un ID vacío`})
}

const string = (name = "") => {
	z.string({
		error: (i) => i.input === undefined? 
			`el dato ${name} debe existir` : 
			`el dato ${name} debe ser un string`
	})
	.nonempty({message: `el dato ${name} no puede ser un string vacío`})
}

export const idSchema = (entity = "", value) => validar(id(entity), value)


export const stringSchema = (entity = "", value)=> validar(string(entity), value)


export const paginacionSchema = (entity) => validar(
	z.object({
		page:  z.number("el dato pagina debe ser un número").optional().default( 1),
		limit: z.number("el dato límite debe ser un número").optional().default(10)
	}),
	entity
);

//////////////////////
//	    SEDES		//
//////////////////////

export const crearSedeSchema = (entity) => validar(
	z.object({
    	nombre:    string("nombre"),
    	direccion: string("direccion")
	}),
	entity
)

//////////////////////
//	    TURNOS		//
//////////////////////

export const crearTurnoSchema = (entity) => validar(
	z.object({
		medico: 	id("medico"),
		sede: 		id("sede"),
		paciente:	id("paciente"),
		practica: 	id("práctica"),
		fechaHora: 	fecha()
	}),
	entity
);

export const actualizarTurnoSchema = (entity) => validar(
	z.object({
		medico:    id("medico").optional(),
		paciente:  id("paciente").optional(),
		sede: 	   id("medico").optional(),
		fechaHora: fecha().optional(),
		costo:	   z.number().nonnegative().optional()
	}),
	entity
)

export const actualizarEstadoTurnoSchema = (entity) => validar(
	z.object({
		estado: z.enum(EstadoTurno, "el dato estado debe ser un estado de turno válido"),
		usuario: id("usuario"),
		motivo: string("motivo")
	}),
	entity
)

export const filtrosTurnoSchema = (entity) => validar(
	z.object({
		medico:		 id("medico").optional(),
		paciente:	 id("paciente").optional(),
		sede:		 id("sede").optional(),
		practica:	 id("practica").optional(),
		estado:		 z.enum(EstadoTurno, "el dato estado debe ser un estado de turno válido").optional(),
		ordenCosto:	 z.boolean("el dato ordenCosto debe ser un boolean indicando si es de orden ascendente o descendente").optional(),
		ordenFecha:	 z.boolean("el dato ordenFecha debe ser un boolean indicando si es de orden ascendente o descendente").optional(),
		fechaInicio: fecha(),
		fechaFin:	 fecha()
	}),
	entity
);