"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";
import {
  Trophy, Star, MapPin, Users, ClipboardList, BadgeCheck,
  CheckCircle, UserPlus, ArrowRight, Sparkles, Medal,
  ShieldCheck, AlertTriangle, Banknote, Clock, EyeOff,
  Car, FileText, Package, Flag,
} from "lucide-react";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";
import { EyewitnessReporterMap } from "@/components/EyewitnessReporterMap";

const prizes = [
  {
    rank: "1st", amount: "₦20,000,000", label: "Twenty Million Naira",
    gradient: "linear-gradient(135deg, #b8860b, #d4a017, #f0c040)",
    glow: "0 0 60px rgba(240,192,64,0.35), 0 0 0 1px rgba(240,192,64,0.25)",
    badgeBg: "rgba(240,192,64,0.20)", badgeColor: "#f0c040",
    icon: Trophy, large: true,
  },
  {
    rank: "2nd", amount: "₦10,000,000", label: "Ten Million Naira",
    gradient: "linear-gradient(135deg, #5a6370, #7a8390, #9ca3af)",
    glow: "0 4px 24px rgba(156,163,175,0.12)",
    badgeBg: "rgba(156,163,175,0.14)", badgeColor: "#9ca3af",
    icon: Medal, large: false,
  },
  {
    rank: "3rd", amount: "₦5,000,000", label: "Five Million Naira",
    gradient: "linear-gradient(135deg, #7a3510, #a04820, #d97706)",
    glow: "0 4px 24px rgba(217,119,6,0.18)",
    badgeBg: "rgba(217,119,6,0.14)", badgeColor: "#f59e0b",
    icon: Medal, large: false,
  },
];

const reportingItems = [
  { label: "Vote buying",                            icon: Banknote,      accent: "#4ade80" },
  { label: "Ballot snatching & stuffing",            icon: AlertTriangle, accent: "#f87171" },
  { label: "Delay in election proceedings",          icon: Clock,         accent: "#60a5fa" },
  { label: "Violence",                               icon: ShieldCheck,   accent: "#fb923c" },
  { label: "Late arrival of INEC officials",         icon: Car,           accent: "#fbbf24" },
  { label: "Capture & upload INEC Form ECBA",        icon: FileText,      accent: "#c084fc" },
  { label: "Voters intimidation",                    icon: EyeOff,        accent: "#f87171" },
  { label: "Late arrival of materials",              icon: Package,       accent: "#38bdf8" },
  { label: "Other threats to free & fair elections", icon: Flag,          accent: "#4ade80" },
];

const criteria = [
  { number: "20", unit: "Citizens",    detail: "Per polling unit per group" },
  { number: "37", unit: "States+FCT",  detail: "Complete national coverage" },
  { number: "3",  unit: "Winners",     detail: "Per state win prizes" },
];

const keyPoints = [
  { icon: Users,         text: "20 citizens per group" },
  { icon: MapPin,        text: "All 36 states + FCT" },
  { icon: ClipboardList, text: "Verified report scoring" },
  { icon: BadgeCheck,    text: "3 winner groups per state" },
  { icon: ShieldCheck,   text: "AI + human verification" },
  { icon: CheckCircle,   text: "Non-partisan & transparent" },
];

export default function TheAwardPage() {
  return (
    <PageLayout activePage="The Award">
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO — deep forest-black → emerald with gold accents ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0b1a0e 45%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.20) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(254,163,9,0.09) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(254,163,9,0.7) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(254,163,9,0.3) 40px, rgba(254,163,9,0.3) 41px)" }} />
            <div aria-hidden className="pointer-events-none absolute bottom-10 right-0 hidden select-none text-[200px] font-black leading-none tracking-tighter lg:block"
              style={{ color: "rgba(254,163,9,0.025)" }}>AWARD</div>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            {/* Top row: text left, image right */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              {/* Left — text */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fea309]/25 bg-[#fea309]/8 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(254,163,9,0.80)" }}>
                    <Sparkles className="h-3.5 w-3.5" />
                    The Award Programme
                  </span>
                </AnimateIn>
                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#e8f5e9" }}>
                    Active Citizens<br />
                    <span style={{ color: "#fea309" }}>Hero Award</span>
                  </h1>
                </AnimateIn>
                <AnimateIn direction="left" delay={200}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-[15px]" style={{ color: "rgba(165,196,168,0.75)" }}>
                    A nationwide election monitoring programme by ASIF that rewards citizens who
                    observe, document, and report election-day incidents — promoting transparency and
                    safeguarding Nigeria&apos;s democratic process.
                  </p>
                </AnimateIn>
                <AnimateIn direction="left" delay={300}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={NGELECTIONPOLLS_SIGNUP_URL}
                      className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                      style={{ background: "#fea309", boxShadow: "0 4px 24px rgba(254,163,9,0.40)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserPlus className="h-4 w-4" />
                      Register to Participate
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="flex h-12 items-center gap-2 rounded-2xl border px-6 text-sm font-bold text-[#e8f5e9] transition-all hover:bg-white/8"
                      style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
                    >
                      How It Works
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>

              {/* Right — hero frame image */}
              <AnimateIn direction="right" delay={150}>
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/award-hero-frame.png"
                    alt="Active citizens using phones to report election incidents"
                    width={620}
                    height={380}
                    className="w-full max-w-[620px] object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </AnimateIn>
            </div>

          </div>
        </section>

        {/* ── 2. OVERVIEW — obsidian green ── */}
        <section
          className="relative px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #08100c 0%, #0c1810 50%, #080c09 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.10) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.7) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Text */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/18 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(74,222,128,0.70)" }}>
                    About the Award
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">
                    What Is the Hero Award?
                  </h2>
                </AnimateIn>
                <div className="mt-6 space-y-4 text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.70)" }}>
                  {[
                    "The Active Citizens Hero Award is ASIF's flagship election monitoring initiative. It recruits, trains, and deploys thousands of Nigerians to observe elections across all 36 states and the Federal Capital Territory.",
                    "Participants work in groups of 20 citizens per polling unit. Each group observes, documents, and reports on election activities throughout election day. Their reports are verified by AI and a dedicated editorial team before being counted.",
                    "The groups with the most verified reports win cash prizes ranging from ₦5 million to ₦20 million per state — with three prize-winning groups per state.",
                  ].map((text, i) => (
                    <AnimateIn key={i} direction="left" delay={i * 100}>
                      <p>{text}</p>
                    </AnimateIn>
                  ))}
                </div>

                {/* Key points grid */}
                <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {keyPoints.map(({ icon: Icon, text }, i) => (
                    <AnimateIn key={text} direction="left" delay={300 + i * 60}>
                      <div className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/4"
                        style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.10)" }}>
                        <Icon className="h-4 w-4 shrink-0 text-[#4ade80]" />
                        <span className="text-[12px] font-semibold text-[#e8f5e9]">{text}</span>
                      </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>

              {/* Interactive map */}
              <EyewitnessReporterMap />
            </div>
          </div>
        </section>

        {/* ── 3. WHAT YOU REPORT — deep navy-indigo ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07090e 0%, #0d0f1c 50%, #070810 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(192,132,252,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c084fc]/18 bg-[#c084fc]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(192,132,252,0.70)" }}>
                  Field Reporting
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">What Will You Report?</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: "rgba(165,196,168,0.55)" }}>
                  Participants capture and submit the following types of incidents in real time from their polling unit.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {reportingItems.map(({ label, icon: Icon, accent }, i) => {
                const rgb = accent.replace("#","").match(/.{2}/g)!.map(h=>parseInt(h,16)).join(",");
                return (
                  <AnimateIn key={label} direction="up" delay={i * 50}>
                    <div className="group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all hover:-translate-y-1"
                      style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.12)` }}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ background: `rgba(${rgb},0.12)` }}>
                        <Icon className="h-5 w-5" style={{ color: accent }} />
                      </div>
                      <p className="text-[11px] font-semibold leading-tight" style={{ color: "rgba(232,245,233,0.70)" }}>{label}</p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. PRIZES — gold-black / dark luxury ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #090808 0%, #100c0a 50%, #090708 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-16 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(240,192,64,0.08) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(240,192,64,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-12 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fea309]/25 bg-[#fea309]/8 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(254,163,9,0.80)" }}>
                  <Trophy className="h-3.5 w-3.5" />
                  Prize Pool
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">Prizes for Winning Groups</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: "rgba(165,196,168,0.50)" }}>
                  Three winning groups in every state and the FCT. 111 groups across Nigeria walk away with prizes.
                </p>
              </div>
            </AnimateIn>

            {/* Podium */}
            <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-end">
              {/* 2nd */}
              <AnimateIn className="flex flex-1" direction="left" delay={100}>
                <div className="flex w-full flex-col items-center gap-5 rounded-3xl p-8 sm:pb-10"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl" style={{ background: prizes[1].gradient }}>
                    <Medal className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="rounded-xl px-3 py-1 text-[10px] font-bold" style={{ background: prizes[1].badgeBg, color: prizes[1].badgeColor }}>2nd Place</span>
                    <p className="mt-3 text-3xl font-black text-[#e8f5e9]">{prizes[1].amount}</p>
                    <p className="mt-1 text-xs" style={{ color: "rgba(165,196,168,0.45)" }}>{prizes[1].label}</p>
                  </div>
                </div>
              </AnimateIn>

              {/* 1st — elevated */}
              <AnimateIn className="flex flex-1" direction="up" delay={50}>
                <div className="relative flex w-full flex-col items-center gap-5 overflow-hidden rounded-3xl p-8 sm:pb-14 sm:pt-14"
                  style={{ background: prizes[0].gradient, boxShadow: prizes[0].glow }}>
                  <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-xl" />
                  <div aria-hidden className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-black/15 blur-xl" />
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 shadow-inner">
                    <Trophy className="h-11 w-11 text-white" />
                  </div>
                  <div className="relative text-center">
                    <span className="rounded-xl bg-white/20 px-3 py-1 text-[10px] font-bold text-white">🏆 1st Place</span>
                    <p className="mt-3 text-4xl font-black text-white">{prizes[0].amount}</p>
                    <p className="mt-1 text-xs text-white/65">{prizes[0].label}</p>
                  </div>
                </div>
              </AnimateIn>

              {/* 3rd */}
              <AnimateIn className="flex flex-1" direction="right" delay={100}>
                <div className="flex w-full flex-col items-center gap-5 rounded-3xl p-8 sm:pb-10"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl" style={{ background: prizes[2].gradient }}>
                    <Medal className="h-9 w-9 text-white" />
                  </div>
                  <div className="text-center">
                    <span className="rounded-xl px-3 py-1 text-[10px] font-bold" style={{ background: prizes[2].badgeBg, color: prizes[2].badgeColor }}>3rd Place</span>
                    <p className="mt-3 text-3xl font-black text-[#e8f5e9]">{prizes[2].amount}</p>
                    <p className="mt-1 text-xs" style={{ color: "rgba(165,196,168,0.45)" }}>{prizes[2].label}</p>
                  </div>
                </div>
              </AnimateIn>
            </div>

            <AnimateIn direction="up" delay={200}>
              <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl px-6 py-4"
                style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.14)" }}>
                <Trophy className="h-5 w-5 text-[#4ade80]" />
                <p className="text-sm font-bold text-[#4ade80]">
                  3 winning groups per state × 37 states/FCT = 111 prize winners nationally
                </p>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── 5. CTA — forest-emerald spotlight lifted off canvas ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #080810 0%, #060d09 100%)" }}
        >
          <div className="mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="relative overflow-hidden rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 55%, #083d25 100%)",
                  boxShadow: "0 0 80px rgba(11,90,53,0.35), 0 0 0 1px rgba(74,222,128,0.08)",
                }}>
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(254,163,9,0.15) 0%, transparent 70%)" }} />

                <div className="relative grid grid-cols-1 items-center gap-8 p-10 lg:grid-cols-2 lg:p-14">
                  <div>
                    <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                      Ready to Become an<br />
                      <span style={{ color: "#fea309" }}>Election Hero?</span>
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65">
                      Register today to join thousands of Nigerians monitoring elections,
                      reporting incidents, and fighting for a transparent democracy.
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link href={NGELECTIONPOLLS_SIGNUP_URL}
                        className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                        style={{ background: "#fea309", boxShadow: "0 4px 20px rgba(254,163,9,0.40)" }}>
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <Star className="h-4 w-4" />
                        Register Now
                      </Link>
                      <Link href="/how-it-works"
                        className="flex h-12 items-center gap-2 rounded-2xl border border-white/20 bg-white/8 px-6 text-sm font-bold text-white transition-all hover:bg-white/14">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Picture strip */}
                  <div className="flex items-center justify-center gap-4">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n}
                        className={`relative overflow-hidden rounded-full shadow-2xl ${n === 2 || n === 3 ? "h-48 w-16" : "h-40 w-14"}`}
                        style={{ transform: n === 1 ? "translateY(12px)" : n === 2 ? "translateY(-8px)" : n === 3 ? "translateY(8px)" : "translateY(-12px)" }}>
                        <Image src={`/images/Hero-Section-Picture-${n}.png`} alt={`Hero ${n}`} fill className="object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,9,0.40) 0%, transparent 50%)" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
