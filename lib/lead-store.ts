import { put } from "@vercel/blob";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

export type StoredLead = {
  source: string;
  createdAt: string;
  ip: string;
  userAgent: string;
  payload: {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
};

const dataDir = path.join(process.cwd(), "data");
const leadFile = path.join(dataDir, "inquiries.ndjson");

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "lead";
}

export async function storeLead(lead: StoredLead) {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    const dateSegment = lead.createdAt.slice(0, 10);
    const timestampSegment = lead.createdAt.replace(/[:.]/g, "-");
    const emailSegment = sanitizeSegment(lead.payload.email);

    await put(
      `inquiries/${dateSegment}/${timestampSegment}-${emailSegment}.json`,
      JSON.stringify(lead, null, 2),
      {
        access: "private",
        contentType: "application/json",
        token: blobToken,
      },
    );
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Lead storage is not configured for production.");
  }

  await mkdir(dataDir, { recursive: true });
  await appendFile(leadFile, `${JSON.stringify(lead)}\n`, "utf8");
}
