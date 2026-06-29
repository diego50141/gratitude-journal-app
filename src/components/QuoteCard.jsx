import Card from "./Card.jsx";

export default function QuoteCard({ variants, quote }) {
  return (
    <Card variants={variants} className="card--quote" labelledBy="quote-title">
      <h3 id="quote-title" className="card__title">Cita inspiradora</h3>
      <blockquote className="quote">
        <p className="quote__text">{quote ? `“${quote.text}”` : ""}</p>
        {quote && <footer className="quote__author">{quote.author}</footer>}
      </blockquote>
    </Card>
  );
}
