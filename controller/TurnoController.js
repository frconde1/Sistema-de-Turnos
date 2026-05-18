import { BadRequestError, InputError } 	from "../errors/Errors.js";
import { crearTurnoSchema, paginacionSchema, filtrosTurnoSchema, idSchema, actualizarTurnoSchema } from "./Schemas.js";
import TurnoService from "../service/TurnoService.js"

export default class TurnoController {
	constructor(turnoService = new TurnoService()){
		this.turnoService = turnoService;
	}

	Create (req, res) {
		return res.status(201).json(this.turnoService.Create(crearTurnoSchema(req.body)));
	}
	
	async FindAll (req, res) {
		const filtros 	 = filtrosTurnoSchema(req.query);
		const paginacion = paginacionSchema(req.query);
		
		const resultado = this.turnoService.FindPaginado({ ...paginacion, filtros })
		
		return res.status(200).json({ 
			data: resultado.turnos,
			paginacion: {
				numeroPagina: 	 resultado.numeroPagina,
				limitePorPagina: resultado.limitePorPagina,
				totalTurnos: 	 resultado.totalTurnos,
				totalPaginas: 	 resultado.totalPaginas
			}
		})
	}

	async Delete(req, res) {
		this.turnoService.Delete(idSchema(req.data.id));
		return res.status(204);
	}

	async FindById(req, res) {
		return res.status(200).json(this.turnoService.FindById(idSchema(req.data.id)));
	}

	async Update(req, res) {
		return res.status(200).json(
			this.turnoService.Update(
				idSchema(req.data.id),
			 	actualizarTurnoSchema(req.body)
		));
	}

	async UpdateStatus(req, res){
		return res.status(200).json(
			this.turnoService.UpdateTurnoStatus(
				idSchema(req.data.id),
				req.body
		))
	}
}

