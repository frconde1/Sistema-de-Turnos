import Medico from "../domain/Medico.js";
import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";
import { DiaSemana } from "../domain/Enums.js";

describe("Medico", () => {

    let medico;

    beforeEach(() => {

        medico = new Medico(
            { id: "u1" },
            "MAT-123",
            "Dr House"
        );
    });

    describe("agregarDisponibilidad", () => {

        it("deberia agregar disponibilidad", () => {

            const disponibilidad =
                new DisponibilidadHoraria(
                    DiaSemana.JUEVES,
                    "08:00",
                    "12:00"
                );

            medico.agregarDisponibilidad(
                disponibilidad
            );

            expect(
                medico.disponibilidades
            ).toHaveLength(1);

            expect(
                medico.disponibilidades[0]
            ).toBe(disponibilidad);
        });
    });

    describe("eliminarDisponibilidad", () => {

        it("deberia eliminar disponibilidad", () => {

            const disponibilidad =
                new DisponibilidadHoraria(
                    DiaSemana.JUEVES,
                    "08:00",
                    "12:00"
                );

            medico.disponibilidades.push(
                disponibilidad
            );

            medico.eliminarDisponibilidad(
                disponibilidad
            );

            expect(
                medico.disponibilidades
            ).toHaveLength(0);
        });

        it("deberia mantener otras disponibilidades", () => {

            const d1 =
                new DisponibilidadHoraria(
                    DiaSemana.JUEVES,
                    "08:00",
                    "12:00"
                );

            const d2 =
                new DisponibilidadHoraria(
                    DiaSemana.VIERNES,
                    "10:00",
                    "14:00"
                );

            medico.disponibilidades.push(d1);
            medico.disponibilidades.push(d2);

            medico.eliminarDisponibilidad(d1);

            expect(
                medico.disponibilidades
            ).toHaveLength(1);

            expect(
                medico.disponibilidades[0]
            ).toBe(d2);
        });
    });

    describe("validarDisponibilidad", () => {

        it("deberia devolver true cuando el medico esta disponible", () => {

            medico.disponibilidades.push(
                new DisponibilidadHoraria(
                    DiaSemana.JUEVES,
                    "08:00",
                    "12:00"
                )
            );

            const fecha =
                new Date("2030-10-10T09:00:00");

            const result =
                medico.validarDisponibilidad(
                    fecha,
                    30
                );

            expect(result).toBe(true);
        });

        it("deberia devolver false cuando el medico no esta disponible", () => {

            medico.disponibilidades.push(
                new DisponibilidadHoraria(
                    DiaSemana.JUEVES,
                    "08:00",
                    "09:00"
                )
            );

            const fecha =
                new Date("2030-10-10T10:00:00");

            const result =
                medico.validarDisponibilidad(
                    fecha,
                    30
                );

            expect(result).toBe(false);
        });

        it("deberia devolver false cuando el día no coincide", () => {

            medico.disponibilidades.push(
                new DisponibilidadHoraria(
                    DiaSemana.LUNES,
                    "08:00",
                    "12:00"
                )
            );

            const fecha =
                new Date("2030-10-10T09:00:00");

            const result =
                medico.validarDisponibilidad(
                    fecha,
                    30
                );

            expect(result).toBe(false);
        });
    });

    describe("agregarSede", () => {

        it("deberia agregar sede", () => {

            const sede = {
                id: "s1"
            };

            medico.agregarSede(sede);

            expect(
                medico.sedes
            ).toHaveLength(1);

            expect(
                medico.sedes[0]
            ).toBe(sede);
        });
    });
});