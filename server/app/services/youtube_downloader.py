import yt_dlp
import os
from yt_dlp import utils
from threading import Lock

_info_cache = {}
_cache_lock = Lock()

def download_video(url: str, format: str) -> tuple[str, str]:
    os.makedirs("downloads", exist_ok=True)

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
        "extractaudio": False,
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
    
    output_path = os.path.join("downloads", f"{safe_title}.%(ext)s")
    
    ydl_opts = {
        "outtmpl": output_path,
        "format": "bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio/best[height<=?1080]",
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "320",
        }],
        "http_chunk_size": 10485760,
        "retries": 3,
        "fragment_retries": 3,
        "external_downloader": "aria2c",
        "external_downloader_args": {
            "aria2c": [
                "--max-connection-per-server=4",
                "--split=4",
                "--min-split-size=1M",
                "--max-concurrent-downloads=4"
            ]
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            filename = os.path.join("downloads", f"{safe_title}.mp3")
            return filename, title
    except utils.DownloadError as e:
        return _download_audio_fallback(url, safe_title, title)

def _download_audio_fallback(url: str, safe_title: str, title: str) -> tuple[str, str]:
    output_path = os.path.join("downloads", f"{safe_title}.%(ext)s")
    
    ydl_opts = {
        "outtmpl": output_path,
        "format": "bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio",
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "320",
        }],
        "http_chunk_size": 10485760,
        "retries": 2,
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            filename = os.path.join("downloads", f"{safe_title}.mp3")
            return filename, title
    except utils.DownloadError as e:
        raise ValueError("No se pudo descargar el audio. Solo videos públicos.") from e

def _download_video_optimized(url: str) -> tuple[str, str]:
    info = _get_video_info(url)
    title = info.get("title", "video")
    safe_title = _sanitize_filename(title)
    
    final_output = os.path.join("downloads", f"{safe_title}.mp4")
    
    ydl_opts = {
        "outtmpl": final_output,
        "format": (
            "bestvideo[height<=1080]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/"
            "best[height<=1080][ext=mp4]/best[height<=1080]/best"
        ),
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "merge_output_format": "mp4",
        "http_chunk_size": 10485760,
        "retries": 3,
        "fragment_retries": 3,
        "postprocessor_args": {
            "ffmpeg": [
                "-c:v", "copy",
                "-c:a", "aac",
                "-movflags", "+faststart",
                "-preset", "ultrafast"
            ]
        },
        "external_downloader": "aria2c",
        "external_downloader_args": {
            "aria2c": [
                "--max-connection-per-server=4",
                "--split=4",
                "--min-split-size=1M",
                "--max-concurrent-downloads=4"
            ]
        }
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
            return final_output, title
            
    except Exception as e:
        return _download_video_fallback(url, safe_title, title)

def _download_video_fallback(url: str, safe_title: str, title: str) -> tuple[str, str]:
    final_output = os.path.join("downloads", f"{safe_title}.mp4")
    
    ydl_opts = {
        "outtmpl": final_output,
        "format": (
            "bestvideo[height<=1080]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/"
            "best[height<=1080][ext=mp4]/best[height<=1080]"
        ),
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "merge_output_format": "mp4",
        "http_chunk_size": 10485760,
        "retries": 2,
        "postprocessor_args": {
            "ffmpeg": [
                "-c:v", "copy",
                "-c:a", "aac", 
                "-preset", "ultrafast"
            ]
        }
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

def _cleanup_temp_files(temp_dir: str):
    try:
        import shutil
        shutil.rmtree(temp_dir, ignore_errors=True)
    except:
        pass

def clear_info_cache():
    global _info_cache
    with _cache_lock:
        _info_cache.clear()