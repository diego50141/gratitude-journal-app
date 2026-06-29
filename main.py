from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="Diario de Gratitud")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

INDEX_FILE = STATIC_DIR / "index.html"


@app.get("/")
def index():
    return FileResponse(INDEX_FILE)


# Fallback SPA: cualquier otra ruta (p. ej. /journal) devuelve index.html
# para que React Router resuelva la navegación del lado del cliente al
# recargar o entrar por enlace directo. Los assets viven bajo /static.
@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    return FileResponse(INDEX_FILE)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
