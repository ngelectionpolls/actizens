"use client";

import Image from "next/image";
import Link from "next/link";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";
import { EyewitnessCoverageSection } from "@/screens/Asif/sections/EyewitnessCoverageSection/EyewitnessCoverageSection";
import {
  Users, Wallet, ClipboardCheck, Camera, MapPin,
  UserPlus, Play, Globe2,
  UserCheck2, BarChart3, Target, ArrowRight,
} from "lucide-react";

export default function StatePage() {
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
                    <Link href={NGELECTIONPOLLS_SIGNUP_URL}
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

        {/* Shared live coverage keeps Explore States consistent with the Home page. */}
        <EyewitnessCoverageSection
          title="Explore States"
          sectionId="explore-states"
          initialStateId="fct"
        />

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
                    <Link href={NGELECTIONPOLLS_SIGNUP_URL}
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
