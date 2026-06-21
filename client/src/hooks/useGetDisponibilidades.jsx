import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetDisponibilidades = () => {
	const [disponibilidades, setDisponibilidades] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchDisponibilidades = async (params = {}) => {
		try {
			setLoading(true);
			setError(null);

			const response = await axios.get('/medicos', {
				params,
			});

			setDisponibilidades(response.data?.data ?? []);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDisponibilidades();
	}, []);

	return {
		disponibilidades,
		loading,
		error,
		fetchDisponibilidades,
	};
};

export default useGetDisponibilidades;
