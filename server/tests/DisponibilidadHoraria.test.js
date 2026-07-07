import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import { DiaSemana } from "../domain/Enums.js";

describe("DisponibilidadHoraria", () => {

    let disponibilidad;

    beforeEach(() => {

        disponibilidad = new DisponibilidadHoraria(
            DiaSemana.JUEVES,
            "08:00",
            "12:00"
        );
    });

    describe("incluyeRangoHorario", () => {

        it("deberia devolver true cuando el rango entra en el rango horario", () => {

            const fecha =
                new Date("2030-10-10T09:00:00");

            const result =
                disponibilidad.incluyeRangoHorario(
                    fecha,
                    30
                );

            expect(result).toBe(true);
        });

        it("deberia devolver false cuando comienza antes del rango", () => {

            const fecha =
                new Date("2030-10-10T07:30:00");

            const result =
                disponibilidad.incluyeRangoHorario(
                    fecha,
                    30
                );

            expect(result).toBe(false);
        });

        it("deberia devolver false cuando termina después del rango", () => {

            const fecha =
                new Date("2030-10-10T11:45:00");

            const result =
                disponibilidad.incluyeRangoHorario(
                    fecha,
                    30
                );

            expect(result).toBe(false);
        });
    });
});