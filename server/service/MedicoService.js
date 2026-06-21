import Medico from "../domain/Medico.js";
import { MedicosRepository } from "../repository/MedicosRepository.js";
import { InputError, BadRequestError, ResourceNotFoundError } 		from "../errors/Errors.js";
import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import { z } from "zod";
import { DiaSemana } from "../domain/Enums.js";
import { SedeRepository } from "../repository/SedeRepository.js";
import UsuarioService from "./UsuarioService.js";
import SedeService from "./SedeService.js";
import PracticaService from "./PracticaService.js";
import Usuario from "../domain/Usuario.js";
import { stringSchema } from "./zodSchemas.js";

const medicoSchema = z.object({
    username:  stringSchema("username"),
    password:  stringSchema("password"),
    matricula: stringSchema("matricula"),
    nombre:    stringSchema("nombre")
});

const disponibilidadSchema = z.object({
    diaSemana: z.nativeEnum(DiaSemana, {
        errorMap: () => ({ message: "Día de semana incorrecto" })
    }),
    horaDesde: z.string(),
    horaHasta: z.string()
});

export default class MedicoService {
    constructor(
        medicosRepository = new MedicosRepository(),
        sedeService = new SedeService(),
        usuarioService = new UsuarioService(),
        practicaService = new PracticaService()
    ) {
        this.medicosRepository = medicosRepository;
        this.sedeService = sedeService;
        this.usuarioService = usuarioService;
        this.practicaService = practicaService;
    }

    async create(medicoReq) {
        const result = medicoSchema.safeParse(medicoReq);
        if (!result.success) 
            throw new InputError(result.error.issues.map(err => err.message).join(", "));
        


        const usuario = new Usuario(medicoReq.username, medicoReq.password);
        usuario.Registrar("Medico");
        await this.usuarioService.GuardarUsuario(usuario);

        const medico = new Medico(
            usuario,
            medicoReq.matricula,
            medicoReq.nombre
        )

        return await this.medicosRepository.Save(medico)
    }

    async FindByUsername(username){
        const usuario = await this.usuarioService.FindByUsername(username);
        const medico  = await this.medicosRepository.FindByUsuarioId(usuario.id);

        if(medico == null)
            throw new ResourceNotFoundError("El usuario no existe");
        return medico;
    }

    /**
     * @param {String} id 
     * @returns {Medico}
     */
    async FindById(id){
        const medico = await this.medicosRepository.findMedicoById(id)
        if (!medico) {
            throw new InputError("El médico no existe")
        }
        return medico

    }

    async findAll({ numeroPagina = 1, limitePorPagina = 10, filtros = {} } = {}) {
        this.validarPaginacion(numeroPagina, limitePorPagina)
        this.validarFiltros(filtros)

        const { medicos, totalMedicos } = await this.medicosRepository.obtenerPaginados(
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

    async agregarDisponibilidad(medicoId, body) {
        const disponibilidad = disponibilidadSchema.parse(body.disponibilidad);
        const disponibilidadHoraria = new DisponibilidadHoraria(disponibilidad.diaSemana, disponibilidad.horaDesde, disponibilidad.horaHasta);
        await this.medicosRepository.agregarDisponibilidad(medicoId, disponibilidadHoraria)
    }

    async agregarSede(medicoId, body) {
        const medico = await this.medicosRepository.findMedicoById(medicoId)
        const sede = await this.sedeService.FindById(body.sede.id)
        medico.agregarSede(sede)
        await this.medicosRepository.Save(medico)
    }

    async eliminarDisponibilidad(medicoId, body) {
        const medico = await this.medicosRepository.findMedicoById(medicoId)
        medico.eliminarDisponibilidad(body.disponibilidad)
        await this.medicosRepository.Save(medico)
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

    async AgregarPractica(id, req){
        const medico = await this.FindById(id);
        const practica = await this.practicaService.FindById(req.practica);
        medico.practicas.push(practica);
        
        await this.medicosRepository.Save(medico);
        return medico;
    }
}
