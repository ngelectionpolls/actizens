"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users, Building2, GraduationCap, Leaf, Briefcase, Sprout,
  Smartphone, FileText, ShieldCheck, HeartHandshake, UserCheck,
  Lightbulb, Globe, Award, Eye, Target, ArrowRight, Mail, Sparkles,
} from "lucide-react";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { PartnersSection } from "@/screens/Asif/sections/PartnersSection/PartnersSection";
import { AnimateIn } from "@/components/AnimateIn";

const coreAreas = [
  { id: "01", icon: Users,          label: "Civic Education & Democratic Participation", accent: "#4ade80" },
  { id: "02", icon: Building2,      label: "Community Development",                      accent: "#60a5fa" },
  { id: "03", icon: GraduationCap,  label: "Youth Leadership & Volunteerism",            accent: "#f472b6" },
  { id: "04", icon: HeartHandshake, label: "Peacebuilding & National Unity",             accent: "#4ade80" },
  { id: "05", icon: ShieldCheck,    label: "Social Accountability & Good Governance",   accent: "#fbbf24" },
  { id: "06", icon: Leaf,           label: "Environmental Sustainability",               accent: "#34d399" },
  { id: "07", icon: Briefcase,      label: "Entrepreneurship & Empowerment",            accent: "#fb923c" },
  { id: "08", icon: Sprout,         label: "Agriculture & Food Security",               accent: "#a3e635" },
  { id: "09", icon: Smartphone,     label: "Innovation & Digital Inclusion",            accent: "#c084fc" },
  { id: "10", icon: FileText,       label: "Research, Policy & Advocacy",              accent: "#38bdf8" },
];

const values = [
  { label: "Integrity",      icon: ShieldCheck,    accent: "#4ade80",  accentRgb: "74,222,128" },
  { label: "Service",        icon: HeartHandshake, accent: "#34d399",  accentRgb: "52,211,153" },
  { label: "Inclusion",      icon: UserCheck,      accent: "#60a5fa",  accentRgb: "96,165,250" },
  { label: "Innovation",     icon: Lightbulb,      accent: "#fbbf24",  accentRgb: "251,191,36" },
  { label: "Accountability", icon: ShieldCheck,    accent: "#c084fc",  accentRgb: "192,132,252" },
  { label: "Collaboration",  icon: Globe,          accent: "#4ade80",  accentRgb: "74,222,128" },
  { label: "Compassion",     icon: HeartHandshake, accent: "#fb923c",  accentRgb: "251,146,60" },
  { label: "Excellence",     icon: Award,          accent: "#fcd34d",  accentRgb: "252,211,77" },
  { label: "Sustainability", icon: Leaf,           accent: "#38bdf8",  accentRgb: "56,189,248" },
];

const impactStats = [
  { icon: Users,          value: "Thousands", sub: "Active Volunteers" },
  { icon: Building2,      value: "100+",      sub: "Community Programs" },
  { icon: GraduationCap,  value: "500+",      sub: "Civic Campaigns" },
  { icon: HeartHandshake, value: "200+",      sub: "Strategic Partnerships" },
];

export default function AboutPage() {
  return (
    <PageLayout activePage="About">
      {/* ─── root dark canvas ─────────────────────────────────────────── */}
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO — deep forest black → emerald-black ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 50%, #071209 100%)" }}
        >
          {/* BG layer */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.18) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(254,163,9,0.07) 0%, transparent 70%)", animation: "float-slow 5s ease-in-out infinite", animationDelay: "2s" }} />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            {/* Diagonal scan lines */}
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(74,222,128,0.4) 40px, rgba(74,222,128,0.4) 41px)" }} />
            {/* Watermark */}
            <div aria-hidden className="pointer-events-none absolute bottom-10 right-0 hidden select-none text-[200px] font-black leading-none tracking-tighter lg:block"
              style={{ color: "rgba(74,222,128,0.025)" }}>
              ASIF
            </div>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4ade80]/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    About Us
                  </span>
                </AnimateIn>

                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#e8f5e9" }}>
                    About{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-[#4ade80]">ASIF</span>
                      <span aria-hidden className="absolute -bottom-1 left-0 h-1 w-full rounded-full" style={{ background: "rgba(254,163,9,0.55)" }} />
                    </span>
                  </h1>
                </AnimateIn>

                <AnimateIn direction="left" delay={150}>
                  <h2 className="mt-3 text-xl font-bold sm:text-2xl" style={{ color: "rgba(165,196,168,0.70)" }}>
                    Empowering Citizens · Transforming Communities · Inspiring Change
                  </h2>
                </AnimateIn>

                <AnimateIn direction="left" delay={200}>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed sm:text-[15px]" style={{ color: "rgba(165,196,168,0.75)" }}>
                    Actizens Social Impact Foundation (ASIF) is a nonpartisan, nonprofit organization committed to
                    empowering citizens, strengthening communities, and advancing sustainable development through
                    civic education, innovation, leadership development, and social impact initiatives.
                  </p>
                </AnimateIn>

                <AnimateIn direction="left" delay={300}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href="/register"
                      className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 24px rgba(11,90,53,0.45)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserCheck className="h-4 w-4" />
                      Join Our Mission
                    </Link>
                    <Link
                      href="/contact"
                      className="flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                      style={{ background: "#fea309", boxShadow: "0 4px 20px rgba(254,163,9,0.35)" }}
                    >
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </Link>
                  </div>
                </AnimateIn>

                {/* Reach badge */}
                <AnimateIn direction="left" delay={400}>
                  <div className="mt-6 inline-flex items-center gap-3 rounded-2xl px-5 py-3"
                    style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.14)" }}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(74,222,128,0.12)" }}>
                      <Globe className="h-5 w-5 text-[#4ade80]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>Our Reach</p>
                      <p className="text-sm font-black text-[#e8f5e9]">36 States + FCT</p>
                    </div>
                  </div>
                </AnimateIn>
              </div>

              {/* Right — group photo */}
              <AnimateIn direction="right" delay={200}>
                <div className="relative h-[420px] w-full overflow-hidden rounded-3xl"
                  style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.50), 0 0 0 1px rgba(74,222,128,0.08)" }}>
                  <Image src="/images/asif-group-image.png" alt="ASIF Team" fill className="object-cover" unoptimized />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,9,0.70) 0%, transparent 50%)" }} />
                  {/* Live badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{ background: "rgba(6,13,9,0.75)", border: "1px solid rgba(74,222,128,0.15)", backdropFilter: "blur(12px)" }}>
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                    </span>
                    <p className="text-[12px] font-semibold text-white/80">Active across all 36 states &amp; FCT</p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── 2. WHO WE ARE — obsidian-slate blue-green blend ── */}
        <section
          className="relative px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #080c10 0%, #0c1018 50%, #07090e 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-[450px] w-[450px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.08) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Text */}
              <div className="lg:col-span-7">
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#60a5fa]/20 bg-[#60a5fa]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(96,165,250,0.75)" }}>
                    Who We Are
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">
                    Our Foundation &amp; Purpose
                  </h2>
                </AnimateIn>
                <div className="mt-6 space-y-4 text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.70)" }}>
                  {[
                    "ASIF believes that lasting national development begins with informed, responsible, and active citizens working together to solve community challenges through peaceful participation, collaboration, and innovation.",
                    "The Foundation partners with communities, government institutions, civil society organizations, faith-based organizations, educational institutions, development partners, and the private sector to design and implement programs that promote democratic values, accountability, youth empowerment, environmental sustainability, economic opportunity, and community resilience.",
                    "Through research, advocacy, capacity building, volunteerism, and social innovation, ASIF works to inspire citizens to become active participants in building peaceful, inclusive, and prosperous communities.",
                  ].map((text, i) => (
                    <AnimateIn key={i} direction="left" delay={i * 100}>
                      <p>{text}</p>
                    </AnimateIn>
                  ))}
                </div>
              </div>

              {/* Vision / Mission cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
                {[
                  { icon: Eye,    title: "Vision",  accent: "#4ade80", accentRgb: "74,222,128",
                    text: "To build a society where empowered citizens and resilient communities drive sustainable development, social justice, and national transformation." },
                  { icon: Target, title: "Mission", accent: "#fbbf24", accentRgb: "251,191,36",
                    text: "To empower individuals and communities through civic education, leadership development, social innovation, and strategic partnership to drive measurable social impact." },
                ].map(({ icon: Icon, title, accent, accentRgb, text }, i) => (
                  <AnimateIn key={title} direction="right" delay={i * 150}>
                    <div
                      className="group flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1"
                      style={{ background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.14)`, boxShadow: `0 4px 24px rgba(${accentRgb},0.08)` }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ background: `rgba(${accentRgb},0.12)` }}>
                        <Icon className="h-6 w-6" style={{ color: accent }} />
                      </div>
                      <div className="h-0.5 w-16 rounded-full" style={{ backgroundColor: accent, opacity: 0.6 }} />
                      <div>
                        <h3 className="text-base font-black text-[#e8f5e9]">{title}</h3>
                        <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(165,196,168,0.60)" }}>{text}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CORE AREAS — deep navy-purple blend ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07090f 0%, #0d0f1c 50%, #070810 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(192,132,252,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c084fc]/18 bg-[#c084fc]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(192,132,252,0.70)" }}>
                  What We Do
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">Core Areas of Work</h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {coreAreas.map((item, i) => {
                const Icon = item.icon;
                const rgb = item.accent.replace("#","").match(/.{2}/g)!.map(h => parseInt(h,16)).join(",");
                return (
                  <AnimateIn key={item.id} direction="up" delay={i * 45}>
                    <div
                      className="group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all hover:-translate-y-1"
                      style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.12)` }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ background: `rgba(${rgb},0.12)` }}>
                        <Icon className="h-5 w-5" style={{ color: item.accent }} />
                      </div>
                      <p className="text-[11px] font-semibold leading-tight" style={{ color: "rgba(232,245,233,0.70)" }}>
                        <span className="block text-[10px] font-bold mb-0.5" style={{ color: item.accent, opacity: 0.65 }}>{item.id}</span>
                        {item.label}
                      </p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. CORE VALUES — indigo-obsidian, each card glows its own colour ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #080810 0%, #0d0c1a 50%, #08080f 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(254,163,9,0.06) 0%, transparent 70%)" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/20 bg-[#fbbf24]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(251,191,36,0.75)" }}>
                  What We Stand For
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">Our Core Values</h2>
              </div>
            </AnimateIn>

            <div className="flex flex-wrap justify-center gap-4">
              {values.map(({ label, icon: Icon, accent, accentRgb }, i) => (
                <AnimateIn key={label} direction="up" delay={i * 50}>
                  <div
                    className="group flex flex-col items-center gap-2.5 rounded-2xl px-6 py-6 transition-all hover:-translate-y-1.5"
                    style={{
                      background: `rgba(${accentRgb},0.05)`,
                      border: `1px solid rgba(${accentRgb},0.15)`,
                      boxShadow: `0 4px 20px rgba(${accentRgb},0.06)`,
                    }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                      style={{ background: `rgba(${accentRgb},0.12)` }}>
                      <Icon className="h-6 w-6" style={{ color: accent }} />
                    </div>
                    <span className="text-xs font-bold text-[#e8f5e9]">{label}</span>
                    <div className="h-0.5 w-8 rounded-full" style={{ backgroundColor: accent, opacity: 0.5 }} />
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. IMPACT BANNER — forest-emerald spotlight (lifted off the canvas) ── */}
        <section className="relative px-4 py-10 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #08080f 0%, #070d09 100%)" }}>
          <AnimateIn direction="up">
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 55%, #083d25 100%)",
                boxShadow: "0 0 80px rgba(11,90,53,0.35), 0 0 0 1px rgba(74,222,128,0.08)",
              }}>
              {/* dot overlay */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              {/* Gold top-right glow */}
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(254,163,9,0.14) 0%, transparent 70%)" }} />

              <div className="relative grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-5 lg:p-12">
                {/* Left — big 37 */}
                <div className="lg:col-span-1">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/35">Our Impact</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-5xl font-black" style={{ color: "#fea309" }}>37</span>
                    <span className="mb-1 text-sm font-bold leading-tight text-white/75">States<br />+ FCT</span>
                  </div>
                </div>

                {/* Right — stat icons */}
                <div className="grid grid-cols-2 gap-6 lg:col-span-4 sm:grid-cols-4">
                  {impactStats.map(({ icon: Icon, value, sub }) => (
                    <div key={sub} className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-transform hover:scale-110">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{value}</p>
                        <p className="text-[10px] text-white/55">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* ── 6. PARTNERS — midnight-slate (reuses dark PartnersSection) ── */}
        <PartnersSection />

        {/* ── 7. CTA — midnight-green with split photo + text ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07090e 0%, #0a1a0e 50%, #060d09 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-[450px] w-[450px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.14) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(254,163,9,0.06) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.7) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Photo */}
              <AnimateIn className="lg:col-span-5" direction="left">
                <div className="relative h-[320px] w-full overflow-hidden rounded-3xl"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.50), 0 0 0 1px rgba(74,222,128,0.08)" }}>
                  <Image src="/images/asif-group-image.png" alt="Volunteers" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,9,0.65) 0%, transparent 55%)" }} />
                </div>
              </AnimateIn>

              {/* Text */}
              <div className="lg:col-span-7">
                <AnimateIn direction="right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/18 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(74,222,128,0.70)" }}>
                    Get Involved
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">
                    Ready to{" "}
                    <span className="text-[#4ade80]">Make a Difference?</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.65)" }}>
                    Become part of a movement that is strengthening democracy, empowering communities,
                    and creating lasting social impact across Nigeria.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href="/register"
                      className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 24px rgba(11,90,53,0.45)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserCheck className="h-4 w-4" />
                      Register Here
                    </Link>
                    <Link
                      href="/contact"
                      className="flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                      style={{ background: "#fea309", boxShadow: "0 4px 20px rgba(254,163,9,0.35)" }}
                    >
                      <Mail className="h-4 w-4" />
                      Contact Us
                    </Link>
                    <Link
                      href="/the-award"
                      className="flex h-12 items-center gap-2 rounded-2xl border px-6 text-sm font-bold transition-all hover:-translate-y-0.5"
                      style={{ borderColor: "rgba(74,222,128,0.20)", background: "rgba(74,222,128,0.05)", color: "#4ade80" }}
                    >
                      The Award
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
