import MedicoService from "../service/MedicoService.js"
import { BadRequestError } from "../errors/Errors.js";

export class MedicoController {

    constructor(medicoService = new MedicoService()) {
        this.medicoService = medicoService;
    }

    create = async (req, res, next) => {
        try {
            var medico = await this.medicoService.create(req.body)
            return res.status(201).json({ status: "success", data: medico})
        } catch (error) {
            next(error)
        }
    }

   async FindByUsername(req, res, next){
    try {
        const medico = await this.medicoService.FindByUsername(req.params.username)
        return res.status(200).json(medico)
    } catch (error) {
        next(error)
    }
}    
    findAll = async (req, res, next) => {
        try {
            const filtros = this.extraerFiltros(req.query)
            const paginacion = this.extraerPaginacion(req.query)

            const resultado = await this.medicoService.findAll({ ...paginacion, filtros })

            return res.status(200).json({ 
                status: "success",
                data: resultado.medicos,
                paginacion: {
                    numeroPagina: resultado.numeroPagina,
                    limitePorPagina: resultado.limitePorPagina,
                    totalMedicos: resultado.totalMedicos,
                    totalPaginas: resultado.totalPaginas
                }
            })
        }catch (error) {
            next(error)
        }        
    }
    
    agregarDisponibilidad = async (req, res, next) => {
        try {
            await this.medicoService.agregarDisponibilidad(req.params.id, req.body)
            return res.status(201).json({ status: "success" })
        } catch (error) {
            next(error)
        }
    }
    
    agregarSede = async (req, res, next) => {
        try {
            await this.medicoService.agregarSede(req.params.id, req.body)
            return res.status(201).json({ status: "success" })
        } catch (error) {
            next(error)
        }
    }


    eliminarDisponibilidad = async (req, res, next) => {
        try {
            await this.medicoService.eliminarDisponibilidad(req.params.id, req.body)
            return res.status(200).json({ status: "success" })
        } catch (error) {
            next(error)
        }
    }


     extraerFiltros(query) {
        const filtros = {}

        if (query.nombre !== undefined) {
            filtros.nombre = query.nombre
        }

        if (query.especialidad !== undefined) {
            filtros.especialidad = query.especialidad
        }

        if (query.practica !== undefined) {
            filtros.practica = query.practica
        }

        if (query.sede !== undefined) {
            filtros.sede = query.sede
        }

        return filtros
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page)
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit)

        this.validarEnteroPositivo(numeroPagina, "page")
        this.validarEnteroPositivo(limitePorPagina, "limit")

        return { numeroPagina, limitePorPagina }
    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }
    

    async AgregarPractica(req, res, next){
        try {
            await this.medicoService.AgregarPractica(req.params.id, req.body)
            return res.status(201).json({ status: "success" })
        } catch (error) {
            next(error)
        }
    }
}
