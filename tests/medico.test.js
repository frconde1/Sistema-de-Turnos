import { MedicoService } from '../service/MedicoService.js';
import { InputError } from '../errors/Errors.js';

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
