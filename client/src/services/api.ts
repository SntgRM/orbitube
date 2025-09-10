import axios from "axios";

export type Format = "mp3" | "mp4";
export type Quality = "hd";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function convertVideo(
  url: string,
  format: Format,
  quality: Quality
): Promise<void> {
  const response = await axios.get(`${API_URL}/convert/`, {
    params: { url, format, quality },
    responseType: "blob",
  });

  const disposition = response.headers["content-disposition"];
  let filename = `download.${format}`;

  if (disposition) {
    const utf8Match = disposition.match(/filename\*\=utf-8''(.+)/i);
    if (utf8Match) {
      filename = decodeURIComponent(utf8Match[1]);
    } else {
      const match = disposition.match(/filename="?([^"]+)"?/i);
      if (match) filename = match[1];
    }
  }

  const downloadUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
