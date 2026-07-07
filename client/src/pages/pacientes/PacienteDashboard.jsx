import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import { useAuth } from "../../context/auth/AuthContext";
import useGetTurnos from "../../hooks/useGetTurnos";
import TurnoCard from "../../features/cards/TurnoCard";
import useCancelarTurno from "../../hooks/useCancelarTurno";

export default function PacienteDashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario === null || usuario.rol !== "Paciente")
      navigate("/");

  }, [usuario, navigate]);

  const { turnos, loading: loadingTurnos, error: errorTurnos, fetchTurnos } = useGetTurnos(usuario?.rol, usuario?.id);
  const { cancelarTurno, loading: loadingCancelar, error: errorCancelar } = useCancelarTurno();

  const handleCancelar = async (i) => {
    await cancelarTurno(turnos[i].id, usuario.id, "El paciente canceló el turno")
    await fetchTurnos()
  }

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <h1 className="mb-0">Mis turnos</h1>
        {!loadingTurnos && !errorTurnos && (
          <Badge bg="secondary" pill>
            {turnos.length}
          </Badge>
        )}
      </div>

      {(loadingTurnos || loadingCancelar) && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {!loadingTurnos && errorTurnos && (
        <Alert variant="danger">
          Ocurrió un error al cargar tus turnos. Intentá nuevamente más tarde.
        </Alert>
      )}

      {!loadingCancelar && errorCancelar && (
        <Alert variant="danger">
          Ocurrió un error al cancelar el turno: {errorCancelar.message}
        </Alert>
      )}

      {!loadingTurnos && !errorTurnos && turnos.length === 0 && (
        <div className="text-center text-muted py-5">
          <p className="mb-1 fs-5">No tenés turnos reservados</p>
          <p className="mb-0">
            Buscá un médico disponible para solicitar tu primer turno.
          </p>
        </div>
      )}

      {!loadingTurnos && !errorTurnos && turnos.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-3">
          {turnos.map((turno, index) => (
            <Col key={turno.id ?? index}>
              <TurnoCard 
                turno={{...turno, fechaHora: new Date(turno.fechaHora), sede: turno.sede.id, practica: turno.practica}} 
                index={index} 
                onRemove={turno.estado === "CANCELADO"? null : handleCancelar}
                botonText={"Cancelar"}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}