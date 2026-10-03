import { NextResponse } from "next/server";
import {
  parseRecentEyewitnessRegistrations, RECENT_EYEWITNESS_SOURCE,
} from "@/lib/recent-eyewitness-registrations";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(RECENT_EYEWITNESS_SOURCE, {
      cache: "no-store",
      redirect: "error",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("Registration feed unavailable");
    const feed = parseRecentEyewitnessRegistrations(await response.json());
    return NextResponse.json(feed, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { error: "Recent eyewitness registrations are temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}