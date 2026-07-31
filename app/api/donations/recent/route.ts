import { NextResponse } from "next/server";

/**
 * GET /api/donations/recent
 *
 * Returns the most-recent donations for the live ticker and state donation panel.
 *
 * Query params:
 *   limit  – max number of records to return (default 10)
 *   state  – optional state slug to filter by (e.g. "lagos")
 *
 * TODO: Replace the hardcoded array below with a real database query, e.g.:
 *   const rows = await db.donations.findMany({
 *     where:   state ? { state: { slug: state } } : undefined,
 *     orderBy: { createdAt: "desc" },
 *     take:    limit,
 *     select:  { donorName: true, amountNaira: true, state: { select: { name: true } }, createdAt: true },
 *   });
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? "10"), 50);
  const stateFilter = searchParams.get("state")?.toLowerCase();

  // TODO: replace with DB query — see comment above
  const ALL_DONATIONS: Array<{
    donor: string;
    amountNaira: number;
    state: string;      // Nigerian state (for DB filtering)
    location: string;   // Display label: state name for NG donors, country for diaspora
    isDiaspora: boolean;
    timeLabel: string;
  }> = [
    { donor: "Anonymous",   amountNaira: 20_000,    state: "Kaduna",  location: "Kaduna",        isDiaspora: false, timeLabel: "2 mins ago" },
    { donor: "John A.",     amountNaira: 500_000,   state: "Lagos",   location: "Lagos",          isDiaspora: false, timeLabel: "5 mins ago" },
    { donor: "Anonymous",   amountNaira: 20_000,    state: "Enugu",   location: "Enugu",          isDiaspora: false, timeLabel: "8 mins ago" },
    { donor: "Chidi O.",    amountNaira: 100_000,   state: "Anambra", location: "Anambra",        isDiaspora: false, timeLabel: "12 mins ago" },
    { donor: "Fatima A.",   amountNaira: 250_000,   state: "Kano",    location: "Kano",           isDiaspora: false, timeLabel: "18 mins ago" },
    { donor: "Anonymous",   amountNaira: 50_000,    state: "Rivers",  location: "Rivers",         isDiaspora: false, timeLabel: "25 mins ago" },
    { donor: "Tunde B.",    amountNaira: 1_000_000, state: "Lagos",   location: "Lagos",          isDiaspora: false, timeLabel: "31 mins ago" },
    { donor: "Emeka N.",    amountNaira: 200_000,   state: "Imo",     location: "Imo",            isDiaspora: false, timeLabel: "38 mins ago" },
    { donor: "Sarah M.",    amountNaira: 750_000,   state: "",        location: "United Kingdom", isDiaspora: true,  timeLabel: "42 mins ago" },
    { donor: "Anonymous",   amountNaira: 30_000,    state: "Benue",   location: "Benue",          isDiaspora: false, timeLabel: "49 mins ago" },
    { donor: "Amaka C.",    amountNaira: 500_000,   state: "",        location: "United States",  isDiaspora: true,  timeLabel: "55 mins ago" },
    { donor: "Yusuf M.",    amountNaira: 80_000,    state: "Sokoto",  location: "Sokoto",         isDiaspora: false, timeLabel: "1 hr ago" },
    { donor: "Anonymous",   amountNaira: 150_000,   state: "",        location: "Canada",         isDiaspora: true,  timeLabel: "1 hr ago" },
    { donor: "Grace E.",    amountNaira: 100_000,   state: "Delta",   location: "Delta",          isDiaspora: false, timeLabel: "1 hr ago" },
    { donor: "Anonymous",   amountNaira: 20_000,    state: "Oyo",     location: "Oyo",            isDiaspora: false, timeLabel: "2 hrs ago" },
  ];

  const filtered = stateFilter
    ? ALL_DONATIONS.filter((d) => d.state.toLowerCase() === stateFilter)
    : ALL_DONATIONS;

  const records = filtered.slice(0, limit).map((d) => ({
    donor: d.donor,
    amount: `₦${d.amountNaira.toLocaleString("en-NG")}`,
    state: d.state,
    location: d.location,
    isDiaspora: d.isDiaspora,
    timeLabel: d.timeLabel,
  }));

  return NextResponse.json({ donations: records });
}
