import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export default function EspecialidadesPanel({ especialidadesActuales, onAsignarClick }) {
    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <Card.Subtitle className="text-uppercase text-muted small mb-3">Especialidades</Card.Subtitle>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {especialidadesActuales && especialidadesActuales.map((e, index) => (
                        <Badge key={e.id || e._id || index} bg="success" className="fw-normal fs-6 py-2 px-3">
                            {e.nombre}
                        </Badge>
                    ))}
                    {(!especialidadesActuales || especialidadesActuales.length === 0) && (
                        <span className="text-muted small">Sin especialidades asignadas.</span>
                    )}
                </div>
                <Button variant="outline-success" size="sm" onClick={onAsignarClick}>
                    + Asignar Especialidad
                </Button>
            </Card.Body>
        </Card>
    );
}
