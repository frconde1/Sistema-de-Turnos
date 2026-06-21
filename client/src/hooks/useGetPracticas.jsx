import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetPracticas = () => {
    const [practicas, setPracticas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPracticas = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get('/practicas');
            setPracticas(response.data ?? []);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPracticas();
    }, []);

    return {
        practicas,
        loading,
        error
    };
};

export default useGetPracticas;
