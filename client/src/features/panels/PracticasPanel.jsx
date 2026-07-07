import React from 'react';
import { Card, Button, ListGroup, Badge } from 'react-bootstrap';

export default function PracticasPanel({ practicasActuales, onAgregarClick, onEliminar }) {
    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <Card.Subtitle className="text-uppercase text-muted small mb-3">Prácticas del Médico</Card.Subtitle>
                <ListGroup variant="flush" className="mb-3">
                    {practicasActuales && practicasActuales.map((p, index) => (
                        <ListGroup.Item key={p.id || p._id || index} className="px-0 d-flex justify-content-between align-items-center">
                            <div>
                                <span className="fw-semibold">{p.nombre}</span>
                                <small className="text-muted ms-2">{p.duracionEnMins} min</small>
                            </div>
                            <Button variant="outline-danger" size="sm" onClick={() => onEliminar(p)}>
                                                            Eliminar
                                                        </Button>
                            <Badge bg="secondary">${p.costo}</Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Button variant="outline-primary" size="sm" onClick={onAgregarClick}>
                    + Agregar Práctica
                </Button>
            </Card.Body>
        </Card>
    );
}
