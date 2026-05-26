import { jest } from "@jest/globals";

import UsuarioService from "../service/UsuarioService.js";

import {
    InputError,
    ResurceNotFoundError
} from "../errors/Errors.js";

describe("UsuarioService", () => {

    let repositoryMock;
    let service;

    beforeEach(() => {

        repositoryMock = {
            FindAll: jest.fn(),
            FindById: jest.fn(),
            Save: jest.fn()
        };

        service = new UsuarioService(repositoryMock);
    });

    describe("FindAll", () => {

        it("deberia devolver todos los usuarios", async () => {

            const usuarios = [
                { id: "1" },
                { id: "2" }
            ];

            repositoryMock.FindAll
                .mockResolvedValue(usuarios);

            const result = await service.FindAll();

            expect(result)
                .toEqual(usuarios);
        });
    });

    describe("FindById", () => {

        it("deberia devolver el usuario", async () => {

            const usuario = {
                id: "1",
                username: "gonza"
            };

            repositoryMock.FindById
                .mockResolvedValue(usuario);

            const result = await service.FindById("1");

            expect(result)
                .toEqual(usuario);
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

        it("deberia crear usuario", async () => {

            repositoryMock.Save
                .mockImplementation(async u => u);

            const result = await service.Create({
                username: "gonza",
                password: "1234"
            });

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result.username)
                .toBe("gonza");
        });

        it("deberia lanzar InputError on invalid body", async () => {

            await expect(
                service.Create({})
            ).rejects.toThrow(InputError);
        });

        it("deberia lanzar InputError on duplicate username", async () => {

            repositoryMock.Save
                .mockRejectedValue({
                    code: 11000
                });

            await expect(
                service.Create({
                    username: "gonza",
                    password: "1234"
                })
            ).rejects.toThrow(InputError);
        });
    });

    describe("Update", () => {

        it("deberia actualizar el usuario", async () => {

            const usuario = {
                id: "1",
                username: "old",
                password: "oldpass"
            };

            repositoryMock.FindById
                .mockResolvedValue(usuario);

            const result = await service.Update(
                "1",
                {
                    username: "newuser",
                    password: "newpass"
                }
            );

            expect(usuario.username)
                .toBe("newuser");

            expect(usuario.password)
                .toBe("newpass");

            expect(repositoryMock.Save)
                .toHaveBeenCalled();

            expect(result)
                .toBe(usuario);
        });

        it("deberia lanzar InputError on duplicate username", async () => {

            repositoryMock.FindById
                .mockResolvedValue({
                    username: "old",
                    password: "1234"
                });

            repositoryMock.Save
                .mockRejectedValue({
                    code: 11000
                });

            await expect(
                service.Update(
                    "1",
                    {
                        username: "duplicado",
                        password: "1234"
                    }
                )
            ).rejects.toThrow(InputError);
        });

        it("deberia lanzar InputError on invalid body", async () => {

            await expect(
                service.Update("1", {})
            ).rejects.toThrow(InputError);
        });
    });

    describe("actualizar", () => {

        it("deberia guardar el usuario", async () => {

            const usuario = {
                id: "1"
            };

            await service.actualizar(usuario);

            expect(repositoryMock.Save)
                .toHaveBeenCalledWith(usuario);
        });
    });
});