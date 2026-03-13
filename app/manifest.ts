import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kaimanawa Trophy Safaris",
    short_name: "KAIMANAWA",
    description: "Guided New Zealand hunting programs across bush country and alpine terrain.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3eb",
    theme_color: "#f7f3eb",
    icons: [
      {
        src: "/brand-logo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand-logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
