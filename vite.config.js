import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En build, los assets se sirven bajo /static/ (FastAPI monta /static y
// devuelve static/index.html en "/"). En dev, base "/" para localhost:5173.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/static/" : "/",
  build: {
    outDir: "static",
    emptyOutDir: true,
  },
}));
