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
		return res.status(201).json({ status: "success", data: turnoDTO});
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
		return res.status(200).json({status: "succes"});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async FindById(req, res) {
		const turnoDTO = this.turnoService.Find(req.params.id);
		return res.status(200).json({status: "succes", data: turnoDTO});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Update(req, res) {
		const turnoDTO = this.turnoService.Update(req.params.id, req.body);
		return res.status(200).json({status: "succes", data: turnoDTO});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async UpdateStatus(req, res){
		const nuevoEstado = this.turnoService.UpdateTurnoStatus(req.params.id, req.body);
		return res.status(200).json({status: "succes", data: nuevoEstado})
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
		
		if(filtros.medico	) this.validarEnteroPositivo(filtros.medico,   "medico"	 )
		if(filtros.paciente ) this.validarEnteroPositivo(filtros.paciente, "paciente")
		if(filtros.sede		) this.validarEnteroPositivo(filtros.sede, 	   "sede"	 )
		if(filtros.practica ) this.validarEnteroPositivo(filtros.practica, "practica")
		
		if(filtros.estado){
			const numero = Number(filtros.estado)
			if (numero == NaN || !Number.isInteger(numero) || !(-1 < numero && numero < 5))
				throw new BadRequestError(`El parámetro estado debe ser un numero entero en el rango [0,4]`);
		}

        return filtros
    }

	/** @returns {{page: number|undefined, limit: number|undefined}} */
    extraerPaginacion(query) {
        const numeroPagina 	  = query?.page  === undefined ? 1  : Number(query.page)
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit)

        this.validarEnteroPositivo(numeroPagina, 	"page" )
        this.validarEnteroPositivo(limitePorPagina, "limit")

        return { numeroPagina, limitePorPagina }
    }

    validarEnteroPositivo(numero, parametro) {
		numero = Number(numero);
        if (numero == NaN || !Number.isInteger(numero) || numero < 0) {
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }
}

