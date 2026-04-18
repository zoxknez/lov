import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

type TelemetryPayload = {
  name?: string;
  value?: number;
  id?: string;
  rating?: string;
  delta?: number;
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`telemetry:${ip}`, 30, 60 * 1000);

  if (!rate.allowed) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const payload = (await request.json()) as TelemetryPayload;
    if (!payload?.name) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Optional sink: set TELEMETRY_WEBHOOK_URL to forward vitals.
    const webhook = process.env.TELEMETRY_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "kaimanawa-web-vitals",
          createdAt: new Date().toISOString(),
          payload
        }),
        signal: AbortSignal.timeout(5000)
      }).catch(() => undefined);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
