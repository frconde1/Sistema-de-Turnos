import axios from 'axios';
import { useState, useEffect } from 'react';

const useGetPrecio = (practicaId, obraSocialId) => {
    const [precio, setPrecio] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!practicaId) {
            setPrecio(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchPrecio = async () => {
            if (obraSocialId == null || practicaId == null) return;
            
            try {
                setLoading(true);
                setError(null);
                const res = await axios.get(`/obrasSociales/${obraSocialId}/practicas/${practicaId}`, {});
                console.log("Precio final obtenido:", res.data.precioFinal);
                setPrecio(res.data.precioFinal);
            } catch (err) {
                console.log(JSON.stringify(err));
                if(err.response && err.response?.status === 404 ) {
                    setPrecio(null);
                } else {
                    setError(err.response?.data?.message || 'Error al calcular el precio');
                    setPrecio(null);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPrecio();
    }, [practicaId, obraSocialId]);

    return { precio, loading, error };
};

export default useGetPrecio;
