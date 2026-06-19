import { BadRequestError, InputError } 	from "../errors/Errors.js";
import TurnoService from "../service/TurnoService.js"


export default class TurnoController {
	constructor(turnoService = new TurnoService()){
		this.service = turnoService;
	}

	async FindAll (req, res) {		
		const resultado = await this.service.FindAll(req.query);
		
		return res.status(200).json({ 
			data: resultado.turnos,
			paginacion: {
				numeroPagina: 	 resultado.numeroPagina,
				limitePorPagina: resultado.limitePagina,
				totalTurnos: 	 resultado.totalTurnos,
				totalPaginas: 	 Math.ceil(resultado.totalTurnos / resultado.limitePagina)
			}
		})
	}

	async FindById(req, res, next) {
		try {
			const turnoDTO = await this.service.FindByIdDTO(req.params.id);
			return res.status(200).json(turnoDTO);
		} catch (error) {
			next(error);
		}
	}

	async Create (req, res, next) {
		try {
			const turnoDTO = await this.service.Create(req.body);
			return res.status(201).json(turnoDTO);
		} catch (error) {
			next(error);
		}
	}

	async Delete(req, res, next) {
		try {
			await this.service.Delete(req.params.id);
			return res.status(200).json({ message: "Turno eliminado" });
		} catch (error) {
			next(error);
		}
	}

	async Update(req, res, next) {
		try {
			const turnoDTO = await this.service.Update(req.params.id, req.body);
			return res.status(200).json(turnoDTO);
		} catch (error) {
			next(error);
		}
	}

	async UpdateStatus(req, res, next){
		try {
			const turnoDTO = await this.service.UpdateStatus(req.params.id, req.body);
			return res.status(200).json(turnoDTO);
		} catch (error) {
			next(error);
		}
	}

	async updateFecha(req, res, next){
		try {
			const turnoDTO = await this.service.ChangeFecha(req.params.id, req.body);
			return res.status(200).json(turnoDTO);
		} catch (error) {
			next(error);
		}
	}


}

