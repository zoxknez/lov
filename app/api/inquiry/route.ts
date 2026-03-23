import { NextResponse } from "next/server";
import { z } from "zod";
import { storeLead } from "@/lib/lead-store";
import { checkRateLimit } from "@/lib/rate-limit";

const inquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(180),
  phone: z.string().max(80).optional().default(""),
  subject: z.string().min(2).max(80),
  message: z.string().min(10).max(2000),
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
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
      }
    };

    const crmWebhook = process.env.LEAD_WEBHOOK_URL;
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    let stored = false;

    try {
      await storeLead(enrichedLead);
      stored = true;
    } catch (error) {
      if (!crmWebhook && !slackWebhook) {
        throw error;
      }

      console.error("Lead storage fallback skipped", error);
    }

    const webhookJobs: Promise<boolean>[] = [];
    if (crmWebhook) webhookJobs.push(postWebhook(crmWebhook, enrichedLead));
    if (slackWebhook) {
      webhookJobs.push(
        postWebhook(slackWebhook, {
          text:
            `New KAIMANAWA lead\n` +
            `Name: ${payload.fullName}\n` +
            `Email: ${payload.email}\n` +
            `Phone: ${payload.phone || "N/A"}\n` +
            `Subject: ${payload.subject}`
        })
      );
    }

    const webhookResults = webhookJobs.length > 0 ? await Promise.all(webhookJobs) : [];
    const forwarded = webhookResults.every(Boolean);

    if (!stored && !forwarded) {
      throw new Error("Inquiry persistence unavailable.");
    }

    return NextResponse.json(
      {
        ok: true,
        inquiry: enrichedLead.payload,
        forwarded,
        stored,
      },
      {
        status: 200
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
    }

    console.error("Inquiry submission failed", error);
    return NextResponse.json({ ok: false, error: "Unable to save inquiry right now." }, { status: 500 });
  }
}
