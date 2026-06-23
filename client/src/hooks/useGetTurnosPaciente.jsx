import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetTurnosPaciente = (id) => {
    const [turnos, setTurnosPaciente] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTurnosPaciente = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/pacientes/'+id+'/turnos');
            setTurnosPaciente(response.data.turnos ?? []);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTurnosPaciente();
    }, []);

    return {
        turnos,
        loading,
        error
    };
};

export default useGetTurnosPaciente;
