import { NextResponse } from "next/server";
import { z } from "zod";
import { storeLead } from "@/lib/lead-store";
import { checkRateLimit } from "@/lib/rate-limit";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

const SUBJECT_LABELS: Record<string, string> = {
  booking: "Booking Inquiry",
  pricing: "Pricing Information",
  travel: "Travel & Logistics",
  other: "General Inquiry",
};

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
          "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": "6",
          "X-RateLimit-Remaining": String(rate.remaining),
          "X-RateLimit-Reset": String(Math.floor(rate.resetAt / 1000))
        }
      }
    );
  }

  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ ok: false, error: "Invalid content type." }, { status: 400 });
    }

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
      if (!crmWebhook && !slackWebhook && !resend) {
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

    // Send emails via Resend
    let emailSent = false;
    if (resend) {
      const toEmail = process.env.RESEND_TO_EMAIL ?? "hunting@kaimanawasafaris.com";
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Kaimanawa Safaris <onboarding@resend.dev>";
      const subjectLabel = SUBJECT_LABELS[payload.subject] ?? payload.subject;

      // Notification email layout
      const notificationHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry – Kaimanawa Safaris</title>
</head>
<body style="margin:0;padding:0;background:#0a0f0e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0e;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111917;border:1px solid #1f2d2a;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f1613,#0d1a16);padding:36px 40px;border-bottom:1px solid #1f2d2a;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#a07850;">Kaimanawa Safaris</p>
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em;">New Inquiry Received</h1>
              <p style="margin:8px 0 0;font-size:12px;color:#6b7280;">${new Date().toUTCString()}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;border-bottom:1px solid #1f2d2a;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a07850;">Subject</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#fff;">${subjectLabel}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 0;border-bottom:1px solid #1f2d2a;">
                    <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a07850;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#fff;">${payload.fullName}</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#9ca3af;"><a href="mailto:${payload.email}" style="color:#c9964a;text-decoration:none;">${payload.email}</a></p>
                    ${payload.phone ? `<p style="margin:4px 0 0;font-size:14px;color:#9ca3af;">${payload.phone}</p>` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;">
                    <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#a07850;">Message</p>
                    <div style="background:#0d1612;border:1px solid #1f2d2a;border-radius:10px;padding:20px 24px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#d1d5db;white-space:pre-wrap;">${payload.message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #1f2d2a;">
              <p style="margin:0;font-size:11px;color:#4b5563;text-align:center;">Kaimanawa Safaris · Ohakune, New Zealand · <a href="https://kaimanawasafaris.com" style="color:#a07850;text-decoration:none;">kaimanawasafaris.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      // Auto-reply email layout
      const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We received your inquiry – Kaimanawa Safaris</title>
</head>
<body style="margin:0;padding:0;background:#0a0f0e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f0e;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111917;border:1px solid #1f2d2a;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#0f1613,#0d1a16);padding:36px 40px;border-bottom:1px solid #1f2d2a;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#a07850;">Kaimanawa Safaris</p>
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em;">Transmission Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#d1d5db;">Hi <strong style="color:#fff;">${payload.fullName}</strong>,</p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#9ca3af;">Thank you for reaching out. We have received your inquiry and our team will review it within <strong style="color:#c9964a;">24 hours</strong>.</p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#9ca3af;">If your matter is urgent, feel free to reach us directly via WhatsApp or phone.</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#c9964a;border-radius:8px;padding:12px 28px;">
                    <a href="mailto:hunting@kaimanawasafaris.com" style="font-size:13px;font-weight:700;color:#000;text-decoration:none;letter-spacing:0.05em;text-transform:uppercase;">Contact Us Directly</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px 28px;border-top:1px solid #1f2d2a;">
              <p style="margin:0;font-size:11px;color:#4b5563;text-align:center;">Kaimanawa Safaris · Ohakune, New Zealand · <a href="https://kaimanawasafaris.com" style="color:#a07850;text-decoration:none;">kaimanawasafaris.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

      try {
        await Promise.all([
          resend.emails.send({
            from: fromEmail,
            to: toEmail,
            replyTo: payload.email,
            subject: `[Kaimanawa] ${subjectLabel} – ${payload.fullName}`,
            html: notificationHtml,
          }),
          resend.emails.send({
            from: fromEmail,
            to: payload.email,
            subject: "We received your inquiry – Kaimanawa Safaris",
            html: autoReplyHtml,
          })
        ]);
        emailSent = true;
      } catch (e) {
        console.error("Email sending failed", e);
      }
    }

    const webhookResults = webhookJobs.length > 0 ? await Promise.all(webhookJobs) : [];
    const forwarded = webhookResults.every(Boolean);

    if (!stored && !forwarded && !emailSent) {
      throw new Error("Inquiry persistence unavailable.");
    }

    return NextResponse.json(
      {
        ok: true,
        inquiry: enrichedLead.payload,
        forwarded,
        stored,
        emailSent
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
