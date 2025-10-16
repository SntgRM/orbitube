import yt_dlp
import os
from yt_dlp import utils
from threading import Lock

_info_cache = {}
_cache_lock = Lock()

DOWNLOAD_DIR = os.environ.get("ORBITUBE_DOWNLOAD_DIR", "downloads")
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

def download_video(url: str, format: str) -> tuple[str, str]:
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)

    if format == "mp3":
        return _download_audio_only_optimized(url)
    elif format == "mp4":
        return _download_video_optimized(url)

def _get_video_info(url: str) -> dict:
    with _cache_lock:
        if url in _info_cache:
            return _info_cache[url]
    
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
    
    with _cache_lock:
        _info_cache[url] = info
    
    return info

def _download_audio_only_optimized(url: str) -> tuple[str, str]:
    info = _get_video_info(url)
    title = info.get("title", "audio")
    safe_title = _sanitize_filename(title)
    
    output_path = os.path.join(DOWNLOAD_DIR, f"{safe_title}.%(ext)s")
    
    ydl_opts = {
        "outtmpl": output_path,
        "format": "bestaudio[ext=webm]/bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio/best",
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "192",
        }],
        "postprocessor_args": {
            "ffmpeg": [
                "-threads", "0",
                "-preset", "ultrafast",
                "-q:a", "2",
            ]
        },
        "http_chunk_size": 10485760,
        "concurrent_fragments": 4,
        "retries": 3,
        "fragment_retries": 3,
        "buffersize": 32768,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            filename = os.path.join(DOWNLOAD_DIR, f"{safe_title}.mp3")
            return filename, title
    except Exception as e:
        raise ValueError(f"No se pudo descargar el audio: {str(e)}") from e

def _download_video_optimized(url: str) -> tuple[str, str]:
    info = _get_video_info(url)
    title = info.get("title", "video")
    safe_title = _sanitize_filename(title)
    
    final_output = os.path.join(DOWNLOAD_DIR, f"{safe_title}.mp4")
    
    has_format_22 = any(
        f.get('format_id') == '22' 
        for f in info.get('formats', [])
    )
    
    if has_format_22:
        format_selector = "22/best[height<=720][ext=mp4]/best[height<=720]"
    else:
        format_selector = (
            "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/"
            "bestvideo[height<=720]+bestaudio/"
            "best[height<=720][ext=mp4]/"
            "best[height<=720]"
        )
    
    ydl_opts = {
        "outtmpl": final_output,
        "format": format_selector,
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "merge_output_format": "mp4",
        "postprocessor_args": {
            "ffmpeg": [
                "-c:v", "copy",
                "-c:a", "copy",
                "-movflags", "+faststart",
                "-threads", "0",
            ]
        },
        "http_chunk_size": 10485760,
        "concurrent_fragments": 4,
        "retries": 3,
        "fragment_retries": 3,
        "buffersize": 32768,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            return final_output, title
            
    except Exception as e:
        return _download_video_fallback(url, safe_title, title)

def _download_video_fallback(url: str, safe_title: str, title: str) -> tuple[str, str]:
    final_output = os.path.join(DOWNLOAD_DIR, f"{safe_title}.mp4")
    
    ydl_opts = {
        "outtmpl": final_output,
        "format": "18/bestvideo[height<=480]+bestaudio/best[height<=480]",
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "merge_output_format": "mp4",
        "postprocessor_args": {
            "ffmpeg": [
                "-c", "copy",
                "-movflags", "+faststart",
            ]
        },
        "http_chunk_size": 5242880,
        "retries": 2,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            return final_output, title
            
    except Exception as e:
        raise ValueError(f"Error al procesar el video: {str(e)}") from e

def _sanitize_filename(filename: str) -> str:
    import re
    filename = re.sub(r'[<>:"/\\|?*\x00-\x1f]', '_', filename)
    filename = re.sub(r'\s+', ' ', filename).strip('. ')
    if len(filename) > 200:
        filename = filename[:200].rstrip('. ')
    return filename

def clear_info_cache():
    global _info_cache
    with _cache_lock:
        _info_cache.clear()