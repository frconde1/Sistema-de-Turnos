import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import useGetEspecialidades from '../../hooks/useGetEspecialidades';
import useGetPracticas from '../../hooks/useGetPracticas';
import useGetSedes from '../../hooks/useGetSedes';

export default function BusquedaTurnosFiltros({ filtros, onChange, onSearch }) {
  const { especialidades } = useGetEspecialidades();
  const { practicas } = useGetPracticas();
  const { sedes } = useGetSedes();

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filtros, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Filtros</Card.Title>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre del medico</Form.Label>
            <Form.Control
              name="nombre"
              value={filtros.nombre}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Especialidad</Form.Label>
            <Form.Select
              name="especialidadId"
              value={filtros.especialidadId}
              onChange={handleChange}
            >
              <option value="">Todas</option>
              {especialidades.map((especialidad) => (
                <option key={especialidad.id} value={especialidad.id}>
                  {especialidad.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Practica</Form.Label>
            <Form.Select
              name="practicaId"
              value={filtros.practicaId}
              onChange={handleChange}
            >
              <option value="">Todas</option>
              {practicas.map((practica) => (
                <option key={practica.id} value={practica.id}>
                  {practica.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Sede</Form.Label>
            <Form.Select
              name="sedeId"
              value={filtros.sedeId}
              onChange={handleChange}
            >
              <option value="">Todas</option>
              {sedes.map((sede) => (
                <option key={sede.id} value={sede.id}>
                  {sede.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Buscar
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
}