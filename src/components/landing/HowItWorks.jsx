import { motion, useReducedMotion } from "framer-motion";
import { getVariants } from "../../lib/motion.js";

const STEPS = [
  {
    n: "1",
    title: "Abre tu diario",
    text: "Entra a tu espacio diario en un clic, sin cuentas ni complicaciones.",
  },
  {
    n: "2",
    title: "Escribe tus gratitudes",
    text: "Anota 3 cosas que agradeces por la mañana y reflexiona sobre tu día por la noche.",
  },
  {
    n: "3",
    title: "Vuelve cada día",
    text: "Regresa mañana y observa cómo tu práctica crece, página a página.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();
  const v = getVariants(reduced);

  return (
    <section className="how" aria-labelledby="how-title">
      <h2 id="how-title" className="section-title">Cómo funciona</h2>
      <motion.ol
        className="how__grid"
        variants={v.container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {STEPS.map((s) => (
          <motion.li key={s.n} className="step" variants={v.item}>
            <span className="step__num" aria-hidden="true">{s.n}</span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__text">{s.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
