/*
import MedicoService  from '../service/MedicoService.js';
import { InputError } from '../errors/Errors.js';
import { beforeEach, describe, expect } from '@jest/globals';

describe('Medico Service', () => {
    let medicoService;

    beforeEach(() => {
        medicoService = new MedicoService();
    });

    describe('create()', () => {
        it('Debe lanzar InputError si faltan campos obligatorios', () => {
            const reqInvalido = { usuario: "user123" };
            expect(() => medicoService.create(reqInvalido)).toThrow(InputError);
            expect(() => medicoService.create(reqInvalido)).toThrow("La matricula es obligatoria, El nombre es obligatorio");
        });
        
        it("Crea medico satisfactoriamente", () => {
            const medicoRequest = {
                usuario: "usuarioTest1",
                matricula: "matriculaTest1",
                nombre: "nombreTest1"
            }

            const medicoCreado = medicoService.create(medicoRequest);
            expect(medicoCreado.id).toEqual("10");
            expect(medicoCreado.usuario).toEqual("usuarioTest1");
            expect(medicoCreado.matricula).toEqual("matriculaTest1");
            expect(medicoCreado.nombre).toEqual("nombreTest1");

        });
    });

    describe('agregarDisponibilidad()', () => {

        let medicoCreado;

        beforeEach(() => {
            const medicoRequest = {
                usuario: "usuarioTest1",
                matricula: "matriculaTest1",
                nombre: "nombreTest1"
            }
            medicoCreado = medicoService.create(medicoRequest);
        })
        
        it('agrega disponibilidad satisfactoriamente', () => {
            const disponibilidad = {
                diaSemana: "MARTES",
                horaDesde: "12:00",
                horaHasta: "13:00"
            }
            const body = {disponibilidad}
            
            expect(() => medicoService.agregarDisponibilidad(medicoCreado.id, body)).not.toThrow()
            const medicoEncontrado = medicoService.FindById(medicoCreado.id)
            expect(medicoEncontrado.disponibilidades.length).toBe(1)
            expect(medicoEncontrado.disponibilidades[0]).toEqual(disponibilidad)
        });

        it('Debería lanzar error si se pasa un dia de semana que no esta dentro del enum', () => {
            const disponibilidad = {
                diaSemana: "ASD",
                horaDesde: "12:00",
                horaHasta: "13:00"
            }
            const body = {disponibilidad}
            
            expect(() => medicoService.agregarDisponibilidad(medicoCreado.id, body)).toThrow("Día de semana incorrecto")
        })

        it('Debería lanzar error si se pasa un numero en lugar de un dia de semana del enum', () => {
            const disponibilidad = {
                diaSemana: 1,
                horaDesde: "12:00",
                horaHasta: "13:00"
            }
            const body = {disponibilidad}
            
            expect(() => medicoService.agregarDisponibilidad(medicoCreado.id, body)).toThrow("Día de semana incorrecto")
        })
    });

    describe("validarFiltros", () => {
        it("No deberia lanzar error si no se pasa nada o si se pasa un objeto vacio (filtros = {})", () => {
            expect(() => medicoService.validarFiltros()).not.toThrow();
            expect(() => medicoService.validarFiltros({})).not.toThrow();
        });
        it("No deberia lanzar error si se pasan propiedades string válidas", () => {
            const filtros = { nombre: "Juan", especialidad: "Cardio", practica: "Tratamiento", sede: "Norte" };
            expect(() => medicoService.validarFiltros(filtros)).not.toThrow();
        });
        it("Deberia lanzar error si nombre no es un string", () => {
            const filtros = { nombre: 123 };
            expect(() => medicoService.validarFiltros(filtros)).toThrow(InputError);
        });
        it("Deberia lanzar error si especialidad no es un string", () => {
             const filtros = { especialidad: 123 };
             expect(() => medicoService.validarFiltros(filtros)).toThrow(InputError);
        });
    });
});
*/