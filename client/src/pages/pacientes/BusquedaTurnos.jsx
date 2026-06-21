import React, { useState } from 'react';
import { Alert, Badge, Card, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import useGetDisponibilidades from '../../hooks/useGetDisponibilidades';
import BusquedaTurnosFiltros from './BusquedaTurnosFiltros.jsx';

export default function BusquedaTurnos() {
  const { disponibilidades, loading, error, fetchDisponibilidades } = useGetDisponibilidades();
  const [filtros, setFiltros] = useState({
    nombre: '',
    especialidadId: '',
    practicaId: '',
    sedeId: '',
  });

  const formatDisponibilidad = (disponibilidad) => {
    return `${disponibilidad.diaSemana} · ${disponibilidad.horaDesde} a ${disponibilidad.horaHasta}`;
  };

  const handleSearch = () => {
    fetchDisponibilidades({
      nombre: filtros.nombre || undefined,
      especialidad: filtros.especialidadId || undefined,
      practica: filtros.practicaId || undefined,
      sede: filtros.sedeId || undefined,
    });
  };

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status" />
        <div>Cargando medicos...</div>
      </Container>
    );
  }

  if (error) return <Alert variant="danger">Error: {error.message}</Alert>;
  
  return (
    <Container>
      <Row>
        <Col>
          <h2>Busqueda de turnos</h2>
          <p>Listado de medicos y disponibilidades.</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <BusquedaTurnosFiltros
            filtros={filtros}
            onChange={setFiltros}
            onSearch={handleSearch}
          />
        </Col>
      </Row>

      {disponibilidades.length === 0 ? (
        <Alert variant="info">No hay médicos cargados.</Alert>
      ) : (
        <Row className="mt-4">
          {disponibilidades.map((medico) => (
            <Col key={medico._id} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{medico.nombre ?? 'Sin nombre'}</Card.Title>
                  <Card.Subtitle>Matrícula: {medico.matricula ?? '-'}</Card.Subtitle>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Usuario:</strong> {medico.usuario?.username ?? 'Sin usuario'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Especialidades:</strong> {medico.especialidades.map((especialidad) => especialidad.nombre).join(', ') || 'Sin especialidades'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Prácticas:</strong> {medico.practicas.map((practica) => practica.nombre).join(', ') || 'Sin prácticas'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Sedes:</strong> {medico.sedes.map((sede) => sede.nombre).join(', ') || 'Sin sedes'}
                    </ListGroup.Item>
                  </ListGroup>

                  <div>
                    <div>Disponibilidades</div>
                    <div>
                      {(medico.disponibilidades ?? []).length > 0 ? (
                        medico.disponibilidades.map((disponibilidad, index) => (
                          <Badge bg="primary" key={`${medico._id}-${disponibilidad.diaSemana}-${disponibilidad.horaDesde}-${index}`}>
                            {formatDisponibilidad(disponibilidad)}
                          </Badge>
                        ))
                      ) : (
                        <span>Sin disponibilidades</span>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}
