import { BadRequestError, InputError } 	from "../errors/Errors.js";
import { crearTurnoSchema, paginacionSchema, filtrosTurnoSchema, idSchema, actualizarTurnoSchema } from "./Schemas.js";
import TurnoService from "../service/TurnoService.js"

export default class TurnoController {
	constructor(turnoService = new TurnoService()){
		this.turnoService = turnoService;
	}

	Create (req, res) {
		const turnoDTO = this.turnoService.Create(req.body);
		return res.status(201).json(turnoDTO);
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
		this.turnoService.Delete(req.params.id);
		return res.status(200);
	}

	async FindById(req, res) {
		const turnoDTO = this.turnoService.FindById(req.params.id);
		return res.status(200).json(turnoDTO);
	}

	async Update(req, res) {
		const turnoDTO = this.turnoService.Update(req.params.id, req.body);
		return res.status(200).json(turnoDTO);
	}

	async UpdateStatus(req, res){
		return res.status(200).json(
			this.turnoService.UpdateTurnoStatus(
				idSchema("turno", req.params.id),
				req.body
		))
	}
}

