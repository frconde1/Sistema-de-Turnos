/*
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js"
import { EstadoTurno } from "../domain/Enums.js"
import Medico from "../domain/Medico.js"
import { InputError } from "../errors/Errors.js"
import { MedicoService } from "../service/MedicoService.js"
import PracticaService from "../service/PracticaService.js"
import { SedeService } from "../service/SedeService.js"
import TurnoService  from "../service/TurnoService.js"
import { jest, describe, it, expect, beforeAll, beforeEach } from '@jest/globals';

describe("TurnoService", () => {
	const medicoService 	= new MedicoService();
	const sedeService 	= new SedeService();
	const practicaService = new PracticaService();
	const turnoService 	= new TurnoService();

	beforeAll(() => {

		let medico = medicoService.create({
			usuario: "medico1",
			matricula: "matricula1",
			nombre: "Juan"
		})

		let sede = sedeService.create({
			sede: {
				id: "1"
			}
		})

		medico.agregarSede(sede);

		const disponibilidades = [
			{disponibilidad: {diaSemana: 1, horaDesde: "12:00", horaHasta: "13:00"}},
			{disponibilidad: {diaSemana: 5, horaDesde: "00:00", horaHasta: "10:00"}},
		]


		let practica = practicaService.Create({
			codigo: "ByKASJGY",
			nombre: "practica 1",
			duracion: 20,
			costo: 100
		})

		for(const disponibilidad of disponibilidades)
			medicoService.agregarDisponibilidad(medico.id, disponibilidad);
	})

	beforeEach(() => {
		// todos los test usan este horario
		turnoService.turnoRepository.turnos = [];
		jest.useFakeTimers();
		jest.setSystemTime(new Date("2026-05-01T00:00:00-03:00"));
	})

	afterEach(() => {
		jest.useRealTimers();
	});

	it("debería crear un turno a las 12:40 con un médico disponible correctamente", () => {
		expect(() => {
			turnoService.Create({
				medico:    "0",
				sede:      "1",
				paciente:  "0",
				practica:  "0",
				fechaHora: "2026-05-04T12:40:00-03:00" // formato localizado en Arg, para UTC -03:00 debe ser z
			})
		}).not.toThrow(InputError);
	})

	it("debería lanzar error si falta el médico", () => {
		expect(() => {
			turnoService.Create({
				paciente: "0",
				costo: 5000
			})
		}).toThrow(InputError)
	})

	it("debería lanzar error si el médico no está disponible en ese horario", () => {
		expect(() => 
			{
			turnoService.Create({
				medico:    "0",
				sede:      "1",
				paciente:  "0",
				practica:  "0",disponibilidades
				fechaHora: "2026-05-04T23:40:00-03:00" // formato localizado en Arg, para UTC -03:00 debe ser z
			}).toThrow(InputError);
		})
	})
	
	it("debería lanzar error si se busca cancelar el turno con menos de 1 hora de antelación", () => {
		const turno = turnoService.Create({
			medico:    "0",
			sede:      "1",
			paciente:  "0",
			practica:  "0",
			fechaHora: "2026-05-01T00:40:00-03:00",
		})

		const nuevoEstado = {
			estado: "CANCELADO",
			usuario: "0",
			razon: "porque si"
		}


		expect(() => {
			turnoService.UpdateTurnoStatus(turno.id, nuevoEstado);
		}).toThrow(InputError);
	})

	it("debería cancelar el turno exitosamente", () => {
		const turno = turnoService.Create({
			medico: "0",
			sede: "1",
			paciente: "0",
			practica: "0",
			fechaHora: "2026-05-01T01:40:00-03:00",
		})
		const nuevoEstado = {
			estado: "CANCELADO",
			usuario: "0",
			razon: "porque si"
		};

		expect(() => {
			turnoService.UpdateTurnoStatus(turno.id, nuevoEstado);
		}).not.toThrow();
	})
})

*/