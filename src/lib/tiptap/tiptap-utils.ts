// src/lib/tiptap-utils.ts
import { uploadImageAction } from "@administration/article/actions/upload-image.action";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/* export async function handleImageUpload(
   file: File,
   onProgress?: (progress: number) => void,
   _abortSignal?: AbortSignal,
): Promise<string> {
   const result = await uploadImageAction({ file, type: "ARTICLE" });

   if (!result?.data?.image?.url) {
      throw new Error("Upload échoué");
   }

   onProgress?.(100);
   return result.data.image.url;
} */