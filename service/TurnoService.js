import  Turno from "../domain/Turno.js";
import TurnosRepository from "../repository/TurnosRepository.js";

export default class TurnoService {
    constructor(turnosRepository = new TurnosRepository) {
        this.turnosRepository = turnosRepository;
    }

    create(turnoReq) {
        //TODO validaciones
        const turno = new Turno(
          turnoReq.id,
          turnoReq.medico,
          turnoReq.paciente,
          turnoReq.fechaHora,
          turnoReq.sede,
          turnoReq.practica,
          turnoReq.estado,
          turnoReq.costo

        )

        return this.turnosRepository.create(turno)
    }

    findAll() {
        return this.turnosRepository.findAll();
    }

    updateStatus(id, reqBody) {
        let turno = this.turnosRepository.findTurnoById(id);
        turno.actualizarEstado(reqBody.estado, reqBody.usuario, reqBody.motivo)
        return turno
        

    }

}

