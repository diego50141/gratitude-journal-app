import Card from "./Card.jsx";

const PLACEHOLDERS = [
  "Algo bueno que ocurrió…",
  "Otro buen momento…",
  "Uno más…",
];

export default function GoodThingsCard({ variants, values, onChange }) {
  return (
    <Card variants={variants} labelledBy="good-things-title">
      <h3 id="good-things-title" className="card__title">
        3 cosas buenas que pasaron hoy
      </h3>
      <ol className="fields">
        {values.map((value, i) => (
          <li className="field" key={i}>
            <textarea
              className="entry"
              rows={2}
              value={value}
              placeholder={PLACEHOLDERS[i]}
              onChange={(e) => onChange(i, e.target.value)}
            />
          </li>
        ))}
      </ol>
    </Card>
  );
}
