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
		return res.status(200).json({status: "succes", data: this.turnoService.FindAll()});
	}

	/**
	 * @param {import('express').Request} req 
	 * @param {import('express').Response} res 
	 * @returns {import('express').Response}
	 */
	async Delete(req, res) {
    const turnoDTO = this.turnoService.Find(req.params.id);
		this.turnoService.Delete(req.params.id);
<<<<<<< HEAD
		return res.status(200).json({status: "succes"});
=======
		return res.status(200).json(turnoDTO);
>>>>>>> aa93a13 (Agrego queryparam Orden para ordenar por costo ascendente y descendente)
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
<<<<<<< HEAD
			medico: 	  query.medico, 
			paciente:   query.paciente, 
			sede: 		  query.sede, 
			practica:   query.practica, 
			estado: 	  query.estado,
      ordenCosto: query.ordenCosto,
<<<<<<< HEAD
      ordenFecha: query.ordenFecha,
      fechaInicio:query.fechaInicio,
      fechaFin:   query.fechaFin
=======
      ordenFecha: query.ordenFecha
>>>>>>> def4575 (Agrego orden por fecha ascendente y descendente)
=======
			medico: 	query.medico, 
			paciente: query.paciente, 
			sede: 		query.sede, 
			practica: query.practica, 
			estado: 	query.estado,
      orden:    query.orden
>>>>>>> aa93a13 (Agrego queryparam Orden para ordenar por costo ascendente y descendente)
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

