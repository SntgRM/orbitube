import yt_dlp
import os
import subprocess
import tempfile
from yt_dlp import utils

def downloadVideo(url: str, format: str) -> tuple[str, str]:
    os.makedirs("downloads", exist_ok=True)

    if format == "mp3":
        return _download_audio_only(url)
    elif format == "mp4":
        return _download_video_with_audio(url)

def _download_audio_only(url: str) -> tuple[str, str]:
    output_path = os.path.join("downloads", "%(title)s.%(ext)s")
    
    ydl_opts = {
        "outtmpl": output_path,
        "format": "bestaudio/best",
        "noplaylist": True,
        "quiet": True,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "320",
        }]
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get("title", "audio")
            filename = ydl.prepare_filename(info)
            filename = os.path.splitext(filename)[0] + ".mp3"
            return filename, title
    except utils.DownloadError as e:
        raise ValueError("No se pudo descargar el audio. Solo videos públicos.") from e

def _download_video_with_audio(url: str) -> tuple[str, str]:
    temp_dir = tempfile.mkdtemp()
    
    try:
        video_path = os.path.join(temp_dir, "video.%(ext)s")
        audio_path = os.path.join(temp_dir, "audio.%(ext)s")
        
        video_format = "bestvideo"
        
        video_opts = {
            "outtmpl": video_path,
            "format": video_format,
            "noplaylist": True,
            "quiet": True,
        }
        
        audio_opts = {
            "outtmpl": audio_path,
            "format": "bestaudio",
            "noplaylist": True,
            "quiet": True,
        }

        with yt_dlp.YoutubeDL(video_opts) as ydl:
            video_info = ydl.extract_info(url, download=True)
            title = video_info.get("title", "video")
            actual_video_path = ydl.prepare_filename(video_info)

        with yt_dlp.YoutubeDL(audio_opts) as ydl:
            audio_info = ydl.extract_info(url, download=True)
            actual_audio_path = ydl.prepare_filename(audio_info)

        safe_title = _sanitize_filename(title)
        final_output = os.path.join("downloads", f"{safe_title}.mp4")
        
        _merge_video_audio(actual_video_path, actual_audio_path, final_output)
        
        return final_output, title
        
    except Exception as e:
        raise ValueError(f"Error al procesar el video: {str(e)}") from e
    finally:
        _cleanup_temp_files(temp_dir)

def _merge_video_audio(video_path: str, audio_path: str, output_path: str):
    try:
        cmd = [
            "ffmpeg",
            "-i", video_path,
            "-i", audio_path,
            "-c:v", "copy",
            "-c:a", "aac",
            "-shortest",
            "-y",
            output_path
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        
        if not os.path.exists(output_path):
            raise Exception("FFmpeg no pudo crear el archivo de salida")
            
    except subprocess.CalledProcessError as e:
        raise Exception(f"Error de FFmpeg: {e.stderr}") from e
    except FileNotFoundError:
        raise Exception("FFmpeg no está instalado o no está en el PATH del sistema") from None

def _sanitize_filename(filename: str) -> str:
    import re
    filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
    if len(filename) > 200:
        filename = filename[:200]
    return filename.strip()

def _cleanup_temp_files(temp_dir: str):
    try:
        import shutil
        shutil.rmtree(temp_dir, ignore_errors=True)
    except:
        pass
