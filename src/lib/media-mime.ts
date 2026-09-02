// lib/media-mime.ts

export const MIME_TYPES: Record<string, string> = {
   // Images
   ".jpg": "image/jpeg",
   ".jpeg": "image/jpeg",
   ".png": "image/png",
   ".gif": "image/gif",
   ".webp": "image/webp",
   ".svg": "image/svg+xml",
   ".avif": "image/avif",
   ".bmp": "image/bmp",
   ".ico": "image/x-icon",
   ".tiff": "image/tiff",
   ".tif": "image/tiff",

   // Vidéos
   ".mp4": "video/mp4",
   ".webm": "video/webm",
   ".mov": "video/quicktime",
   ".avi": "video/x-msvideo",
   ".mkv": "video/x-matroska",
   ".m4v": "video/x-m4v",
   ".ogv": "video/ogg",

   // Audio
   ".mp3": "audio/mpeg",
   ".wav": "audio/wav",
   ".ogg": "audio/ogg",
   ".m4a": "audio/mp4",
   ".aac": "audio/aac",
   ".flac": "audio/flac",
   ".weba": "audio/webm",

   // Documents
   ".pdf": "application/pdf",
   ".doc": "application/msword",
   ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   ".xls": "application/vnd.ms-excel",
   ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   ".ppt": "application/vnd.ms-powerpoint",
   ".pptx":
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
   ".txt": "text/plain",
   ".csv": "text/csv",
   ".rtf": "application/rtf",

   // Archives
   ".zip": "application/zip",
   ".rar": "application/vnd.rar",
   ".7z": "application/x-7z-compressed",

   // Fonts
   ".woff": "font/woff",
   ".woff2": "font/woff2",
   ".ttf": "font/ttf",
   ".otf": "font/otf",
};

// Sous-ensembles typés `string[]` (pas de tuple readonly) pour éviter
// l'erreur TS "Argument of type 'string' is not assignable to..." avec .includes()
export const IMAGE_MIME_TYPES: string[] = [
   "image/jpeg",
   "image/png",
   "image/webp",
   "image/gif",
   "image/avif",
   "image/bmp",
   "image/svg+xml",
   "image/tiff",
   "image/x-icon",
];

export const VIDEO_MIME_TYPES: string[] = [
   "video/mp4",
   "video/webm",
   "video/quicktime",
   "video/x-msvideo",
   "video/x-matroska",
   "video/x-m4v",
   "video/ogg",
];

export const AUDIO_MIME_TYPES: string[] = [
   "audio/mpeg",
   "audio/wav",
   "audio/ogg",
   "audio/mp4",
   "audio/aac",
   "audio/flac",
   "audio/webm",
];

export const DOCUMENT_MIME_TYPES: string[] = [
   "application/pdf",
   "application/msword",
   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
   "application/vnd.ms-excel",
   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
   "application/vnd.ms-powerpoint",
   "application/vnd.openxmlformats-officedocument.presentationml.presentation",
   "text/plain",
   "text/csv",
   "application/rtf",
];
