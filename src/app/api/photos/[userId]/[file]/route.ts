import { promises as fs } from "node:fs";
import path from "node:path";
import { getCurrentUser } from "@/lib/auth";
import { DATA_DIR } from "@/lib/db";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

// Member photos are only served to signed-in members.
export async function GET(_: Request, { params }: { params: Promise<{ userId: string; file: string }> }) {
  if (!(await getCurrentUser())) return new Response("Not found", { status: 404 });
  const { userId, file } = await params;
  const m = /^[a-f0-9]{16}\.(jpg|png|webp)$/.exec(file);
  if (!m || !/^[a-f0-9-]{36}$/.test(userId)) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(DATA_DIR, "uploads", userId, file));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": TYPES[m[1]], "Cache-Control": "private, max-age=3600" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
