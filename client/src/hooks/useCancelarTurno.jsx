import axios from 'axios';
import { useState } from 'react';

const useCancelarTurno = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cancelarTurno = async (id, userId, motivo) => {
        try {
            setLoading(true);
            setError(null);
            const res = await axios.post('/turnos/'+ id + "/estados", {
                usuario: userId,
                estado: "CANCELADO",
                motivo: motivo
            });
            return res.data;
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        cancelarTurno
    };
};

export default useCancelarTurno;