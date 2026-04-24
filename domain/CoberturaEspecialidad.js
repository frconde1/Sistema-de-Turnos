import Especialidad from "./Especialidad.js"

export default class CoberturaEspecialidad {
  especialidad;
  nivel;

  constructor(especialidad, nivel) {
    this.especialidad = especialidad;
    this.nivel = nivel;

    
  }

  getEspecialidad() {
    return this.especialidad;
  }
  getNivel() { 
    return this.nivel; 
  }
}
