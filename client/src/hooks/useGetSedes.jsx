import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetSedes = () => {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSedes = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/sedes');
            setSedes(response.data ?? []);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSedes();
    }, []);

    return {
        sedes,
        loading,
        error
    };
};

export default useGetSedes;
