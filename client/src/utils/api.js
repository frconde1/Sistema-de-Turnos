import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

// Configuración global de axios
axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = process.env.BASE_URL || 10000;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json"
	},
	validateStatus: () => true
});

export default api;