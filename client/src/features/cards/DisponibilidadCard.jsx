import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function DisponibilidadCard({ disponibilidad, selected, onSelect }) {
	return (
		<Card 
			className={`shadow-sm mb-3 ${selected ? "border-success border-3" : ""}`}
			bg={selected ? "success" : undefined}
			text={selected ? "white" : undefined}
		>
			<Card.Body>
				<Card.Title>{disponibilidad.diaSemana}</Card.Title>

				<Card.Text>
					<strong>Desde:</strong> {disponibilidad.horaDesde}
				</Card.Text>

				<Card.Text>
					<strong>Hasta:</strong> {disponibilidad.horaHasta}
				</Card.Text>

				<Button onClick={() => onSelect(disponibilidad)}>
					Seleccionar
				</Button>
			</Card.Body>
		</Card>
	);
}