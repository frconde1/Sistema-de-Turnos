import React, { useEffect } from 'react'
import useGetTurnos from '../../hooks/useGetTurnos';
import { useAuth } from '../../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert, Badge, Col, Container, Row, Spinner } from 'react-bootstrap';
import TurnoCard from '../../features/cards/TurnoCard';

export default function MedicoTurnos() {
	const navigate = useNavigate();
	const { usuario } = useAuth();

	useEffect(() => {
		if (usuario === null || usuario.rol !== "Medico")
		  	navigate("/");

  		}, [usuario, navigate]);

	const { turnos, loading, error } = useGetTurnos(usuario?.rol, usuario?.id);

  return (
	<Container className="py-4">
      <div className="d-flex align-items-center gap-2 mb-4">
        <h1 className="mb-0">Turnos</h1>
      </div>

      {loading && (<div className="text-center py-5"><Spinner animation="border" /></div>)}

      {!loading && error && (<Alert variant="danger">Ocurrió un error al cargar tus turnos. Intentá nuevamente más tarde.</Alert>)}

      {!loading && !error && turnos.length === 0 && (
        <div className="text-center text-muted py-5">
          <p className="mb-1 fs-5">No tenés turnos reservados</p>
          <p className="mb-0">
            Cuando alguien solicite un turno aparecerá acá
          </p>
        </div>
      )}

      {!loading && !error && turnos.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-3">
          {turnos.map((turno, index) => (
            <Col key={turno.id ?? index}>
              <TurnoCard turno={{...turno, fechaHora: new Date(turno.fechaHora), sede: turno.sede.id, practica: turno.practica.id}} index={index} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
