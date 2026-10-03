"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";
import {
  UserRound, BadgeCheck, Monitor, MessageSquare, Trophy,
  ArrowRight, Shield, Users, Phone, Globe, Zap,
  ChevronDown, Bot, Eye, FileCheck, Sparkles, UserPlus,
} from "lucide-react";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";

const steps = [
  {
    number: "01", icon: UserRound, title: "Register & Create Profile",
    description: "Sign up on NGelectionpolls and complete your profile. Provide your contact information, location, and identification documents for verification.",
    accent: "#4ade80", accentRgb: "74,222,128",
    points: ["Simple online registration form", "Upload valid ID", "Confirm your polling unit", "Receive confirmation email"],
  },
  {
    number: "02", icon: BadgeCheck, title: "Get Verified & Trained",
    description: "Our team reviews your registration. Once verified, you receive training materials and access to the ASIF reporter app and guidelines.",
    accent: "#60a5fa", accentRgb: "96,165,250",
    points: ["Identity verification process", "Online training modules", "Access to reporting app", "Community of fellow reporters"],
  },
  {
    number: "03", icon: Users, title: "Form Your Group",
    description: "Connect with 19 other citizens in your community to form a monitoring group of 20 people. One group leader is selected to coordinate.",
    accent: "#c084fc", accentRgb: "192,132,252",
    points: ["Exactly 20 citizens per group", "One group leader chosen", "Same polling unit coverage", "Group coordination tools"],
  },
  {
    number: "04", icon: Monitor, title: "Monitor on Election Day",
    description: "Arrive at your assigned polling unit early. Observe all election activities throughout the day. Stay neutral and document everything.",
    accent: "#fb923c", accentRgb: "251,146,60",
    points: ["Arrive before polls open", "Observe all activities", "Stay neutral and peaceful", "Document with photos/video"],
  },
  {
    number: "05", icon: MessageSquare, title: "Report in Real Time",
    description: "Use the ASIF app to capture and submit incidents as they happen. Add photos, videos, and descriptions for each report.",
    accent: "#38bdf8", accentRgb: "56,189,248",
    points: ["Submit reports via app", "Attach photo/video evidence", "Add detailed descriptions", "Track your submissions"],
  },
  {
    number: "06", icon: Trophy, title: "Win & Create Impact",
    description: "Groups with the most verified reports win cash prizes of ₦5M, ₦10M, or ₦20M. Every verified report strengthens democracy.",
    accent: "#fea309", accentRgb: "254,163,9",
    points: ["Prize money for top groups", "Verified report leaderboard", "Impact on democracy", "Public recognition"],
  },
];

const verificationSteps = [
  { icon: Bot,       step: "01", title: "AI Screening",   text: "Instant duplicate and spam detection.",           accent: "#4ade80", accentRgb: "74,222,128" },
  { icon: Eye,       step: "02", title: "Human Review",   text: "Editorial team reviews flagged reports.",          accent: "#60a5fa", accentRgb: "96,165,250" },
  { icon: FileCheck, step: "03", title: "Evidence Check", text: "Photos & videos cross-checked for authenticity.",  accent: "#c084fc", accentRgb: "192,132,252" },
  { icon: BadgeCheck,step: "04", title: "Final Approval", text: "Approved reports count toward leaderboards.",      accent: "#fea309", accentRgb: "254,163,9"  },
];

const faqs = [
  { q: "Who can participate?",             a: "Any Nigerian citizen aged 18 and above with valid identification can register as a reporter." },
  { q: "Do I need election experience?",   a: "No prior experience needed. ASIF provides full training and a reporting app with clear instructions." },
  { q: "How are winners selected?",        a: "Winners are determined by the number of verified, approved reports submitted on election day. Top 3 groups per state win." },
  { q: "When are prizes paid?",            a: "Prizes are paid within 30 days of the election results being certified and all reports reviewed." },
  { q: "Is participation nonpartisan?",    a: "Yes. ASIF is strictly nonpartisan. Reporters must observe all parties impartially and report only facts." },
  { q: "What if I have no polling unit?",  a: "You can select any polling unit in your local government area during registration. ASIF helps match unassigned volunteers." },
];

export default function HowItWorksPage() {
  return (
    <PageLayout activePage="How It Works">
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO — deep forest black, centred ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.20) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(254,163,9,0.07) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.035]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(74,222,128,0.4) 40px, rgba(74,222,128,0.4) 41px)" }} />
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              {/* Left — text */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(74,222,128,0.75)" }}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Step by Step
                  </span>
                </AnimateIn>
                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#e8f5e9" }}>
                    How It <span style={{ color: "#4ade80" }}>Works</span>
                  </h1>
                </AnimateIn>
                <AnimateIn direction="left" delay={200}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "rgba(165,196,168,0.70)" }}>
                    From registration to prizes — everything you need to know about becoming an
                    Active Citizens Hero and making a difference on election day.
                  </p>
                </AnimateIn>
                <AnimateIn direction="left" delay={300}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href={NGELECTIONPOLLS_SIGNUP_URL}
                      className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                      style={{ background: "#4ade80", boxShadow: "0 4px 24px rgba(74,222,128,0.35)" }}
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserPlus className="h-4 w-4" />
                      Register to Participate
                    </Link>
                    <Link
                      href="/contact"
                      className="flex h-12 items-center gap-2 rounded-2xl border px-6 text-sm font-bold text-[#e8f5e9] transition-all hover:bg-white/8"
                      style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>

              {/* Right — hero frame image */}
              <AnimateIn direction="right" delay={150}>
                <div className="relative flex items-center justify-center">
                  <Image
                    src="/images/how-it-works-hero-frame.png"
                    alt="Citizens using phones to monitor and report election incidents"
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

        {/* ── 2. 6 STEPS — obsidian-slate, each card with its own accent ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #080c10 0%, #0c1018 50%, #07090e 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">Your Participation Journey</h2>
                <p className="mx-auto mt-2 max-w-xl text-sm" style={{ color: "rgba(165,196,168,0.50)" }}>
                  Six clear steps from registration to winning.
                </p>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <AnimateIn key={step.number} direction="up" delay={i * 70}>
                    <div
                      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5"
                      style={{ background: `rgba(${step.accentRgb},0.04)`, border: `1px solid rgba(${step.accentRgb},0.12)` }}
                    >
                      {/* Top accent line */}
                      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl" style={{ backgroundColor: step.accent }} />

                      <div className="flex items-start justify-between">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                          style={{ background: `rgba(${step.accentRgb},0.12)` }}>
                          <Icon style={{ width: 24, height: 24, color: step.accent }} />
                        </div>
                        <span className="text-5xl font-black leading-none select-none"
                          style={{ color: `rgba(${step.accentRgb},0.10)` }}>{step.number}</span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-[#e8f5e9]">{step.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(165,196,168,0.55)" }}>{step.description}</p>
                      </div>

                      <ul className="mt-auto flex flex-col gap-1.5">
                        {step.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(165,196,168,0.60)" }}>
                            <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: step.accent, opacity: 0.7 }} />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. VERIFICATION — indigo-black ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07080f 0%, #0e0b18 50%, #080710 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.08) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(192,132,252,0.7) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              {/* Left prose */}
              <AnimateIn className="lg:col-span-5" direction="left">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c084fc]/18 bg-[#c084fc]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(192,132,252,0.70)" }}>
                  Verification System
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl">Every Report is Verified</h2>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.65)" }}>
                  ASIF uses a rigorous 4-stage verification pipeline combining AI technology
                  and human editorial review to ensure only genuine, accurate reports count
                  toward leaderboard scores.
                </p>
                <div className="mt-6 flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.14)" }}>
                  <Shield className="h-8 w-8 text-[#4ade80]" />
                  <div>
                    <p className="text-sm font-black text-[#e8f5e9]">100% Verified Reports</p>
                    <p className="text-[11px]" style={{ color: "rgba(165,196,168,0.45)" }}>No report goes unreviewed</p>
                  </div>
                </div>
              </AnimateIn>

              {/* Right pipeline cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {verificationSteps.map(({ icon: Icon, step, title, text, accent, accentRgb }, i) => (
                  <AnimateIn key={title} direction="right" delay={i * 80}>
                    <div
                      className="group flex items-start gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                      style={{ background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.12)` }}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                        style={{ background: `rgba(${accentRgb},0.12)` }}>
                        <Icon style={{ width: 22, height: 22, color: accent }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold" style={{ color: accent }}>Step {step}</span>
                        <h3 className="text-sm font-bold text-[#e8f5e9]">{title}</h3>
                        <p className="mt-1 text-[11px]" style={{ color: "rgba(165,196,168,0.55)" }}>{text}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. WHAT YOU NEED — hunter-green-black ── */}
        <section
          className="px-4 py-14 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #071410 0%, #0a1f18 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-[350px] w-[350px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.12) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.7) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="overflow-hidden rounded-3xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.10)" }}>
              <div className="grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
                {/* Requirements list */}
                <AnimateIn direction="left">
                  <h2 className="text-xl font-black text-[#e8f5e9] sm:text-2xl">What You Need to Participate</h2>
                  <div className="mt-5 space-y-3">
                    {[
                      { icon: Phone,  text: "A smartphone with internet access" },
                      { icon: Globe,  text: "The ASIF Reporter App (iOS & Android)" },
                      { icon: Shield, text: "A valid government-issued ID" },
                      { icon: Users,  text: "A group of 20 citizens (or join an existing group)" },
                    ].map(({ icon: Icon, text }, i) => (
                      <AnimateIn key={text} direction="left" delay={i * 80}>
                        <div className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/5"
                          style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.10)" }}>
                          <Icon className="h-4 w-4 shrink-0 text-[#4ade80]" />
                          <span className="text-xs font-medium text-[#e8f5e9]">{text}</span>
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                </AnimateIn>

                {/* Register card */}
                <AnimateIn direction="right" delay={100}>
                  <div className="flex flex-col gap-4 rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.14)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.35)" }}>Ready to start?</p>
                    <h3 className="text-base font-black text-[#e8f5e9]">Register in Under 5 Minutes</h3>
                    <p className="text-[12px]" style={{ color: "rgba(165,196,168,0.55)" }}>
                      Join thousands of citizens already registered to monitor elections across Nigeria.
                    </p>
                    <Link href={NGELECTIONPOLLS_SIGNUP_URL}
                      className="group relative flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      <UserPlus className="h-4 w-4" />
                      Register Now
                    </Link>
                    <Link href="/contact"
                      className="flex items-center justify-center gap-2 text-xs font-bold text-[#4ade80] hover:opacity-80">
                      Have questions? Contact us
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. FAQ — midnight-obsidian ── */}
        <section
          className="px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07080f 0%, #0a0b14 50%, #07080f 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <AnimateIn direction="up">
              <div className="mb-10 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/18 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(74,222,128,0.65)" }}>
                  FAQs
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl">Frequently Asked Questions</h2>
              </div>
            </AnimateIn>

            <div className="mx-auto max-w-3xl space-y-2.5">
              {faqs.map(({ q, a }, i) => (
                <AnimateIn key={q} direction="up" delay={i * 60}>
                  <details
                    className="group rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/4">
                      <span className="text-sm font-bold text-[#e8f5e9]">{q}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-[#4ade80]/50 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(165,196,168,0.60)" }}>{a}</p>
                    </div>
                  </details>
                </AnimateIn>
              ))}
            </div>

            {/* Bottom CTA nudge */}
            <AnimateIn direction="up" delay={400}>
              <div className="mt-12 flex flex-col items-center gap-4 text-center">
                <p className="text-sm" style={{ color: "rgba(165,196,168,0.50)" }}>Still have questions?</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact"
                    className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Contact Us
                  </Link>
                  <Link href={NGELECTIONPOLLS_SIGNUP_URL}
                    className="flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-bold text-[#4ade80] transition-all hover:-translate-y-0.5"
                    style={{ borderColor: "rgba(74,222,128,0.20)", background: "rgba(74,222,128,0.05)" }}>
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
