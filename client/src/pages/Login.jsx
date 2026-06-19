import React, { useState } from 'react'
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [errorMsg, setErrorMsg]  	  = useState();
	const [usuario, setUsuario] 	  = useState("");
	const [contrasena, setContrasena] = useState("");
	
	const navigate = useNavigate();

	/**@param {Event} event  */
	async function enviar(event){

		event.preventDefault();
		
		try{
			const res = await api.post(
				'/usuarios',
				{
					"username": usuario,
					"password": contrasena
				}
			)
			console.log(res)
			navigate("../paciente")
		}
		catch (err){
			setErrorMsg(err.response?.data?.message || "error :(")
		}


	}

  	return (
		<>
			{errorMsg && (<p1>ERROR {errorMsg}</p1>)}
			<div>
				<form onSubmit={enviar}>
					<label>Usuario</label>
					<input type="text" name="usuario" onChange={e=>setUsuario(e.target.value)}/>

					<label>Contraseña</label>
					<input type="text" name="contraseña" onChange={e=>setContrasena(e.target.value)}/>

					<button type="submit">Ingresar</button>
				</form>
			</div>
		</>
  	)
}
