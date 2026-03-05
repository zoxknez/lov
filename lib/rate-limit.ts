import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

type Entry = {
  count: number;
  resetAt: number;
};

const DATA_DIR = path.join(process.cwd(), "data");
const RATE_LIMIT_FILE = path.join(DATA_DIR, "rate-limit.json");

function readStore() {
  try {
    if (!existsSync(RATE_LIMIT_FILE)) {
      return {} as Record<string, Entry>;
    }

    return JSON.parse(readFileSync(RATE_LIMIT_FILE, "utf8")) as Record<string, Entry>;
  } catch {
    return {} as Record<string, Entry>;
  }
}

function writeStore(store: Record<string, Entry>) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(RATE_LIMIT_FILE, JSON.stringify(store), "utf8");
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const store = readStore();

  for (const [entryKey, entry] of Object.entries(store)) {
    if (now > entry.resetAt) {
      delete store[entryKey];
    }
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
