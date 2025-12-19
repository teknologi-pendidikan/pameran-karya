// Function to convert YouTube URL to embed URL
export function getYouTubeEmbedUrl(url: string): string {
  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([\w-]+)/);
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  // Handle youtu.be/ format
  const shortMatch = url.match(/(?:youtu\.be\/)([\w-]+)/);
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  // If already in embed format or other format, return as is
  return url;
}
