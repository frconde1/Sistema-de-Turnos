import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          Gestioná tus turnos médicos de forma simple y segura
        </h1>

        <p className="lead mt-3">
          Sweet Medical conecta pacientes y profesionales de la salud
          en una única plataforma para gestionar turnos, agendas y
          notificaciones en tiempo real.
        </p>

      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Para pacientes</h3>

              <p className="card-text">
                Encontrá profesionales según tu cobertura médica,
                consultá disponibilidad en tiempo real y reservá
                turnos de manera rápida y sencilla.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">
                Para profesionales de la salud
              </h3>

              <p className="card-text">
                Administrá tu agenda, definí horarios de atención y
                gestioná solicitudes de turnos desde un único lugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
          <NavLink
            to="/login"
            className="btn btn-outline-primary btn-lg"
          >
            Iniciar sesión
          </NavLink>

          <NavLink
            to="/register"
            className="btn btn-primary btn-lg"
          >
            Registrarse
          </NavLink>
        </div>
    </div>
  )
}
