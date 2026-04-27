import Medico from "../domain/Medico.js";
import { MedicosRepository } from "../repository/MedicosRepository.js";
import { InputError } 		from "../errors/Errors.js";


export class MedicoService {
    constructor(medicosRepository = new MedicosRepository) {
        this.medicosRepository = medicosRepository;
    }

    create(medicoReq) {
        //TODO validaciones
        const medico = new Medico(
            medicoReq.usuario,
            medicoReq.matricula,
            medicoReq.nombre
        )

        return this.medicosRepository.Save(medico)
    }

    /**
     * @param {String} id 
     * @returns {Medico}
     */
    FindById(id){
        return this.medicosRepository.findMedicoById(id)
    }

    findAll({ numeroPagina = 1, limitePorPagina = 10, filtros = {} } = {}) {
        this.validarPaginacion(numeroPagina, limitePorPagina)
        this.validarFiltros(filtros)

        const { medicos, totalMedicos } = this.medicosRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina,
            filtros
        )

        const totalPaginas = totalMedicos === 0 ? 0 : Math.ceil(totalMedicos / limitePorPagina)

        return {
            medicos,
            numeroPagina,
            limitePorPagina,
            totalMedicos,
            totalPaginas
        }
    }

    agregarDisponibilidad(medicoId, body) {
        this.medicosRepository.agregarDisponibilidad(medicoId, body.disponibilidad)
    }

    agregarSede(medicoId, body) {
        this.medicosRepository.agregarSede(medicoId, body.sede)
    }

    eliminarDisponibilidad(medicoId, body) {
        const medico = this.FindById(medicoId)
        medico.eliminarDisponibilidad(body.disponibilidad)
    }

    //Validaciones de paginado y filtros

    validarFiltros({nombre, especialidad, practica, sede} = {}) {

        if (nombre !== undefined && typeof nombre !== "string") {

            throw new InputError("El nombre debe ser un string")
        }
        if (especialidad !== undefined && typeof especialidad !== "string") {

            throw new InputError("La especialidad debe ser un string")
        }
        if (practica !== undefined && typeof practica !== "string") {

            throw new InputError("La práctica debe ser un string")
        }
        if (sede !== undefined && typeof sede !== "string") {

            throw new InputError("La sede debe ser un string")
        }
    }

    validarPaginacion(numeroPagina, limitePorPagina) {
        this.validarEnteroPositivo(numeroPagina, "Numero de página")
        this.validarEnteroPositivo(limitePorPagina, "Límite por página")
    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`${parametro} debe ser un entero positivo`)
        }
    }
}