import type { MetadataRoute } from "next";
import { getBlobAssetUrl } from "@/lib/blob-asset";

const logoAssetUrl = getBlobAssetUrl("/media/logo.png");

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
        src: logoAssetUrl,
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: logoAssetUrl,
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
