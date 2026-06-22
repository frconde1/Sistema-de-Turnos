import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function SedeCard({ sede, selected, onSelect }) {
	return (
		<Card 
			className={`shadow-sm mb-3 ${selected ? "border-success border-3" : ""}`}
			bg={selected ? "success" : undefined}
			text={selected ? "white" : undefined}
		>
			<Card.Body>
				<Card.Title>{sede.nombre}</Card.Title>

				<Card.Text>
					<strong>Dirección:</strong> {sede.direccion}
				</Card.Text>

				<Button onClick={() => onSelect(sede)}>
					Seleccionar
				</Button>
			</Card.Body>
		</Card>
	);
}