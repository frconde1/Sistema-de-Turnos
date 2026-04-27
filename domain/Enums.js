/**
 * @readonly
 * @enum {Number}
*/
export const DiaSemana = Object.freeze({
	DOMINGO: 	0,
	LUNES: 		1,
	MARTES: 	2,
	MIERCOLES: 	3,
	JUEVES: 	4,
	VIERNES: 	5,
	SABADO: 	6
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