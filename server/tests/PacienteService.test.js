import { jest } from "@jest/globals";

import PacienteService from "../service/PacienteService.js";

import {
    InputError,
    ResourceNotFoundError
} from "../errors/Errors.js";

describe("PacienteService", () => {

    let repositoryMock;

    let usuarioServiceMock;
    let turnoServiceMock;
    let obraSocialServiceMock;
    let planServiceMock;

    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        usuarioServiceMock = {
            FindById: jest.fn(),
            actualizar: jest.fn(),
            FindByUsername: jest.fn(),
            GuardarUsuario: jest.fn()
        };

        turnoServiceMock = {
            FindAll: jest.fn()
        };

        obraSocialServiceMock = {
            FindById: jest.fn()
        };

        planServiceMock = {
            FindById: jest.fn()
        };

        service = new PacienteService(
            repositoryMock,
            usuarioServiceMock,
            turnoServiceMock,
            obraSocialServiceMock,
            planServiceMock
        );
    });

    describe("FindAll", () => {

        it("deberia devolver todos los pacientes", async () => {

            const pacientes = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(pacientes);

            const result = await service.FindAll();

            expect(result)
                .toEqual(pacientes);
        });
    });

    describe("FindById", () => {

        it("deberia devolver paciente", async () => {

            const paciente = {
                id: "1"
            };

            repositoryMock.FindById
                .mockResolvedValue(paciente);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(paciente);
        });

        it("deberia lanzar ResourceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindById("404")
            ).rejects.toThrow(ResourceNotFoundError);
        });
    });

    describe("Create", () => {

        it("deberia crear paciente", async () => {

            const usuario = {
                id: "u1",
                registrado: false
            };

            usuarioServiceMock.FindById
                .mockResolvedValue(usuario);

            const result = await service.Create({
                username: "aaa",
                password: "bbb",
                dni: "12345678",
                nombre: "Gonzalo"
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Gonzalo");
        });

        it("deberia lanzar InputError cuando el usuario ya esta registrado", async () => {

            usuarioServiceMock.FindById
                .mockResolvedValue({
                    registrado: true
                });

            await expect(
                service.Create({
                    usuario: "u1",
                    dni: "12345678",
                    nombre: "Gonzalo"
                })
            ).rejects.toThrow(InputError);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("FindTurnosById", () => {

        it("deberia devolver turnos", async () => {

            const paciente = {
                id: "p1"
            };

            const turnos = [
                { id: "t1" }
            ];

            jest.spyOn(service, "FindById")
                .mockResolvedValue(paciente);

            turnoServiceMock.FindAll
                .mockResolvedValue(turnos);

            const result = await service.FindTurnosById("p1");

            expect(turnoServiceMock.FindAll)
                .toHaveBeenCalledWith({
                    paciente: "p1"
                });

            expect(result)
                .toEqual(turnos);
        });
    });

    describe("UpdateObraSocial", () => {

        it("deberia actualizar obra social", async () => {

            const paciente = {
                id: "1",
                obraSocial: null
            };

            const obraSocial = {
                id: "os1"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(paciente);

            obraSocialServiceMock.FindById
                .mockResolvedValue(obraSocial);

            await service.UpdateObraSocial(
                "1",
                {
                    obraSocial: "os1"
                }
            );

            expect(paciente.obraSocial)
                .toBe(obraSocial);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();
        });

        it("deberia eliminar obra social", async () => {

            const paciente = {
                id: "1",
                obraSocial: {}
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(paciente);

            await service.UpdateObraSocial(
                "1",
                {}
            );

            expect(paciente.obraSocial)
                .toBeNull();
        });
    });

    describe("UpdatePlan", () => {

        it("deberia actualizar plan", async () => {

            const paciente = {
                id: "1",
                plan: null
            };

            const plan = {
                id: "p1"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(paciente);

            planServiceMock.FindById
                .mockResolvedValue(plan);

            await service.UpdatePlan(
                "1",
                {
                    plan: "p1"
                }
            );

            expect(paciente.plan)
                .toBe(plan);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();
        });

        it("deberia eliminar plan", async () => {

            const paciente = {
                id: "1",
                plan: {}
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(paciente);

            await service.UpdatePlan(
                "1",
                {}
            );

            expect(paciente.plan)
                .toBeNull();
        });
    });
});