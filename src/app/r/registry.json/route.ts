import { readFile } from "node:fs/promises"
import path from "node:path"

export async function GET() {
  try {
    const file = path.join(process.cwd(), "public/r/registry.json")
    const json = await readFile(file, "utf8")
    return new Response(json, {
      headers: { "content-type": "application/json" },
    })
  } catch {
    return Response.json(
      { error: "Registry catalog is missing. Run pnpm dlx shadcn@latest build." },
      { status: 404 },
    )
  }
}
