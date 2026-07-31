import { NextResponse } from "next/server";

/**
 * GET /api/stats/summary
 *
 * Returns live platform summary statistics for the hero stats bar.
 *
 * TODO: Replace the hardcoded values below with real database queries, e.g.:
 *   const totalRaised  = await db.donations.aggregate({ _sum: { amount: true } });
 *   const citizens     = await db.users.count({ where: { role: "citizen" } });
 *   const reporters    = await db.users.count({ where: { role: "reporter", verified: true } });
 *   const electionDate = new Date("2027-01-16");
 *   const daysLeft     = Math.ceil((electionDate.getTime() - Date.now()) / 86_400_000);
 */
export async function GET() {
  // TODO: derive from DB — see comment above
  const ELECTION_DATE = new Date("2027-01-16T00:00:00Z");
  const daysToElection = Math.max(
    0,
    Math.ceil((ELECTION_DATE.getTime() - Date.now()) / 86_400_000)
  );

  const stats = {
    totalRaisedNaira: 638_420_000, // TODO: sum from donations table
    registeredCitizens: 8_960,     // TODO: count from users table
    verifiedReporters: 2_400,      // TODO: count from reporters table
    statesAndFct: 37,              // TODO: count from states table
    daysToElection,                // calculated from election date constant above
  };

  return NextResponse.json(stats);
}
