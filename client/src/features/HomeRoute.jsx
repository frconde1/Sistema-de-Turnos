import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import Landing from "../pages/Landing";

export default function HomeRoute() {
	const { usuario } = useAuth();

	if (!usuario) {
		return <Landing />;
	}

	if (usuario.rol === "Paciente") {
		return <Navigate to="/paciente" replace />;
	}

	if (usuario.rol === "Medico") {
		return <Navigate to="/medico" replace />;
	}

	return <Landing />;
}