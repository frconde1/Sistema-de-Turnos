import { jest } from "@jest/globals";

import MedicoService from "../service/MedicoService.js";

import {
    InputError,
    BadRequestError
} from "../errors/Errors.js";

describe("MedicoService", () => {

    let medicosRepositoryMock;
    let sedeServiceMock;
    let usuarioServiceMock;
    let practicaServiceMock;

    let service;

    beforeEach(() => {

        medicosRepositoryMock = {
            Save: jest.fn(),
            findMedicoById: jest.fn(),
            obtenerPaginados: jest.fn(),
            agregarDisponibilidad: jest.fn()
        };

        sedeServiceMock = {
            FindById: jest.fn()
        };

        usuarioServiceMock = {
            FindById: jest.fn(),
            actualizar: jest.fn(),
            GuardarUsuario: jest.fn()
        };

        practicaServiceMock = {
            FindById: jest.fn()
        };

        service = new MedicoService(
            medicosRepositoryMock,
            sedeServiceMock,
            usuarioServiceMock,
            practicaServiceMock
        );
    });

    describe("create", () => {

        it("deberia crear el medico", async () => {

            const usuario = {
                id: "u1",
                registrado: false
            };

            usuarioServiceMock.FindById
                .mockResolvedValue(usuario);

            medicosRepositoryMock.Save
                .mockImplementation(async medico => medico);

            const result = await service.create({
                username: "user",
                password: "pas",
                matricula: "MAT-123",
                nombre: "Dr House"
            });

            expect(medicosRepositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBeDefined();
        });

        it("deberia lanzar InputError cuando la solicitud es invalida", async () => {

            await expect(
                service.create({})
            ).rejects.toThrow(InputError);
        });

        it("deberia lanzar InputError cuando el usuario ya esta registrado", async () => {

            usuarioServiceMock.FindById
                .mockResolvedValue({
                    registrado: true
                });

            await expect(
                service.create({
                    username: "user",
                    matricula: "MAT-123",
                    nombre: "Dr House"
                })
            ).rejects.toThrow(InputError);
        });
    });

    describe("FindById", () => {

        it("deberia encontrar el medico por id", async () => {

            const medico = {
                id: "m1"
            };

            medicosRepositoryMock.findMedicoById
                .mockResolvedValue(medico);

            const result = await service.FindById("m1");

            expect(result)
                .toEqual(medico);
        });
    });

    describe("findAll", () => {

        it("deberia devolver medicos paginados", async () => {

            medicosRepositoryMock.obtenerPaginados
                .mockResolvedValue({
                    medicos: [{ id: "m1" }],
                    totalMedicos: 1
                });

            const result = await service.findAll({
                numeroPagina: 1,
                limitePorPagina: 10,
                filtros: {}
            });

            expect(result.totalMedicos)
                .toBe(1);

            expect(result.totalPaginas)
                .toBe(1);

            expect(result.medicos)
                .toHaveLength(1);
        });

        it("deberia lanzar BadRequestError con paginación invalida", async () => {

            await expect(
                service.findAll({
                    numeroPagina: 0,
                    limitePorPagina: 10
                })
            ).rejects.toThrow(BadRequestError);
        });

        it("deberia lanzar InputError con filtros invalidos", async () => {

            await expect(
                service.findAll({
                    filtros: {
                        nombre: 123
                    }
                })
            ).rejects.toThrow(InputError);
        });
    });

    describe("agregarDisponibilidad", () => {

        it("deberia agregar disponibilidad", async () => {

            await service.agregarDisponibilidad("m1", {
                disponibilidad: {
                    diaSemana: "LUNES",
                    horaDesde: "08:00",
                    horaHasta: "12:00"
                }
            });

            expect(
                medicosRepositoryMock.agregarDisponibilidad
            ).toHaveBeenCalled();
        });
    });

    describe("agregarSede", () => {

        it("deberia agregar sede", async () => {

            const medico = {
                agregarSede: jest.fn()
            };

            const sede = {
                id: "s1"
            };

            medicosRepositoryMock.findMedicoById
                .mockResolvedValue(medico);

            sedeServiceMock.FindById
                .mockResolvedValue(sede);

            await service.agregarSede("m1", {
                sede: {
                    id: "s1"
                }
            });

            expect(medico.agregarSede)
                .toHaveBeenCalledWith(sede);

            expect(medicosRepositoryMock.Save)
                .toHaveBeenCalled();
        });
    });

    describe("eliminarDisponibilidad", () => {

        it("deberia eliminar disponibilidad", async () => {

            const medico = {
                eliminarDisponibilidad: jest.fn()
            };

            medicosRepositoryMock.findMedicoById
                .mockResolvedValue(medico);

            await service.eliminarDisponibilidad("m1", {
                disponibilidad: {}
            });

            expect(medico.eliminarDisponibilidad)
                .toHaveBeenCalled();

            expect(medicosRepositoryMock.Save)
                .toHaveBeenCalled();
        });
    });

    describe("AgregarPractica", () => {

        it("deberia agregar practica", async () => {

            const medico = {
                practicas: []
            };

            const practica = {
                id: "p1"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(medico);

            practicaServiceMock.FindById
                .mockResolvedValue(practica);

            const result = await service.AgregarPractica(
                "m1",
                {
                    practica: "p1"
                }
            );

            expect(medico.practicas)
                .toContain(practica);

            expect(medicosRepositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(medico);
        });
    });

    describe("validarEnteroPositivo", () => {

        it("deberia validar entero positivo", () => {

            expect(() =>
                service.validarEnteroPositivo(
                    1,
                    "numero"
                )
            ).not.toThrow();
        });

        it("deberia lanzar BadRequestError", () => {

            expect(() =>
                service.validarEnteroPositivo(
                    -1,
                    "numero"
                )
            ).toThrow(BadRequestError);
        });
    });
});
