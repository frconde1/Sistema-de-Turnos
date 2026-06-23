import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export default function SedesPanel({ sedesActuales, onAsignarClick }) {
    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <Card.Subtitle className="text-uppercase text-muted small mb-3">Sedes Asignadas</Card.Subtitle>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    {sedesActuales && sedesActuales.map((s, index) => (
                        <Badge key={s.id || s._id || index} bg="primary" className="fw-normal fs-6 py-2 px-3">
                            {s.nombre}
                        </Badge>
                    ))}
                    {(!sedesActuales || sedesActuales.length === 0) && (
                        <span className="text-muted small">Sin sedes asignadas.</span>
                    )}
                </div>
                <Button variant="outline-primary" size="sm" onClick={onAsignarClick}>
                    + Asignar Sede
                </Button>
            </Card.Body>
        </Card>
    );
}
