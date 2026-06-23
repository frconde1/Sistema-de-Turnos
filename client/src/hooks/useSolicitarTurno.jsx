import axios from 'axios';
import { useState } from 'react';

const useSolicitarTurno = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [turnoSolicitado, setTurnoSolicitado] = useState(false);

    const solicitarTurno = async ({ medico, paciente, sede, practica, fechaHora }) => {
        try {
            setLoading(true);
            setError(null);

            await axios.post('/turnos', {
                medico: medico.id,
                paciente,
                sede,
                practica,
                fechaHora,
            });
            return { ok: true };
        } catch (err) {
            setError(err.response.data.message);
            return { ok: false, error: err.response.data.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        turnoSolicitado,
        solicitarTurno,
    };
};

export default useSolicitarTurno;