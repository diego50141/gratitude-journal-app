import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <p className="footer__brand">The Gratitude Journal</p>
          <p className="footer__meta">Un diario de gratitud para tu día a día.</p>
        </div>
        <nav className="footer__links" aria-label="Enlaces del pie de página">
          <Link to="/" className="footer__link">Inicio</Link>
          <Link to="/journal" className="footer__link">Comenzar</Link>
        </nav>
      </div>
      <p className="footer__copy">
        © {new Date().getFullYear()} The Gratitude Journal
      </p>
    </footer>
  );
}
