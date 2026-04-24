import Practica from "./Practica.js"

export default class CoberturaPractica {
  practica; 
  nivel; 

  /** 
   * @param {Practica} practica 
    */

  constructor(practica, nivel) {
    this.practica = practica;
    this.nivel = nivel;
  }

  getPractica() {
    return this.practica;
  }
  getNivel() { 
    return this.nivel; 
  }

}
