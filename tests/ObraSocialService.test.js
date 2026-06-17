import { jest } from "@jest/globals";

import ObraSocialService from "../service/ObraSocialService.js";

import {
    BadRequestError,
    InputError,
    ResourceNotFoundError
} from "../errors/Errors.js";

describe("ObraSocialService", () => {

    let repositoryMock;
    let planServiceMock;
    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        planServiceMock = {
            FindById: jest.fn()
        };

        service = new ObraSocialService(
            repositoryMock,
            planServiceMock
        );
    });

    describe("FindAll", () => {

        it("deberia devolver todas las obras sociales", async () => {

            const obras = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(obras);

            const result = await service.FindAll();

            expect(result)
                .toEqual(obras);
        });
    });

    describe("FindById", () => {

        it("deberia devolver obra social", async () => {

            const obra = {
                id: "1",
                nombre: "OSDE"
            };

            repositoryMock.FindById
                .mockResolvedValue(obra);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(obra);
        });

        it("deberia lanzar ResourceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindById("404")
            ).rejects.toThrow(ResourceNotFoundError);
        });
    });

    describe("FindAllPlanes", () => {

        it("deberia devolver planes", async () => {

            const obra = {
                planes: [
                    { id: "p1" }
                ]
            };

            repositoryMock.FindById
                .mockResolvedValue(obra);

            const result = await service.FindAllPlanes("1");

            expect(result)
                .toEqual(obra.planes);
        });

        it("deberia lanzar ResourceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindAllPlanes("404")
            ).rejects.toThrow(ResourceNotFoundError);
        });
    });

    describe("Create", () => {

        it("deberia crear obra social", async () => {

            repositoryMock.Save
                .mockImplementation(async o => o);

            const result = await service.Create({
                nombre: "Swiss Medical"
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Swiss Medical");
        });

        it("deberia lanzar InputError", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar obra social", async () => {

            const obra = {
                id: "1",
                nombre: "Vieja"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(obra);

            const result = await service.Update(
                "1",
                {
                    nombre: "Nueva"
                }
            );

            expect(obra.nombre)
                .toBe("Nueva");

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(obra);
        });

        it("deberia lanzar InputError", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });

    describe("AgregarPlan", () => {

        it("deberia agregar plan", async () => {

            const obra = {
                id: "1",
                planes: []
            };

            const plan = {
                id: "p1"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(obra);

            planServiceMock.FindById
                .mockResolvedValue(plan);

            const result = await service.AgregarPlan(
                "1",
                {
                    plan: "p1"
                }
            );

            expect(obra.planes)
                .toContain(plan);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(obra);
        });

        it("deberia lanzar BadRequestError on plan duplicado", async () => {

            const plan = {
                id: "p1"
            };

            const obra = {
                planes: [plan]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(obra);

            planServiceMock.FindById
                .mockResolvedValue(plan);

            await expect(
                service.AgregarPlan(
                    "1",
                    {
                        plan: "p1"
                    }
                )
            ).rejects.toThrow(BadRequestError);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.AgregarPlan("1", {})
            ).rejects.toThrow(InputError);
        });
    });

    describe("EliminarPlan", () => {

        it("deberia eliminar plan", async () => {

            const obra = {
                planes: [
                    { id: "p1" },
                    { id: "p2" }
                ]
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(obra);

            const result = await service.EliminarPlan(
                "1",
                "p1"
            );

            expect(obra.planes)
                .toHaveLength(1);

            expect(obra.planes[0].id)
                .toBe("p2");

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(obra);
        });
    });
});