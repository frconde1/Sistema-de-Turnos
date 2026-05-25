import { z } 		   from "zod"
import { InputError }  from "../errors/Errors.js";


//////////////////////
//	    COMMONS		//
//////////////////////

export const fechaSchema = () => z.iso.datetime({offset: true, message: "la fecha debe ser en formato iso YYYY-MM-DDTHH:mm:ss-03:00"})

export const idSchema = (name = "") =>
	z.string({
		error: (i) => i.input === undefined? 
			`el dato ${name} debe existir y ser el id de ${name}` : 
			`el dato ${name} debe ser un ID de tipo string`
		})
	.nonempty({message: `el dato ${name} no puede ser un ID vacío`})


export const stringSchema = (name = "") => 
	z.string({
		error: (i) => i.input === undefined? 
			`el dato ${name} debe existir` : 
			`el dato ${name} debe ser un string`
	})
	.nonempty({message: `el dato ${name} no puede ser un string vacío`})


export const numberSchema = (name = "") => z.number(`el dato ${name} debe ser un número`);



export const paginacionSchema = 
	z.object({
		page:  z.number("el dato pagina debe ser un número").optional().default( 1),
		limit: z.number("el dato límite debe ser un número").optional().default(10)
	});