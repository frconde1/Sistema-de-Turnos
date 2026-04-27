import { EstadoTurno }	from "./Enums.js";
import Turno 			from "./Turno.js";
import Usuario 			from "./Usuario.js";


export default class CambioEstadoTurno {
	fechaHoraIngreso;
	estado;
	turno; 
	usuario; 
	motivo; 

	/**
	 * @param {Date} fechaHoraIngreso 
	 * @param {EstadoTurno} estado 
	 * @param {Turno} turno 
	 * @param {Usuario} usuario 
	 * @param {String} motivo 
	 */
	constructor(fechaHoraIngreso, estado, turno, usuario, motivo) { 
		this.fechaHoraIngreso = fechaHoraIngreso;
		this.estado = estado; 
		this.turno = turno; 
		this.usuario = usuario; 
		this.motivo = motivo;
	}
}
