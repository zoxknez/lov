import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

type Entry = {
  count: number;
  resetAt: number;
};

const dataDir = path.join(process.cwd(), "data");
const storeFile = path.join(dataDir, "rate-limit.json");

function readStore() {
  try {
    if (!existsSync(storeFile)) return {} as Record<string, Entry>;
    return JSON.parse(readFileSync(storeFile, "utf8")) as Record<string, Entry>;
  } catch {
    return {} as Record<string, Entry>;
  }
}

function writeStore(store: Record<string, Entry>) {
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(storeFile, JSON.stringify(store), "utf8");
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const store = readStore();

  for (const [entryKey, entry] of Object.entries(store)) {
    if (now > entry.resetAt) delete store[entryKey];
  }

  const current = store[key];

  if (!current || now > current.resetAt) {
    const entry = { count: 1, resetAt: now + windowMs };
    store[key] = entry;
    writeStore(store);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (current.count >= limit) {
    writeStore(store);
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  store[key] = current;
  writeStore(store);
  return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt };
}
