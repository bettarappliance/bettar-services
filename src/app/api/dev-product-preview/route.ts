import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * Local preview only: returns the not-yet-imported details for one product from
 * "product-data/*-details.json" so the new product page can be checked on localhost
 * without writing to Firestore. Always 404 outside `next dev`.
 */
export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const dir = path.join(process.cwd(), "product-data");
  const { readdir } = await import("node:fs/promises");
  const files = (await readdir(dir).catch(() => [] as string[])).filter((f) => f.endsWith("-details.json"));
  for (const f of files) {
    const json = JSON.parse(await readFile(path.join(dir, f), "utf8")) as {
      updates?: { id: string; set: Record<string, unknown> }[];
    };
    const hit = json.updates?.find((u) => u.id === id);
    if (hit) return NextResponse.json(hit.set);
  }
  return NextResponse.json({ error: "No preview data for this product" }, { status: 404 });
}
