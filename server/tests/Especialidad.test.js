import Especialidad from "../domain/Especialidad.js";

describe("Especialidad", () => {

    describe("EsIgual", () => {

        it("deberia devolver true para ids iguales", () => {

            const e1 =
                new Especialidad(
                    "Cardiologia",
                    30,
                    1000
                );

            const e2 =
                new Especialidad(
                    "Clinica",
                    20,
                    500
                );

            e1.id = "1";
            e2.id = "1";

            expect(
                Especialidad.EsIgual(e1, e2)
            ).toBe(true);
        });

        it("deberia devolver false para ids diferentes", () => {

            const e1 =
                new Especialidad(
                    "Cardiologia",
                    30,
                    1000
                );

            const e2 =
                new Especialidad(
                    "Clinica",
                    20,
                    500
                );

            e1.id = "1";
            e2.id = "2";

            expect(
                Especialidad.EsIgual(e1, e2)
            ).toBe(false);
        });
    });
});