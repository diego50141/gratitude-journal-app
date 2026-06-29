import { motion } from "framer-motion";

export default function SectionLabel({ variants, children }) {
  return (
    <motion.h2 variants={variants} className="section-label">
      {children}
    </motion.h2>
  );
}
