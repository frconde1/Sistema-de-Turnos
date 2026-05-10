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
	DISPONIBLE:	0,
	RESERVADO:	1,
	CONFIRMADO:	2,
	CANCELADO: 	3,
	REALIZADO: 	4
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