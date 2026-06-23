import React, { useEffect, useState } from 'react';
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';

import { useAuth } from '../../context/auth/AuthContext';
import { useOutletContext } from 'react-router-dom';

export default function SolicitarTurnoModal({ show, seleccionado, onHide }) {
    const { usuario } = useAuth();
    const [practicaSeleccionada, setPracticaSeleccionada] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [horaSeleccionada, setHoraSeleccionada] = useState('');

    const { turnos, setTurnos } = useOutletContext();

    const agregarTurno = (turno) => { setTurnos(t => [...t, turno]) };

    useEffect(() => {
        if (!show) {
            setPracticaSeleccionada('');
            setSedeSeleccionada('');
            setFechaSeleccionada('');
            setHoraSeleccionada('');
        }
    }, [show, seleccionado]);

    if (!seleccionado) return null;

    
    const handleSolicitarTurno = () => {
        const formularioCompleto = !!(sedeSeleccionada && practicaSeleccionada && fechaSeleccionada && horaSeleccionada);

        if (!formularioCompleto || !usuario || !seleccionado)
            return;

        // fechaSeleccionada: "YYYY-MM-DD", horaSeleccionada: "HH:MM"
        const fechaHora = new Date(`${fechaSeleccionada}T${horaSeleccionada}`);

        agregarTurno({
            medico: seleccionado,
            paciente: usuario.id,
            sede: sedeSeleccionada,
            practica: practicaSeleccionada,
            fechaHora,
        });

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" fullscreen="sm-down">
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

                        <Form className="mb-3" noValidate>
                            <Form.Group className="mb-3">
                                <Form.Label>Práctica</Form.Label>
                                <Form.Select
                                    value={practicaSeleccionada}
                                    onChange={(event) => setPracticaSeleccionada(event.target.value)}
                                    isInvalid={!practicaSeleccionada}
                                >
                                    <option value="">Seleccionar práctica</option>
                                    {(seleccionado.practicas ?? []).map((practica, index) => (
                                        <option key={practica._id ?? practica.id ?? index} value={practica._id ?? practica.id ?? practica.nombre}>
                                            {practica.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Seleccioná una práctica.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Sede</Form.Label>
                                <Form.Select
                                    value={sedeSeleccionada}
                                    onChange={(event) => setSedeSeleccionada(event.target.value)}
                                    isInvalid={!sedeSeleccionada}
                                >
                                    <option value="">Seleccionar sede</option>
                                    {(seleccionado.sedes ?? []).map((sede, index) => (
                                        <option key={sede._id ?? sede.id ?? index} value={sede._id ?? sede.id ?? sede.nombre}>
                                            {sede.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Seleccioná una sede.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>

                        <Card.Subtitle className="text-uppercase text-muted small mb-3">Disponibilidades</Card.Subtitle>
                        <ListGroup variant="flush">
                            {(seleccionado.disponibilidades ?? []).length > 0 ? (
                                seleccionado.disponibilidades.map((disponibilidad, index) => (
                                    <ListGroup.Item key={`${seleccionado.id}-${disponibilidad.diaSemana}-${index}`} className="px-0 d-flex justify-content-between gap-3">
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

                        <div className="row mt-3 g-3">
                            <Form.Group className="col-12 col-sm-6">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={fechaSeleccionada}
                                    onChange={(event) => setFechaSeleccionada(event.target.value)}
                                    isInvalid={!fechaSeleccionada}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Seleccioná una fecha.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-12 col-sm-6">
                                <Form.Label>Hora</Form.Label>
                                <Form.Control
                                    type="time"
                                    value={horaSeleccionada}
                                    onChange={(event) => setHoraSeleccionada(event.target.value)}
                                    isInvalid={!horaSeleccionada}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Indicá un horario.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </Card.Body>
                </Card>
            </Modal.Body>

            <Modal.Footer className="flex-wrap gap-2">
                <Button variant="secondary" onClick={onHide} className="flex-grow-1 flex-sm-grow-0">
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSolicitarTurno} className="flex-grow-1 flex-sm-grow-0">
                    Solicitar turno
                </Button>
            </Modal.Footer>
        </Modal>
    );
}