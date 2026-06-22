import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/usuarios/login', { username, password });

            const usuarioLogueado = {
                id: response.data.id,
                rol: response.data.rol,
            };

            setUsuario(usuarioLogueado);
            return usuarioLogueado;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
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