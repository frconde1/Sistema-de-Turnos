import { DiaSemana } from "./Enums.js";

export default class DisponibilidadHoraria {
	diaSemana; 
	horaDesde; 
	horaHasta; 

	/**
	 * @param {DiaSemana} diaSemana 
	 * @param {String} horaDesde 
	 * @param {String} horaHasta 
	 */
	constructor(diaSemana, horaDesde, horaHasta) {
		this.diaSemana = diaSemana;
		this.horaDesde = horaDesde;
		this.horaHasta = horaHasta;
	}

	incluyeRangoHorario(fechaHora, duracionMinutos) {

		const inicio = fechaHora.getHours() * 60 + fechaHora.getMinutes()
		const fin = inicio + duracionMinutos

		const desde = horaStringAMinutos(this.horaDesde)
		const hasta = horaStringAMinutos(this.horaHasta)

  		return inicio >= desde && fin <= hasta

	}

}

/**
 * @param {String} horario 
 * @returns {number}
 */
function horaStringAMinutos(horario){
	const [hora, minutos] = horario.split(':');
	return Number(hora) * 60 + Number(minutos);
}