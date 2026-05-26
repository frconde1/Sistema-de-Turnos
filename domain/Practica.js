import { NivelCobertura } from "./Enums.js";
import Paciente from "./Paciente.js";

export default class Practica {
	/** @type {String} */
	id; 
	codigo; 
	nombre; 
	duracionEnMins;
	costo; 

	/**
	 * @param {String} codigo 
	 * @param {String} nombre 
	 * @param {Number} duracionEnMins 
	 * @param {Number} costo 
	 */
	constructor(codigo, nombre, duracionEnMins, costo) { 
		this.codigo = codigo; 
		this.nombre = nombre; 
		this.costo  = costo; 
		this.duracionEnMins = duracionEnMins; 
	}

	/**
	 * @param {Practica} unaPractica 
	 * @param {Practica} otraPractica 
	 * @returns {Boolean}
	 */
	static EsIgual(unaPractica, otraPractica) {
		return unaPractica.id == otraPractica.id;
	}

	/**
	 * @param {Paciente} paciente 
	 * @returns {Number}
	 */
	PrecioFinal({plan, obraSocial}){
		let precioFinal = this.costo;
		if(plan){
			const cobertura = plan.ObtenerCobertura(this);
			precioFinal = precioFinal > this.calcularPrecio(cobertura) ? this.calcularPrecio(cobertura) : precioFinal
		} 
		if(obraSocial){
			const cobertura = obraSocial.ObtenerCobertura(this);
			precioFinal = precioFinal > this.calcularPrecio(cobertura) ? this.calcularPrecio(cobertura) : precioFinal
		} 
		return precioFinal;
	}

	/**
	 * @param {NivelCobertura} cobertura
	 * @returns {Number}
	 */
	calcularPrecio(cobertura){
		switch(cobertura){
			case NivelCobertura.TOTAL:	 return 0;
			case NivelCobertura.PARCIAL: return this.costo / 2;
			default:					 return this.costo;
		}
	}
}

