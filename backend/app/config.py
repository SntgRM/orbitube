import os
from dotenv import load_dotenv

# Cargar variables de entorno desde archivo .env si existe
load_dotenv()

# Configuraciones de la aplicación
class Settings:
    API_PREFIX = "/api"
    DOWNLOAD_DIR = os.getenv("DOWNLOAD_DIR", "downloads")
    DOWNLOAD_URL_PREFIX = os.getenv("DOWNLOAD_URL_PREFIX", "http://localhost:8000/downloads")
    MAX_CONCURRENT_DOWNLOADS = int(os.getenv("MAX_CONCURRENT_DOWNLOADS", "5"))
    TEMP_DIR = os.getenv("TEMP_DIR", "temp")
    
    # Tiempo máximo en segundos que se guardarán los archivos descargados
    # Por defecto: 1 hora
    FILE_RETENTION_TIME = int(os.getenv("FILE_RETENTION_TIME", "3600"))
    
    # Configuraciones específicas de yt-dlp
    YTDLP_OPTIONS_AUDIO = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': f'{DOWNLOAD_DIR}/%(title)s-%(id)s.%(ext)s',
    }
    
    YTDLP_OPTIONS_VIDEO = {
        'format': 'best[height<=720]/best',  # Limitar a 720p para equilibrar calidad/tamaño
        'outtmpl': f'{DOWNLOAD_DIR}/%(title)s-%(id)s.%(ext)s',
    }

# Instancia de configuración
settings = Settings()

# Crear directorios necesarios
os.makedirs(settings.DOWNLOAD_DIR, exist_ok=True)
os.makedirs(settings.TEMP_DIR, exist_ok=True)