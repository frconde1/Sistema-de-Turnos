/**
 * @readonly
 * @enum {Number}
*/
export const DiaSemana = Object.freeze({
	DOMINGO: 	'DOMINGO',
	LUNES: 		'LUNES',
	MARTES: 	'MARTES',
	MIERCOLES: 	'MIERCOLES',
	JUEVES: 	'JUEVES',
	VIERNES: 	'VIERNES',
	SABADO: 	'SABADO'
});

/**
 * @readonly
 * @enum {Number}
*/
export const EstadoTurno = Object.freeze({ 
	DISPONIBLE:	'DISPONIBLE',
	RESERVADO:	'RESERVADO',
	CONFIRMADO:	'CONFIRMADO',
	CANCELADO: 	'CANCELADO',
	REALIZADO: 	'REALIZADO'
});

/**
 * @readonly
 * @enum {NivelCobertura}
*/
export const NivelCobertura = Object.freeze({
	TOTAL:		0,
	PARCIAL:	1,
	NO_CUBIERTA:2
});