import { BadRequestError, InputError } 	from "../errors/Errors.js";
import { crearTurnoSchema, paginacionSchema, filtrosTurnoSchema, idSchema, actualizarTurnoSchema } from "./Schemas.js";
import TurnoService from "../service/TurnoService.js"

export default class TurnoController {
	constructor(turnoService = new TurnoService()){
		this.turnoService = turnoService;
	}

	Create (req, res) {
<<<<<<< HEAD
		return res.status(201).json(this.turnoService.Create(crearTurnoSchema(req.body)));
=======
		const turnoDTO = this.turnoService.Create(req.body);
		return res.status(201).json(turnoDTO);
>>>>>>> main
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
<<<<<<< HEAD
		this.turnoService.Delete(idSchema(req.data.id));
		return res.status(204);
=======
		this.turnoService.Delete(req.params.id);
		return res.status(200);
>>>>>>> main
	}

	async FindById(req, res) {
<<<<<<< HEAD
		return res.status(200).json(this.turnoService.FindById(idSchema(req.data.id)));
=======
		const turnoDTO = this.turnoService.Find(req.params.id);
		return res.status(200).json(turnoDTO);
>>>>>>> main
	}

	async Update(req, res) {
<<<<<<< HEAD
		return res.status(200).json(
			this.turnoService.Update(
				idSchema(req.data.id),
			 	actualizarTurnoSchema(req.body)
		));
=======
		const turnoDTO = this.turnoService.Update(req.params.id, req.body);
		return res.status(200).json(turnoDTO);
>>>>>>> main
	}

	async UpdateStatus(req, res){
<<<<<<< HEAD
		return res.status(200).json(
			this.turnoService.UpdateTurnoStatus(
				idSchema(req.data.id),
				req.body
		))
=======
		const nuevoEstado = this.turnoService.UpdateTurnoStatus(req.params.id, req.body);
		return res.status(200).json(nuevoEstado)
>>>>>>> main
	}
}

