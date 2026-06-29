# Diario de Gratitud

Aplicación web para llevar un diario de gratitud diario, con rutinas de mañana
y noche. El frontend es **React 19 + Vite** y se sirve como estáticos desde un
backend **FastAPI**. Todas las entradas se guardan en el `localStorage` del
navegador (no hay base de datos ni cuentas).

## Funcionalidades

- Página diaria tipo cuaderno (360 páginas) con navegación entre días.
- **Mañana:** cita inspiradora, 3 gratitudes con sugerencias, intención del día
  y afirmación.
- **Noche:** 3 cosas buenas del día y qué aprendiste (por categorías).
- Autoguardado con _debounce_ y guardado al cerrar la pestaña.
- Animaciones con framer-motion (respeta `prefers-reduced-motion`).

## Stack

- React 19, React Router 7, framer-motion
- Vite 7 (build a `static/`)
- FastAPI + Uvicorn

## Desarrollo

Requisitos: Node.js y Python 3.

```bash
# Dependencias
npm install
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt  # Linux/macOS

# Frontend en modo dev (http://localhost:5173)
npm run dev
```

## Build y ejecución (producción)

```bash
# 1. Compilar el frontend a static/
npm run build

# 2. Servir con FastAPI (http://127.0.0.1:8000)
.venv/Scripts/python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

- `/` → landing
- `/journal` → diario

El servidor hace _fallback_ SPA: cualquier ruta devuelve `index.html` para que
React Router resuelva la navegación del lado del cliente.
