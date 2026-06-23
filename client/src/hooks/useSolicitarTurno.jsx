import axios from 'axios';
import { useState } from 'react';

const useSolicitarTurno = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const solicitarTurno = async ({ medico, paciente, sede, practica, fechaHora }) => {
        try {
            setLoading(true);
            setError(null);
            await axios.post('/turnos', {
                medico,
                paciente,
                sede,
                practica,
                fechaHora,
            });
            return { ok: true };
        } catch (err) {
            setError(err);
            return { ok: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        solicitarTurno,
    };
};

export default useSolicitarTurno;