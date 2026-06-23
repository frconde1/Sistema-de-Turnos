import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PracticaCard from '../cards/PracticaCard'; // Tu componente de tarjeta con el botón Seleccionar

export default function PracticaModal({ show, onHide, todasLasPracticas = [], practicasActuales = [], onAsignar }) {
    // Acá guardamos el ID de la tarjeta que el usuario cliquee
    const [selectedId, setSelectedId] = useState('');

    const handleSubmit = () => {
        if (!selectedId) return;
        onAsignar(selectedId);
        setSelectedId('');     
    };
const practicasDisponibles = todasLasPracticas.filter(practicaGlobal => {
    return !practicasActuales.some(practicaDelMedico => {
        const idGlobal = practicaGlobal._id || practicaGlobal.id;
        const idMedico = practicaDelMedico._id || practicaDelMedico.id; 
        return idGlobal === idMedico;
    });
});
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Práctica al Médico</Modal.Title>
            </Modal.Header>
            
            <Modal.Body style={{ maxHeight: '450px', overflowY: 'auto' }}>
                {practicasDisponibles.map((p, index) => (
                    <PracticaCard 
                        key={p._id || p.id || index}
                        practica={p}
                        selected={selectedId === (p._id || p.id)}
                        onSelect={(selectedPractica) => onAsignar(selectedPractica._id || selectedPractica.id)}
                    />
                ))}
                {practicasDisponibles.length === 0 && (
                    <p className="text-muted text-center my-3 small">
                        Ya tienes asignadas todas las prácticas médicas disponibles.
                    </p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
