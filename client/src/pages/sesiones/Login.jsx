import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { useAuth } from "../../context/auth/AuthContext";


export default function Login() {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");
	const [mostrarPassword, setMostrarPassword] = useState(false);

	const [mostrarToast, setMostrarToast] = useState(false);

	const { usuario: usuarioActual, login, error, loading } = useAuth();

	const navigate = useNavigate();

	async function enviar(event) {
		event.preventDefault();

		const usuarioLogueado = await login(usuario, contrasena);

		if (usuarioLogueado?.rol === "Paciente") {
			navigate("/paciente");
			return;
		}

		if (usuarioLogueado?.rol === "Medico") {
			navigate("/medico");
			return;
		}

		setMostrarToast(true);
	}

	if (usuarioActual?.rol === "Paciente") {
		return <Navigate to="/paciente" replace />;
	}

	if (usuarioActual?.rol === "Medico") {
		return <Navigate to="/medico" replace />;
	}

	return (
		<>
			<div
				className="container mt-5"
				style={{ maxWidth: "500px" }}
			>
				<h2 className="mb-4">Iniciar sesión</h2>

				<Form onSubmit={enviar}>
					<Form.Group className="mb-3">
						<Form.Label>Usuario</Form.Label>
						<Form.Control
							type="text"
							placeholder="Ingrese su usuario"
							value={usuario}
							onChange={(e) => setUsuario(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Contraseña</Form.Label>

						<div className="position-relative">
							<Form.Control
								type={mostrarPassword ? "text" : "password"}
								placeholder="Ingrese su contraseña"
								value={contrasena}
								onChange={(e) =>
									setContrasena(e.target.value)
								}
								style={{ paddingRight: "80px" }}
							/>

							<Button
								type="button"
								variant="link"
								className="position-absolute p-0"
								style={{
									right: "12px",
									top: "50%",
									transform: "translateY(-50%)",
									textDecoration: "none",
									zIndex: 10
								}}
								onClick={() =>
									setMostrarPassword(!mostrarPassword)
								}
							>
								{mostrarPassword
									? "Ocultar"
									: "Mostrar"}
							</Button>
						</div>
					</Form.Group>

					<Button
						type="submit"
						variant="primary"
						className="w-100"
						disabled={loading}
					>
						{loading ? (
							<>
								<span
									className="spinner-border spinner-border-sm me-2"
									role="status"
									aria-hidden="true"
								/>
								Ingresando...
							</>
						) : (
							"Ingresar"
						)}
					</Button>
				</Form>
			</div>

			<ToastContainer position="top-end" className="p-3">
				<Toast
					show={mostrarToast}
					onClose={() => setMostrarToast(false)}
					bg="danger"
					delay={5000}
					autohide
				>
					<Toast.Header>
						<strong className="me-auto">
							Error de inicio de sesión
						</strong>
					</Toast.Header>

					<Toast.Body className="text-white">
						{error || "Usuario o contraseña incorrectos."}
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
}