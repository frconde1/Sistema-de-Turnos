import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Te dejo los días mapeados acá adentro si es que los usás solo para el modal
const DIAS = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

export default function DisponibilidadModal({ show, onHide, onAgregar }) {
    // El estado del formulario ahora vive acá adentro aislado
    const [nuevaDisp, setNuevaDisp] = useState({
        diaSemana: 'LUNES',
        horaDesde: '',
        horaHasta: ''
    });

    const handleSubmit = () => {
        // Validación básica: que no manden campos de hora vacíos
        if (!nuevaDisp.horaDesde || !nuevaDisp.horaHasta) return;

        onAgregar(nuevaDisp); // Le despachamos el objeto listo al padre
        
        // Reseteamos el formulario local
        setNuevaDisp({ diaSemana: 'LUNES', horaDesde: '', horaHasta: '' });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Nueva Disponibilidad Horaria</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Día</Form.Label>
                        <Form.Select
                            value={nuevaDisp.diaSemana}
                            onChange={e => setNuevaDisp(d => ({ ...d, diaSemana: e.target.value }))}
                        >
                            {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Desde</Form.Label>
                        <Form.Control
                            type="time"
                            value={nuevaDisp.horaDesde}
                            onChange={e => setNuevaDisp(d => ({ ...d, horaDesde: e.target.value }))}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Hasta</Form.Label>
                        <Form.Control
                            type="time"
                            value={nuevaDisp.horaHasta}
                            onChange={e => setNuevaDisp(d => ({ ...d, horaHasta: e.target.value }))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={!nuevaDisp.horaDesde || !nuevaDisp.horaHasta}
                >
                    Guardar Horario
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
