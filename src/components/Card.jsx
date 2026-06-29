import { motion } from "framer-motion";

// Tarjeta animada: hereda el estado "show" del contenedor con stagger.
export default function Card({ variants, className = "", labelledBy, children }) {
  return (
    <motion.article
      variants={variants}
      className={`card ${className}`.trim()}
      aria-labelledby={labelledBy}
    >
      {children}
    </motion.article>
  );
}
