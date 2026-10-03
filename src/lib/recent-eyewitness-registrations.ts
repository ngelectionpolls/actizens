import { POLLING_UNITS, STATE_NAMES } from "./eyewitness-coverage";

export const RECENT_EYEWITNESS_SOURCE =
  "https://www.ngelectionpolls.org/api/recent-eyewitness-registrations";
export const RECENT_EYEWITNESS_LIMIT = 15;

export interface EyewitnessRegistration {
  firstName: string;
  lastInitial: string;
  state: string;
  registeredAt: string;
}

export interface RecentRegistrationFeed {
  schemaVersion: 1;
  registrations: EyewitnessRegistration[];
  fetchedAt: string;
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid registration feed");
  }
  return value as Record<string, unknown>;
}

/** Return only the fields approved for public display, never arbitrary profile data. */
export function parseRecentEyewitnessRegistrations(
  input: unknown,
  now = Date.now(),
): RecentRegistrationFeed {
  const data = object(input);
  if (data.schemaVersion !== 1 || !Array.isArray(data.registrations) ||
      data.registrations.length > RECENT_EYEWITNESS_LIMIT) {
    throw new Error("Invalid registration feed");
  }
  const registrations = data.registrations.map((entry): EyewitnessRegistration => {
    const row = object(entry);
    if (typeof row.firstName !== "string" || !row.firstName.trim() ||
        row.firstName.length > 80 || /[<>@\u0000-\u001f]/.test(row.firstName) ||
        typeof row.lastInitial !== "string" || !/^\p{L}?$/u.test(row.lastInitial) ||
        typeof row.state !== "string" || typeof row.registeredAt !== "string") {
      throw new Error("Invalid public registration fields");
    }
    const stateId = row.state.toLowerCase()
      .replace(/federal capital territory|fct(?: abuja)?|abuja/gi, "fct")
      .replace(/nassarawa/gi, "nasarawa")
      .replace(/\bstate\b/gi, "").replace(/\s/g, "");
    if (!Object.hasOwn(POLLING_UNITS, stateId)) throw new Error("Unknown assigned state");
    const timestamp = Date.parse(row.registeredAt);
    if (!Number.isFinite(timestamp) || timestamp > now + 60_000 ||
        new Date(timestamp).toISOString() !== row.registeredAt) {
      throw new Error("Invalid registration time");
    }
    return {
      firstName: row.firstName.trim().replace(/\s+/g, " "),
      lastInitial: row.lastInitial,
      state: stateId === "fct" ? "FCT" : STATE_NAMES[stateId],
      registeredAt: row.registeredAt,
    };
  }).sort((a, b) => Date.parse(b.registeredAt) - Date.parse(a.registeredAt));
  return { schemaVersion: 1, registrations, fetchedAt: new Date(now).toISOString() };
}

export function registrationTimeLabel(registeredAt: string, now: number): string {
  const minutes = Math.floor(Math.max(0, now - Date.parse(registeredAt)) / 60_000);
  if (minutes === 0) return "Just now";
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}

export function registrationDateLabel(registeredAt: string): string {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos",
  }).format(new Date(registeredAt)) + " WAT";
}