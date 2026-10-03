import { NextResponse } from "next/server";
import { parseReporterCoverage, REPORTER_COVERAGE_SOURCE } from "@/lib/reporter-coverage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(REPORTER_COVERAGE_SOURCE, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Coverage source returned ${response.status}`);
    const coverage = parseReporterCoverage(await response.json());
    return NextResponse.json(coverage, { headers: { "Cache-Control": "no-store" } });
  } catch {
    // Source failures are not zero registrations. No raw upstream data is exposed.
    return NextResponse.json(
      { error: "NGelectionpolls coverage is temporarily unavailable. Please try again." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}