"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, MapPin, Users, Target, Info } from "lucide-react";
import type { StateMapData } from "@/components/NigeriaMapHome";
import { AnimateIn } from "@/components/AnimateIn";
import { useReporterCoverage } from "@/hooks/useReporterCoverage";
import { formatCoveragePercentage, REPORTER_COVERAGE_SOURCE } from "@/lib/reporter-coverage";
import {
  POLLING_UNITS, STATE_NAMES, REPORTERS_PER_UNIT,
  NATIONAL_POLLING_UNITS, NATIONAL_REPORTERS_REQUIRED, formatCount,
} from "@/lib/eyewitness-coverage";

const NigeriaMap = dynamic(() => import("@/components/NigeriaMapHome"), {
  ssr: false,
  loading: () => <div className="h-[480px] w-full animate-pulse rounded-3xl bg-white/5" />,
});

const sortedStates = Object.keys(POLLING_UNITS).sort((a, b) =>
  STATE_NAMES[a].localeCompare(STATE_NAMES[b])
);

interface CoverageSectionProps {
  title?: string;
  sectionId?: string;
  initialStateId?: string;
}

export function EyewitnessCoverageSection({
  title = "Eyewitness Reporter Coverage",
  sectionId = "state",
  initialStateId = "lagos",
}: CoverageSectionProps = {}): JSX.Element {
  const [selectedId, setSelectedId] = useState(initialStateId);
  const headingId = `${sectionId}-coverage-heading`;
  const selectorId = `${sectionId}-coverage-state`;
  const { coverage, error, loading, retry } = useReporterCoverage();
  const unavailable = loading ? "Loading…" : "Unavailable";
  const selectedUnits = POLLING_UNITS[selectedId];
  const selectedName = selectedId === "fct" ? "Federal Capital Territory" : `${STATE_NAMES[selectedId]} State`;

  const selectState = (state: StateMapData) => setSelectedId(state.id.replace(/\s/g, ""));

  return (
    <section id={sectionId} aria-labelledby={headingId}
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
      style={{ background: "linear-gradient(160deg, #071410 0%, #0a1f18 50%, #071209 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,90,53,0.14) 0%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1400px]">
        <AnimateIn direction="up">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">
              <MapPin className="h-3.5 w-3.5" /> Interactive Map
            </span>
            <h2 id={headingId} className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#a5c4a8]">
               Five Eyewitness Reporters needed at every polling unit. Select a state to see its target and completed eyewitness profile count.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn direction="up" delay={80}>
          <div className="mb-8 overflow-hidden rounded-3xl p-6 sm:p-8"
            style={{ background: "linear-gradient(135deg, #071a0e, #0b5a35 60%, #083d25)", border: "1px solid rgba(74,222,128,0.13)" }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">Nationwide coverage target</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Polling units", value: formatCount(NATIONAL_POLLING_UNITS) },
                { label: "Reporters per unit", value: String(REPORTERS_PER_UNIT) },
                { label: "Reporters required", value: formatCount(NATIONAL_REPORTERS_REQUIRED) },
                 { label: "Completed eyewitness profiles", value: coverage ? formatCount(coverage.totalRegistered) : "—", hint: coverage ? "With matched coverage locations" : unavailable },
              ].map(({ label, value, hint }) => (
                <div key={label} className="border-t border-white/15 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#a5c4a8]">{label}</p>
                  <p className="mt-1 text-2xl font-black tabular-nums text-white sm:text-3xl">{value}</p>
                  {hint && <p className="text-xs text-[#a5c4a8]">{hint}</p>}
                </div>
              ))}
            </div>
             <p className="mt-5 text-xs text-[#a5c4a8]">Nationwide percentage filled: <strong className="text-white">{coverage ? formatCoveragePercentage(coverage.percentage) : "—"}</strong></p>
             <div role={error ? "alert" : "status"} className="mt-3 text-xs text-[#a5c4a8]">
               {error ? (
                 <span>Coverage data is temporarily unavailable—not zero registrations.{" "}
                   <button type="button" onClick={retry} className="font-bold text-white underline focus:outline-none focus:ring-2 focus:ring-[#4ade80]">Try again</button>
                 </span>
               ) : coverage ? (
                 <span>Last checked: {new Date(coverage.fetchedAt).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}. Checks automatically every minute.</span>
               ) : "Loading live coverage from NGelectionpolls…"}
             </div>
          </div>
        </AnimateIn>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            {/* Do not horizontally animate the SVG: translation clips the map outline. */}
             <NigeriaMap mode="reporters" reporterCoverage={coverage} selectedStateId={selectedId} onSelectState={selectState} />
            <div className="mt-2 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-[#a5c4a8]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#4ade80]" />
               {coverage ? "Colour shows the percentage of the reporter target filled. Hover or click to explore completed profiles and staffing targets." : "Counts are loading or unavailable. Uniform green does not indicate coverage."}
            </div>
             {coverage && <div aria-label="Reporter coverage colour legend" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-[#a5c4a8]">
               {[
                 ["#E0E0E0", "0%"], ["#FF9800", "Below 25%"], ["#FFC107", "25–49%"],
                 ["#4CAF50", "50–74%"], ["#2E7D32", "75–99%"], ["#0B6B3A", "100%+"],
               ].map(([color, label]) => <span key={label} className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />{label}</span>)}
             </div>}
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl p-6"
              style={{ background: "linear-gradient(135deg, #061a0e, #0b5a35)", border: "1px solid rgba(74,222,128,0.15)" }}>
              <label htmlFor={selectorId} className="text-[10px] font-bold uppercase tracking-widest text-[#a5c4a8]">Select a state or FCT</label>
              <select id={selectorId} value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/20 bg-[#102a1b] px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]">
                {sortedStates.map((id) => <option key={id} value={id}>{STATE_NAMES[id]}</option>)}
              </select>
              <h3 className="mt-6 text-xl font-black text-white">{selectedName}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <MapPin className="mb-2 h-4 w-4 text-[#4ade80]" />
                  <p className="text-xl font-black tabular-nums text-white">{formatCount(selectedUnits)}</p>
                  <p className="text-[11px] text-[#a5c4a8]">Polling units</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Target className="mb-2 h-4 w-4 text-[#4ade80]" />
                  <p className="text-xl font-black tabular-nums text-white">{formatCount(selectedUnits * REPORTERS_PER_UNIT)}</p>
                  <p className="text-[11px] text-[#a5c4a8]">Reporters required</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Users className="mb-2 h-4 w-4 text-[#4ade80]" />
                   <p className="text-lg font-bold tabular-nums text-white">{coverage ? formatCount(coverage.states[selectedId].registered) : unavailable}</p>
                   <p className="text-[11px] text-[#a5c4a8]">Completed eyewitness profiles</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                   <p className="text-xl font-black tabular-nums text-white">{coverage ? formatCoveragePercentage(coverage.states[selectedId].percentage) : "—"}</p>
                  <p className="text-[11px] text-[#a5c4a8]">Percentage filled</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#a5c4a8]">
                 Fill percentage = completed eyewitness profiles with matched coverage locations ÷ required reporters × 100. This is not a count of every sign-up.
              </p>
            </div>
            <Link href="/how-it-works"
              className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0b5a35] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#15834f]">
              Learn how to participate <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <details className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03]">
          <summary className="cursor-pointer px-5 py-4 text-sm font-bold text-[#e8f5e9] focus:outline-none focus:ring-2 focus:ring-[#4ade80]">
             View coverage and targets for all 36 states and FCT
          </summary>
          <div className="max-h-[400px] overflow-auto border-t border-white/10">
            <table className="w-full min-w-[560px] text-left text-xs text-[#e8f5e9]">
              <thead className="sticky top-0 bg-[#10271a] text-[#a5c4a8]">
                 <tr><th className="p-3">State</th><th className="p-3">Polling units</th><th className="p-3">Reporters required</th><th className="p-3">Completed profiles</th><th className="p-3">Filled</th></tr>
              </thead>
              <tbody>
                {sortedStates.map((id) => (
                  <tr key={id} className="border-t border-white/5">
                    <th scope="row" className="p-3">{STATE_NAMES[id]}</th>
                    <td className="p-3 tabular-nums">{formatCount(POLLING_UNITS[id])}</td>
                    <td className="p-3 tabular-nums">{formatCount(POLLING_UNITS[id] * REPORTERS_PER_UNIT)}</td>
                     <td className="p-3 tabular-nums text-[#a5c4a8]">{coverage ? formatCount(coverage.states[id].registered) : unavailable}</td>
                     <td className="p-3 tabular-nums text-[#a5c4a8]">{coverage ? formatCoveragePercentage(coverage.states[id].percentage) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <p className="mt-4 text-[11px] leading-relaxed text-[#a5c4a8]">
          Polling-unit targets: <a className="underline hover:text-white" href="https://github.com/Emeka-Onwuepe/Polling_Units_in_Nigeria" target="_blank" rel="noopener noreferrer">INEC IReV-derived 176,846-unit dataset</a>.
           {" "}Live counts: <a className="underline hover:text-white" href={REPORTER_COVERAGE_SOURCE} target="_blank" rel="noopener noreferrer">NGelectionpolls coverage API</a>.
           {" "}Only eyewitness accounts with completed biodata and matched state, LGA and ward locations are counted. The source does not apply an active-status or email-verification filter.
           No counts or percentages are estimated; no personal records are retrieved.
        </p>
      </div>
    </section>
  );
}