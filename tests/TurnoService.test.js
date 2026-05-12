import CambioEstadoTurno from "../domain/CambioEstadoTurno.js"
import { InputError } from "../errors/Errors.js"
import { MedicoService } from "../service/MedicoService.js"
import PracticaService from "../service/PracticaService.js"
import { SedeService } from "../service/SedeService.js"
import TurnoService from "../service/TurnoService.js"
import { jest, describe, it, expect, beforeAll, beforeEach } from '@jest/globals';

describe("TurnoService", () => {
    let turnoService;
    let medicoService;
    let sedeService;
    let practicaService;

    beforeAll(() => {

        const medicoService = new MedicoService();
        const practicaService = new PracticaService();
        const sedeService = new SedeService();

        medico = medicoService.create({
            usuario: "medico1",
            matricula: "matricula1",
            nombre: "Juan"
        })

        sede = sedeService.create({
            sede: {
                id: "1"
            }
        })

        let disponibilidad = {
            disponibilidad: {
                diaSemana: "LUNES",
                horaDesde: "12:00",
                horaHasta: "13:00"
            }
        }

        medicoService.agregarDisponibilidad(medico.id, disponibilidad);

        practica = practicaService.Create({
            codigo: "ByKASJGY",
            nombre: "practica 1",
            duracion: 20,
            costo: 100
        })

    })

    beforeEach(() => {
        turnoService = new TurnoService()
    })

    afterEach(() => {
        // Nos aseguramos de volver al tiempo real después de cada it
        jest.useRealTimers();
    });

    it("debería crear un turno a las 12:40 con un médico disponible correctamente", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-05-04T11:00:00")); // uso Jest faketimers para simular la hora
        const turno = turnoService.Create({
            medico: "10",
            paciente: "0",
            sede: "1",
            practica: "0",
            fechaHora: "2026-05-04T12:40:00", // formato localizado en Arg, para UTC sumar 3 horas
            estado: "CONFIRMADO",
            costo: 5000
        })
        expect(() => {
            const medico = medicoService.FindById(turno.medico);
            turnoService.ValidarDisponibilidad(turno, turno.medico);
        }).not.toThrow(InputError);
    })

    it("debería lanzar error si falta el médico", () => {
        expect(() => {
            turnoService.Create({
                paciente: "0",
                costo: 5000
            })
        }).toThrow()
    })

    it("debería lanzar error si el médico no está disponible en ese horario", () => {
        expect(() => {
            turnoService.Create({
                medico: "10",
                paciente: "0",
                sede: "1",
                practica: "0",
                fechaHora: "2026-05-04T15:40:00", // formato localizado en Arg, para UTC sumar 3 horas
                estado: 2,
                costo: 5000
            }).toThrow(InputError);
        })
    })
    it("debería lanzar error si se busca cancelar el turno con menos de 1 hora de antelación", () => {

        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-05-04T11:50:00")); // uso Jest faketimers para simular la hora

        const turno = turnoService.Create({
            medico: "10",
            paciente: "0",
            sede: "1",
            practica: "0",
            fechaHora: "2026-05-04T12:00:00", // formato localizado en Arg, para UTC sumar 3 horas
            estado: "CONFIRMADO",
            costo: 5000
        })

        const nuevoEstado = new CambioEstadoTurno(
            "2026-05-04T11:50:00",  // fechaHoraIngreso 
            "CANCELADO",            // estadoTurno
            turno,                  // turno 
            "0",                    // usuario 
            "porque si",            // motivo
        );

        expect(() => {
            turnoService.UpdateTurnoStatus(turno.id, nuevoEstado);
        }).toThrow(InputError);
    })

    it("debería cancelar el turno exitosamente", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2026-05-04T11:00:00")); // uso Jest faketimers para simular la hora
        const turno = turnoService.Create({
            medico: "10",
            paciente: "0",
            sede: "1",
            practica: "0",
            fechaHora: "2026-05-04T12:20:00", // formato localizado en Arg, para UTC sumar 3 horas
            estado: "CONFIRMADO",
            costo: 5000
        })
        const nuevoEstado = new CambioEstadoTurno(
            new Date(),
            3,             // estadoTurno
            turno,           // turno 
            "0",             // usuario 
            "porque quiero"
        );
        expect(() => {
            turnoService.UpdateTurnoStatus(turno.id, nuevoEstado);
        }).not.toThrow();
    })
})
