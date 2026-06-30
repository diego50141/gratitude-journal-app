// Persistencia del cuaderno en localStorage + forma de una entrada.
// La clave es la misma que la versión anterior, así que los diarios
// existentes se cargan sin migración.

import { dayOfYear } from "./dates.js";

export const STORAGE_KEY = "gratitude-notebook-v1";
export const NOTEBOOK_SIZE = 360;

export function emptyEntry() {
  return {
    grateful: ["", "", ""],
    great: { intention: "", win: "", connection: "" },
    good: ["", "", ""],
    learned: "",
    quote: null,
    affirmation: null,
  };
}

export function entryIsEmpty(entry) {
  if (entry.grateful.some((s) => s.trim())) return false;
  if (Object.values(entry.great).some((s) => s.trim())) return false;
  if (entry.good.some((s) => s.trim())) return false;
  if (entry.learned.trim()) return false;
  return true;
}

export function loadNotebook() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { startDate: null, entries: {} };
    const parsed = JSON.parse(raw);
    return {
      startDate: parsed.startDate || null,
      entries: parsed.entries || {},
    };
  } catch {
    return { startDate: null, entries: {} };
  }
}

export function persistNotebook(notebook) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notebook));
    return true;
  } catch {
    return false;
  }
}

// El número de página es el día del año actual (1 de enero = página 1),
// independiente de cuándo se escribió la primera entrada.
export function pageNumber(notebook, key) {
  return dayOfYear(key);
}
