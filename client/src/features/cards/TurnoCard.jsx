import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { formatAppointmentDate, formatHour } from "../../utils/dateFormatter";

function TurnoCard({ turno, index, onRemove }) {
	const { medico, fechaHora, paciente, practica, sede } = turno;
	const medicoSede 	 = medico.sedes.find(s => s.id === sede);
	const medicoPractica = medico.practicas.find(p => p.id === practica);

	const hasta = new Date(fechaHora)
	hasta.setMinutes(hasta.getMinutes() + medicoPractica.duracionEnMins);
	const handleRemove = () => {
		onRemove(index);
	};

	return (
		<Card className="shadow-sm mb-3">
			<Card.Body>
				<Card.Title>{medicoPractica.nombre}</Card.Title>

				<Card.Subtitle className="mb-3 text-muted">
					Dr. {medico.nombre}
				</Card.Subtitle>

				<div className="mb-2">
					<strong>Sede:</strong> {medicoSede.nombre}
					{medicoSede.direccion}
				</div>

				<div className="mb-2">
					<strong>Fecha:</strong>{" "}
					{new Date(fechaHora).toLocaleDateString("es-AR")}
				</div>

				<div className="mb-3">
					<strong>Hora:</strong>{"["}
					{formatHour(fechaHora)}
					{" - "}
					{formatHour(hasta)}
					{"]"}
				</div>

				<div className="d-flex justify-content-between align-items-center">
					<Badge bg="primary">Turno reservado</Badge>
					{onRemove && (
						<Button variant="outline-danger" size="sm" onClick={handleRemove}>
							Quitar
						</Button>
					)}
				</div>
			</Card.Body>
		</Card>
	);
}

export default TurnoCard;