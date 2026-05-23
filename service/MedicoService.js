import Medico from "../domain/Medico.js";
import { MedicosRepository } from "../repository/MedicosRepository.js";
import { InputError, BadRequestError } 		from "../errors/Errors.js";
import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import { z } from "zod/v3";
import { DiaSemana } from "../domain/Enums.js";

const medicoSchema = z.object({
    usuario: z.string({required_error: "El usuario es obligatorio", invalid_type_error: "El usuario debe ser un string" }).min(1, "El usuario no puede estar vacío"),
    matricula: z.string({ required_error: "La matricula es obligatoria", invalid_type_error: "La matricula debe ser un string" }).min(1, "La matrícula no puede estar vacía"),
    nombre: z.string({ required_error: "El nombre es obligatorio", invalid_type_error: "El nombre debe ser un string" }).min(1, "El nombre no puede estar vacío")
});

const disponibilidadSchema = z.object({
    diaSemana: z.nativeEnum(DiaSemana, {
        errorMap: () => ({ message: "Día de semana incorrecto" })
    }),
    horaDesde: z.string(),
    horaHasta: z.string()
});

export class MedicoService {
    constructor(medicosRepository = new MedicosRepository) {
        this.medicosRepository = medicosRepository;
    }

    async create(medicoReq) {
        const result = medicoSchema.safeParse(medicoReq);
        if (!result.success) {
            throw new InputError(result.error.issues.map(err => err.message).join(", "));
        }

        const medico = new Medico(
            medicoReq.usuario,
            medicoReq.matricula,
            medicoReq.nombre
        )

        return await this.medicosRepository.Save(medico)
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
        const disponibilidad = disponibilidadSchema.parse(body.disponibilidad);
        const disponibilidadHoraria = new DisponibilidadHoraria(disponibilidad.diaSemana, disponibilidad.horaDesde, disponibilidad.horaHasta);
        this.medicosRepository.agregarDisponibilidad(medicoId, disponibilidadHoraria)
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
