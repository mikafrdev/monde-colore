// app/auth/signin/get-videos-action.ts
"use server";

import { readdir } from "fs/promises";
import path from "path";

export async function getVideosAction() {
   const uploadDir = path.join(process.cwd(), "public", "videos", "auth-page");
   const files = await readdir(uploadDir);
   return files
      .filter((f) => f.endsWith(".mp4") || f.endsWith(".webm"))
      .map((f) => `/videos/auth-page/${f}`);
}
