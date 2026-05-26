import { jest } from "@jest/globals";

import SedeService from "../service/SedeService.js";

import {
    InputError,
    ResurceNotFoundError
} from "../errors/Errors.js";

describe("SedeService", () => {

    let repositoryMock;
    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        service = new SedeService(repositoryMock);
    });

    describe("FindAll", () => {

        it("deberia devolver todas las sedes", async () => {

            const sedes = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(sedes);

            const result = await service.FindAll();

            expect(result)
                .toEqual(sedes);
        });
    });

    describe("FindById", () => {

        it("deberia devolver sede", async () => {

            const sede = {
                id: "1",
                nombre: "Central"
            };

            repositoryMock.FindById
                .mockResolvedValue(sede);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(sede);
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

        it("deberia crear sede", async () => {

            repositoryMock.Save
                .mockImplementation(async s => s);

            const result = await service.Create({
                nombre: "Sede Centro",
                direccion: "Av Siempre Viva 123"
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Sede Centro");
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar sede", async () => {

            const sede = {
                id: "1",
                nombre: "Vieja",
                direccion: "Old"
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(sede);

            const result = await service.Update(
                "1",
                {
                    nombre: "Nueva",
                    direccion: "Nueva direccion"
                }
            );

            expect(sede.nombre)
                .toBe("Nueva");

            expect(sede.direccion)
                .toBe("Nueva direccion");

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(sede);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });
});