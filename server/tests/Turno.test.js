import Turno from "../domain/Turno.js";
import CambioEstadoTurno from "../domain/CambioEstadoTurno.js";
import { EstadoTurno } from "../domain/Enums.js";

describe("Turno", () => {

    let turno;

    beforeEach(() => {

        const medico = {
            id: "m1"
        };

        const paciente = {
            id: "p1"
        };

        const sede = {
            id: "s1"
        };

        const practica = {
            id: "pr1",
            duracionEnMins: 30
        };

        turno = new Turno(
            medico,
            paciente,
            new Date("2030-10-10T10:00:00"),
            sede,
            practica,
            "CONFIRMADO",
            [],
            5000
        );
    });

    describe("FechaFinalizacion", () => {

        it("deberia devolver fecha de finalizacion", () => {

            const fechaFinal =
                turno.FechaFinalizacion();

            expect(
                fechaFinal.getHours()
            ).toBe(10);

            expect(
                fechaFinal.getMinutes()
            ).toBe(30);
        });

        it("deberia no modificar la fecha y hora original", () => {

            turno.FechaFinalizacion();

            expect(
                turno.fechaHora.getMinutes()
            ).toBe(0);
        });
    });

    describe("CambiarEstado", () => {

        it("deberia cambiar el estado", () => {

            const usuario = {
                id: "u1"
            };

            turno.CambiarEstado(
                EstadoTurno.CANCELADO,
                usuario,
                "cancelado"
            );

            expect(turno.estado)
                .toBe("CANCELADO");
        });

        it("deberia agregar entrada al historial", () => {

            const usuario = {
                id: "u1"
            };

            turno.CambiarEstado(
                { estado: "CANCELADO" },
                usuario,
                "cancelado"
            );

            expect(
                turno.historialEstados
            ).toHaveLength(1);

            expect(
                turno.historialEstados[0]
            ).toBeInstanceOf(CambioEstadoTurno);
        });

        it("deberia guardar motivo en historial", () => {

            const usuario = {
                id: "u1"
            };

            turno.CambiarEstado(
                { estado: "CANCELADO" },
                usuario,
                "motivo test"
            );

            expect(
                turno.historialEstados[0].motivo
            ).toBe("motivo test");
        });

        it("deberia guardar usuario en historial", () => {

            const usuario = {
                id: "u1"
            };

            turno.CambiarEstado(
                { estado: "CANCELADO" },
                usuario,
                "motivo"
            );

            expect(
                turno.historialEstados[0].usuario
            ).toBe(usuario);
        });
    });
});