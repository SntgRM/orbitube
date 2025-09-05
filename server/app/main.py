from fastapi import FastAPI
from app.routes import converter

app = FastAPI(
    title="Orbitube API",
    description="Convertidor de YouTube a MP3/MP4",
    version="1.0.0",
)

# Incluir rutas
app.include_router(converter.router)

@app.get("/")
def root():
    return {"message": "API funcionando correctamente 🚀"}
