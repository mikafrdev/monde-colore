// lib/media-paths.ts
import path from "path";

const UPLOADS_ROOT = process.env.MEDIA_UPLOADS_PATH!;
const STATIC_ROOT = process.env.MEDIA_STATIC_PATH!;

if (!UPLOADS_ROOT || !STATIC_ROOT) {
   throw new Error(
      "MEDIA_UPLOADS_PATH et MEDIA_STATIC_PATH doivent être définis dans .env",
   );
}

function subPaths(root: string) {
   return {
      root, // ← racine brute, utilisée par les route handlers catch-all
      home: path.join(root, "home"),
      images: path.join(root, "images"), // ← utilisé directement par les server actions
      videos: path.join(root, "videos"),
      audio: path.join(root, "audio"),
      documents: path.join(root, "documents"),
      thumbnails: path.join(root, "thumbnails"),
   };
}

export const MEDIA_PATHS = {
   uploads: subPaths(UPLOADS_ROOT),
   static: subPaths(STATIC_ROOT),
} as const;
