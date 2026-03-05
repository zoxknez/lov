"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function AnalyticsBeacon() {
  useReportWebVitals((metric) => {
    const payload = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating ?? "",
      delta: metric.delta
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/telemetry", payload);
      return;
    }

    void fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true
    });
  });

  return null;
}
