import TurnoDTO from "./DTOs/TurnoDTO.js";
import { EstadoTurno } 	from "./Enums.js";
import Notificacion 	from "./Notificacion.js";
import Turno 			from "./Turno.js";

export default class FactoryNotificacion{
	
	/**
	 * @param {Turno} turno 
	 * @returns {Notificacion}
	 */
	static crearSegunEstadoTurno(turno){
		const cambio 	 = turno.historialEstados.at(-1);
		const usuarioMed = turno.medico.usuario;
		const usuarioPac = turno.paciente.usuario;
		
		const medicoResponsable = cambio.usuario.id == usuarioMed.id

		return new Notificacion(
			medicoResponsable ? usuarioPac : usuarioMed,
			medicoResponsable ? usuarioMed : usuarioPac,
			cambio.motivo,
			cambio.fechaHoraIngreso
		)
	}

	/**
	 * @param {Turno} turno  
	 * @returns {String}
	*/
	static mensajeSegunEstadoTurno(turno){
		switch(turno.estado){
			case EstadoTurno.RESERVADO:  return JSON.stringify({paciente: turno.paciente, servicio: turno.practica});
			case EstadoTurno.CONFIRMADO: return "Se confirmo la reserva del turno:\n" + JSON.stringify(new TurnoDTO(Turno));
			case EstadoTurno.CANCELADO:  return "Se cancelo la reserva del turno:\n" + JSON.stringify(new TurnoDTO(Turno));
		}
	}
} 