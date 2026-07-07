import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now() ? null : decoded;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/usuarios/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUsuario(decoded);
            return decoded;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(error.response?.data?.message || 'Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    const isAuthenticated = usuario !== null;

    return (
        <AuthContext.Provider
            value={{
                usuario,
                login,
                logout,
                isAuthenticated,
                error,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    
    return context;
}
