// Function to extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  // Handle youtube.com/watch?v= format
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([\w-]+)/);
  if (watchMatch) {
    return watchMatch[1];
  }

  // Handle youtu.be/ format
  const shortMatch = url.match(/(?:youtu\.be\/)([\w-]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  // Handle embed format
  const embedMatch = url.match(/(?:youtube\.com\/embed\/)([\w-]+)/);
  if (embedMatch) {
    return embedMatch[1];
  }

  return null;
}
