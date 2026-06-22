import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function EspecialidadModal({ show, onHide, todasLasEspecialidades, especialidadesActuales, onAsignar }) {
    const [selectedId, setSelectedId] = useState('')

    const handleGuardar = () => {
        if (!selectedId) return
        onAsignar(selectedId)
        setSelectedId('')
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Especialidad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Seleccione la Especialidad</Form.Label>
                        <Form.Select 
                            value={selectedId} 
                            onChange={e => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Seleccionar Especialidad --</option>
                            {todasLasEspecialidades
                                .filter(e => !especialidadesActuales.some(me => me.id === e.id))
                                .map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="success" onClick={handleGuardar} disabled={!selectedId}>Asignar</Button>
            </Modal.Footer>
        </Modal>
    )
}
