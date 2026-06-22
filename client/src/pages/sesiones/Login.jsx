import React, { useState } from 'react'
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../context/auth/AuthContext';

export default function Login() {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");
	const { login, error, loading } = useAuth();

	const navigate = useNavigate();

	/**@param {Event} event  */
	async function enviar(event) {

		event.preventDefault();

		const usuarioLogueado = await login(usuario, contrasena);

		if (usuarioLogueado?.rol === "Paciente") {
			navigate("/paciente")
			return;
		}
		if (usuarioLogueado?.rol === "Medico") {
			navigate("/medico")
			return;
		}
		
		navigate("/")
	}

	return (
		<>
			<Form onSubmit={enviar}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Usuario</Form.Label>
					<Form.Control type="text" placeholder="Ingrese su usuario" onChange={e => setUsuario(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control type="password" placeholder="Ingrese su contraseña" onChange={e => setContrasena(e.target.value)} />
				</Form.Group>

				<Button type="submit" variant="primary" disabled={loading} >
					{loading ? (
						<>
							<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
							Ingresando...
						</>
					) :
						('Ingresar')}
				</Button>
			</Form>
		</>
	)
}
