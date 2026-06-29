import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { getVariants } from "../../lib/motion.js";

const MotionLink = motion.create(Link);

export default function Hero() {
  const reduced = useReducedMotion();
  const v = getVariants(reduced);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero__inner"
        variants={v.container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={v.item} className="hero__eyebrow">
          Tu diario de gratitud diario
        </motion.p>
        <motion.h1 variants={v.item} id="hero-title" className="hero__title">
          Un momento de gratitud, cada día
        </motion.h1>
        <motion.p variants={v.item} className="hero__subtitle">
          Reserva unos minutos para reconocer lo bueno de tu día y cultivar,
          poco a poco, una mente más serena.
        </motion.p>
        <motion.div variants={v.item} className="hero__actions">
          <MotionLink
            to="/journal"
            className="btn-primary"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.97 }}
          >
            Comenzar
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
