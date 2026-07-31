"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin, TrendingUp, Target, Heart, ArrowRight,
  CheckCircle2, Zap, Users, Activity,
} from "lucide-react";
import type { StateMapData } from "../../../../components/NigeriaMapHome";
import { DonationModal } from "../../../../components/DonationModal";
import { AnimateIn } from "@/components/AnimateIn";

const NigeriaMap = dynamic(() => import("../../../../components/NigeriaMapHome"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] w-full animate-pulse rounded-3xl"
      style={{ background: "linear-gradient(135deg, rgba(11,90,53,0.15), rgba(11,90,53,0.08))" }} />
  ),
});

const STATE_FUNDING_MAP: Record<string, number> = {
  lagos: 100, fct: 97, "federal capital territory": 97, rivers: 93,
  oyo: 91, enugu: 82, edo: 79, ogun: 75, delta: 70, osun: 68, imo: 60,
  sokoto: 100, kebbi: 100, zamfara: 85, katsina: 100, kano: 100,
  jigawa: 65, yobe: 30, borno: 15, bauchi: 100, gombe: 60, niger: 100,
  kaduna: 85, adamawa: 20, taraba: 45, plateau: 100, nasarawa: 65,
  benue: 100, kogi: 100, kwara: 100, ekiti: 100, ondo: 100,
  anambra: 100, ebonyi: 65, abia: 100, "cross river": 0, crossriver: 0,
  bayelsa: 100, "akwa ibom": 30, akwaibom: 30,
};

const fundingLevels = [
  { label: "Fully Funded", sub: "100%",    color: "#0B6B3A" },
  { label: "75 – 99%",     sub: "High",    color: "#2E7D32" },
  { label: "50 – 74%",     sub: "Mid",     color: "#4CAF50" },
  { label: "25 – 49%",     sub: "Growing", color: "#FFC107" },
  { label: "< 25%",        sub: "Early",   color: "#FF9800" },
  { label: "Not Funded",   sub: "0%",      color: "rgba(255,255,255,0.15)" },
];

function getTierLabel(pct: number): string {
  if (pct >= 100) return "Fully Funded";
  if (pct >= 75)  return "75 – 99%";
  if (pct >= 50)  return "50 – 74%";
  if (pct >= 25)  return "25 – 49%";
  if (pct > 0)    return "Early Stage";
  return "Not Funded";
}

function getTierColor(pct: number): string {
  if (pct >= 100) return "#0B6B3A";
  if (pct >= 75)  return "#2E7D32";
  if (pct >= 50)  return "#4CAF50";
  if (pct >= 25)  return "#FFC107";
  if (pct > 0)    return "#FF9800";
  return "rgba(255,255,255,0.20)";
}

const fullyFundedCount = Object.values(STATE_FUNDING_MAP).filter((v) => v >= 100).length;

interface RecentDonation { donor: string; amount: string; state: string; timeLabel: string; }

const AVATAR_COLORS = ["#0b5a35","#15834f","#1fb870","#f97316","#fea309","#3b82f6"];
const avatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export const StateDonationProgressSection = (): JSX.Element => {
  const [selectedState, setSelectedState] = useState<StateMapData>({
    id: "lagos", name: "Lagos State", percentage: STATE_FUNDING_MAP["lagos"] ?? 100, color: "#0B6B3A",
  });
  const [donations, setDonations] = useState<RecentDonation[]>([]);
  const [loadingDonations, setLoadingDonations] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoadingDonations(true);
    fetch(`/api/donations/recent?limit=4&state=${encodeURIComponent(selectedState.id)}`)
      .then((r) => r.json())
      .then((data: { donations: RecentDonation[] }) => setDonations(data.donations))
      .catch((err) => console.error("[StateDonationProgressSection]", err))
      .finally(() => setLoadingDonations(false));
  }, [selectedState.id]);

  const target = 35_000_000;
  const raised = Math.round((target * selectedState.percentage) / 100);
  const tierColor = getTierColor(selectedState.percentage);

  return (
    <section
      id="state"
      aria-labelledby="state-heading"
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 lg:px-10"
      style={{ background: "linear-gradient(160deg, #071410 0%, #0a1f18 50%, #071209 100%)" }}
    >
      {/* Hunter-green glow */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,90,53,0.14) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />
      {/* Fine mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <AnimateIn direction="left">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4ade80]/15 bg-[#4ade80]/6 px-3.5 py-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#4ade80]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]/75">Interactive Map</span>
              </div>
              <h2 id="state-heading" className="mt-2 text-2xl font-black tracking-tight text-[#e8f5e9] sm:text-3xl lg:text-4xl">
                Support Your State
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: "rgba(165,196,168,0.55)" }}>
                Click any state to view funding progress and make a donation.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn direction="right">
            <div className="flex items-center gap-3 rounded-2xl px-5 py-3"
              style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.14)" }}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(74,222,128,0.12)" }}>
                <CheckCircle2 className="h-5 w-5 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-xl font-black leading-none text-[#4ade80]">{fullyFundedCount}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(165,196,168,0.45)" }}>States Fully Funded</p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* ── Gross Total Fund Raised ── */}
        <AnimateIn direction="up" delay={80}>
          <div className="mb-8 overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 55%, #083d25 100%)",
              boxShadow: "0 0 60px rgba(11,90,53,0.28), 0 0 0 1px rgba(74,222,128,0.10)",
            }}>
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            <div className="relative grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 sm:items-center sm:gap-0 sm:divide-x"
              style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>

              {/* Main total */}
              <div className="sm:col-span-2 sm:pr-8">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(74,222,128,0.65)" }}>
                  Gross Total Fund Raised So Far
                </p>
                <div className="mt-1 flex items-end gap-3">
                  <span className="text-4xl font-black text-white sm:text-5xl">₦256,900,000</span>
                </div>
                <p className="mt-1.5 text-[11px]" style={{ color: "rgba(165,196,168,0.60)" }}>
                  Combined donations received across all 21 actively funded states & FCT
                </p>
                {/* Progress bar toward ₦1B goal */}
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(165,196,168,0.50)" }}>Progress toward ₦1.295 Billion goal (37 × ₦35M)</span>
                    <span className="text-[10px] font-bold text-[#4ade80]">19.8%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.10)" }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: "19.8%", background: "linear-gradient(90deg, #4ade80, #22c55e)" }} />
                  </div>
                </div>
              </div>

              {/* Side stats */}
              <div className="flex flex-row justify-around gap-4 sm:flex-col sm:justify-center sm:pl-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(74,222,128,0.55)" }}>States Funded</p>
                  <p className="mt-0.5 text-2xl font-black text-white">21 <span className="text-sm font-semibold text-white/50">/ 37</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(74,222,128,0.55)" }}>Avg. Per State</p>
                  <p className="mt-0.5 text-2xl font-black text-white">₦12.2<span className="text-sm font-semibold text-white/50">M</span></p>
                </div>
              </div>

            </div>
          </div>
        </AnimateIn>

        {/* Two-column: map + right panel */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px]">
          {/* Map */}
          <AnimateIn direction="left" delay={100}>
            <div className="flex items-start justify-center">
              <NigeriaMap selectedStateId={selectedState.id} onSelectState={setSelectedState} />
            </div>
          </AnimateIn>

          {/* Right panel */}
          <div className="flex flex-col gap-4 lg:pt-4">

            {/* State spotlight card */}
            <AnimateIn direction="right" delay={100}>
              <div className="relative overflow-hidden rounded-3xl p-6"
                style={{ background: "linear-gradient(135deg, #061a0e 0%, #0b5a35 100%)", boxShadow: "0 8px 40px rgba(11,90,53,0.40), 0 0 0 1px rgba(74,222,128,0.10)" }}>
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border-[20px]"
                  style={{ borderColor: "rgba(255,255,255,0.04)" }} />
                <div aria-hidden className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full"
                  style={{ background: "rgba(255,255,255,0.03)" }} />

                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.40)" }}>Selected State</p>
                      <h3 className="mt-0.5 text-xl font-black leading-tight text-white">{selectedState.name}</h3>
                    </div>
                    <span className="mt-0.5 shrink-0 rounded-xl px-2.5 py-1 text-[10px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: tierColor === "rgba(255,255,255,0.20)" ? "rgba(255,255,255,0.15)" : tierColor }}>
                      {getTierLabel(selectedState.percentage)}
                    </span>
                  </div>

                  {/* Percentage */}
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <span className="text-6xl font-black leading-none tracking-tight text-white">{selectedState.percentage}</span>
                      <span className="ml-1 text-2xl font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>%</span>
                      <p className="mt-1 text-[11px]" style={{ color: "rgba(165,196,168,0.40)" }}>of target reached</p>
                    </div>
                    {/* Ring */}
                    <div className="relative flex shrink-0 items-center justify-center rounded-full" style={{ height: 72, width: 72, background: "rgba(255,255,255,0.07)" }}>
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                        <circle cx="36" cy="36" r="28" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={`${Math.min(selectedState.percentage, 100) * 1.759} 175.9`}
                          style={{ transition: "stroke-dasharray 700ms cubic-bezier(0.22,1,0.36,1)" }} />
                      </svg>
                      <Activity className="h-5 w-5" style={{ color: "rgba(255,255,255,0.55)" }} />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <div className="h-full rounded-full transition-all duration-700 bg-white"
                        style={{ width: `${Math.min(selectedState.percentage, 100)}%` }}
                        role="progressbar" aria-valuenow={selectedState.percentage} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="mt-1.5 text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>
                      {selectedState.percentage >= 100 ? "🎉 Target fully reached!" : `${100 - selectedState.percentage}% still needed`}
                    </p>
                  </div>

                  {/* Raised / Target */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      { icon: TrendingUp, label: "Raised", value: `₦${raised.toLocaleString("en-NG")}` },
                      { icon: Target,    label: "Target", value: `₦${target.toLocaleString("en-NG")}` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-2xl px-3 py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.40)" }}>
                          <Icon className="h-3 w-3" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
                        </div>
                        <p className="mt-1 text-sm font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Legend */}
            <AnimateIn direction="right" delay={200}>
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.35)" }}>Funding Legend</p>
                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: "rgba(74,222,128,0.10)", color: "#4ade80" }}>6 tiers</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {fundingLevels.map((level) => (
                    <div key={level.label}
                      className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition-colors hover:bg-white/4"
                      style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: level.color, boxShadow: `0 0 0 3px ${level.color}22` }} />
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-[#e8f5e9]">{level.label}</p>
                        <p className="text-[9px]" style={{ color: "rgba(165,196,168,0.35)" }}>{level.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.10)" }}>
                  <MapPin className="h-3 w-3 shrink-0 text-[#4ade80]" />
                  <p className="text-[10px] text-[#4ade80]/70">Hover to preview · Click to select</p>
                </div>
              </div>
            </AnimateIn>

            {/* Live donations feed */}
            <AnimateIn direction="right" delay={300}>
              <div className="overflow-hidden rounded-2xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <p className="text-xs font-bold text-[#e8f5e9]">Live Donations</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>
                    <Users className="h-3 w-3" />
                    <span className="truncate max-w-[100px]">{selectedState.name}</span>
                  </div>
                </div>

                <div className="px-4 py-3">
                  {loadingDonations ? (
                    <div className="flex flex-col gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex animate-pulse items-center gap-3">
                          <div className="h-9 w-9 shrink-0 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2.5 w-2/3 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                            <div className="h-2 w-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }} />
                          </div>
                          <div className="h-4 w-14 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                        </div>
                      ))}
                    </div>
                  ) : donations.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-6 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <Heart className="h-5 w-5" style={{ color: "rgba(255,255,255,0.15)" }} />
                      </div>
                      <p className="text-xs" style={{ color: "rgba(165,196,168,0.35)" }}>No donations yet — be the first!</p>
                    </div>
                  ) : (
                    <ul className="flex flex-col" style={{ gap: 0 }}>
                      {donations.map((d, idx) => (
                        <li key={`${d.donor}-${idx}`} className="flex items-center gap-3 py-2.5"
                          style={{ borderBottom: idx < donations.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <div className="relative shrink-0">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ring-1 ring-white/10"
                              style={{ backgroundColor: avatarColor(d.donor) }}>
                              {d.donor[0].toUpperCase()}
                            </div>
                            {idx === 0 && (
                              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-green-500 ring-1 ring-[#071410]">
                                <Zap className="h-2 w-2 fill-white text-white" />
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-[#e8f5e9]">{d.donor}</p>
                            <p className="text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>{d.timeLabel}</p>
                          </div>
                          <span className="shrink-0 rounded-xl px-2.5 py-0.5 text-[11px] font-bold text-[#4ade80]"
                            style={{ background: "rgba(74,222,128,0.10)" }}>
                            {d.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </AnimateIn>

            {/* Donate CTA */}
            <AnimateIn direction="right" delay={400}>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group relative flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #0b5a35, #15834f)", boxShadow: "0 4px 24px rgba(11,90,53,0.50)" }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <Heart className="h-4 w-4" />
                Donate to {selectedState.name}
                <ArrowRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
              </button>
            </AnimateIn>

            <DonationModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              stateName={selectedState.name}
              statePercentage={selectedState.percentage}
              raisedAmount={raised}
              targetAmount={target}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
