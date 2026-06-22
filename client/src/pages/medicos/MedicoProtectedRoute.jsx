import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
 


export function MedicoProtectedRoute() {
    const { usuario } = useAuth()
    const navigate    = useNavigate()
 
    useEffect(() => {
        if (usuario === null || usuario.rol !== 'Medico')
            navigate('/')
    }, [usuario, navigate])
 
    if (usuario === null || usuario.rol !== 'Medico') return null
 
    return <Outlet />
}
