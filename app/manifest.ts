import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KAIMANAWA Premium Hunts",
    short_name: "KAIMANAWA",
    description: "Premium New Zealand trophy hunting experience platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#050806",
    theme_color: "#050806",
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
