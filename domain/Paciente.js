import { NivelCobertura } from "./Enums.js";
import ObraSocial	from "./ObraSocial.js";
import Plan			from "./Plan.js";
import Usuario		from "./Usuario.js";

export default class Paciente {
	/**@type {String} */
	id;
	usuario;
	dni;
	nombre;
	obraSocial;
	plan;

	/**
	 * @param {Usuario} usuario 
	 * @param {String} dni 
	 * @param {String} nombre 
	 * @param {ObraSocial} obraSocial 
	 * @param {Plan} plan 
	 */
	constructor(usuario, dni, nombre, obraSocial, plan) {
		this.usuario = usuario;
		this.dni = dni;
		this.nombre = nombre;
		this.obraSocial = obraSocial;
		this.plan = plan;
	}

	Cobertura(elemento){
		let cobertura = NivelCobertura.NO_CUBIERTA, coberturaSocial = NivelCobertura.NO_CUBIERTA;

		if(this.plan)
			cobertura = this.plan.ObtenerCobertura(elemento);
		if(this.obraSocial)
			coberturaSocial = this.obraSocial.ObtenerCobertura(elemento);

		switch(cobertura){
			case NivelCobertura.TOTAL: return NivelCobertura.TOTAL;
			case NivelCobertura.NO_CUBIERTA: return coberturaSocial;
			case NivelCobertura.PARCIAL: return 
				coberturaSocial == NivelCobertura.NO_CUBIERTA ? 
					NivelCobertura.PARCIAL : 
					coberturaSocial;
		}
		
	}
}