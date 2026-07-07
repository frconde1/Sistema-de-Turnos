import { jest } from "@jest/globals";

import ObraSocial from "../domain/ObraSocial.js";
import { NivelCobertura } from "../domain/Enums.js";

describe("ObraSocial", () => {

    describe("ObtenerCobertura", () => {

        it("deberia devolver TOTAL si algún plan tiene TOTAL", () => {

            const obra = new ObraSocial(
                "OSDE",
                [
                    {
                        ObtenerCobertura: jest.fn()
                            .mockReturnValue(
                                NivelCobertura.PARCIAL
                            )
                    },
                    {
                        ObtenerCobertura: jest.fn()
                            .mockReturnValue(
                                NivelCobertura.TOTAL
                            )
                    }
                ]
            );

            const result =
                obra.ObtenerCobertura({});

            expect(result)
                .toBe(NivelCobertura.TOTAL);
        });

        it("deberia devolver PARCIAL si no existe TOTAL", () => {

            const obra = new ObraSocial(
                "OSDE",
                [
                    {
                        ObtenerCobertura: jest.fn()
                            .mockReturnValue(
                                NivelCobertura.PARCIAL
                            )
                    }
                ]
            );

            const result =
                obra.ObtenerCobertura({});

            expect(result)
                .toBe(NivelCobertura.PARCIAL);
        });

        it("deberia devolver NO_CUBIERTA cuando ningún plan cubre", () => {

            const obra = new ObraSocial(
                "OSDE",
                [
                    {
                        ObtenerCobertura: jest.fn()
                            .mockReturnValue(
                                NivelCobertura.NO_CUBIERTA
                            )
                    }
                ]
            );

            const result =
                obra.ObtenerCobertura({});

            expect(result)
                .toBe(NivelCobertura.NO_CUBIERTA);
        });
    });
});