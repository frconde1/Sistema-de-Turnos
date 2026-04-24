export default class Especialidad {
  id; 
  nombre; 
  duracionEnMins; 
  costoConsulta; 


  constructor(id, nombre, duracionEnMins, costoConsulta) { 
  this.id =  id; 
  this.nombre = nombre; 
  this.duracionEnMins = duracionEnMins; 
  this.costoConsulta = costoConsulta; 
 

  }

  static esIgual(unaEspecialidad, otraEspecialidad) {
    return unaEspecialidad.id == otraEspecialidad.id;
  } 

}
