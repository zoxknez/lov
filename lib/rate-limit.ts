type Entry = {
  count: number;
  resetAt: number;
};

const globalStore = globalThis as typeof globalThis & {
  __kaimanawaRateLimitStore?: Map<string, Entry>;
};

const store = globalStore.__kaimanawaRateLimitStore ?? new Map<string, Entry>();
globalStore.__kaimanawaRateLimitStore = store;

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    const entry = { count: 1, resetAt: now + windowMs };
    store.set(key, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  store.set(key, current);
  return { allowed: true, remaining: limit - current.count, resetAt: current.resetAt };
}
