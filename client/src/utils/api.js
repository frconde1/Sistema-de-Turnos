import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configuración global de axios
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json"
	},
	//validateStatus: () => true
});

export default api;