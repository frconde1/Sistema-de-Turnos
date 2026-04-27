import ObraSocial	from "./ObraSocial.js";
import Plan			from "./Plan.js";
import Usuario		from "./Usuario.js";

export default class Paciente {
	id;
	usuario;
	dni;
	nombre;
	obraSocial;
	plan;

	/**
	 * @param {String} id 
	 * @param {Usuario} usuario 
	 * @param {String} dni 
	 * @param {String} nombre 
	 * @param {ObraSocial} obraSocial 
	 * @param {Plan} plan 
	 */
	constructor(id, usuario, dni, nombre, obraSocial, plan) {
		this.id = id;
		this.usuario = usuario;
		this.dni = dni;
		this.nombre = nombre;
		this.obraSocial = obraSocial;
		this.plan = plan;
	}
}