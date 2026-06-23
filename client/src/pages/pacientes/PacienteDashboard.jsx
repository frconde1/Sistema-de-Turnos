import React, {useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';


export default function PacienteDashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if(usuario === null || usuario.rol !== "Paciente")
      navigate("/")
  }, [usuario, navigate])
  
  return (
    
    <>
      <h1>PACIENTE DASHBOARD</h1>
    </>
  )
}
