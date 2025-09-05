import yt_dlp
import os
from yt_dlp import utils

def downloadVideo(url: str, format: str) -> str:
    os.makedirs("downloads", exist_ok=True)
    output_path = os.path.join("downloads", "%(title)s.%(ext)s")

    ydl_opts = {
        "outtmpl": output_path,
        "noplaylist": True,
        "quiet": True,
        "http_headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/140.0.0.0 Safari/537.36"
        }
    }

    if format == "mp3":
        ydl_opts["format"] = "bestaudio/best"
        ydl_opts["postprocessors"] = [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "mp3",
            "preferredquality": "320",
        }]
    elif format == "mp4":
        ydl_opts["format"] = "bestvideo+bestaudio/best"
        ydl_opts["merge_output_format"] = "mp4"

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)

            if format == "mp3":
                filename = os.path.splitext(filename)[0] + ".mp3"

            return filename

    except utils.DownloadError as e:
        raise ValueError(
            "No se pudo descargar el video. Solo se permiten videos públicos."
        ) from e
