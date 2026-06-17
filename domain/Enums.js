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
 * @enum {String}
*/
export const EstadoTurno = Object.freeze({ 
	DISPONIBLE:	"DISPONIBLE",
	RESERVADO:	"RESERVADO",
	CONFIRMADO:	"CONFIRMADO",
	CANCELADO: 	"CANCELADO",
	REALIZADO: 	"REALIZADO"
});

/**
 * @readonly
 * @enum {String}
*/
export const NivelCobertura = Object.freeze({
	TOTAL:		 "TOTAL",
	PARCIAL:	 "PARCIAL",
	NO_CUBIERTA: "NO_CUBIERTA"
});