import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

export default function DisponibilidadesPanel({ disponibilidadesActuales, onAgregarClick, onEliminar }) {
    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <Card.Subtitle className="text-uppercase text-muted small mb-3">Disponibilidad Horaria</Card.Subtitle>
                <ListGroup variant="flush" className="mb-3">
                    {disponibilidadesActuales && disponibilidadesActuales.map((d, index) => (
                        <ListGroup.Item key={d.id || d._id || index} className="px-0 d-flex justify-content-between align-items-center">
                            <div>
                                <span className="fw-semibold me-2">{d.diaSemana}</span>
                                <small className="text-muted">{d.horaDesde} – {d.horaHasta}</small>
                            </div>
                            <Button variant="outline-danger" size="sm" onClick={() => onEliminar(d.id || d._id)}>
                                Eliminar
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button variant="outline-primary" size="sm" onClick={onAgregarClick}>
                    + Agregar Horario
                </Button>
            </Card.Body>
        </Card>
    );
}
