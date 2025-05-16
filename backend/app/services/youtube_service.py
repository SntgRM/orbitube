import os
import re
import asyncio
import yt_dlp
import logging
from typing import Dict, Any, Optional, Tuple
from pathlib import Path
import time
import uuid
import aiofiles

from app.config import settings

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Semáforo para limitar descargas concurrentes
download_semaphore = asyncio.Semaphore(settings.MAX_CONCURRENT_DOWNLOADS)

class YoutubeService:
    """Servicio para procesar videos de YouTube"""
    
    @staticmethod
    def validate_youtube_url(url: str) -> bool:
        """Valida si la URL proporcionada es una URL válida de YouTube"""
        youtube_regex = (
            r'(https?://)?(www\.)?'
            r'(youtube|youtu|youtube-nocookie)\.(com|be)/'
            r'(watch\?v=|embed/|v/|.+\?v=)?([^&=%\?]{11})'
        )
        youtube_match = re.match(youtube_regex, url)
        return bool(youtube_match)
    
    @staticmethod
    def get_video_info(url: str) -> Dict[str, Any]:
        """Obtiene información del video de YouTube"""
        try:
            with yt_dlp.YoutubeDL({'quiet': True}) as ydl:
                info = ydl.extract_info(url, download=False)
                return {
                    'id': info.get('id'),
                    'title': info.get('title'),
                    'duration': info.get('duration'),
                    'thumbnail': info.get('thumbnail'),
                    'uploader': info.get('uploader'),
                    'view_count': info.get('view_count'),
                    'formats': [
                        {
                            'format_id': f.get('format_id'),
                            'ext': f.get('ext'),
                            'resolution': f'{f.get("width", "N/A")}x{f.get("height", "N/A")}',
                            'filesize': f.get('filesize'),
                        }
                        for f in info.get('formats', []) 
                        if f.get('ext') in ['mp4', 'webm'] and f.get('vcodec') != 'none'
                    ]
                }
        except Exception as e:
            logger.error(f"Error al obtener información del video: {str(e)}")
            raise ValueError(f"No se pudo obtener información del video: {str(e)}")
    
    @staticmethod
    async def download_video(url: str, format_type: str = 'mp4') -> Tuple[str, str]:
        """
        Descarga un video de YouTube en el formato especificado (mp3 o mp4)
        
        Args:
            url: URL del video de YouTube
            format_type: Formato de salida ('mp3' o 'mp4')
            
        Returns:
            Tuple con la ruta del archivo y la URL para acceder
        """
        if not YoutubeService.validate_youtube_url(url):
            raise ValueError("URL de YouTube no válida")
        
        # Generar ID único para esta descarga
        download_id = str(uuid.uuid4())
        
        # Usar semáforo para limitar descargas concurrentes
        async with download_semaphore:
            loop = asyncio.get_event_loop()
            
            # Seleccionar opciones basadas en el formato
            if format_type.lower() == 'mp3':
                options = settings.YTDLP_OPTIONS_AUDIO.copy()
            else:  # mp4 por defecto
                options = settings.YTDLP_OPTIONS_VIDEO.copy()
            
            # Agregar ID único al nombre de archivo
            base_path = options['outtmpl']
            options['outtmpl'] = base_path.replace('%(id)s', f'%(id)s-{download_id}')
            
            try:
                # Ejecutar yt-dlp en un thread para no bloquear el loop de eventos
                def _download():
                    with yt_dlp.YoutubeDL(options) as ydl:
                        info = ydl.extract_info(url, download=True)
                        return info
                
                info = await loop.run_in_executor(None, _download)
                
                # Determinar la ruta del archivo descargado
                if format_type.lower() == 'mp3':
                    filename = f"{info['title']}-{info['id']}-{download_id}.mp3"
                else:
                    # Para video, necesitamos verificar la extensión real
                    ext = info.get('ext', 'mp4')
                    filename = f"{info['title']}-{info['id']}-{download_id}.{ext}"
                
                # Limpiar nombre de archivo para evitar problemas con caracteres especiales
                safe_filename = re.sub(r'[^\w\-_\. ]', '_', filename)
                file_path = os.path.join(settings.DOWNLOAD_DIR, safe_filename)
                
                # Si el archivo no existe con el nombre limpio, buscar el archivo real
                if not os.path.exists(file_path):
                    possible_files = [
                        f for f in os.listdir(settings.DOWNLOAD_DIR) 
                        if download_id in f
                    ]
                    if possible_files:
                        # Usar el primer archivo encontrado
                        file_path = os.path.join(settings.DOWNLOAD_DIR, possible_files[0])
                        safe_filename = possible_files[0]
                
                # Generar URL para acceder al archivo
                download_url = f"{settings.DOWNLOAD_URL_PREFIX}/{safe_filename}"
                
                # Programar eliminación del archivo después del tiempo de retención
                asyncio.create_task(
                    YoutubeService._schedule_file_deletion(file_path, settings.FILE_RETENTION_TIME)
                )
                
                return file_path, download_url
                
            except Exception as e:
                logger.error(f"Error en la descarga: {str(e)}")
                raise RuntimeError(f"Error al descargar el video: {str(e)}")
    
    @staticmethod
    async def _schedule_file_deletion(file_path: str, delay_seconds: int):
        """Programa la eliminación de un archivo después de un tiempo determinado"""
        await asyncio.sleep(delay_seconds)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Archivo eliminado: {file_path}")
        except Exception as e:
            logger.error(f"Error al eliminar archivo {file_path}: {str(e)}")