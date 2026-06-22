import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function SedeModal({ show, onHide, todasLasSedes, sedesActuales, onAsignar }) {
    const [selectedId, setSelectedId] = useState('')

    const handleGuardar = () => {
        if (!selectedId) return
        onAsignar(selectedId)
        setSelectedId('') // Limpiamos la selección
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Sede</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Seleccione la Sede</Form.Label>
                        <Form.Select 
                            value={selectedId} 
                            onChange={e => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Seleccionar Sede --</option>
                            {todasLasSedes
                                .filter(s => !sedesActuales.some(ms => ms.id === s.id))
                                .map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)
                            }
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={handleGuardar} disabled={!selectedId}>Asignar</Button>
            </Modal.Footer>
        </Modal>
    )
}
