import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import useSolicitarTurno from '../../hooks/useSolicitarTurno';
import { useAuth } from '../../context/auth/AuthContext';

export default function SolicitarTurnoModal({ show, seleccionado, onHide }) {
    const { usuario } = useAuth();
    const [practicaSeleccionada, setPracticaSeleccionada] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');
    const [horaSeleccionada, setHoraSeleccionada] = useState('');
    const { loading, solicitarTurno, error } = useSolicitarTurno();

    useEffect(() => {
        if (!show) {
            setPracticaSeleccionada('');
            setSedeSeleccionada('');
            setHoraSeleccionada('');
        }
    }, [show, seleccionado]);

    if (!seleccionado) return null;

    const handleSolicitarTurno = () => {
        solicitarTurno({
            medico: seleccionado._id,
            paciente: usuario.id,
            sede: sedeSeleccionada,
            practica: practicaSeleccionada,
            fechaHora: horaSeleccionada,
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalle del turno</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Card className="border-0 shadow-none">
                    <Card.Body className="p-0">
                        <Card.Subtitle className="text-uppercase text-muted small mb-3">Información general</Card.Subtitle>

                        <ListGroup variant="flush" className="mb-3">
                            <ListGroup.Item className="px-0 d-flex justify-content-between gap-3">
                                <span className="text-muted">Nombre</span>
                                <span className="fw-semibold text-end">{seleccionado.nombre ?? 'Sin nombre'}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="px-0 d-flex justify-content-between gap-3">
                                <span className="text-muted">Matrícula</span>
                                <span className="fw-semibold text-end">{seleccionado.matricula ?? '-'}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="px-0 d-flex justify-content-between gap-3">
                                <span className="text-muted">Usuario</span>
                                <span className="fw-semibold text-end">{seleccionado.usuario?.username ?? 'Sin usuario'}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="px-0 d-flex justify-content-between gap-3">
                                <span className="text-muted">Especialidades</span>
                                <span className="fw-semibold text-end">
                                    {seleccionado.especialidades?.length > 0
                                        ? seleccionado.especialidades.map((especialidad) => especialidad.nombre).join(', ')
                                        : 'Sin especialidades'}
                                </span>
                            </ListGroup.Item>
                        </ListGroup>

                        <Form className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Práctica</Form.Label>
                                <Form.Select
                                    value={practicaSeleccionada}
                                    onChange={(event) => setPracticaSeleccionada(event.target.value)}
                                >
                                    <option value="">Seleccionar práctica</option>
                                    {(seleccionado.practicas ?? []).map((practica, index) => (
                                        <option key={practica._id ?? practica.id ?? index} value={practica._id ?? practica.id ?? practica.nombre}>
                                            {practica.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sede</Form.Label>
                                <Form.Select
                                    value={sedeSeleccionada}
                                    onChange={(event) => setSedeSeleccionada(event.target.value)}
                                >
                                    <option value="">Seleccionar sede</option>
                                    {(seleccionado.sedes ?? []).map((sede, index) => (
                                        <option key={sede._id ?? sede.id ?? index} value={sede._id ?? sede.id ?? sede.nombre}>
                                            {sede.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>

                        <Card.Subtitle className="text-uppercase text-muted small mb-3">Disponibilidades</Card.Subtitle>
                        <ListGroup variant="flush">
                            {(seleccionado.disponibilidades ?? []).length > 0 ? (
                                seleccionado.disponibilidades.map((disponibilidad, index) => (
                                    <ListGroup.Item key={`${seleccionado._id}-${disponibilidad.diaSemana}-${index}`} className="px-0 d-flex justify-content-between gap-3">
                                        <span className="text-muted">{disponibilidad.diaSemana}</span>
                                        <span className="fw-semibold text-end">
                                            {disponibilidad.horaDesde} - {disponibilidad.horaHasta}
                                        </span>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item className="px-0 text-muted">Sin disponibilidades</ListGroup.Item>
                            )}
                        </ListGroup>

                        <Form.Group className="mt-3">
                            <Form.Label>Seleccione un horario</Form.Label>
                            <Form.Control
                                type="text"
                                value={horaSeleccionada}
                                onChange={(event) => setHoraSeleccionada(event.target.value)}
                            />
                        </Form.Group>
                    </Card.Body>
                </Card>
                {error && (
                    <Alert variant="danger">{error}</Alert>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSolicitarTurno} disabled={loading}>
                    Solicitar turno
                </Button>
            </Modal.Footer>
        </Modal>
    );
}