import Card from "./Card.jsx";

export default function AffirmationCard({ variants, affirmation, onRefresh }) {
  return (
    <Card variants={variants} className="card--affirmation" labelledBy="affirmation-title">
      <h3 id="affirmation-title" className="card__title">Afirmación positiva</h3>
      <p className="affirmation" aria-live="polite">{affirmation}</p>
      <button type="button" className="ghost-btn" onClick={onRefresh}>
        Otra afirmación
      </button>
    </Card>
  );
}
