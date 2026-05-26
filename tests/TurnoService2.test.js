import { jest, describe, it, expect, beforeEach, afterEach } from "@jest/globals";

import TurnoService from "../service/TurnoService.js";

import {
    BadRequestError,
    InputError,
    ResurceNotFoundError
} from "../errors/Errors.js";

import { EstadoTurno } from "../domain/Enums.js";
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";

describe("TurnoService", () => {

    let repositoryMock;

    let medicoServiceMock;
    let pacienteServiceMock;
    let sedeServiceMock;
    let practicaServiceMock;
    let usuarioServiceMock;

    let service;

    beforeEach(() => {

        jest.useFakeTimers();
        jest.setSystemTime(
            new Date("2026-05-01T00:00:00-03:00")
        );

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn(),
            Delete: jest.fn(),
            FindReservadoByMedico: jest.fn()
        };

        medicoServiceMock = {
            FindById: jest.fn()
        };

        pacienteServiceMock = {
            FindById: jest.fn()
        };

        sedeServiceMock = {
            FindById: jest.fn()
        };

        practicaServiceMock = {
            FindById: jest.fn()
        };

        usuarioServiceMock = {
            FindById: jest.fn()
        };

        notificacionServiceMock = {
            Crear: jest.fn()
        };

        service = new TurnoService(
            repositoryMock,
            medicoServiceMock,
            sedeServiceMock,
            practicaServiceMock,
            usuarioServiceMock,
            notificacionServiceMock
        );

        service.pacienteService = pacienteServiceMock;
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const crearTurnoMock = () => ({
        id: "t1",
        fechaHora: new Date("2030-10-10T10:00:00-03:00"),
        historialEstados: [],
        estado: EstadoTurno.RESERVADO,
        costo: 1000,

        practica: {
            id: "pr1",
            duracionEnMins: 30
        },
        medico: {
            usuario: {
                id: "u2"
            }
        },
        paciente: {
            id: "p1",
            usuario: {
                id: "u1"
            },
            Cobertura: jest.fn()
                .mockReturnValue("TOTAL")
        },

        FechaFinalizacion: jest.fn().mockReturnValue(
            new Date("2030-10-10T10:30:00-03:00")
        ),

        CambiarEstado: jest.fn()
    });

    describe("FindById", () => {

        it("deberia devolver turno", async () => {

            const turno = crearTurnoMock();

            repositoryMock.FindById
                .mockResolvedValue(turno);

            const result =
                await service.FindById("1");

            expect(result)
                .toEqual(turno);
        });

        it("deberia lanzar ResurceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindById("404")
            ).rejects.toThrow(
                ResurceNotFoundError
            );
        });
    });

    describe("FindAll", () => {

        it("deberia devolver turnos paginados", async () => {

            repositoryMock.FindAll
                .mockResolvedValue({
                    turnos: [
                        crearTurnoMock()
                    ],
                    totalTurnos: 1
                });

            const result =
                await service.FindAll({
                    page: 1,
                    limit: 10
                });

            expect(result.totalTurnos)
                .toBe(1);

            expect(result.turnos)
                .toHaveLength(1);
        });

        it("deberia lanzar InputError con filtros invalidos", async () => {

            await expect(
                service.FindAll({
                    medico: 123
                })
            ).rejects.toThrow(InputError);
        });
    });

    describe("Create", () => {

        it("deberia crear turno", async () => {

            const medico = {
                id: "m1",
                usuario: {
                    id: "u2"
                },
                validarDisponibilidad: jest.fn()
                    .mockReturnValue(true)
            };

            const paciente = {
                id: "p1",

                usuario: {
                    id: "u1"
                },

                Cobertura: jest.fn()
                    .mockReturnValue("TOTAL")
            };

            const sede = {
                id: "s1"
            };

            const practica = {
                id: "pr1",
                duracionEnMins: 30,

                PrecioFinal: jest.fn()
                    .mockReturnValue(5000)
            };

            medicoServiceMock.FindById
                .mockResolvedValue(medico);

            pacienteServiceMock.FindById
                .mockResolvedValue(paciente);

            sedeServiceMock.FindById
                .mockResolvedValue(sede);

            practicaServiceMock.FindById
                .mockResolvedValue(practica);

            repositoryMock.FindReservadoByMedico
                .mockResolvedValue([]);

            notificacionServiceMock.Crear
                .mockResolvedValue()

            const result =
                await service.Create({
                    medico: "m1",
                    paciente: "p1",
                    sede: "s1",
                    practica: "pr1",
                    fechaHora: "2030-10-10T10:00:00-03:00"
                });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBeDefined();
        });

        it("deberia lanzar InputError cuando el medico no esta disponible", async () => {

            const medico = {
                validarDisponibilidad: jest.fn()
                    .mockReturnValue(false)
            };

            medicoServiceMock.FindById
                .mockResolvedValue(medico);

            pacienteServiceMock.FindById
                .mockResolvedValue({
                    usuario: {},
                    Cobertura: jest.fn()
                });

            sedeServiceMock.FindById
                .mockResolvedValue({});

            practicaServiceMock.FindById
                .mockResolvedValue({
                    duracionEnMins: 30,

                    PrecioFinal: jest.fn()
                        .mockReturnValue(100)
                });

            await expect(
                service.Create({
                    medico: "1",
                    paciente: "1",
                    sede: "1",
                    practica: "1",
                    fechaHora: "2030-10-10T10:00:00-03:00"
                })
            ).rejects.toThrow(InputError);
        });
    });

    describe("UpdateStatus", () => {

        it("deberia actualizar el estado del turno", async () => {

            const turno =
                crearTurnoMock();

                
            const usuario = {
                id: "u1"
            };
                
            turno.historialEstados.push(new CambioEstadoTurno(new Date(), EstadoTurno.RESERVADO, turno, usuario));
            
            jest.spyOn(service, "FindById")
                .mockResolvedValue(turno);

            usuarioServiceMock.FindById
                .mockResolvedValue(usuario);

            notificacionServiceMock.Crear
                .mockResolvedValue()

            const result =
                await service.UpdateStatus(
                    "1",
                    {
                        estado: EstadoTurno.CANCELADO,
                        usuario: "u1",
                        motivo: "cancelacion"
                    }
                );

            expect(turno.CambiarEstado)
                .toHaveBeenCalled();

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBeDefined();
        });

        it("deberia lanzar BadRequestError cuando es menos de 1 hora", async () => {

            const turno = crearTurnoMock();

            turno.fechaHora =
                new Date(
                    Date.now() + 30 * 60 * 1000
                );

            jest.spyOn(service, "FindById")
                .mockResolvedValue(turno);

            await expect(
                service.UpdateStatus(
                    "1",
                    {
                        estado: EstadoTurno.CANCELADO,
                        usuario: "u1",
                        motivo: "cancelacion"
                    }
                )
            ).rejects.toThrow(
                BadRequestError
            );
        });
    });
});