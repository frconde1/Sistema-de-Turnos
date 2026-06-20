import React, { useState } from 'react'
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function Login({ setId }) {
	const [usuario, setUsuario] = useState("");
	const [contrasena, setContrasena] = useState("");

	const [cargando, setCargando] = useState(false);

	const navigate = useNavigate();

	/**@param {Event} event  */
	async function enviar(event) {

		event.preventDefault();


		setCargando(true);
		const res = await api.post(
			'/usuarios/login',
			{
				"username": usuario,
				"password": contrasena
			}
		)
		setCargando(false);

		if (res.status === 200) {
			setId(res.data.id);
			if (res.data.rol === "Paciente")
				navigate("/paciente")
			else
				navigate("/medico")
		} else {
			console.error(res.data)
		}

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

				<Button type="submit" variant="primary" disabled={cargando} >
					{cargando ? (
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
