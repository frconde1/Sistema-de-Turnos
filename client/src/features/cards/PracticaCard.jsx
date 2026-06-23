import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function PracticaCard({ practica, selected, onSelect }) {
	return (
		<Card 
			className={`shadow-sm mb-3 ${selected ? "border-success border-3" : ""}`}
			bg={selected ? "success" : undefined}
			text={selected ? "white" : undefined}
		>
			<Card.Body>
				<Card.Title>{practica.nombre}</Card.Title>

				<Card.Text>
					<strong>Código:</strong> {practica.codigo}
				</Card.Text>

				<Card.Text>
					<strong>Duración:</strong> {practica.duracionEnMins} min
				</Card.Text>

				<Card.Text>
					<strong>Costo:</strong> ${practica.costo}
				</Card.Text>

				<Button onClick={() => onSelect(practica)}>
					Seleccionar
				</Button>
			</Card.Body>
		</Card>
	);
}