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

	async FindById(req, res) {
		const turnoDTO = await this.service.FindByIdDTO(req.params.id);
		return res.status(200).json(turnoDTO);
	}

	async Create (req, res) {
		const turnoDTO = await this.service.Create(req.body);
		return res.status(201).json(turnoDTO);
	}

	async Delete(req, res) {
		await this.service.Delete(req.params.id);
		return res.status(200);
	}

	
	async Update(req, res) {
		const turnoDTO = await this.service.Update(req.params.id, req.body);
		return res.status(200).json(turnoDTO);
	}

	async UpdateStatus(req, res){
		const turnoDTO = await this.service.UpdateStatus(req.params.id, req.body);
		return res.status(200).json(turnoDTO);
	}


}

