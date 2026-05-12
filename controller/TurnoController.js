import { BadRequestError } from "../errors/Errors.js";
import TurnoService	from "../service/TurnoService.js"

export default class TurnoController {
	
	/** @param {TurnoService} turnoService */
	constructor(turnoService = new TurnoService()){
		this.turnoService = turnoService;
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	Create (req, res) {
		const turnoDTO = this.turnoService.Create(req.body);
		return res.status(201).json(turnoDTO);
	}
	
	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindAll (req, res) {
		const filtros 	 = this.extraerFiltros	 (req.query)
		const paginacion = this.extraerPaginacion(req.query)
		
		const resultado = await this.turnoService.FindPaginado({ ...paginacion, filtros })
		
		return res.status(200).json({ 
			status: "success",
			data: resultado.turnos,
			paginacion: {
				numeroPagina: 	 resultado.numeroPagina,
				limitePorPagina: resultado.limitePorPagina,
				totalTurnos: 	 resultado.totalTurnos,
				totalPaginas: 	 resultado.totalPaginas
			}
		})
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Delete(req, res) {
		this.turnoService.Delete(req.params.id);
		return res.status(200);
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		const turnoDTO = this.turnoService.Find(req.params.id);
		return res.status(200).json(turnoDTO);
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		const turnoDTO = this.turnoService.Update(req.params.id, req.body);
		return res.status(200).json(turnoDTO);
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async UpdateStatus(req, res){
		const nuevoEstado = this.turnoService.UpdateTurnoStatus(req.params.id, req.body);
		return res.status(200).json(nuevoEstado)
	}

	/** @returns {{medico: number|undefined, paciente: number|undefined, sede: number|undefined, practica: number|undefined, estado: number|undefined}}*/
	extraerFiltros(query) {
        const filtros = {
			medico: 	query.medico, 
			paciente: 	query.paciente, 
			sede: 		query.sede, 
			practica: 	query.practica, 
			estado: 	query.estado
		}
		
		return filtros
    }

	/** @returns {{page: number|undefined, limit: number|undefined}} */
    extraerPaginacion(query) {
        const numeroPagina 	  = query?.page  === undefined ? 1  : Number(query.page)
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit)
        return { numeroPagina, limitePorPagina }
    }
}

