import { NextResponse } from "next/server";

type TelemetryPayload = {
  name?: string;
  value?: number;
  id?: string;
  rating?: string;
  delta?: number;
};

export async function POST(request: Request) {
  try {
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
        })
      }).catch(() => undefined);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
