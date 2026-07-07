import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { useAuth } from "../../context/auth/AuthContext";
import useGetTurnos from "../../hooks/useGetTurnos";
import TurnoCard from "../../features/cards/TurnoCard";
import useCancelarTurno from "../../hooks/useCancelarTurno";
import ObraSocialModal from "../../features/modals/ObraSocialModal";
import ObraSocialCard from "../../features/cards/ObraSocialCard";

export default function PacienteDashboard() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { setObraSocialId } = useOutletContext();

  const [paciente, setPaciente] = useState(null);
  const [todasLasObrasSociales, setTodasLasObrasSociales] = useState([]);
  const [modalObraSocial, setModalObraSocial] = useState(false);
  const [loadingPaciente, setLoadingPaciente] = useState(true);
  const [errorObraSocial, setErrorObraSocial] = useState(null);

  useEffect(() => {
    if (usuario === null || usuario.rol !== "Paciente")
      navigate("/");

  }, [usuario, navigate]);

  useEffect(() => {
    if (!usuario) return;

    const fetchData = async () => {
      try {
        const [resPaciente, resObrasSociales] = await Promise.all([
          axios.get(`/pacientes/${usuario.username}`),
          axios.get('/obrasSociales')
        ]);
        setPaciente(resPaciente.data);
        setTodasLasObrasSociales(resObrasSociales.data);
        setObraSocialId(resPaciente.data.obraSocial?.id ?? null);
      } catch {
        setErrorObraSocial('No se pudo cargar la información del paciente.');
      } finally {
        setLoadingPaciente(false);
      }
    };
    fetchData();
  }, [usuario, setObraSocialId]);

  const { turnos, loading: loadingTurnos, error: errorTurnos, fetchTurnos } = useGetTurnos(usuario?.rol, usuario?.id);
  const { cancelarTurno, loading: loadingCancelar, error: errorCancelar } = useCancelarTurno();

  const handleCancelar = async (i) => {
    await cancelarTurno(turnos[i].id, usuario.id, "El paciente canceló el turno")
    await fetchTurnos()
  }

  const asignarObraSocial = async (obraSocialId) => {
    try {
      await axios.put(`/pacientes/${paciente.id}/obraSocial`, { obraSocial: obraSocialId });
      const osAsignada = todasLasObrasSociales.find(os => os.id === obraSocialId);
      setPaciente(p => ({ ...p, obraSocial: osAsignada }));
      setObraSocialId(obraSocialId);
      setModalObraSocial(false);
    } catch {
      setErrorObraSocial('No se pudo asignar la obra social.');
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <h2 className="mb-0">Mi obra social</h2>
        {!loadingPaciente && (
          <Button size="sm" variant="outline-primary" onClick={() => setModalObraSocial(true)}>
            {paciente?.obraSocial ? 'Cambiar' : 'Seleccionar'}
          </Button>
        )}
      </div>

      {loadingPaciente && (
        <div className="text-center py-3">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      {!loadingPaciente && errorObraSocial && (
        <Alert variant="danger">{errorObraSocial}</Alert>
      )}

      {!loadingPaciente && !errorObraSocial && (
        paciente?.obraSocial ? (
          <ObraSocialCard obraSocial={paciente.obraSocial} />
        ) : (
          <p className="mb-4">No tenés obra social asignada.</p>
        )
      )}

      <ObraSocialModal
        show={modalObraSocial}
        onHide={() => setModalObraSocial(false)}
        todasLasObrasSociales={todasLasObrasSociales}
        obraSocialActual={paciente?.obraSocial}
        onAsignar={asignarObraSocial}
      />

      <div className="d-flex align-items-center gap-2 mb-4">
        <h2 className="mb-0">Mis turnos</h2>
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