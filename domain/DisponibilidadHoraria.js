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
}
