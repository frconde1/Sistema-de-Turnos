import { jest } from "@jest/globals";

import PracticaService from "../service/PracticaService.js";

import {
    InputError,
    ResurceNotFoundError
} from "../errors/Errors.js";

describe("PracticaService", () => {

    let repositoryMock;
    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        service = new PracticaService(repositoryMock);
    });

    describe("FindAll", () => {

        it("deberia devolver todas las practicas", async () => {

            const practicas = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(practicas);

            const result = await service.FindAll();

            expect(result)
                .toEqual(practicas);
        });
    });

    describe("FindById", () => {

        it("deberia devolver practica", async () => {

            const practica = {
                id: "1",
                nombre: "Radiografia"
            };

            repositoryMock.FindById
                .mockResolvedValue(practica);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(practica);
        });

        it("deberia lanzar ResurceNotFoundError", async () => {

            repositoryMock.FindById
                .mockResolvedValue(null);

            await expect(
                service.FindById("404")
            ).rejects.toThrow(ResurceNotFoundError);
        });
    });

    describe("Create", () => {

        it("deberia crear practica", async () => {

            repositoryMock.Save
                .mockImplementation(async p => p);

            const result = await service.Create({
                codigo: "RX01",
                nombre: "Radiografia",
                duracionMins: 30,
                costoConsulta: 1500
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Radiografia");
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar practica", async () => {

            const practica = {
                id: "1",
                codigo: "OLD",
                nombre: "Vieja",
                costoConsulta: 100,
                duracionTurnoEnMins: 20
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(practica);

            const result = await service.Update(
                "1",
                {
                    codigo: "NEW",
                    nombre: "Nueva",
                    costoConsulta: 500,
                    duracionMins: 40
                }
            );

            expect(practica.codigo)
                .toBe("NEW");

            expect(practica.nombre)
                .toBe("Nueva");

            expect(practica.costoConsulta)
                .toBe(500);

            expect(practica.duracionTurnoEnMins)
                .toBe(40);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(practica);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });

    describe("CreatePractica", () => {

        it("deberia construir instancia de practica", () => {

            const practica = service.CreatePractica({
                codigo: "ABC",
                nombre: "Ecografia",
                duracionMins: 25,
                costoConsulta: 2500
            });

            expect(practica.codigo)
                .toBe("ABC");

            expect(practica.nombre)
                .toBe("Ecografia");
        });
    });
});