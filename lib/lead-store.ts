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
    targetSpecies: string;
    message: string;
    preferredMonth: string;
    groupSize: string;
    accommodation: string;
    transferMode: string;
    programLength: string;
    budgetBand: string;
  };
};

const dataDir = path.join(process.cwd(), "data");
const leadFile = path.join(dataDir, "inquiries.ndjson");

export async function storeLead(lead: StoredLead) {
  await mkdir(dataDir, { recursive: true });
  await appendFile(leadFile, `${JSON.stringify(lead)}\n`, "utf8");
}
