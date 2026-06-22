import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

export default function MedicoDashboard({userId}) {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if(usuario === null || usuario.rol !== "Medico")
      navigate("/")
  }, [usuario, navigate])


  return (
	  <div>Dashboard</div>
  )
}
