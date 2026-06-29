import Card from "./Card.jsx";

const SLOTS = [
  {
    field: "intention",
    icon: "🎯",
    name: "Intención",
    example: "Ej.: Estar presente en cada conversación.",
    placeholder: "Tu intención para hoy…",
  },
  {
    field: "win",
    icon: "🏆",
    name: "Pequeña victoria",
    example: "Ej.: Terminar el correo pendiente antes del almuerzo.",
    placeholder: "Una pequeña meta alcanzable…",
  },
  {
    field: "connection",
    icon: "🤝",
    name: "Conexión",
    example: "Ej.: Llamar a mi mamá para saludarla.",
    placeholder: "Un momento con alguien…",
  },
];

export default function GreatDayCard({ variants, great, onChange }) {
  return (
    <Card variants={variants} labelledBy="great-day-title">
      <h3 id="great-day-title" className="card__title">
        ¿Qué haría hoy un gran día?
      </h3>

      <div className="grid3">
        {SLOTS.map((slot) => (
          <div className="slot" key={slot.field}>
            <div className="slot__icon" aria-hidden="true">{slot.icon}</div>
            <h4 className="slot__name">{slot.name}</h4>
            <p className="slot__example">{slot.example}</p>
            <textarea
              className="entry"
              rows={2}
              value={great[slot.field]}
              placeholder={slot.placeholder}
              onChange={(e) => onChange(slot.field, e.target.value)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
