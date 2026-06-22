import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function TurnoCard({ turno }) {
	const { medico, sede, practica, dia, desde, hasta } = turno;

	return (
		<Card className="shadow-sm mb-3">
			<Card.Body>
				<Card.Title>{practica.nombre}</Card.Title>

				<Card.Subtitle className="mb-3 text-muted">
					Dr. {medico.nombre}
				</Card.Subtitle>

				<div className="mb-2">
					<strong>Sede:</strong> {sede.nombre}
					{sede.direccion}
				</div>

				<div className="mb-2">
					<strong>Fecha:</strong>{" "}
					{new Date(dia).toLocaleDateString("es-AR")}
				</div>

				<div className="mb-3">
					<strong>Hora:</strong>{"["}
					{desde}
					{" - "}
					{hasta}
					{"]"}
				</div>

				<Badge bg="primary">Turno reservado</Badge>
			</Card.Body>
		</Card>
	);
}

export default TurnoCard;