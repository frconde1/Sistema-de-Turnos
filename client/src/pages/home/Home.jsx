import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "820px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
          border: "1px solid rgba(148,163,184,0.2)",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "12px", fontSize: "3rem" }}>🏥</div>
        <h1 style={{ margin: 0, color: "#0f172a", fontSize: "2.2rem", fontWeight: 800 }}>
          Bienvenido a la aplicación de gestión de pacientes
        </h1>
        <p style={{ color: "#475569", marginTop: "12px", marginBottom: "32px", fontSize: "1.05rem" }}>
          Seleccioná el panel que querés abrir.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          <NavLink
            to="/paciente"
            style={({ isActive }) => ({
              textDecoration: "none",
              borderRadius: "20px",
              padding: "28px 22px",
              color: "white",
              textAlign: "left",
              background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
              boxShadow: "0 14px 30px rgba(37, 99, 235, 0.22)",
              transform: isActive ? "translateY(-2px)" : "translateY(0)",
            })}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🧑‍⚕️</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>
              Dashboard de paciente
            </div>
            <div style={{ lineHeight: 1.5, opacity: 0.95 }}>
              Ver turnos, historial y acceder a la gestión personal.
            </div>
          </NavLink>

          <NavLink
            to="/medico"
            style={({ isActive }) => ({
              textDecoration: "none",
              borderRadius: "20px",
              padding: "28px 22px",
              color: "white",
              textAlign: "left",
              background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
              boxShadow: "0 14px 30px rgba(16, 185, 129, 0.22)",
              transform: isActive ? "translateY(-2px)" : "translateY(0)",
            })}
          >
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>👨‍⚕️</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "8px" }}>
              Dashboard de médico
            </div>
            <div style={{ lineHeight: 1.5, opacity: 0.95 }}>
              Administrar pacientes, turnos y consultas desde el panel médico.
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}