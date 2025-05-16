from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.routes import converter

# Crear directorio para archivos descargados si no existe
os.makedirs("downloads", exist_ok=True)

app = FastAPI(
    title="Space Converter API",
    description="API para convertir videos de YouTube a MP3 y MP4",
    version="1.0.0"
)

# Configurar CORS para permitir solicitudes desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, limitar a tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(converter.router)

# Montar carpeta de descargas para servir archivos estáticos
app.mount("/downloads", StaticFiles(directory="downloads"), name="downloads")

# Ruta raíz para verificar que la API está funcionando
@app.get("/")
async def root():
    return {"message": "Space Converter API funcionando correctamente"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)