"use client";

import React from "react";
import {
  Users, Globe2, UserPlus, Target, MapPin, ShieldAlert,
} from "lucide-react";
import { useReporterCoverage } from "@/hooks/useReporterCoverage";
import { eyewitnessHeroStats } from "@/lib/eyewitness-hero-stats";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";
import { ActiveCitizensHeroSection } from "./sections/ActiveCitizensHeroSection/ActiveCitizensHeroSection";
import { AwardOverviewSection } from "./sections/AwardOverviewSection/AwardOverviewSection";
import { DemocracyImpactMetricsSection } from "./sections/DemocracyImpactMetricsSection/DemocracyImpactMetricsSection";
import { MainNavigationSection } from "./sections/MainNavigationSection/MainNavigationSection";
import { ParticipationStepsSection } from "./sections/ParticipationStepsSection/ParticipationStepsSection";
import { PartnersSection } from "./sections/PartnersSection/PartnersSection";
import { ReportVerificationSection } from "./sections/ReportVerificationSection/ReportVerificationSection";
import { ReportingAndPrizesSection } from "./sections/ReportingAndPrizesSection/ReportingAndPrizesSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { EyewitnessCoverageSection } from "./sections/EyewitnessCoverageSection/EyewitnessCoverageSection";

const heroStatIcons = {
  profiles: Users, states: Globe2, needed: UserPlus, filled: Target, pollingUnits: MapPin,
};

export const Asif = (): JSX.Element => {
  const { coverage, error, loading, retry } = useReporterCoverage();
  const bottomStats = eyewitnessHeroStats(coverage).map((stat) => ({
    ...stat, icon: heroStatIcons[stat.id],
  }));

  return (
    /* ── Root: deep forest black — the "canvas" every section paints onto ── */
    <div className="min-h-screen w-full font-sans antialiased" style={{ background: "#060d09" }}>
      <MainNavigationSection activePage="Home" />

      <main>
        {/* 1 ── Hero — deep forest black → emerald-black */}
        <ActiveCitizensHeroSection
          badge={{ label: "Active Citizens Hero Award" }}
          title={
            <>
              Protect Democracy.<br />
              Become an <br />
              <span className="text-[#4ade80]">Active Citizens Heros.</span>
            </>
          }
          description="5 active citizens in each polling unit. One mission: to observe, report, and protect the integrity of our elections. Your action. Our democracy."
          primaryButton={{ label: "Register to Participate", icon: ShieldAlert, href: NGELECTIONPOLLS_SIGNUP_URL }}
          secondaryButton={{ label: "Donate", onClick: () => {} }}
          bottomStats={bottomStats}
          bottomStatsNote={
            <span role={error ? "alert" : "status"}>
              {error ? (
                <>Live reporter statistics are unavailable—not zero.{" "}
                  <button type="button" onClick={retry} className="font-bold text-white underline focus:outline-none focus:ring-2 focus:ring-[#4ade80]">Try again</button>
                </>
              ) : coverage ? (
                <>NGelectionpolls · Completed profiles with matched coverage locations · Five reporters per polling unit · Stats refresh every minute</>
              ) : loading ? "Loading live eyewitness reporter statistics…" : "Live reporter statistics are unavailable."}
            </span>
          }
        />

        {/* 2 ── Eyewitness reporter coverage map */}
        <EyewitnessCoverageSection />

        {/* 3 ── About the Award — obsidian-green: dark section wrapper */}
        <section
          className="relative w-full overflow-hidden px-4 py-14 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #090f0b 0%, #0c1a10 50%, #080d09 100%)" }}
        >
          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#0b5a35]/12 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#fea309]/5 blur-3xl" />
          {/* Subtle grid */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, #4ade80 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#4ade80]/15 bg-[#4ade80]/6 px-3.5 py-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]/80">About The Award</span>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px_1fr] lg:gap-14 lg:items-start">
              <AwardOverviewSection />
              <ParticipationStepsSection />
            </div>
          </div>
        </section>

        {/* 4 ── Reporting & Prizes — deep navy-black */}
        <ReportingAndPrizesSection />

        {/* 5 ── Verification — deep indigo-black */}
        <ReportVerificationSection />

        {/* 6 ── Impact Metrics — forest-emerald */}
        <DemocracyImpactMetricsSection />

        {/* 7 ── Partners — midnight-slate */}
        <PartnersSection />
      </main>

      <SiteFooterSection />
    </div>
  );
};

export default Asif;
