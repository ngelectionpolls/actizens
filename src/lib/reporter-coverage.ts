import { POLLING_UNITS, REPORTERS_PER_UNIT, NATIONAL_REPORTERS_REQUIRED } from "./eyewitness-coverage";

export const REPORTER_COVERAGE_SOURCE = "https://www.ngelectionpolls.org/api/reporter-coverage";

export interface ReporterCoverage {
  totalRegistered: number;
  percentage: number;
  states: Record<string, { registered: number; percentage: number }>;
  fetchedAt: string;
}

export const reporterPercentage = (registered: number, required: number) =>
  required > 0 ? (registered / required) * 100 : 0;

export const formatCoveragePercentage = (percentage: number) =>
  `${percentage.toLocaleString("en-NG", { maximumFractionDigits: 4 })}%`;

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid coverage response");
  }
  return value as Record<string, unknown>;
}

function count(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error("Invalid registration count");
  }
  return value;
}

/** Only project aggregate fields; never relay arbitrary upstream data to the browser. */
export function parseReporterCoverage(input: unknown, fetchedAt = new Date().toISOString()): ReporterCoverage {
  const data = object(input);
  const scope = object(data.scope);
  const stateIds = Object.keys(POLLING_UNITS);
  if (data.level !== "national" || !Array.isArray(data.children) || data.children.length !== stateIds.length) {
    throw new Error("Incomplete national coverage response");
  }
  const states: ReporterCoverage["states"] = {};
  for (const entry of data.children) {
    const state = object(entry);
    if (typeof state.name !== "string") throw new Error("Missing state name");
    const id = state.name.toLowerCase()
      .replace(/federal capital territory|fct(?: abuja)?|abuja/gi, "fct")
      .replace(/nassarawa/gi, "nasarawa")
      .replace(/\bstate\b/gi, "")
      .replace(/\s/g, "");
    if (!Object.hasOwn(POLLING_UNITS, id) || Object.hasOwn(states, id)) {
      throw new Error("Unknown or duplicate state");
    }
    const required = POLLING_UNITS[id] * REPORTERS_PER_UNIT;
    if (count(state.reportersNeeded) !== required || count(state.pus) !== POLLING_UNITS[id]) {
      throw new Error("Coverage targets do not match polling-unit registry");
    }
    const registered = count(state.reportersRegistered);
    states[id] = { registered, percentage: reporterPercentage(registered, required) };
  }
  const totalRegistered = Object.values(states).reduce((total, state) => total + state.registered, 0);
  if (count(scope.reportersRegistered) !== totalRegistered ||
      count(scope.reportersNeeded) !== NATIONAL_REPORTERS_REQUIRED) {
    throw new Error("Inconsistent national coverage totals");
  }
  return {
    totalRegistered,
    percentage: reporterPercentage(totalRegistered, NATIONAL_REPORTERS_REQUIRED),
    states,
    fetchedAt,
  };
}