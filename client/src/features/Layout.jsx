import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Layout({ id, setId }) {
  const [registrado, setRegistrado] = useState(false);

  useEffect(
    () => {
      if (id !== "")
        setRegistrado(true);
      else
        setRegistrado(false);
    },
    [id])

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
        <NavLink to="/" className="fs-4 text-decoration-none text-reset">
          <img src={"/Logo.png"} alt="Logo" height="64" />
        </NavLink>
        <nav className="d-flex gap-2">
          {
            registrado ? 
            <>
              <NavLink to="/" onClick={()=>setId("")} className="btn btn-outline-primary">logout</NavLink>
            </> :
              <>
                <NavLink to="/login" className="btn btn-outline-primary">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-primary">
                  Registrarse
                </NavLink>
              </>
          }
        </nav>
      </header>

      <main className="flex-grow-1" style={{ backgroundColor: "lightgray" }}>
        <Outlet />
      </main>

      <footer className="py-3 mt-auto border-top">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <span className="text-body-secondary">Sweet medical</span>
          <div className="d-flex gap-3">
            <p className="text-decoration-none text-body-secondary">
              Acerca de
            </p>
            <p className="text-decoration-none text-body-secondary">Contacto</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
