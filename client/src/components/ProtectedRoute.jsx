import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

export default function ProtectedRoute({ rolRequerido }) {
  const { usuario, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (rolRequerido && usuario.rol !== rolRequerido) return <Navigate to="/" replace />;

  return <Outlet />;
}
