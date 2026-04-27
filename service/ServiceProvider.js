import { MedicoService } from "./MedicoService.js";
import PracticaService from "./PracticaService.js";
import { SedeService } from "./SedeService.js";
import TurnoService from "./TurnoService.js";

class ServiceProvider {
    constructor() {
        this.medicoService = new MedicoService();
        this.sedeService = new SedeService();
        this.practicaService = new PracticaService();
        //Agrego para evitar dependencia circular entre TurnoService y ServicioProvider
        this.turnoService = null;
    }

    getMedicoService() {
        return this.medicoService;
    }
    
    getSedeService() {
        return this.sedeService;
    }

    getPracticaService() {
        return this.practicaService;
    }

    getTurnoService() {
        return this.turnoService;
    }
}

export const serviceProvider = new ServiceProvider();