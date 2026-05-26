import { NivelCobertura } from "./Enums.js";
import Plan from "./Plan.js";

export default class ObraSocial { 
	/**@type {String} */
	id;

	nombre; 
	planes; 

	/**
	 * @param {String} nombre 
	 * @param {Plan[]} planes
	 */
	constructor(nombre, planes) {
		this.nombre = nombre ;
		this.planes = planes;
	}

	/**
	 * @param	{Especialidad | Practica} elemento 
	 * @returns	{NivelCobertura}
	 */
	ObtenerCobertura(elemento){
		const listaCoberturas = this.planes.map(p => p.ObtenerCobertura(elemento));
		const niveles = new Set(listaCoberturas);
		
		if(niveles.has(NivelCobertura.TOTAL	 )) return NivelCobertura.TOTAL;
		if(niveles.has(NivelCobertura.PARCIAL))	return NivelCobertura.PARCIAL;
												return NivelCobertura.NO_CUBIERTA;
	}
}
