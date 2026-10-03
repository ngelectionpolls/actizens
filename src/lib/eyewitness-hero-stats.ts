import {
  POLLING_UNITS, REPORTERS_PER_UNIT, NATIONAL_POLLING_UNITS, formatCount,
} from "./eyewitness-coverage";
import { formatCoveragePercentage, type ReporterCoverage } from "./reporter-coverage";

export interface EyewitnessHeroStat {
  id: "profiles" | "states" | "needed" | "filled" | "pollingUnits";
  value: string;
  label: string;
  hint: string;
}

/** Staffing targets, not verified reporting or proof of covered polling units. */
export function eyewitnessHeroStats(coverage: ReporterCoverage | null): EyewitnessHeroStat[] {
  const statesWithProfiles = coverage
    ? Object.values(coverage.states).filter((state) => state.registered > 0).length
    : null;
  // Extra profiles in one state cannot fill a staffing shortfall in another.
  const remaining = coverage
    ? Object.entries(POLLING_UNITS).reduce((total, [id, units]) =>
        total + Math.max(0, units * REPORTERS_PER_UNIT - coverage.states[id].registered), 0)
    : null;
  return [
    {
      id: "profiles",
      value: coverage ? formatCount(coverage.totalRegistered) : "—",
      label: "Completed Reporter Profiles",
      hint: "Eyewitness profiles with completed biodata and matched coverage locations; not every sign-up or verified reporters.",
    },
    {
      id: "states",
      value: statesWithProfiles !== null ? `${statesWithProfiles} / ${Object.keys(POLLING_UNITS).length}` : "—",
      label: "States & FCT With Profiles",
      hint: "Jurisdictions with at least one counted profile. This does not mean every polling unit in those states has a reporter.",
    },
    {
      id: "needed",
      value: remaining !== null ? formatCount(remaining) : "—",
      label: "Reporters Still Needed",
      hint: "Remaining five-reporters-per-polling-unit staffing target, summed across states. Surplus profiles in one state do not offset another state's shortfall.",
    },
    {
      id: "filled",
      value: coverage ? formatCoveragePercentage(coverage.percentage) : "—",
      label: "Coverage Target Filled",
      hint: "Completed matched profiles divided by the national reporter staffing target. This is not measured election-day coverage.",
    },
    {
      id: "pollingUnits",
      value: formatCount(NATIONAL_POLLING_UNITS),
      label: "Polling Units to Cover",
      hint: "Fixed 176,846-unit target from the INEC IReV-derived registry, not a live count of covered polling units.",
    },
  ];
}