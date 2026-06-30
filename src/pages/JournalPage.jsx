import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { QUOTES } from "../data/quotes.js";
import { GRATITUDE_SUGGESTIONS } from "../data/suggestions.js";
import { AFFIRMATIONS } from "../data/affirmations.js";

import { createBatchCycler, createCycler } from "../lib/cyclers.js";
import { addDays, formatDate, todayKey } from "../lib/dates.js";
import { emptyEntry, NOTEBOOK_SIZE } from "../lib/notebook.js";
import { getVariants } from "../lib/motion.js";
import { useNotebook } from "../hooks/useNotebook.js";

import QuoteCard from "../components/QuoteCard.jsx";
import GratitudeCard from "../components/GratitudeCard.jsx";
import GreatDayCard from "../components/GreatDayCard.jsx";
import AffirmationCard from "../components/AffirmationCard.jsx";
import GoodThingsCard from "../components/GoodThingsCard.jsx";
import LearnedCard from "../components/LearnedCard.jsx";
import SectionLabel from "../components/SectionLabel.jsx";

// Normaliza una entrada guardada (o crea una vacía) garantizando la forma.
function normalizeEntry(saved) {
  const e = emptyEntry();
  if (!saved) return e;
  e.grateful = [0, 1, 2].map((i) => saved.grateful?.[i] || "");
  e.great = {
    intention: saved.great?.intention || "",
    win: saved.great?.win || "",
    connection: saved.great?.connection || "",
  };
  e.good = [0, 1, 2].map((i) => saved.good?.[i] || "");
  e.learned = saved.learned || "";
  e.quote = saved.quote || null;
  e.affirmation = saved.affirmation || null;
  return e;
}

export default function JournalPage() {
  const reduced = useReducedMotion();
  const variants = getVariants(reduced);
  const notebook = useNotebook();

  // Cyclers persistentes (no provocan re-render).
  const quoteCycler = useRef(null);
  const affirmationCycler = useRef(null);
  const gratitudeBatch = useRef(null);
  if (!quoteCycler.current) quoteCycler.current = createCycler(QUOTES);
  if (!affirmationCycler.current) affirmationCycler.current = createCycler(AFFIRMATIONS);
  if (!gratitudeBatch.current) gratitudeBatch.current = createBatchCycler(GRATITUDE_SUGGESTIONS, 3);

  // Construye la entrada inicial (día de hoy) una sola vez.
  const buildEntry = (key) => {
    const e = normalizeEntry(notebook.getEntry(key));
    if (!e.quote) e.quote = quoteCycler.current();
    if (!e.affirmation) e.affirmation = affirmationCycler.current();
    return e;
  };

  const [currentKey, setCurrentKey] = useState(() => todayKey());
  const [entry, setEntry] = useState(() => buildEntry(todayKey()));
  const [suggestions, setSuggestions] = useState(() => gratitudeBatch.current());
  const [actionStatus, setActionStatus] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const entryRef = useRef(entry);
  useEffect(() => {
    entryRef.current = entry;
  }, [entry]);

  const gratefulRefs = useRef([]);
  const learnedRef = useRef(null);

  // --- Mensajes efímeros ---
  const actionTimer = useRef(null);
  const saveTimer = useRef(null);
  const flashAction = (msg) => {
    setActionStatus(msg);
    clearTimeout(actionTimer.current);
    actionTimer.current = setTimeout(() => setActionStatus(""), 2400);
  };
  const flashSave = (msg) => {
    setSaveStatus(msg);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveStatus(""), 1800);
  };

  // --- Autosave con debounce (omite la primera ejecución tras montar/cargar) ---
  const skipAutosave = useRef(true);
  useEffect(() => {
    if (skipAutosave.current) {
      skipAutosave.current = false;
      return;
    }
    const t = setTimeout(() => {
      const result = notebook.saveEntry(currentKey, entryRef.current);
      if (result === "saved") flashSave("Guardado");
      else if (result === "error") flashSave("No se pudo guardar");
    }, 500);
    return () => clearTimeout(t);
  }, [entry, currentKey, notebook]);

  // Guarda antes de cerrar/recargar.
  useEffect(() => {
    const handler = () => notebook.saveEntry(currentKey, entryRef.current);
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [currentKey, notebook]);

  // --- Navegación entre días ---
  const navigate = (dir) => {
    notebook.saveEntry(currentKey, entryRef.current); // descarga la página actual
    const newKey = addDays(currentKey, dir);
    const next = buildEntry(newKey);
    skipAutosave.current = true; // no re-guardar lo recién cargado
    setCurrentKey(newKey);
    setEntry(next);
  };

  const page = notebook.getPageNumber(currentKey);
  const atStart = page <= 1; // página 1 = 1 de enero
  const overflow = page > NOTEBOOK_SIZE;

  // --- Editores de campos ---
  const setGrateful = (i, value) =>
    setEntry((e) => {
      const grateful = [...e.grateful];
      grateful[i] = value;
      return { ...e, grateful };
    });

  const setGood = (i, value) =>
    setEntry((e) => {
      const good = [...e.good];
      good[i] = value;
      return { ...e, good };
    });

  const setGreat = (field, value) =>
    setEntry((e) => ({ ...e, great: { ...e.great, [field]: value } }));

  const setLearned = (value) => setEntry((e) => ({ ...e, learned: value }));

  const fillNextEmptyGratitude = (item) => {
    const text = `${item.name} — ${item.description}`;
    let filledIndex = -1;
    setEntry((e) => {
      const idx = e.grateful.findIndex((g) => g.trim() === "");
      if (idx === -1) return e;
      filledIndex = idx;
      const grateful = [...e.grateful];
      grateful[idx] = text;
      return { ...e, grateful };
    });
    if (filledIndex === -1) {
      flashAction("Ya escribiste 3 cosas. Edita una si quieres reemplazarla.");
    } else {
      requestAnimationFrame(() => gratefulRefs.current[filledIndex]?.focus());
    }
  };

  const appendLearnedCategory = (cat) => {
    const prefix = `${cat}: `;
    setEntry((e) => {
      const cur = e.learned;
      let next;
      if (cur.trim() === "") next = prefix;
      else if (!cur.endsWith("\n\n")) next = cur.replace(/\s+$/, "") + `\n\n${prefix}`;
      else next = cur + prefix;
      return { ...e, learned: next };
    });
    requestAnimationFrame(() => {
      const ta = learnedRef.current;
      if (ta) {
        ta.focus();
        ta.setSelectionRange(ta.value.length, ta.value.length);
      }
    });
  };

  const refreshQuote = () =>
    setEntry((e) => ({ ...e, quote: quoteCycler.current() }));
  const refreshAffirmation = () =>
    setEntry((e) => ({ ...e, affirmation: affirmationCycler.current() }));
  const refreshSuggestions = () => setSuggestions(gratitudeBatch.current());

  const clearEntry = () => {
    const fresh = emptyEntry();
    fresh.quote = quoteCycler.current();
    fresh.affirmation = affirmationCycler.current();
    skipAutosave.current = true;
    setEntry(fresh);
    setSuggestions(gratitudeBatch.current());
    notebook.deleteEntry(currentKey);
    flashAction("Página limpiada");
  };

  return (
    <div className="app">
      <header className="topbar">
        <p className="topbar__brand">Diario de Gratitud</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentKey}
            className="topbar__date"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
          >
            {formatDate(currentKey)}
          </motion.p>
        </AnimatePresence>

        <nav className="nav" aria-label="Navegación de páginas">
          <button
            type="button"
            className="nav__btn"
            onClick={() => navigate(-1)}
            disabled={atStart}
            aria-label="Día anterior"
          >
            ←
          </button>
          <span className="nav__page" aria-live="polite">
            <span className="nav__num">{page}</span>
            <span className="nav__total"> / {NOTEBOOK_SIZE}</span>
          </span>
          <button
            type="button"
            className="nav__btn"
            onClick={() => navigate(1)}
            aria-label="Día siguiente"
          >
            →
          </button>
        </nav>

        <p className="save-status" aria-live="polite">{saveStatus}</p>
      </header>

      {overflow && (
        <p className="banner">
          Tu cuaderno está completo ({NOTEBOOK_SIZE} páginas). Las páginas
          siguientes son adicionales.
        </p>
      )}

      <motion.main
        key={currentKey}
        className="cards"
        variants={variants.container}
        initial="hidden"
        animate="show"
      >
        <SectionLabel variants={variants.item}>Mañana</SectionLabel>
        <QuoteCard variants={variants.item} quote={entry.quote} />
        <GratitudeCard
          variants={variants.item}
          values={entry.grateful}
          onChange={setGrateful}
          suggestions={suggestions}
          onFill={fillNextEmptyGratitude}
          onRefresh={refreshSuggestions}
          textareaRefs={gratefulRefs}
        />
        <GreatDayCard variants={variants.item} great={entry.great} onChange={setGreat} />
        <AffirmationCard
          variants={variants.item}
          affirmation={entry.affirmation}
          onRefresh={refreshAffirmation}
        />

        <SectionLabel variants={variants.item}>Noche</SectionLabel>
        <GoodThingsCard variants={variants.item} values={entry.good} onChange={setGood} />
        <LearnedCard
          variants={variants.item}
          value={entry.learned}
          onChange={setLearned}
          onCategory={appendLearnedCategory}
          textareaRef={learnedRef}
        />

        <motion.div variants={variants.item} className="actions">
          <button type="button" className="clear-btn" onClick={clearEntry}>
            Limpiar
          </button>
          <span className="status" role="status" aria-live="polite">
            {actionStatus}
          </span>
        </motion.div>
      </motion.main>

      <div className="continue">
        <button type="button" className="continue-btn" onClick={() => navigate(1)}>
          Continuar al siguiente día →
        </button>
      </div>
    </div>
  );
}
