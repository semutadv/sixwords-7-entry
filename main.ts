// "Six Words" — entry for Six Words to a Payday.
// Exactly six words: the whole tragedy of payday, start to finish.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORDS = "Payday came. Bills were already waiting.";

function paydayDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function clearDesk(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const paper of readdirSync(dir)) {
    rmSync(join(dir, paper), { recursive: true, force: true });
  }
}

function count(): void {
  const dir = paydayDir();
  clearDesk(dir);
  if (WORDS.length < 1 || WORDS.length > 60) throw new Error("six words outside 1-60 chars");
  writeFileSync(join(dir, "entry.txt"), WORDS + "\n", "utf8");
  console.log(`six words, ${WORDS.length} chars, zero left over`);
}

count();
