import CoberturaEspecialidad from "./CoberturaEspecialidad.js";
import CoberturaPractica from "./CoberturaPractica.js";
import Especialidad from "./Especialidad.js";
import Practica from "./Practica.js";

export default class Plan {
  id; 
  nombre;
  coberturasEspecialidad;
  coberturasPracticas;

  constructor(id, nombre, coberturasEspecialidad, coberturasPracticas) {
    this.id = id; 
    this.nombre = nombre;
    this.coberturasEspecialidad = coberturasEspecialidad;
    this.coberturasPracticas = coberturasPracticas;
  }

  obtenerCobertura(elementoCobertura) {
    if (elementoCobertura instanceof Especialidad)
    {
      for(const cobertura of this.coberturasEspecialidad) {
      if (Especialidad.esIgual(elementoCobertura, cobertura.getEspecialidad()))
      return cobertura.getNivel();
    }
    } else if (elementoCobertura instanceof Practica) {
      
      for(const cobertura of this.coberturasPracticas) {
      if (Practica.esIgual(elementoCobertura, cobertura.getPractica()))
      return cobertura.getNivel();
    }

    }else {
      throw new Exception("No se ingreso una practica o una especialidad");
    }

    }
  }

