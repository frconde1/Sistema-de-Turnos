import { EstadoTurno }from "./Enums.js";
import CambioEstadoTurno from "./CambioEstadoTurno.js"
export default class Turno {
  id; 
  medico; 
  paciente;
  fechaHora;
  sede; 
  practica; 
  estado;
  historialEstados;
  costo;

  constructor(id, medico, paciente, fechaHora, sede, practica, estado,costo) { 
    this.id = id; 
    this.medico = medico; 
    this.paciente = paciente; 
    this.fechaHora = fechaHora; 
    this.sede = sede; 
    this.practica = practica;
    this.estado = estado; 
    this.historialEstados = [];
    this.costo = costo; 

    
  }


  actualizarEstado(nuevoEstado, quien, motivo) {
    this.estado = nuevoEstado; 
    this.historialEstados.push(new CambioEstadoTurno(this.fechaHora, this.estado, this, quien, motivo));
  }
}
