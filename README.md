# KAIMANAWA Premium Web App

Modern Next.js 16 app for a premium New Zealand hunting brand.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Zod validation for API routes

## Run locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Environment Variables
- `NEXT_PUBLIC_SITE_URL` - canonical site URL used for metadata/sitemap.
- `LEAD_WEBHOOK_URL` - CRM webhook endpoint for inquiry leads.
- `SLACK_WEBHOOK_URL` - optional Slack incoming webhook for lead alerts.
- `TURNSTILE_SECRET_KEY` - optional Cloudflare Turnstile secret key.
- `TELEMETRY_WEBHOOK_URL` - optional webhook sink for Web Vitals metrics.

## Features
- Premium dynamic landing with cinematic sections and adaptive effects.
- Enhanced booking configurator with budget profile and local preference memory.
- Hardened inquiry API with validation, anti-bot honeypot, optional Turnstile, and rate-limiting.
- SEO package: Open Graph, Twitter metadata, sitemap, robots, and JSON-LD.
- Lightweight telemetry endpoint (`/api/telemetry`) for performance analytics forwarding.
