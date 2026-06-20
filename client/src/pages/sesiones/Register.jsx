import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function Register({setId}) {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");

	const [nombre, setNombre] = useState("");
	const [tipo, setTipo] = useState("paciente");

	const [dni, setDni] = useState("");
	const [matricula, setMatricula] = useState("");

	const [cargando, setCargando] = useState(false);

	/** @param {Event} e */
	async function enviar(e) {
		e.preventDefault();

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

		console.log(res.status);
		setCargando(false);
	}

	useEffect(() => {
		setDni("");
		setMatricula("");
	}, [tipo]);

	return (
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
					<input
						type="password"
						className="form-control"
						onChange={(e) => setContrasena(e.target.value)}
					/>
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
	);
}
