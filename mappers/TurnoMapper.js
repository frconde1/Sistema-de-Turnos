import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";
import Turno 			 from "../domain/Turno.js";
import MedicoMapper 	 from "./MedicoMapper.js";
import PacienteMapper 	 from "./PacienteMapper.js";
import PracticaMapper 	 from "./PracticaMapper.js";
import SedeMapper 		 from "./SedeMapper.js";
import UsuarioMapper 	 from "./UsuarioMapper.js";

class CambioEstadoMapper {
	
	/**@returns {CambioEstadoTurno} */
	static toEntity({fechaHora, estado, usuario, motivo}){
		return new CambioEstadoTurno(fechaHora, estado, null, UsuarioMapper.toEntity(usuario), motivo)
	}

	/**@param {CambioEstadoTurno} estado */
	static toSchema({fechaHoraIngreso, estado, usuario, motivo}){
		return {
			fechaHora: new Date(fechaHoraIngreso),
			estado: estado,
			usuario: usuario.id,
			motivo: motivo
		}
	}
}

export default class TurnoMapper {
	
	static populate = [{path: "medico"}, {path: "paciente"}, {path: "sede"}, {path: "practica"}]

	/**@returns {Turno} */
	static toEntity({medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo, _id}){
		const turno = new Turno(
			MedicoMapper.toEntity(medico),
			PacienteMapper.toEntity(paciente),
			new Date(fechaHora),
			SedeMapper.toEntity(sede),
			PracticaMapper.toEntity(practica),
			estado,
			historialEstados.map(CambioEstadoMapper.toEntity),
			costo
		);
		turno.historialEstados.forEach(h => h.turno = turno);
		turno.id = _id.toString()
		return turno;
	}

	/**@param {Turno} turno */
	static toSchema({medico, paciente, fechaHora, sede, practica, estado, historialEstados, costo}){
		return {
			medico: 	medico.id, 
			paciente: 	paciente.id, 
			fechaHora: 	fechaHora, 
			sede: 		sede.id, 
			practica: 	practica.id, 
			estado: 	estado, 
			costo: 		costo,
			historialEstados: historialEstados.map(CambioEstadoMapper.toSchema)
		}
	}
}