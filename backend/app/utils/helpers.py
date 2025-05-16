import os
import re
import asyncio
import logging
from typing import Dict, Any, List
from datetime import datetime, timedelta

from app.config import settings

logger = logging.getLogger(__name__)

def sanitize_filename(filename: str) -> str:
    """
    Sanitiza un nombre de archivo para que sea seguro para el sistema de archivos
    
    Args:
        filename: Nombre del archivo a sanitizar
        
    Returns:
        Nombre de archivo sanitizado
    """
    # Eliminar caracteres no seguros
    sanitized = re.sub(r'[^\w\-_\. ]', '_', filename)
    # Limitar longitud
    if len(sanitized) > 100:
        name, ext = os.path.splitext(sanitized)
        sanitized = name[:96] + ext  # Mantener la extensión
    return sanitized

async def cleanup_old_files():
    """
    Elimina archivos antiguos del directorio de descargas
    basado en el tiempo de retención configurado
    """
    try:
        now = datetime.now()
        cutoff_time = now - timedelta(seconds=settings.FILE_RETENTION_TIME)
        
        for filename in os.listdir(settings.DOWNLOAD_DIR):
            file_path = os.path.join(settings.DOWNLOAD_DIR, filename)
            if os.path.isfile(file_path):
                file_mod_time = datetime.fromtimestamp(os.path.getmtime(file_path))
                if file_mod_time < cutoff_time:
                    try:
                        os.remove(file_path)
                        logger.info(f"Archivo antiguo eliminado: {filename}")
                    except Exception as e:
                        logger.error(f"Error al eliminar archivo antiguo {filename}: {str(e)}")
    except Exception as e:
        logger.error(f"Error en la limpieza de archivos: {str(e)}")

async def schedule_cleanup(interval_seconds: int = 3600):
    """
    Programa la limpieza periódica de archivos antiguos
    
    Args:
        interval_seconds: Intervalo en segundos entre cada limpieza
    """
    while True:
        await cleanup_old_files()
        await asyncio.sleep(interval_seconds)