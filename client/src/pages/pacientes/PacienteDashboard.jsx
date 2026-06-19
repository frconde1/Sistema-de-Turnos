import React from 'react'
import { NavLink } from 'react-router-dom'


export default function PacienteDashboard() {
  return (
    <>
      <NavLink to="./busqueda" end>Busqueda</NavLink>
      <hr />
      <NavLink to="./preseleccion" end>Preseleccion</NavLink>
    </>
  )
}
