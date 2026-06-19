import React, { useState } from 'react'
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Toast } from 'react-bootstrap';

export default function Login() {
	const [errorMsg, setErrorMsg]  	  = useState();
	const [usuario, setUsuario] 	  = useState("");
	const [contrasena, setContrasena] = useState("");
	
	const navigate = useNavigate();

	/**@param {Event} event  */
	async function enviar(event){

		event.preventDefault();
		
		try{
			// const res = await api.post(
			// 	'/usuarios',
			// 	{
			// 		"username": usuario,
			// 		"password": contrasena
			// 	}
			// )
			// console.log(res)

			navigate("/home")
		}
		catch (err){
			setErrorMsg(err.response?.data?.message || "error :(")
		}

	}

  	return (
		<>
			<Form onSubmit={enviar}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Usuario</Form.Label>
					<Form.Control type="text" placeholder="Ingrese su usuario" onChange={e=>setUsuario(e.target.value)}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control type="password" placeholder="Ingrese su contraseña" onChange={e=>setContrasena(e.target.value)}/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Ingresar
				</Button>
			</Form>
			<div className='mt-4'>
				{errorMsg && (<Alert variant='danger'>{errorMsg}</Alert>)}
			</div>
		</>
  	)
}
