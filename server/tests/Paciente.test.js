import { jest } from "@jest/globals";

import Paciente from "../domain/Paciente.js";
import { NivelCobertura } from "../domain/Enums.js";

describe("Paciente", () => {

    let paciente;

    beforeEach(() => {

        paciente = new Paciente(
            { id: "u1" },
            "12345678",
            "Gonza",
            null,
            null
        );
    });

    describe("Cobertura", () => {

        it("deberia devolver NO_CUBIERTA sin cobertura", () => {

            const cobertura =
                paciente.Cobertura({});

            expect(cobertura)
                .toBe(NivelCobertura.NO_CUBIERTA);
        });

        it("deberia devolver TOTAL desde el plan", () => {

            paciente.plan = {
                ObtenerCobertura: jest.fn()
                    .mockReturnValue(
                        NivelCobertura.TOTAL
                    )
            };

            const cobertura =
                paciente.Cobertura({});

            expect(cobertura)
                .toBe(NivelCobertura.TOTAL);
        });

        it("deberia devolver PARCIAL desde la obra social", () => {

            paciente.obraSocial = {
                ObtenerCobertura: jest.fn()
                    .mockReturnValue(
                        NivelCobertura.PARCIAL
                    )
            };

            const cobertura =
                paciente.Cobertura({});

            expect(cobertura)
                .toBe(NivelCobertura.PARCIAL);
        });

        it("deberia priorizar obra social cuando el plan es parcial", () => {

            paciente.plan = {
                ObtenerCobertura: jest.fn()
                    .mockReturnValue(
                        NivelCobertura.PARCIAL
                    )
            };

            paciente.obraSocial = {
                ObtenerCobertura: jest.fn()
                    .mockReturnValue(
                        NivelCobertura.TOTAL
                    )
            };

            const cobertura =
                paciente.Cobertura({});

            expect(cobertura)
                .toBe(NivelCobertura.TOTAL);
        });
    });
});