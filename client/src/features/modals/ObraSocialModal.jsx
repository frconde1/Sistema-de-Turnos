import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ObraSocialCard from '../cards/ObraSocialCard';

export default function ObraSocialModal({ show, onHide, todasLasObrasSociales = [], obraSocialActual = null, onAsignar }) {
  const obrasSocialesDisponibles = todasLasObrasSociales.filter(os => {
    return obraSocialActual?.id ? obraSocialActual.id !== os.id : true;
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionar Obra Social</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ maxHeight: '450px', overflowY: 'auto' }}>
        {obrasSocialesDisponibles.map((os) => (
          <ObraSocialCard
            key={os.id}
            obraSocial={os}
            onSelect={(selectedOs) => onAsignar(selectedOs.id)}
          />
        ))}
        {obrasSocialesDisponibles.length === 0 && (
          <p className="text-muted text-center my-3 small">
            No hay obras sociales disponibles.
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
