import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const reduced = useReducedMotion();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // "Acerca de" lleva a la sección "Qué es" de la landing. Si estamos en
  // otra ruta, navegamos a la home con el hash; si ya estamos en ella,
  // hacemos scroll suave sin recargar.
  const goAbout = (e) => {
    e.preventDefault();
    if (pathname !== "/") {
      navigate("/#que-es");
    } else {
      document.getElementById("que-es")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="navbar"
      initial={reduced ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="navbar__inner" aria-label="Navegación principal">
        <Link to="/" className="navbar__brand">
          The Gratitude Journal
        </Link>

        <div className="navbar__links">
          <Link to="/" className="navbar__link">Inicio</Link>
          <a href="/#que-es" className="navbar__link" onClick={goAbout}>
            Acerca de
          </a>
          <Link to="/journal" className="navbar__cta">
            Comenzar
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
