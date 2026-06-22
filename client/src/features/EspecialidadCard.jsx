import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function EspecialidadCard({ especialidad, selected, onSelect }) {
	return (
		<Card 
			className={`shadow-sm mb-3 ${selected ? "border-success border-3" : ""}`}
			bg={selected ? "success" : undefined}
			text={selected ? "white" : undefined}
		>
			<Card.Body>
				<Card.Title>{especialidad.nombre}</Card.Title>

				<Card.Text>
					<strong>Duración:</strong> {especialidad.duracionEnMins} min
				</Card.Text>

				<Card.Text>
					<strong>Costo:</strong> ${especialidad.costo}
				</Card.Text>

				<Button onClick={() => onSelect(especialidad)}>
					Seleccionar
				</Button>
			</Card.Body>
		</Card>
	);
}