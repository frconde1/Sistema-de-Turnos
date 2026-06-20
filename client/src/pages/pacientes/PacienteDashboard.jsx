import React, {useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


export default function PacienteDashboard({userId}) {
  const navigate = useNavigate();

  useEffect(() => {
    if(userId==="")
      navigate("/")
  }, [userId, navigate])
  
  return (
    
    <>
      <NavLink to="./busqueda" end>Busqueda</NavLink>
      <hr />
      <NavLink to="./preseleccion" end>Preseleccion</NavLink>
    </>
  )
}
