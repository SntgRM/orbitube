from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routes import converter

app = FastAPI(
    title="OrbiTube API",
    description="Convertidor de YouTube a MP3/MP4",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(converter.router)

@app.get("/")
def root():
    return {"message": "OK"}
