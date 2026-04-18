type Entry = {
  count: number;
  resetAt: number;
};

const rateStore = new Map<string, Entry>();
const MAX_STORE_SIZE = 10000;
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60000; // 1 minute

function cleanupExpiredEntries(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL) {
    return;
  }

  lastCleanup = now;
  
  for (const [entryKey, entry] of rateStore.entries()) {
    if (now > entry.resetAt) {
      rateStore.delete(entryKey);
    }
  }

  // If store is still too large, remove oldest entries
  if (rateStore.size > MAX_STORE_SIZE) {
    const entries = Array.from(rateStore.entries());
    entries.sort((a, b) => a[1].resetAt - b[1].resetAt);
    const toRemove = entries.slice(0, Math.floor(MAX_STORE_SIZE * 0.2));
    toRemove.forEach(([key]) => rateStore.delete(key));
  }
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  cleanupExpiredEntries(now);

  const current = rateStore.get(key);

  if (!current || now > current.resetAt) {
    const entry = { count: 1, resetAt: now + windowMs };
    rateStore.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  rateStore.set(key, current);
  return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt };
}
