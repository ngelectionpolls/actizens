"use client";

import Image from "next/image";
import React from "react";
import { Star, ShieldCheck, ArrowRight, Play, CalendarDays, Zap, TrendingUp } from "lucide-react";

type LucideIcon = React.ComponentType<{ className?: string; size?: number | string }>;

interface HeroStat { icon?: LucideIcon | React.ReactNode; prefix?: string; value?: string; title?: string; label?: string; }
interface HeroBadge { icon?: LucideIcon | React.ReactNode; label: string; }
interface HeroButton { label: string; href?: string; onClick?: () => void; variant?: "primary" | "secondary" | "outline"; icon?: LucideIcon | React.ReactNode; }
interface HeroImage { src: string; alt?: string; }

interface ActiveCitizensHeroProps {
  badge?: HeroBadge;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
  images?: HeroImage[];
  floatingCard?: { date?: string; label?: string };
  bottomStats?: HeroStat[];
  tickerDonations?: TickerDonation[];
  className?: string;
}

export interface TickerDonation {
  donor: string; amount: string; state: string; location: string; isDiaspora: boolean; timeLabel: string;
}

function renderIcon(icon: React.ReactNode | React.ComponentType<{ className?: string }>, className = "h-4 w-4") {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === "function" || (typeof icon === "object" && icon !== null && ("render" in (icon as object) || "$$typeof" in (icon as object)))) {
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className={className} />;
  }
  return null;
}

export const ActiveCitizensHeroSection: React.FC<ActiveCitizensHeroProps> = ({
  badge, title, description, primaryButton, secondaryButton,
  floatingCard, bottomStats = [], tickerDonations = [], className = "",
}) => {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 45%, #071209 100%)" }}
    >
      {/* ── Background layer ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large emerald glow — top right */}
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(11,90,53,0.18) 0%, transparent 70%)" }} />
        {/* Gold glow — bottom left */}
        <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(254,163,9,0.07) 0%, transparent 70%)", animationDelay: "2s" }} />
        {/* Subtle green mid-glow */}
        <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #4ade80 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* Diagonal scan lines */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(74,222,128,0.5) 40px, rgba(74,222,128,0.5) 41px)" }} />
        {/* Watermark */}
        <div className="pointer-events-none absolute bottom-16 right-0 hidden select-none text-[200px] font-black leading-none tracking-tighter lg:block"
          aria-hidden style={{ color: "rgba(74,222,128,0.025)" }}>
          ASIF
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 pt-10 pb-0 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_560px] lg:gap-0">

          {/* ── LEFT — text ── */}
          <div className="flex flex-col">
            {/* Badge */}
            {badge && (
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/6 px-3.5 py-1.5 shadow-lg shadow-black/20 animate-fade-up"
                style={{ backdropFilter: "blur(8px)" }}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
                </span>
                <Star className="h-3 w-3 fill-[#fea309] text-[#fea309]" aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]/90 sm:text-[11px]">
                  {badge.label}
                </span>
              </div>
            )}

            {/* Headline */}
            <h1
              id="hero-title"
              className="mt-5 text-[34px] font-black leading-[1.03] tracking-[-1.5px] sm:text-[46px] lg:text-[56px] xl:text-[64px] animate-fade-up delay-100"
              style={{ color: "#e8f5e9" }}
            >
              {title}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-[15px] font-normal leading-relaxed animate-fade-up delay-200"
              style={{ color: "rgba(165,196,168,0.85)" }}>
              {description}
            </p>

            {/* Trust line */}
            <div className="mt-4 inline-flex items-center gap-2 animate-fade-up delay-300">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#4ade80]" aria-hidden />
              <span className="text-[11px] font-semibold" style={{ color: "rgba(165,196,168,0.70)" }}>
                Trusted by citizens across all 36 states &amp; FCT
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-up delay-300">
              {primaryButton && (
                <button
                  type="button"
                  onClick={primaryButton.onClick}
                  className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl px-6 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 sm:px-7"
                  style={{
                    background: "linear-gradient(135deg, #0b5a35, #15834f)",
                    boxShadow: "0 4px 24px rgba(11,90,53,0.45), 0 1px 0 rgba(74,222,128,0.15) inset",
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {primaryButton.icon ? renderIcon(primaryButton.icon, "h-4 w-4") : <ShieldCheck className="h-4 w-4" />}
                  {primaryButton.label}
                </button>
              )}
              {secondaryButton && (
                <button
                  type="button"
                  onClick={secondaryButton.onClick}
                  className="group flex h-12 items-center gap-2 rounded-2xl px-6 text-[13px] font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5 sm:px-7"
                  style={{ background: "#fea309", boxShadow: "0 4px 20px rgba(254,163,9,0.35)" }}
                >
                  {secondaryButton.icon ? renderIcon(secondaryButton.icon, "h-4 w-4") : null}
                  {secondaryButton.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              )}
            </div>

            {/* Watch link */}
            <button type="button"
              className="group mt-5 flex w-fit items-center gap-2.5 text-[12px] font-semibold transition-colors animate-fade-up delay-400"
              style={{ color: "rgba(165,196,168,0.65)" }}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 shadow-inner transition-all group-hover:border-[#4ade80]/30 group-hover:bg-white/10">
                <Play className="h-3 w-3 translate-x-px fill-[#4ade80] text-[#4ade80]" aria-hidden />
              </span>
              Watch How It Works
            </button>

            {/* Live label */}
            <div className="mt-6 flex flex-wrap items-center gap-3 animate-fade-up delay-500">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                style={{ backdropFilter: "blur(8px)" }}>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-green-400">Live</span>
              </div>
              <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(165,196,168,0.65)" }}>
                <TrendingUp className="h-3.5 w-3.5 text-[#4ade80]/60" />
                Donations happening across Nigeria
              </span>
            </div>
          </div>

          {/* ── RIGHT — collage ── */}
          <div className="hidden lg:flex lg:items-center lg:justify-end animate-slide-right delay-200">
            <div className="relative" style={{ width: 560, height: 480 }}>
              {/* Glow behind the image */}
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: "radial-gradient(ellipse at center, rgba(11,90,53,0.25) 0%, transparent 70%)", filter: "blur(24px)", transform: "scale(0.85)" }} />
              <Image
                src="/images/hero-collage.png"
                alt="Active citizens using their phones to monitor elections across Nigeria"
                fill sizes="560px"
                className="relative z-10 object-contain drop-shadow-2xl"
                priority
              />
              {/* Floating election date card */}
              {floatingCard && (
                <div className="absolute bottom-12 left-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-3 shadow-2xl"
                  style={{ background: "rgba(10,26,14,0.85)", backdropFilter: "blur(16px)" }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b5a35]/30">
                    <CalendarDays className="h-5 w-5 text-[#4ade80]" aria-hidden />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.55)" }}>
                      {floatingCard.label || "Election Day"}
                    </p>
                    <p className="text-sm font-extrabold text-[#e8f5e9]">
                      {floatingCard.date || "16th January, 2027"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Donation ticker ── */}
        {tickerDonations.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/6 py-3"
            style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}>
            <div
              className="flex items-center whitespace-nowrap"
              style={{ animation: "ticker-scroll 40s linear infinite", width: "max-content" }}
            >
              {[...tickerDonations, ...tickerDonations].map((d, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 pr-10 text-[11px]" style={{ color: "rgba(165,196,168,0.7)" }}>
                  <Zap className="mr-1 h-3 w-3 text-[#fea309]" aria-hidden />
                  <time className="font-semibold" style={{ color: "rgba(74,222,128,0.65)" }}>{d.timeLabel}</time>
                  <span className="font-bold text-[#4ade80]">{d.donor}</span>
                  <span style={{ color: "rgba(165,196,168,0.45)" }}>donated</span>
                  <strong className="font-extrabold text-[#e8f5e9]">{d.amount}</strong>
                  <span style={{ color: "rgba(165,196,168,0.45)" }}>to</span>
                  <strong className="font-bold text-[#4ade80]">
                    {d.isDiaspora ? `${d.location} 🌍` : d.location || d.state}
                  </strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Stats bar ── */}
        {bottomStats.length > 0 && (
          <div className="mb-6 mt-4 overflow-hidden rounded-2xl border border-white/6"
            style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)" }}>
            <div className="grid grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
              {bottomStats.map((stat, idx) => (
                <div
                  key={stat.label ?? idx}
                  className="group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-white/4 sm:px-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ background: "rgba(11,90,53,0.25)" }}>
                    {renderIcon(stat.icon, "h-4 w-4 text-[#4ade80]")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[#e8f5e9]">
                      {stat.prefix && <span>{stat.prefix}</span>}{stat.value}
                    </p>
                    <p className="truncate text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(165,196,168,0.5)" }}>
                      {stat.label || stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
