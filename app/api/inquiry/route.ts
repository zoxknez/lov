import { NextResponse } from "next/server";
import { z } from "zod";
import { storeLead } from "@/lib/lead-store";
import { checkRateLimit } from "@/lib/rate-limit";

const inquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  targetSpecies: z.string().min(2).max(80),
  message: z.string().min(10).max(2000),
  preferredMonth: z.string().max(80).optional().default(""),
  groupSize: z.string().max(80).optional().default(""),
  accommodation: z.string().max(120).optional().default(""),
  transferMode: z.string().max(120).optional().default(""),
  programLength: z.string().max(80).optional().default(""),
  budgetBand: z.string().max(80).optional().default(""),
  antiBotField: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(2048).optional().default("")
});

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip && ip !== "unknown") form.append("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form
    });
    if (!res.ok) return false;
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

async function postWebhook(url: string, payload: unknown) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`inquiry:${ip}`, 6, 10 * 60 * 1000);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions. Please retry in a few minutes."
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000))
        }
      }
    );
  }

  try {
    const body = await request.json();
    const payload = inquirySchema.parse(body);

    if (payload.antiBotField) {
      return NextResponse.json({ ok: false, error: "Bot check failed." }, { status: 400 });
    }

    const captchaValid = await verifyTurnstile(payload.turnstileToken, ip);
    if (!captchaValid) {
      return NextResponse.json({ ok: false, error: "Verification failed. Please retry." }, { status: 400 });
    }

    const enrichedLead = {
      source: "kaimanawa-web",
      createdAt: new Date().toISOString(),
      ip,
      userAgent: request.headers.get("user-agent") ?? "",
      payload: {
        fullName: payload.fullName,
        email: payload.email,
        targetSpecies: payload.targetSpecies,
        message: payload.message,
        preferredMonth: payload.preferredMonth,
        groupSize: payload.groupSize,
        accommodation: payload.accommodation,
        transferMode: payload.transferMode,
        programLength: payload.programLength,
        budgetBand: payload.budgetBand
      }
    };

    await storeLead(enrichedLead);

    const crmWebhook = process.env.LEAD_WEBHOOK_URL;
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;

    const webhookJobs: Promise<boolean>[] = [];
    if (crmWebhook) webhookJobs.push(postWebhook(crmWebhook, enrichedLead));
    if (slackWebhook) {
      webhookJobs.push(
        postWebhook(slackWebhook, {
          text:
            `New KAIMANAWA lead\n` +
            `Name: ${payload.fullName}\n` +
            `Email: ${payload.email}\n` +
            `Species: ${payload.targetSpecies}\n` +
            `Month: ${payload.preferredMonth || "N/A"}\n` +
            `Group: ${payload.groupSize || "N/A"}`
        })
      );
    }

    const webhookResults = webhookJobs.length > 0 ? await Promise.all(webhookJobs) : [];
    const forwarded = webhookResults.every(Boolean);

    return NextResponse.json(
      {
        ok: true,
        inquiry: enrichedLead.payload,
        forwarded
      },
      {
        status: 200
      }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
  }
}
