"use client";

import React, { useEffect, useState } from "react";
import {
  Users, UserCheck, Building, MapPin, Trophy, ArrowRight, ShieldAlert,
} from "lucide-react";
import { ActiveCitizensHeroSection } from "./sections/ActiveCitizensHeroSection/ActiveCitizensHeroSection";
import type { TickerDonation } from "./sections/ActiveCitizensHeroSection/ActiveCitizensHeroSection";
import { AwardOverviewSection } from "./sections/AwardOverviewSection/AwardOverviewSection";
import { DemocracyImpactMetricsSection } from "./sections/DemocracyImpactMetricsSection/DemocracyImpactMetricsSection";
import { MainNavigationSection } from "./sections/MainNavigationSection/MainNavigationSection";
import { ParticipationStepsSection } from "./sections/ParticipationStepsSection/ParticipationStepsSection";
import { PartnersSection } from "./sections/PartnersSection/PartnersSection";
import { ReportVerificationSection } from "./sections/ReportVerificationSection/ReportVerificationSection";
import { ReportingAndPrizesSection } from "./sections/ReportingAndPrizesSection/ReportingAndPrizesSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { StateDonationProgressSection } from "./sections/StateDonationProgressSection/StateDonationProgressSection";

interface SummaryStats {
  totalRaisedNaira: number;
  registeredCitizens: number;
  verifiedReporters: number;
  statesAndFct: number;
  daysToElection: number;
}

export const Asif = (): JSX.Element => {
  const [stats, setStats] = useState<SummaryStats | null>(null);
  const [tickerDonations, setTickerDonations] = useState<TickerDonation[]>([]);

  useEffect(() => {
    fetch("/api/stats/summary")
      .then((r) => r.json())
      .then((data: SummaryStats) => setStats(data))
      .catch((err) => console.error("[Asif] failed to load stats:", err));

    const loadDonations = () =>
      fetch("/api/donations/recent?limit=15")
        .then((r) => r.json())
        .then((data: { donations: TickerDonation[] }) => setTickerDonations(data.donations))
        .catch((err) => console.error("[Asif] failed to load ticker donations:", err));

    loadDonations();
    const interval = setInterval(loadDonations, 30_000);
    return () => clearInterval(interval);
  }, []);

  const bottomStats = stats
    ? [
        { icon: Building,  value: `₦ ${stats.totalRaisedNaira.toLocaleString("en-NG")}`, label: "Raised Till Date" },
        { icon: Users,     value: stats.registeredCitizens.toLocaleString("en-NG"),       label: "Registered Citizens" },
        { icon: UserCheck, value: stats.verifiedReporters.toLocaleString("en-NG"),        label: "Verified Reporters" },
        { icon: MapPin,    value: String(stats.statesAndFct),                             label: "States & FCT" },
        { icon: Trophy,    value: String(stats.daysToElection),                           label: "Days To Election" },
      ]
    : [];

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
          description="20 active citizens in each polling unit. One mission: to observe, report, and protect the integrity of our elections. Your action. Our democracy."
          primaryButton={{ label: "Register to Participate", icon: ShieldAlert, onClick: () => {} }}
          secondaryButton={{ label: "Support a State", icon: ArrowRight, onClick: () => {} }}
          bottomStats={bottomStats}
          tickerDonations={tickerDonations}
        />

        {/* 2 ── State map — hunter-green-black */}
        <StateDonationProgressSection />

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
