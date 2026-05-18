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