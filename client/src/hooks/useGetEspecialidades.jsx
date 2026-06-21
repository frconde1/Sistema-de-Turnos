import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetEspecialidades = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEspecialidades = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/especialidades');
            setEspecialidades(response.data ?? []);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEspecialidades();
    }, []);

    return {
        especialidades,
        loading,
        error
    };
};

export default useGetEspecialidades;
