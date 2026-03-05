import { appendFile, mkdir } from "fs/promises";
import path from "path";

export type StoredLead = {
  source: string;
  createdAt: string;
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

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "inquiries.ndjson");

export async function storeLead(lead: StoredLead) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(LEADS_FILE, `${JSON.stringify(lead)}\n`, "utf8");
}
