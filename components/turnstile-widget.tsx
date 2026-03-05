"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
    };
  }
}

export default function TurnstileWidget({ onTokenChange }: { onTokenChange: (token: string) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !window.turnstile) return;

    const container = document.getElementById("turnstile-widget");
    if (!container || container.dataset.rendered === "true") return;

    window.turnstile.render(container, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token) => onTokenChange(token),
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => onTokenChange("")
    });

    container.dataset.rendered = "true";
  }, [onTokenChange, siteKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      <div id="turnstile-widget" className="mt-4" />
    </>
  );
}
