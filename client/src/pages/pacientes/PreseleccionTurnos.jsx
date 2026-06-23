import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import TurnoCard from "../../features/cards/TurnoCard";
import useSolicitarTurno from "../../hooks/useSolicitarTurno";

export default function PreseleccionTurnos() {
  const { turnos, setTurnos } = useOutletContext();
  const { loading, solicitarTurno } = useSolicitarTurno();
  const [resumen, setResumen] = useState(null); // { ok: number, fallidos: number } | null

  const handleRemoveTurno = (index) => {
    setTurnos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSolicitarTurnos = async () => {
    setResumen(null);

    const resultados = await Promise.all(
      turnos.map((turno) => solicitarTurno(turno))
    );

    const exitosos = turnos.filter((_, i) => resultados[i].ok);
    const fallidos = turnos.filter((_, i) => !resultados[i].ok);

    setTurnos(fallidos);
    setResumen({ ok: exitosos.length, fallidos: fallidos.length });
  };

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        {turnos.length > 0 && (
          <Button onClick={handleSolicitarTurnos} disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Solicitando...
              </>
            ) : (
              "Solicitar turnos"
            )}
          </Button>
        )}
      </div>

      {resumen && (
        <Alert
          variant={resumen.fallidos === 0 ? "success" : "warning"}
          onClose={() => setResumen(null)}
          dismissible
        >
          {resumen.ok > 0 && (
            <span>
              {resumen.ok === 1
                ? "1 turno solicitado con éxito. "
                : `${resumen.ok} turnos solicitados con éxito. `}
            </span>
          )}
          {resumen.fallidos > 0 && (
            <span>
              {resumen.fallidos === 1
                ? "1 turno no pudo solicitarse, revisá la disponibilidad e intentá nuevamente."
                : `${resumen.fallidos} turnos no pudieron solicitarse, revisá la disponibilidad e intentá nuevamente.`}
            </span>
          )}
        </Alert>
      )}

      {turnos.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="mb-1 fs-5">No hay turnos preseleccionados</p>
          <p className="mb-0">
            Volvé a la búsqueda para elegir un turno disponible.
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-3">
          {turnos.map((turno, index) => (
            <Col key={index}>
              <TurnoCard
                index={index}
                turno={turno}
                onRemove={handleRemoveTurno}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}