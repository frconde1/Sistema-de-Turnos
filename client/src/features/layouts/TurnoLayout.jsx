import React from "react";
import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

export default function TurnoLayout() {
  const [turnos, setTurnos] = useState([]);
  const [obraSocialId, setObraSocialId] = useState(null);
  const location = useLocation();

  const isBusqueda = location.pathname.endsWith("busqueda");
  const isPreseleccion = location.pathname.endsWith("preseleccion");
  const isLanding = location.pathname.endsWith("paciente")
  return (
    <div className="container py-3">
      <div className="d-flex justify-content-center gap-2 mb-4">
        <NavLink
          to="busqueda"
          className={`btn ${isBusqueda ? "btn-primary" : "btn-outline-primary"}`}
        >
          Búsqueda
        </NavLink>
        <NavLink
          to="preseleccion"
          className={`btn ${isPreseleccion ? "btn-primary" : "btn-outline-primary"}`}
        >
          Preselección
          {turnos.length > 0 && (
            <span className="badge bg-light text-primary ms-2">
              {turnos.length}
            </span>
          )}
        </NavLink>
		<NavLink
          to=""
          className={`btn ${isLanding ? "btn-primary" : "btn-outline-primary"}`}
        >
          Dashboard
        </NavLink>
      </div>

      <Outlet context={{ turnos, setTurnos, obraSocialId, setObraSocialId }} />
    </div>
  );
}