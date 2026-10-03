"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { useReporterCoverage } from "@/hooks/useReporterCoverage";
import { STATE_NAMES, formatCount } from "@/lib/eyewitness-coverage";
import { formatCoveragePercentage } from "@/lib/reporter-coverage";
import type { StateMapData } from "@/components/NigeriaMapHome";

const NigeriaMap = dynamic(() => import("@/components/NigeriaMapHome"), {
  ssr: false,
  loading: () => (
    <div className="h-[440px] w-full animate-pulse rounded-3xl"
      style={{ background: "linear-gradient(135deg, rgba(11,90,53,0.15), rgba(11,90,53,0.08))" }} />
  ),
});

const stateIds = Object.keys(STATE_NAMES).sort((a, b) => STATE_NAMES[a].localeCompare(STATE_NAMES[b]));

export function EyewitnessReporterMap() {
  const [selectedState, setSelectedState] = useState("lagos");
  const { coverage, error, loading, retry } = useReporterCoverage();
  const selectedCoverage = coverage?.states[selectedState];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl"
      style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.50), 0 0 0 1px rgba(74,222,128,0.08)", background: "rgba(8,16,12,0.80)" }}>
      <div className="px-4 pt-4">
        <h3 className="text-base font-bold text-[#e8f5e9]">Eyewitness Reporter Coverage</h3>
        <label htmlFor="award-reporter-state" className="mt-3 block text-xs font-semibold text-white/75">
          Registered eyewitness reporters by state
        </label>
        <select id="award-reporter-state" value={selectedState}
          onChange={(event) => setSelectedState(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#10271a] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]">
          {stateIds.map((id) => (
            <option key={id} value={id}>
              {STATE_NAMES[id]} — {coverage ? formatCount(coverage.states[id].registered) : "—"} reporters
            </option>
          ))}
        </select>
        <div className="mt-3 text-sm text-white" aria-live="polite">
          <p className="font-semibold">
            {STATE_NAMES[selectedState]}:{" "}
            {selectedCoverage ? `${formatCount(selectedCoverage.registered)} registered eyewitness reporters` : loading ? "Loading…" : "Unavailable"}
          </p>
          {selectedCoverage && (
            <p className="mt-1 text-xs text-[#a5c4a8]">
              {formatCoveragePercentage(selectedCoverage.percentage)} of the reporter target filled
            </p>
          )}
        </div>
        {error ? (
          <p role="alert" className="mt-3 text-xs text-white/75">
            Live reporter counts are unavailable—not zero.{" "}
            <button type="button" onClick={retry}
              className="font-bold text-[#4ade80] underline focus:outline-none focus:ring-2 focus:ring-[#4ade80]">
              Try again
            </button>
          </p>
        ) : loading && !coverage ? (
          <p role="status" className="mt-3 text-xs text-white/75">Loading live eyewitness reporter counts…</p>
        ) : null}
      </div>
      <NigeriaMap
        selectedStateId={selectedState}
        onSelectState={(state: StateMapData) => setSelectedState(state.id)}
        mode="reporters"
        reporterCoverage={coverage}
      />
      <div className="flex items-start gap-3 rounded-b-3xl px-4 py-3"
        style={{ background: "rgba(6,13,9,0.75)", borderTop: "1px solid rgba(74,222,128,0.10)" }}>
        <MapPin className="h-4 w-4 shrink-0 text-[#fea309]" />
        <div className="text-xs text-white/75">
          <p className="font-semibold">Hover or select a state to see eyewitness reporter coverage across all 36 states &amp; FCT.</p>
          <p className="mt-2 text-white/50">
            Counts include completed eyewitness profiles with matched coverage locations, not every sign-up. Updates every minute.
          </p>
        </div>
      </div>
    </div>
  );
}