// Funniest Time Machine Warning Label
// One deterministic program: writes a single warning-label line to
// <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Node 22, standard library only. No network, no randomness, no secrets,
// no environment-dependent behaviour beyond the output directory.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate allows 1 to 120 characters, a single non-blank line.
const MAX_CHARS = 120;

// The entry: a genuine safety notice, phrased with a straight face, whose
// joke is the duplicate-self hazard of time travel — and the punchline,
// that the other you will deny you ever met, lands in the last two words.
const LINE =
  "WARNING: Do not meet yourself. He owes you money, he knows it, and he will pretend you never met.";

function checkLine(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be empty or only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `entry line is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
}

function main(): void {
  checkLine(LINE);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
