import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Toast, ToastContainer, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");
	

	const [nombre, setNombre] = useState("");
	const [tipo, setTipo] = useState("paciente");

	const [dni, setDni] = useState("");
	const [matricula, setMatricula] = useState("");

	const [cargando, setCargando] = useState(false);

	const [mostrarToast, setMostrarToast] = useState(false);
	const [toastMensaje, setToastMensaje] = useState("");
	const [toastTipo, setToastTipo] = useState("");
	const [toastTitulo, setToastTitulo] = useState("");

	const [mostrarPassword, setMostrarPassword] = useState(false);

	const navigate = useNavigate();

	async function enviar(e) {
		e.preventDefault();


		try {
			setCargando(true);
			let res;
			if (tipo === "paciente")
				res = await api.post(
					"pacientes",
					{
						"username": usuario,
						"password": contrasena,
						"nombre": nombre,
						"dni": dni
					}
				);
			else
				res = await api.post(
					"medicos",
					{
						"username": usuario,
						"password": contrasena,
						"nombre": nombre,
						"matricula": matricula
					}
				);
			setCargando(false);
			setToastTitulo("Registro exitoso");
			setToastMensaje("El registro se ha realizado correctamente.");
			setToastTipo("success");
			setMostrarToast(true);

			setTimeout(() => {
				navigate("/login");
			}, 2000);

		} catch (error) {
				setToastTipo("error");
				setToastTitulo("Error en el registro");
				if (error.response && error.response.data && error.response.data.message) {
					setToastMensaje(error.response.data.message);
				} else {
					setToastMensaje("Ocurrió un error al registrar el usuario.");
				}
				setMostrarToast(true);
				setCargando(false);
			}
		}

	useEffect(() => {
		setDni("");
		setMatricula("");
	}, [tipo]);

	return (
		<>
		<div className="container mt-5" style={{ maxWidth: "500px" }}>
			<h2 className="mb-4">Registro</h2>
			<form onSubmit={enviar}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Usuario
					</label>
					<input
						type="text"
						className="form-control"
						onChange={(e) => setUsuario(e.target.value)}
					/>
				</div>
			<div className="mb-3">
				<label htmlFor="password" className="form-label">
					Contraseña
				</label>

				<div className="position-relative">
					<input
						type={mostrarPassword ? "text" : "password"}
						className="form-control"
						style={{ paddingRight: "80px" }}
						onChange={(e) => setContrasena(e.target.value)}
					/>

					<button
						type="button"
						className="btn btn-sm position-absolute"
						style={{
							right: "10px",
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 10
						}}
						onClick={() => setMostrarPassword(!mostrarPassword)}
					>
						{mostrarPassword ? "Ocultar" : "Mostrar"}
					</button>
				</div>
			</div>

				<div className="mb-3">
					<label htmlFor="nombre" className="form-label">
						Nombre completo
					</label>
					<input
						type="text"
						className="form-control"
						value={nombre}
						onChange={e => setNombre(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, ""))}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="tipo" className="form-label">
						Tipo de usuario
					</label>
					<select
						className="form-select"
						value={tipo}
						onChange={(e) => setTipo(e.target.value)}
					>
						<option value="paciente">Paciente</option>
						<option value="medico">Médico</option>
					</select>
				</div>

				<div className="mb-3">
					<label htmlFor="identificador" className="form-label">
						{tipo === "paciente" ? "DNI" : "Matrícula"}
					</label>
					<input
						type="text"
						className="form-control"
						value={tipo === "paciente" ? dni : matricula}
						inputMode={tipo === "paciente" ? "numeric" : "text"}
						pattern={tipo === "paciente" ? "[0-9]*" : undefined}
						onChange={(e) => {
							const value = e.target.value;

							if (tipo === "paciente") {
								setDni(value.replace(/\D/g, ""));
							} else {
								setMatricula(value);
							}
						}}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary w-100"
					disabled={cargando}
				>
					{cargando ? (
						<>
							<span
								className="spinner-border spinner-border-sm me-2"
								role="status"
								aria-hidden="true"
							/>
							Registrando...
						</>
					) : (
						'Registrarse'
					)}
				</button>
			</form>
			<br />
		</div>
		
		<ToastContainer position="top-end" className="p-3">
			<Toast
				onClose={() => setMostrarToast(false)}
				show={mostrarToast}
				bg={toastTipo === "success" ? "success" : "danger"}
				delay={5000}
				autohide
			>
				<Toast.Header>
					<strong className="me-auto">{toastTitulo}</strong>
				</Toast.Header>
				<Toast.Body className="text-white">{toastMensaje}</Toast.Body>
			</Toast>
		</ToastContainer>

		</>
		
	);
}
