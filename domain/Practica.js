export default class Practica {
  id; 
  codigo; 
  nombre; 
  duracionTurnoEnMins;
  costo; 

  constructor(id, codigo, nombre, duracionTurnoEnMins, costo) { 
    this.id = id;
    this.codigo = codigo; 
    this.nombre = nombre; 
    this.duracionTurnoEnMins = duracionTurnoEnMins; 
    this.costo = costo; 
  }

  static esIgual(unaPractica, otraPractica) {
    return unaPractica.id == otraPractica.id;
  }
}

