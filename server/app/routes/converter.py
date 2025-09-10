from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from app.services.yt_converter import downloadVideo
import os

router = APIRouter(prefix="/convert", tags=["Converter"])

@router.get("/")
def convert(
    url: str = Query(..., description="URL del video de YouTube"),
    format: str = Query(..., regex="^(mp3|mp4)$")
):
    
    try:
        filepath, title = downloadVideo(url, format)
        ext = "mp3" if format == "mp3" else "mp4"
        filename = f"{title}.{ext}"
        print(f"DEBUG: filepath={filepath}, filename={filename}")
        return FileResponse(
            filepath,
            media_type="audio/mpeg" if format == "mp3" else "video/mp4",
            filename=filename,
            background=BackgroundTask(lambda: os.remove(filepath)),
            headers={"Content-Length": str(os.path.getsize(filepath))},
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
