import axios from "axios";

export type Format = "mp3" | "mp4";
export type Quality = "hd";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function convertVideo(url: string, format: Format, quality: Quality): Promise<Blob> {
  const response = await axios.get(`${API_URL}/convert`, {
    params: { url, format, quality },
    responseType: "blob",
  });
  return response.data;
}
