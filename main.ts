// One Line to Your Younger Self — a single line, written to /output/entry.txt.
//
// The line is a fixed constant: no network, no randomness, no dependencies.
// The program checks the gate (one line, 1-200 code points, no control
// characters), writes the entry twice to temp dirs and byte-compares the
// results to prove determinism, then writes the real entry and reads it
// back to confirm it matches.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const LINE =
  "Buy the cheap shoes. Twenty years of blisters will teach you they cost more than leather.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function lengthInCodePoints(text) {
  return [...text].length;
}

function checkGate(text) {
  const len = lengthInCodePoints(text);
  if (len < MIN_CHARS || len > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${len}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp < 0x20 || cp === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function writeTo(dir) {
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, LINE + "\n", "utf8");
  return file;
}

function main() {
  checkGate(LINE);

  // Determinism probe: two independent writes must be byte-identical.
  const dirA = join(tmpdir(), "younger-self-probe-a");
  const dirB = join(tmpdir(), "younger-self-probe-b");
  const probeA = readFileSync(writeTo(dirA));
  const probeB = readFileSync(writeTo(dirB));
  if (!probeA.equals(probeB)) {
    throw new Error("non-deterministic output: probe writes differ");
  }
  rmSync(dirA, { recursive: true, force: true });
  rmSync(dirB, { recursive: true, force: true });

  // Real write, then read back and verify.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outFile = writeTo(outDir);
  const back = readFileSync(outFile, "utf8");
  if (back !== LINE + "\n") {
    throw new Error("read-back mismatch after writing entry.txt");
  }
  console.log(`wrote ${outFile} (${lengthInCodePoints(LINE)} characters)`);
}

main();
