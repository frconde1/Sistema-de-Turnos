import React from "react";
import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function MedicoTurnoLayout() {
  const location = useLocation();

  const isTurnos = location.pathname.endsWith("medico");
  const isLanding = location.pathname.endsWith("busqueda");

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-center gap-2 mb-4">
        <NavLink
          to="turnos"
          className={`btn ${isTurnos ? "btn-primary" : "btn-outline-primary"}`}
        >
          Turnos
        </NavLink>
		<NavLink
          to=""
          className={`btn ${isLanding ? "btn-primary" : "btn-outline-primary"}`}
        >
          Landing
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}