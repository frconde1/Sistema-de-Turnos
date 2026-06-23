import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetTurnos = (rol, id) => {
    const [turnos, setTurnosPaciente] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTurnos = async () => {
        try {
            setLoading(true);
            setError(null);
            const path = rol === "Paciente" ? 
                "/pacientes/" + id + "/turnos" :
                "/turnos?medico="   + id;
            const response = await axios.get(path);
            setTurnosPaciente(response.data.turnos ?? []);

        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTurnos();
    }, []);

    return {
        turnos,
        loading,
        error,
        fetchTurnos
    };
};

export default useGetTurnos;
