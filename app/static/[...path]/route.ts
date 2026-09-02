import { serveMediaFile } from "@/lib/serve-media";
import { MEDIA_PATHS } from "@/lib/media-paths";

export const dynamic = "force-dynamic";
const BASE_DIR = MEDIA_PATHS.static.root;

export async function GET(
   request: Request,
   context: { params: Promise<{ path: string[] }> },
) {
   const { path: segments } = await context.params;
   return serveMediaFile(BASE_DIR, segments);
}
