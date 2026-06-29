import { useCallback, useRef, useState } from "react";
import {
  entryIsEmpty,
  loadNotebook,
  pageNumber,
  persistNotebook,
} from "../lib/notebook.js";

// Maneja el cuaderno (localStorage) detrás de una API imperativa.
// El objeto vive en un ref para mutar entries sin re-render; `startDate`
// se replica en estado para que la navegación (página, botón "anterior")
// reaccione cuando se fija por primera vez.
export function useNotebook() {
  const notebookRef = useRef(loadNotebook());
  const [startDate, setStartDate] = useState(notebookRef.current.startDate);

  const getEntry = useCallback(
    (key) => notebookRef.current.entries[key] || null,
    []
  );

  const saveEntry = useCallback((key, entry) => {
    const nb = notebookRef.current;
    if (entryIsEmpty(entry)) {
      if (nb.entries[key]) {
        delete nb.entries[key];
        persistNotebook(nb);
      }
      return "empty";
    }
    if (!nb.startDate || key < nb.startDate) {
      nb.startDate = key;
      setStartDate(key);
    }
    nb.entries[key] = entry;
    return persistNotebook(nb) ? "saved" : "error";
  }, []);

  const deleteEntry = useCallback((key) => {
    const nb = notebookRef.current;
    if (nb.entries[key]) {
      delete nb.entries[key];
      persistNotebook(nb);
    }
  }, []);

  const getPageNumber = useCallback(
    (key) => pageNumber(notebookRef.current, key),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate]
  );

  return { startDate, getEntry, saveEntry, deleteEntry, getPageNumber };
}
