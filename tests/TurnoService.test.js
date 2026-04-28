import TurnoService  from "../service/TurnoService.js"

describe("TurnoService", () => {
    let turnoService

    beforeEach(() => {
        turnoService = new TurnoService()
    })

    it("debería crear un turno correctamente", () => {
        const turno = turnoService.Create({
            medico: "0",
            paciente: "0",
            fechaHora: "2024-03-15T10:30:00",
            sede: "1",
            practica: "0",
            estado: 2,
            costo: 5000
        })

        expect(turno.medico).toBe("0")
        expect(turno.costo).toBe(5000)
    })

    it("debería lanzar error si falta el médico", () => {
        expect(() => {
            turnoService.Create({
                paciente: "0",
                costo: 5000
            })
        }).toThrow()
    })
})
