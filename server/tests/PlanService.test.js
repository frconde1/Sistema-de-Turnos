import { jest } from "@jest/globals";

import PlanService from "../service/PlanService.js";

import {
    BadRequestError,
    InputError,
    ResourceNotFoundError
} from "../errors/Errors.js";

describe("PlanService", () => {

    let repositoryMock;
    let especialidadServiceMock;
    let practicaServiceMock;

    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        especialidadServiceMock = {
            FindById: jest.fn()
        };

        practicaServiceMock = {
            FindById: jest.fn()
        };

        service = new PlanService(
            repositoryMock,
            especialidadServiceMock,
            practicaServiceMock
        );
    });

    describe("FindAll", () => {

        it("deberia devolver todos los planes", async () => {

            const plans = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(plans);

            const result = await service.FindAll();

            expect(result)
                .toEqual(plans);
        });
    });

    describe("Create", () => {

        it("deberia crear plan", async () => {

            repositoryMock.Save
                .mockImplementation(async p => p);

            const result = await service.Create({
                nombre: "Plan Oro"
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Plan Oro");
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("FindById", () => {

        it("deberia devolver plan", async () => {

            const plan = {
                id: "1",
                nombre: "Premium"
            };

            repositoryMock.FindById
                .mockResolvedValue(plan);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(plan);
        });

        it("deberia lanzar ResourceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindById("404")
            ).rejects.toThrow(ResourceNotFoundError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar plan", async () => {

            const plan = {
                id: "1",
                nombre: "Viejo"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            const result = await service.Update(
                "1",
                {
                    nombre: "Nuevo"
                }
            );

            expect(plan.nombre)
                .toBe("Nuevo");

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(plan);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });

    describe("FindAllEspecialidades", () => {

        it("deberia devolver coberturas especialidad", async () => {

            const plan = {
                coberturasEspecialidad: [
                    { id: "c1" }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            const result =
                await service.FindAllEspecialidades("1");

            expect(result)
                .toEqual(plan.coberturasEspecialidad);
        });
    });

    describe("AddEspecialidad", () => {

        it("deberia agregar especialidad", async () => {

            const especialidad = {
                id: "e1"
            };

            const plan = {
                coberturasEspecialidad: []
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            especialidadServiceMock.FindById
                .mockResolvedValue(especialidad);

            await expect(
                service.AddEspecialidad(
                    "1",
                    {
                        especialidad: "6a158e92420ba2354337aee0",
                        cobertura: "TOTAL"
                    }
                )
            ).resolves.toBe(plan);

            expect(plan.coberturasEspecialidad)
                .toHaveLength(1);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();
        });

        it("deberia lanzar BadRequestError en especialidad duplicada", async () => {

            const especialidad = {
                id: "e1"
            };

            const plan = {
                coberturasEspecialidad: [
                    {
                        especialidad
                    }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            especialidadServiceMock.FindById
                .mockResolvedValue(especialidad);

            await expect(
                service.AddEspecialidad(
                    "1",
                    {
                        especialidad: "e1",
                        cobertura: "TOTAL"
                    }
                )
            ).rejects.toThrow(InputError);
        });
    });

    describe("RemoveEspecialidad", () => {

        it("deberia eliminar especialidad", async () => {

            const plan = {
                coberturasEspecialidad: [
                    {
                        especialidad: {
                            id: "e1"
                        }
                    },
                    {
                        especialidad: {
                            id: "e2"
                        }
                    }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            const result =
                await service.RemoveEspecialidad(
                    "1",
                    "e1"
                );

            expect(plan.coberturasEspecialidad)
                .toHaveLength(1);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(plan);
        });
    });

    describe("FindAllPracticas", () => {

        it("deberia devolver coberturas practica", async () => {

            const plan = {
                coberturasPractica: [
                    { id: "p1" }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            const result =
                await service.FindAllPracticas("1");

            expect(result)
                .toEqual(plan.coberturasPractica);
        });
    });

    describe("AddPractica", () => {

        it("deberia agregar practica", async () => {

            const practica = {
                id: "p1"
            };

            const plan = {
                coberturasPractica: []
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            practicaServiceMock.FindById
                .mockResolvedValue(practica);

            const result =
                await service.AddPractica(
                    "1",
                    {
                        practica: "6a158e87420ba2354337aede",
                        cobertura: "TOTAL"
                    }
                );

            expect(plan.coberturasPractica)
                .toHaveLength(1);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(plan);
        });

        it("deberia lanzar BadRequestError en practica duplicada", async () => {

            const practica = {
                id: "p1"
            };

            const plan = {
                coberturasPractica: [
                    {
                        practica
                    }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            practicaServiceMock.FindById
                .mockResolvedValue(practica);

            await expect(
                service.AddPractica(
                    "1",
                    {
                        practica: "p1",
                        cobertura: "TOTAL"
                    }
                )
            ).rejects.toThrow(InputError);
        });
    });

    describe("RemovePractica", () => {

        it("deberia eliminar practica", async () => {
            const plan = {
                coberturasPractica: [
                    {
                        practica: {
                            id: "p1"
                        }
                    },
                    {
                        practica: {
                            id: "p2"
                        }
                    }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(plan);

            const result =
                await service.RemovePractica(
                    "1",
                    "p1"
                );

            expect(plan.coberturasPractica)
                .toHaveLength(1);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(plan);
        });

    });           
});