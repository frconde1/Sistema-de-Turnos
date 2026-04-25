import InputError from "./Errors/InputError.js";

/**
 * @readonly
 * @enum {Number}
*/
export const DiaSemana = Object.freeze({
	LUNES: 		0,
	MARTES: 	1,
	MIERCOLES: 	2,
	JUEVES: 	3,
	VIERNES: 	4,
	SABADO: 	5,
	DOMINGO: 	6
});


/**
 * @param {String} dia 
 * @returns {StreamPipeOptions}
 */
export function toDiasSemana(dia){
	let valor = DiaSemana[dia.toUpperCase()];
	
	if(valor == undefined)
		throw new InputError(404, "El dia de la semana es invalido");

	return valor;
}

/**
 * @readonly
 * @enum {Number}
*/
export const EstadoTurno = Object.freeze({ 
	DISPONIBLE:	0,
	RESERVADO:	1,
	CONFIRMADO:	2,
	CANCELADO: 	3,
	REALIZADO: 	4
}); 

/**
 * @param {String} estado 
 * @returns {EstadoTurno}
 */
export function toEstadoTurno(estado){
	let valor = EstadoTurno[estado.toUpperCase()];
	
	if(valor == undefined)
		throw new InputError(404, "El estado del turno es invalido");

	return valor;
}

/**
 * @readonly
 * @enum {NivelCobertura}
*/
export const NivelCobertura = Object.freeze({
	TOTAL:		0,
	PARCIAL:	1,
	NO_CUBIERTA:2
});

/**
 * @param {String} cobertura 
 * @returns {EstadoTurno}
 */
export function toNivelCobertura(cobertura){
	let valor = EstadoTurno[cobertura.toUpperCase().replaceAll(' ', '_')];
	
	if(valor == undefined)
		throw new InputError(404, "La cobertura es invalida");
	
	return valor;
}

