// METEOR DASH — entrypoint.
// Copies POST.json from the repository root into the grader's output
// directory, byte for byte. No network, no clock, no other files.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const botDir = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const raw = readFileSync(join(botDir, "POST.json"));
const parsed = JSON.parse(raw.toString("utf8")) as unknown;
if (typeof parsed !== "object" || parsed === null || typeof (parsed as { url?: unknown }).url !== "string") {
  throw new Error("POST.json must name the post's url");
}
writeFileSync(join(outDir, "POST.json"), raw);
