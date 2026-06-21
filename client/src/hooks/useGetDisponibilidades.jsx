import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetDisponibilidades = () => {
	const [disponibilidades, setDisponibilidades] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDisponibilidades = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axios.get('/medicos');
				setDisponibilidades(response.data?.data ?? []);

			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchDisponibilidades();
	}, []);

	return {
		disponibilidades,
		loading,
		error,
		setDisponibilidades,
	};
};

export default useGetDisponibilidades;
