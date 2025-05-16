from fastapi import APIRouter, HTTPException, BackgroundTasks, Query, Depends, status, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl, validator
from typing import Optional, Dict, Any, List
import asyncio
import logging
import time

from app.services.youtube_service import YoutubeService
from app.config import settings

router = APIRouter(
    prefix="/api/converter",
    tags=["converter"],
    responses={404: {"description": "Not found"}},
)

logger = logging.getLogger(__name__)

# Modelos de datos
class VideoConversionRequest(BaseModel):
    url: str
    format: str = "mp4"  # Formato por defecto
    
    @validator('format')
    def validate_format(cls, v):
        if v.lower() not in ['mp3', 'mp4']:
            raise ValueError('El formato debe ser mp3 o mp4')
        return v.lower()
    
    @validator('url')
    def validate_youtube_url(cls, v):
        if not YoutubeService.validate_youtube_url(v):
            raise ValueError('URL de YouTube no válida')
        return v

class VideoInfo(BaseModel):
    id: str
    title: str
    duration: Optional[int]
    thumbnail: Optional[str]
    uploader: Optional[str]
    view_count: Optional[int]
    formats: Optional[List[Dict[str, Any]]]

class ConversionResponse(BaseModel):
    success: bool
    message: str
    file_url: Optional[str] = None
    file_path: Optional[str] = None
    format: Optional[str] = None

# Rutas
@router.get("/info", response_model=VideoInfo)
async def get_video_info(url: str = Query(..., description="URL del video de YouTube")):
    """
    Obtiene información sobre un video de YouTube sin descargarlo
    """
    try:
        if not YoutubeService.validate_youtube_url(url):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="URL de YouTube no válida"
            )
        
        info = YoutubeService.get_video_info(url)
        return info
    except Exception as e:
        logger.error(f"Error al obtener información: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al obtener información del video: {str(e)}"
        )

@router.post("/convert", response_model=ConversionResponse)
async def convert_video(request_data: VideoConversionRequest):
    """
    Convierte un video de YouTube al formato especificado (mp3 o mp4)
    """
    try:
        # Comenzar descarga asíncrona
        file_path, download_url = await YoutubeService.download_video(
            request_data.url, 
            request_data.format
        )
        
        return ConversionResponse(
            success=True,
            message=f"Video convertido exitosamente a {request_data.format}",
            file_url=download_url,
            file_path=file_path,
            format=request_data.format
        )
    except ValueError as e:
        # Error de validación
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # Error general
        logger.error(f"Error en la conversión: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error en la conversión: {str(e)}"
        )

@router.get("/status")
async def server_status():
    """
    Verifica el estado del servidor y sus componentes
    """
    return {
        "status": "online",
        "max_concurrent_downloads": settings.MAX_CONCURRENT_DOWNLOADS,
        "current_semaphore_value": YoutubeService.download_semaphore._value,
        "download_directory": settings.DOWNLOAD_DIR,
        "version": "1.0.0"
    }