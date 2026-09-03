import { readFile } from "node:fs/promises"
import path from "node:path"

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params
  const item = name.replace(/\.json$/, "")

  try {
    const file = path.join(process.cwd(), "public/r", `${item}.json`)
    const json = await readFile(file, "utf8")
    return new Response(json, {
      headers: { "content-type": "application/json" },
    })
  } catch {
    return Response.json({ error: `Unknown registry item: ${item}` }, { status: 404 })
  }
}
