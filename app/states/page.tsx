"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";
import {
  Search, Users, Wallet, ClipboardCheck, Camera, MapPin,
  ChevronRight, UserPlus, Play, CheckCircle2, Globe2,
  UserCheck2, BarChart3, Target, ArrowRight, TrendingUp, Zap,
} from "lucide-react";

interface StateFundingData { rank: number; name: string; amount: string; percentage: number; }

const NigeriaVectorMap = dynamic(() => import("@/components/NigeriaMapStates"), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full animate-pulse rounded-2xl"
      style={{ background: "linear-gradient(135deg, rgba(11,90,53,0.15), rgba(11,90,53,0.08))" }} />
  ),
});

const topFundedStates: StateFundingData[] = [
  { rank: 1, name: "Lagos",       amount: "₦17,150,000", percentage: 49 },
  { rank: 2, name: "Rivers",      amount: "₦16,450,000", percentage: 47 },
  { rank: 3, name: "FCT - Abuja", amount: "₦15,750,000", percentage: 45 },
  { rank: 4, name: "Oyo",         amount: "₦15,050,000", percentage: 43 },
  { rank: 5, name: "Delta",       amount: "₦14,350,000", percentage: 41 },
];

const stateFundingMap: Record<string, number> = {
  // 25–49% tier (most states)
  Lagos: 49, Rivers: 47, "Federal Capital Territory": 45, "Abuja FCT": 45,
  Oyo: 43, Delta: 41, Edo: 40, Enugu: 38, Ogun: 37, Kano: 36,
  Kaduna: 35, Anambra: 34, Imo: 33, Osun: 32, Abia: 31,
  Plateau: 30, "Cross River": 29, "Akwa Ibom": 28, Kwara: 28,
  Benue: 27, Ekiti: 26, Ondo: 25,
  // 0% tier (not yet funded)
  Adamawa: 0, Bauchi: 0, Bayelsa: 0, Borno: 0,
  Ebonyi: 0, Gombe: 0, Jigawa: 0, Katsina: 0,
  Kebbi: 0, Kogi: 0, Nasarawa: 0, Niger: 0,
  Sokoto: 0, Taraba: 0, Yobe: 0, Zamfara: 0,
};

const allStates = [
  "Abuja FCT","Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa",
  "Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu",
  "Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi",
  "Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

const recentDonations = [
  { name: "Anonymous", location: "Lagos State",  time: "2 mins ago",  amount: "₦50,000",  color: "#0b5a35" },
  { name: "John D.",   location: "Abuja (FCT)",  time: "5 mins ago",  amount: "₦100,000", color: "#3b82f6" },
  { name: "Hassan A.", location: "Kano State",   time: "12 mins ago", amount: "₦25,000",  color: "#fea309" },
  { name: "Nkechi O.", location: "Rivers State", time: "18 mins ago", amount: "₦75,000",  color: "#f97316" },
  { name: "Anonymous", location: "Oyo State",    time: "25 mins ago", amount: "₦15,000",  color: "#0b5a35" },
];

const mapLegend = [
  { label: "Fully Funded (100%)", color: "#0B6B3A" },
  { label: "75% – 99%",          color: "#2E7D32" },
  { label: "50% – 74%",          color: "#4CAF50" },
  { label: "25% – 49%",          color: "#FFC107" },
  { label: "Below 25%",          color: "#FF9800" },
  { label: "Not Funded",         color: "rgba(255,255,255,0.20)" },
];

function getTierColor(pct: number) {
  if (pct >= 100) return "#0B6B3A";
  if (pct >= 75)  return "#2E7D32";
  if (pct >= 50)  return "#4CAF50";
  if (pct >= 25)  return "#FFC107";
  if (pct > 0)    return "#FF9800";
  return "rgba(255,255,255,0.20)";
}

export default function StatePage() {
  const [selectedState, setSelectedState]     = useState<string>("Abuja FCT");
  const [searchQuery, setSearchQuery]         = useState<string>("");
  const [, setTooltipContent]                 = useState<string>("");

  const filteredStates = allStates.filter((st) =>
    st.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pct       = stateFundingMap[selectedState] ?? 0;
  const tierColor = getTierColor(pct);

  return (
    <PageLayout activePage="State">
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO + MAP — deep forest black ── */}
        <section
          className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.18) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(254,163,9,0.07) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div aria-hidden className="pointer-events-none absolute bottom-10 right-0 hidden select-none text-[180px] font-black leading-none tracking-tighter lg:block"
              style={{ color: "rgba(74,222,128,0.025)" }}>STATES</div>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">

              {/* Left — text */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(74,222,128,0.75)" }}>
                    <MapPin className="h-3.5 w-3.5" />
                    State Map
                  </span>
                </AnimateIn>
                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl" style={{ color: "#e8f5e9" }}>
                    Together Across<br />
                    <span style={{ color: "#4ade80" }}>All 36 States</span>
                  </h1>
                </AnimateIn>
                <AnimateIn direction="left" delay={200}>
                  <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.70)" }}>
                    Active citizens in all 36 states and the FCT are working together to promote
                    transparent, credible and peaceful elections.
                  </p>
                </AnimateIn>
                <AnimateIn direction="left" delay={300}>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href="/register"
                      className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl px-5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserPlus className="h-4 w-4" />
                      Become a Reporter
                    </Link>
                    <Link href="/how-it-works"
                      className="flex h-11 items-center gap-2 rounded-xl border px-5 text-[13px] font-bold transition-all hover:-translate-y-0.5"
                      style={{ borderColor: "rgba(74,222,128,0.20)", background: "rgba(74,222,128,0.05)", color: "#4ade80" }}>
                      How It Works
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>

              {/* Right — Hero frame */}
              <AnimateIn direction="right" delay={200}>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/states-hero-frame.png"
                    alt="Active citizens across Nigeria"
                    width={620}
                    height={500}
                    className="w-full max-w-[620px] object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </AnimateIn>
            </div>

            {/* Metrics bar */}
            <AnimateIn direction="up" delay={300}>
              <div className="mt-10 grid grid-cols-2 gap-3 rounded-3xl p-4 sm:grid-cols-3 lg:grid-cols-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}>
                {[
                  { icon: Users,         value: "8,950+",  label: "Registered Reporters" },
                  { icon: Wallet,        value: "18.5M",   label: "Avg Raised Per State" },
                  { icon: ClipboardCheck,value: "23,450+", label: "Reports Submitted" },
                  { icon: Camera,        value: "19,320+", label: "Photos & Videos" },
                  { icon: MapPin,        value: "37",      label: "States + FCT Active" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-white/4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ background: "rgba(74,222,128,0.10)" }}>
                      <Icon className="h-5 w-5 text-[#4ade80]" />
                    </div>
                    <div>
                      <div className="text-base font-black text-[#e8f5e9]">{value}</div>
                      <div className="text-[10px] font-semibold leading-none" style={{ color: "rgba(165,196,168,0.45)" }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── 2. EXPLORE STATES — hunter green-black ── */}
        <section
          className="px-4 py-10 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #071410 0%, #0a1f18 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-[350px] w-[350px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.12) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.7) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <h2 className="mb-6 text-xl font-black text-[#e8f5e9]">Explore States</h2>
            </AnimateIn>

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
                  style={{ '--tw-divide-opacity': '1' } as React.CSSProperties}>

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
                      <div className="flex items-center justify-between mb-1">
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

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

              {/* Left: map + legend — map rendered directly, no AnimateIn wrapper to avoid translate clipping */}
              <div className="lg:col-span-7">
                <NigeriaVectorMap
                  selectedState={selectedState}
                  onSelectState={(st) => setSelectedState(st)}
                  setTooltipContent={setTooltipContent}
                />
                {/* Legend */}
                <AnimateIn direction="up" delay={200}>
                  <div className="mt-4 rounded-2xl p-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.10)" }}>
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.35)" }}>
                      Funding Legend
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                      {mapLegend.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[11px] font-medium" style={{ color: "rgba(232,245,233,0.60)" }}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
                      style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.10)" }}>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#4ade80]" />
                      <p className="text-[10px] text-[#4ade80]/70">Click a state to view stats and donate</p>
                    </div>
                  </div>
                </AnimateIn>
              </div>

              {/* Right: donations + leaderboard */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                {/* Recent donations */}
                <AnimateIn direction="right" delay={100}>
                  <div className="overflow-hidden rounded-3xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between px-5 py-4"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        <h3 className="text-sm font-bold text-[#e8f5e9]">Recent Donations Across States</h3>
                      </div>
                      <Link href="#" className="text-[11px] font-bold text-[#4ade80] hover:opacity-75">View All</Link>
                    </div>
                    <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      {recentDonations.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                            style={{ backgroundColor: d.color }}>
                            {d.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-[#e8f5e9]">{d.name}</div>
                            <div className="text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>{d.location} · {d.time}</div>
                          </div>
                          <span className="shrink-0 rounded-xl px-2.5 py-1 text-[11px] font-black text-[#4ade80]"
                            style={{ background: "rgba(74,222,128,0.10)" }}>
                            {d.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateIn>

                {/* Leaderboard */}
                <AnimateIn direction="right" delay={150}>
                <div className="overflow-hidden rounded-3xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <h2 className="text-base font-black text-[#e8f5e9]">Top Funded States</h2>
                    <p className="mt-0.5 text-[11px]" style={{ color: "rgba(165,196,168,0.40)" }}>By percentage of target reached</p>
                  </div>
                  <div className="divide-y p-4" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                    {topFundedStates.slice(0, 5).map((st) => (
                      <div key={st.rank} className="flex items-center gap-3 py-2.5">
                        <div
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-white"
                          style={{ background: st.rank <= 3 ? "linear-gradient(135deg,#0b5a35,#15834f)" : "rgba(255,255,255,0.12)" }}
                        >
                          {st.rank}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1.5 flex items-center justify-between text-xs">
                            <span className="font-bold text-[#e8f5e9]">{st.name}</span>
                            <span className="font-black" style={{ color: getTierColor(st.percentage) }}>{st.percentage}%</span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                            <div className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${st.percentage}%`, backgroundColor: getTierColor(st.percentage) }} />
                          </div>
                          <div className="mt-0.5 text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>{st.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <button className="flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-[#4ade80] transition-colors hover:bg-white/5"
                      style={{ background: "rgba(74,222,128,0.08)" }}>
                      View All States
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </AnimateIn>
              </div>{/* end right column */}
            </div>{/* end grid */}
          </div>{/* end max-w container */}
        </section>

        {/* ── 3. CTA Banner — forest-emerald spotlight ── */}
        <section className="px-4 py-8 sm:px-6 lg:px-10"
          style={{ background: "#060d09" }}>
          <AnimateIn direction="up">
            <div className="mx-auto max-w-[1400px] overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 55%, #083d25 100%)",
                boxShadow: "0 0 80px rgba(11,90,53,0.35), 0 0 0 1px rgba(74,222,128,0.08)",
              }}>
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(254,163,9,0.14) 0%, transparent 70%)" }} />

              <div className="relative grid grid-cols-1 items-center gap-8 p-8 md:p-12 lg:grid-cols-12">
                {/* Frame image */}
                <div className="flex items-center justify-center lg:col-span-5">
                  <Image
                    src="/images/states-cta-frame.png"
                    alt="Active citizens across Nigeria's states"
                    width={680}
                    height={430}
                    className="w-full max-w-[680px] object-contain drop-shadow-2xl"
                  />
                </div>
                {/* Text */}
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-black text-white md:text-3xl">
                    Every State. Every Voice.<br /><span style={{ color: "#fea309" }}>One Mission.</span>
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
                    Your voice matters. Join thousands of citizens across Nigeria monitoring elections and building a stronger democracy.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link href="/register"
                      className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-white px-5 text-sm font-bold text-[#0b5a35] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#0b5a35]/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserPlus className="h-4 w-4" />
                      Register Now
                    </Link>
                    <Link href="/how-it-works"
                      className="flex h-11 items-center gap-2 rounded-xl border border-white/22 bg-white/10 px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/18">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                        <Play className="h-2.5 w-2.5 translate-x-px fill-white text-white" />
                      </div>
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* ── 4. Feature highlights — midnight-slate ── */}
        <section className="px-4 py-8 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07090e 0%, #0b0e16 100%)" }}>
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { icon: Globe2,     title: "ASIF Presence",  sub: "In all 36 states and FCT", accent: "#4ade80" },
                { icon: MapPin,     title: "Nationwide",      sub: "Complete Coverage",        accent: "#60a5fa" },
                { icon: UserCheck2, title: "Citizen Powered", sub: "Network",                  accent: "#c084fc" },
                { icon: BarChart3,  title: "Data Driven",     sub: "Insights",                  accent: "#fbbf24" },
                { icon: Target,     title: "Impact Focused",  sub: "Outcomes",                  accent: "#fb923c" },
              ].map(({ icon: Icon, title, sub, accent }, i) => {
                const rgb = accent.replace("#","").match(/.{2}/g)!.map(h=>parseInt(h,16)).join(",");
                return (
                  <AnimateIn key={title} direction="up" delay={i * 60}>
                    <div className="group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                      style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.12)` }}>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                        style={{ background: `rgba(${rgb},0.12)` }}>
                        <Icon style={{ width: 18, height: 18, color: accent }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#e8f5e9]">{title}</div>
                        <div className="text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>{sub}</div>
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
