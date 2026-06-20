import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function MedicoDashboard({userId}) {
  const navigate = useNavigate();

  useEffect(() => {
    if(userId==="")
      navigate("/")
  }, [userId, navigate])


  return (
	  <div>Dashboard</div>
  )
}
