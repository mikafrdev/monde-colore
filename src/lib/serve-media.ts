// lib/serve-media.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { MIME_TYPES } from "@/lib/media-mime";

export async function serveMediaFile(baseDir: string, segments: string[]) {
   const relativePath = segments.join("/");
   const filePath = path.join(baseDir, relativePath);

   if (!filePath.startsWith(baseDir)) {
      return new NextResponse("Forbidden", { status: 403 });
   }

   try {
      const fileBuffer = await fs.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      return new NextResponse(fileBuffer, {
         headers: {
            "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
         },
      });
   } catch {
      return new NextResponse("Not found", { status: 404 });
   }
}
