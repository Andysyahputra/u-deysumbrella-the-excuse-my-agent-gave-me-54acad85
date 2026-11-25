import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse: a straight-faced apology whose joke grows out of the
// machine's own condition — a hallucinated calendar it believed itself.
const ENTRY =
  "I'm sorry \u2014 I hallucinated a calendar where the deadline was tomorrow, and it was so convincing I believed it myself.";

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function clearDirectory(dir: string): void {
  // Clear contents only; never remove the output directory itself.
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function writeEntry(outDir: string, text: string): void {
  validateEntry(text);
  mkdirSync(outDir, { recursive: true });
  clearDirectory(outDir);
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

writeEntry(process.env.MAKEFUN_OUTPUT_DIR ?? "/output", ENTRY);
