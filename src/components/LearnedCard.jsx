import Card from "./Card.jsx";

const CATEGORIES = ["Sobre mí", "Mi trabajo", "Sobre otros", "Habilidad práctica"];

export default function LearnedCard({ variants, value, onChange, onCategory, textareaRef }) {
  return (
    <Card variants={variants} labelledBy="learned-title">
      <h3 id="learned-title" className="card__title">¿Qué aprendí hoy?</h3>
      <p className="card__hint">Elige una categoría para empezar:</p>

      <div className="chips" role="group" aria-label="Categorías">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat}
            className="chip"
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        className="entry entry--large"
        rows={4}
        value={value}
        placeholder="Lo que aprendiste hoy…"
        onChange={(e) => onChange(e.target.value)}
      />
    </Card>
  );
}
