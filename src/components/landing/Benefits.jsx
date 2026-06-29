import { motion, useReducedMotion } from "framer-motion";
import { getVariants } from "../../lib/motion.js";

const BENEFITS = [
  {
    icon: "🌿",
    title: "Reduce el estrés",
    text: "Poner por escrito lo que agradeces ayuda a calmar la mente y a soltar la tensión acumulada del día.",
  },
  {
    icon: "✨",
    title: "Enfócate en lo positivo",
    text: "Entrenas tu atención para notar lo bueno que ya está presente en tu vida, incluso en los días difíciles.",
  },
  {
    icon: "🌱",
    title: "Crea un hábito diario",
    text: "Unos minutos cada mañana y cada noche construyen una práctica constante que crece contigo.",
  },
];

export default function Benefits() {
  const reduced = useReducedMotion();
  const v = getVariants(reduced);

  return (
    <section className="benefits" aria-labelledby="benefits-title">
      <h2 id="benefits-title" className="section-title">Beneficios</h2>
      <motion.div
        className="benefits__grid"
        variants={v.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {BENEFITS.map((b) => (
          <motion.article
            key={b.title}
            className="benefit-card"
            variants={v.item}
            whileHover={reduced ? undefined : { y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div className="benefit-card__icon" aria-hidden="true">{b.icon}</div>
            <h3 className="benefit-card__title">{b.title}</h3>
            <p className="benefit-card__text">{b.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
