import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MedicoCard({ medico, selected, onSelect }) {
	return (
		<Card
			className={`shadow-sm mb-3 ${selected ? "border-success border-3" : ""}`}
			bg={selected ? "success" : undefined}
			text={selected ? "white" : undefined}
		>
			<Card.Body>
				<Card.Title>{medico.nombre}</Card.Title>

				<Card.Text>
					<strong>Matrícula:</strong> {medico.matricula}
				</Card.Text>

				<Button onClick={() => onSelect(medico)}>
					Seleccionar
				</Button>
			</Card.Body>
		</Card>
	);
}