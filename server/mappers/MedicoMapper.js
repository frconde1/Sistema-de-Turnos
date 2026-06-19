import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js"
import EspecialidadMapper 	 from "./EspecialidadMapper.js"
import PracticaMapper 		 from "./PracticaMapper.js"
import UsuarioMapper  		 from "./UsuarioMapper.js"
import SedeMapper 			 from "./SedeMapper.js"
import Medico 				 from "../domain/Medico.js"


export class DisponibilidadMapper{
	
	static toEntity({diaSemana, horaDesde, horaHasta}){
		return new DisponibilidadHoraria(diaSemana, horaDesde, horaHasta)
	}

	static toSchema({diaSemana, horaDesde, horaHasta}){
		return {
			"diaSemana": diaSemana, 
			"horaDesde": horaDesde, 
			"horaHasta": horaHasta
		}
	}
}

export default class MedicoMapper{
	
	static populate = [{path: 'practicas'},{path: 'especialidades'}, {path: 'sedes'},{path: 'usuario'}]

	static toEntity({usuario, matricula, nombre, especialidades, practicas, sedes, disponibilidades, _id}){
		const medico = new Medico(
			UsuarioMapper.toEntity(usuario),
			matricula,
			nombre,
			especialidades.map(EspecialidadMapper.toEntity),
			practicas.map(PracticaMapper.toEntity),
			sedes.map(SedeMapper.toEntity),
			disponibilidades.map(DisponibilidadMapper.toEntity)
		);
		medico.id = _id.toString()
		return medico
	}
	/**@param {Medico} medico */
	static toSchema({usuario, matricula, nombre, especialidades, practicas, sedes, disponibilidades}){
		return {
			usuario: 		  usuario.id,
			matricula: 		  matricula,
			nombre: 		  nombre,
			especialidades:   especialidades.map(e => e.id),
			practicas: 		  practicas.map(p => p.id),
			sedes: 			  sedes.map(s => s.id),
			disponibilidades: disponibilidades.map(DisponibilidadMapper.toSchema)
		}
	}
}