export class Medico {
    id;
    usuario;
    matricula;
    nombre;
    especialidades;
    practicas;
    sedes;
    disponibilidades;

    constructor(id, usuario, matricula, nombre) {
        this.id = id;
        this.usuario = usuario;
        this.matricula = matricula;
        this.nombre = nombre;
        this.especialidades = [];
        this.practicas = [];
        this.sedes = [];
        this.disponibilidades = [];
    }

    agregarDisponibilidad(disponibilidad) {
        this.disponibilidades.push(disponibilidad)
    }

    eliminarDisponibilidad(disponibilidad) {
        this.disponibilidades = this.disponibilidades.filter(d => d !== disponibilidad)
    }

}