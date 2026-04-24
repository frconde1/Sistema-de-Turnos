export default class TurnosRepository {
    turnos;

    constructor() {
        this.turnos = []
    }

    findAll() {
        return this.turnos;
    }

    create(turno) {
        this.turnos.push(turno)
        return turno;
    }

    findTurnoById(turnoId) {
        let turno = this.turnos.find(t => t.id == turnoId);
        if (turno) 
        return turno 
        throw new Error("El turno no existe")
    }
    

}

