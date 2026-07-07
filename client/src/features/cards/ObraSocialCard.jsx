import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function coverageBadge(nivel) {
  const variant =
    nivel === "TOTAL" ? "success"
    : nivel === "PARCIAL" ? "warning"
    : "danger";
  return (
    <Badge bg={variant} className="fw-normal" pill>
      {nivel}
    </Badge>
  );
}

export default function ObraSocialCard({ obraSocial, selected, onSelect }) {
  const planes = obraSocial.planes ?? [];

  return (
    <Card
      className={`shadow-sm mb-3 ${selected ? "border-primary border-3" : ""}`}
    >
      <Card.Body>
        <Card.Title className="mb-2">{obraSocial.nombre}</Card.Title>

        {planes.length === 0 ? (
          <p className="text-muted mb-0">No tiene planes asignados.</p>
        ) : (
          planes.map(p => {
            const ce = p.coberturasEspecialidad ?? [];
            const cp = p.coberturasPractica ?? [];
            const sinCoberturas = ce.length === 0 && cp.length === 0;

            return (
              <div key={p.id} className="mb-3">
                <Card.Subtitle className="text-muted mb-1">
                  Plan: {p.nombre}
                </Card.Subtitle>

                {sinCoberturas ? (
                  <p className="text-muted small mb-0 ms-3">
                    No tiene coberturas.
                  </p>
                ) : (
                  <>
                    {ce.length > 0 && (
                      <div className="ms-3 mb-1">
                        <small className="fw-semibold">Especialidades:</small>
                        {ce.map((c, i) => (
                          <div key={i} className="small d-flex align-items-center gap-2">
                            <span>{c.especialidad.nombre}</span>
                            {coverageBadge(c.nivel)}
                          </div>
                        ))}
                      </div>
                    )}
                    {cp.length > 0 && (
                      <div className="ms-3">
                        <small className="fw-semibold">Prácticas:</small>
                        {cp.map((c, i) => (
                          <div key={i} className="small d-flex align-items-center gap-2">
                            <span>{c.practica.nombre}</span>
                            {coverageBadge(c.nivel)}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })
        )}

        <div className="d-flex justify-content-between align-items-center mt-2">
          <Badge bg="primary">Obra Social</Badge>
          {onSelect && (
            <Button size="sm" variant="outline-primary" onClick={() => onSelect(obraSocial)}>
              Seleccionar
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
