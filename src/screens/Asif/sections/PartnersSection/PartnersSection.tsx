"use client";

import Image from "next/image";
import React, { useState } from "react";
import { HandshakeIcon, Globe } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

interface Partner { id: string; name: string; subtitle: string; logoSrc: string; }

const partners: Partner[] = [
  { id: "inec",      name: "INEC",            subtitle: "Independent National Electoral Commission",           logoSrc: "/images/Partners-Logo-1.png" },
  { id: "eu",        name: "European Union",  subtitle: "European Union",                                     logoSrc: "/images/Partners-Logo-2.png" },
  { id: "usaid",     name: "USAID",           subtitle: "United States Agency for International Development",  logoSrc: "/images/Partners-Logo-3.png" },
  { id: "ford",      name: "Ford Foundation", subtitle: "Ford Foundation",                                    logoSrc: "/images/Partners-Logo-4.png" },
  { id: "macarthur", name: "MacArthur",       subtitle: "MacArthur Foundation",                               logoSrc: "/images/Partners-Logo-5.png" },
  { id: "code",      name: "Code for Africa", subtitle: "Code for Africa",                                    logoSrc: "/images/Partners-Logo-6.png" },
];

const track = [...partners, ...partners];

export const PartnersSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 lg:px-10"
      style={{ background: "linear-gradient(160deg, #07090e 0%, #0b0e16 50%, #070810 100%)" }}
    >
      {/* Midnight blue glow blobs */}
      <div aria-hidden className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,90,53,0.07) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <AnimateIn direction="up">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              <HandshakeIcon className="h-3.5 w-3.5" />
              Partners &amp; Funders
            </span>
            <h2 className="mt-3 text-2xl font-black text-[#e8f5e9] sm:text-3xl lg:text-4xl">
              Trusted by Leading Organisations
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "rgba(165,196,168,0.50)" }}>
              Working together to protect Nigeria&apos;s democratic process.
            </p>
          </div>
        </AnimateIn>

        {/* Marquee */}
        <AnimateIn direction="up" delay={100}>
          <div className="relative overflow-hidden rounded-3xl py-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
              style={{ background: "linear-gradient(to right, rgba(7,9,14,1), transparent)" }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
              style={{ background: "linear-gradient(to left, rgba(7,9,14,1), transparent)" }} />

            <div className="flex" style={{ animation: "partners-scroll 20s linear infinite", width: "max-content" }}>
              {track.map((p, i) => (
                <PartnerItem key={`${p.id}-${i}`} partner={p} />
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Trust strip */}
        <AnimateIn direction="up" delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Globe,         text: "International partners" },
              { icon: HandshakeIcon, text: "Civil society orgs" },
              { icon: Globe,         text: "Democracy funders" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-[11px] font-semibold" style={{ color: "rgba(165,196,168,0.35)" }}>
                <Icon className="h-3.5 w-3.5" style={{ color: "rgba(74,222,128,0.30)" }} />
                {text}
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

const PartnerItem = ({ partner }: { partner: Partner }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <div className="group mx-10 flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-16 w-36 items-center justify-center transition-all duration-300">
        {!hasError ? (
          <Image
            src={partner.logoSrc}
            alt={`${partner.name} logo`}
            fill
            sizes="144px"
            className="object-contain opacity-30 grayscale brightness-[2] transition-all duration-300 group-hover:scale-110 group-hover:opacity-90 group-hover:grayscale-0 group-hover:brightness-100"
            onError={() => setHasError(true)}
          />
        ) : (
          <p className="text-sm font-bold text-[#4ade80]/60">{partner.name}</p>
        )}
      </div>
      <p className="text-center text-[9px] font-medium leading-tight line-clamp-1" style={{ color: "rgba(165,196,168,0.25)" }}>
        {partner.subtitle || partner.name}
      </p>
    </div>
  );
};
