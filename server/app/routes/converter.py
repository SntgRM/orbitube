from fastapi import APIRouter, Query
from fastapi.responses import FileResponse
from app.services.yt_converter import downloadVideo
import os

router = APIRouter(prefix="/convert", tags=["Converter"])

@router.get("/mp3")
def convert_to_mp3(url: str = Query(..., description="URL del video de YouTube")):
    filepath = downloadVideo(url, "mp3")
    filename = os.path.basename(filepath)
    return FileResponse(
        filepath,
        media_type="audio/mpeg",
        filename=filename
    )

@router.get("/mp4")
def convert_to_mp4(url: str = Query(..., description="URL del video de YouTube")):
    filepath = downloadVideo(url, "mp4")
    filename = os.path.basename(filepath)
    return FileResponse(
        filepath,
        media_type="video/mp4",
        filename=filename
    )
