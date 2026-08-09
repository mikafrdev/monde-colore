// lib/utils/video.ts
export function getYoutubeThumbnail(embedUrl: string | null): string | null {
   if (!embedUrl) return null;
   const match = embedUrl.match(
      /(?:youtube.com\/(?:embed\/|watch\?v=)|youtu.be\/)([a-zA-Z0-9_-]{11})/,
   );
   return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}
