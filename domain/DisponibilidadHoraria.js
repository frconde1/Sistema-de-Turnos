
export default class DisponibilidadHoraria {
  diaSemana; 
  horaDesde; 
  horaHasta; 

  constructor(diaSemana, horaDesde, horaHasta) {
    this.diaSemana = diaSemana;
    this.horaDesde = horaDesde;
    this.horaHasta = horaHasta;
  }
}
