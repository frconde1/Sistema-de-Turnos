import { jest } from "@jest/globals";

import EspecialidadService from "../service/EspecialidadService.js";

import {
    InputError,
    ResurceNotFoundError
} from "../errors/Errors.js";

describe("EspecialidadService", () => {

    let repositoryMock;
    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        service = new EspecialidadService(repositoryMock);
    });

    describe("FindAll", () => {

        it("deberia devolver todas las especialidades", async () => {

            const especialidades = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(especialidades);

            const result = await service.FindAll();

            expect(result)
                .toEqual(especialidades);
        });
    });

    describe("FindById", () => {

        it("deberia devolver la especialidad", async () => {

            const especialidad = {
                id: "1",
                nombre: "Cardiologia"
            };

            repositoryMock.FindById
                .mockResolvedValue(especialidad);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(especialidad);
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

        it("deberia crear la especialidad", async () => {

            repositoryMock.Save
                .mockImplementation(async e => e);

            const result = await service.Create({
                nombre: "Cardiologia",
                costoConsulta: 1000,
                duracionMins: 30
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.nombre)
                .toBe("Cardiologia");
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar la especialidad", async () => {

            const especialidad = {
                id: "1",
                nombre: "Vieja",
                duracionEnMins: 20,
                costoConsulta: 500
            };

            jest.spyOn(service, "FindById")
                .mockResolvedValue(especialidad);

            const result = await service.Update(
                "1",
                {
                    nombre: "Nueva",
                    duracionMins: 40,
                    costoConsulta: 2000
                }
            );

            expect(especialidad.nombre)
                .toBe("Nueva");

            expect(especialidad.duracionEnMins)
                .toBe(40);

            expect(especialidad.costoConsulta)
                .toBe(2000);

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(especialidad);
        });

        it("deberia lanzar InputError con body invalido", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });
});