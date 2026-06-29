import { motion } from "framer-motion";
import Card from "./Card.jsx";

const PLACEHOLDERS = [
  "Algo por lo que te sientes agradecido…",
  "Algo más por lo que te sientes agradecido…",
  "Una cosa más…",
];

export default function GratitudeCard({
  variants,
  values,
  onChange,
  suggestions,
  onFill,
  onRefresh,
  textareaRefs,
}) {
  return (
    <Card variants={variants} labelledBy="gratitude-title">
      <h3 id="gratitude-title" className="card__title">
        3 cosas por las que estoy agradecido
      </h3>
      <p className="card__hint">
        Toca una sugerencia para añadirla a la siguiente línea vacía.
      </p>

      <div className="suggestions" aria-label="Sugerencias de gratitud">
        {suggestions.map((item) => (
          <motion.button
            type="button"
            key={item.name}
            className="suggestion"
            whileTap={{ scale: 0.99 }}
            onClick={() => onFill(item)}
            title="Usar esta sugerencia"
          >
            <strong className="suggestion__name">{item.name}</strong>
            <span className="suggestion__desc"> — {item.description}</span>
          </motion.button>
        ))}
      </div>

      <button type="button" className="ghost-btn" onClick={onRefresh}>
        Otras sugerencias
      </button>

      <ol className="fields">
        {values.map((value, i) => (
          <li className="field" key={i}>
            <textarea
              ref={(el) => {
                textareaRefs.current[i] = el;
              }}
              className="entry"
              rows={2}
              value={value}
              placeholder={PLACEHOLDERS[i]}
              onChange={(e) => onChange(i, e.target.value)}
            />
          </li>
        ))}
      </ol>
    </Card>
  );
}
