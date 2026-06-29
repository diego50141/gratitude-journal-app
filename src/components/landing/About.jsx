import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function About() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="que-es"
      className="about"
      aria-labelledby="about-title"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <h2 id="about-title" className="section-title">¿Qué es?</h2>
      <p className="about__text">
        The Gratitude Journal es un espacio íntimo para anotar, cada día,
        aquello que agradeces. Unas líneas por la mañana y por la noche bastan
        para entrenar tu atención hacia lo positivo. Sin notificaciones ni
        distracciones: solo tú, tus palabras y un hábito que crece contigo.
      </p>
    </motion.section>
  );
}
