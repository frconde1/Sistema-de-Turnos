import { jest } from "@jest/globals";

import Plan from "../domain/Plan.js";
import Especialidad from "../domain/Especialidad.js";
import Practica from "../domain/Practica.js";
import { NivelCobertura } from "../domain/Enums.js";

describe("Plan", () => {

    let plan;

    beforeEach(() => {

        plan = new Plan(
            "Premium",
            [],
            []
        );
    });

    describe("ObtenerCobertura", () => {

        it("deberia devolver cobertura para especialidad", () => {

            const especialidad =
                new Especialidad(
                    "Cardio",
                    30,
                    1000
                );

            especialidad.id = "e1";

            plan.coberturasEspecialidad.push({
                especialidad,
                nivel: NivelCobertura.TOTAL
            });

            const result =
                plan.ObtenerCobertura(
                    especialidad
                );

            expect(result)
                .toBe(NivelCobertura.TOTAL);
        });

        it("deberia devolver cobertura para practica", () => {

            const practica =
                new Practica(
                    "ABC",
                    "Rx",
                    30,
                    1000
                );

            practica.id = "p1";

            plan.coberturasPractica.push({
                practica,
                nivel: NivelCobertura.PARCIAL
            });

            const result =
                plan.ObtenerCobertura(
                    practica
                );

            expect(result)
                .toBe(NivelCobertura.PARCIAL);
        });

        it("deberia devolver NO_CUBIERTA cuando no se encuentra", () => {

            const practica =
                new Practica(
                    "ABC",
                    "Rx",
                    30,
                    1000
                );

            practica.id = "p1";

            const result =
                plan.ObtenerCobertura(
                    practica
                );

            expect(result)
                .toBe(NivelCobertura.NO_CUBIERTA);
        });
    });
});