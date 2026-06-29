import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);
const EASE = [0.22, 1, 0.36, 1];

export default function CTA() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="cta"
      aria-labelledby="cta-title"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <h2 id="cta-title" className="cta__title">Empieza hoy tu práctica de gratitud</h2>
      <p className="cta__text">Tu primera página te espera. Solo toma un minuto.</p>
      <MotionLink
        to="/journal"
        className="btn-primary"
        whileHover={reduced ? undefined : { scale: 1.03 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
      >
        Comenzar ahora
      </MotionLink>
    </motion.section>
  );
}
