import { jest } from "@jest/globals";

import Practica from "../domain/Practica.js";
import { NivelCobertura } from "../domain/Enums.js";

describe("Practica", () => {

    let practica;

    beforeEach(() => {

        practica = new Practica(
            "ABC123",
            "Radiografia",
            30,
            1000
        );

        practica.id = "p1";
    });

    describe("EsIgual", () => {

        it("deberia devolver true cuando los ids son iguales", () => {

            const otra = new Practica(
                "XYZ",
                "Otra",
                20,
                500
            );

            otra.id = "p1";

            expect(
                Practica.EsIgual(practica, otra)
            ).toBe(true);
        });

        it("deberia devolver false cuando los ids son diferentes", () => {

            const otra = new Practica(
                "XYZ",
                "Otra",
                20,
                500
            );

            otra.id = "p2";

            expect(
                Practica.EsIgual(practica, otra)
            ).toBe(false);
        });
    });

    describe("calcularPrecio", () => {

        it("deberia devolver 0 para cobertura TOTAL", () => {

            const precio = practica.calcularPrecio(
                NivelCobertura.TOTAL
            );

            expect(precio).toBe(0);
        });

        it("deberia devolver precio dividido en dos para cobertura PARCIAL", () => {

            const precio = practica.calcularPrecio(
                NivelCobertura.PARCIAL
            );

            expect(precio).toBe(500);
        });

        it("deberia devolver precio completo para cobertura NO_CUBIERTA", () => {

            const precio = practica.calcularPrecio(
                NivelCobertura.NO_CUBIERTA
            );

            expect(precio).toBe(1000);
        });
    });

    describe("PrecioFinal", () => {

        it("deberia devolver precio completo sin cobertura", () => {

            const paciente = {
                plan: null,
                obraSocial: null
            };

            const precio = practica.PrecioFinal(paciente);

            expect(precio).toBe(1000);
        });

        it("deberia aplicar cobertura TOTAL del plan", () => {

            const paciente = {
                plan: {
                    ObtenerCobertura: jest.fn()
                        .mockReturnValue(NivelCobertura.TOTAL)
                },
                obraSocial: null
            };

            const precio = practica.PrecioFinal(paciente);

            expect(precio).toBe(0);
        });

        it("deberia aplicar cobertura PARCIAL del plan", () => {

            const paciente = {
                plan: {
                    ObtenerCobertura: jest.fn()
                        .mockReturnValue(NivelCobertura.PARCIAL)
                },
                obraSocial: null
            };

            const precio = practica.PrecioFinal(paciente);

            expect(precio).toBe(500);
        });

        it("deberia usar la mejor cobertura disponible", () => {

            const paciente = {
                plan: {
                    ObtenerCobertura: jest.fn()
                        .mockReturnValue(NivelCobertura.PARCIAL)
                },
                obraSocial: {
                    ObtenerCobertura: jest.fn()
                        .mockReturnValue(NivelCobertura.TOTAL)
                }
            };

            const precio = practica.PrecioFinal(paciente);

            expect(precio).toBe(0);
        });
    });
});