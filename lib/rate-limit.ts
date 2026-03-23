type Entry = {
  count: number;
  resetAt: number;
};

const rateStore = new Map<string, Entry>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  for (const [entryKey, entry] of rateStore.entries()) {
    if (now > entry.resetAt) {
      rateStore.delete(entryKey);
    }
  }

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
