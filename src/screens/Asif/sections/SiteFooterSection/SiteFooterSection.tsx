"use client";

import Image from "next/image";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, MapPin, Phone, Youtube, Heart } from "lucide-react";

const footerColumns = [
  {
    heading: "Quick Links",
    links: [
      { label: "About ASIF",      href: "/about" },
      { label: "The Award",       href: "/the-award" },
      { label: "How It Works",    href: "/how-it-works" },
      { label: "States & Map",    href: "/states" },
    ],
  },
  {
    heading: "For Reporters",
    links: [
      { label: "Register Now",           href: NGELECTIONPOLLS_SIGNUP_URL },
      { label: "Training & Resources",   href: "#" },
      { label: "Reporter Dashboard",     href: "#" },
      { label: "FAQs",                   href: "#" },
    ],
  },
  {
    heading: "For Donors",
    links: [
      { label: "Donate To A State",   href: "/states" },
      { label: "How Donations Work",  href: "#" },
      { label: "Impact Reports",      href: "#" },
      { label: "FAQs",                href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook,  label: "Facebook",  href: "#" },
  { icon: Twitter,   label: "Twitter",   href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin,  label: "LinkedIn",  href: "#" },
  { icon: Youtube,   label: "YouTube",   href: "#" },
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: "linear-gradient(180deg, #0d1b12 0%, #081208 100%)" }}>
      {/* Top accent line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0b5a35, #15834f, #fea309, #15834f, #0b5a35)" }} />

      {/* Subtle dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#0b5a35]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-20 h-[300px] w-[300px] rounded-full bg-[#fea309]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 pt-14 pb-8 sm:px-6 lg:px-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/8 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.6fr] lg:gap-8">

          {/* Brand column */}
          <div className="flex flex-col items-center gap-5 sm:items-start">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/10 p-1">
                <Image src="/images/ASIF-Logo.png" alt="ASIF Logo" width={40} height={40} className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-base font-black tracking-wider text-white">ASIF</p>
                <p className="text-[9px] font-medium uppercase tracking-widest text-white/35">
                  Actizens Social Impact Foundation
                </p>
              </div>
            </div>

            <p className="text-center text-[12px] leading-relaxed text-white/45 sm:text-left">
              Empowering citizens, promoting transparency, and strengthening democracy across Nigeria.
            </p>

            {/* Contact snippets */}
            <div className="flex flex-col items-center gap-2.5 sm:items-start">
              {[
                { icon: Mail,   text: "info@asiffoundation.org" },
                { icon: Phone,  text: "+234 810 000 0000" },
                { icon: MapPin, text: "Asokoro, Abuja, Nigeria" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0b5a35]/30">
                    <Icon className="h-3 w-3 text-[#4ade80]" />
                  </div>
                  <span className="text-[11px] text-white/45">{text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex justify-center gap-2 sm:justify-start">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:border-[#0b5a35]/60 hover:bg-[#0b5a35] hover:text-white hover:-translate-y-0.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col items-center gap-4 sm:items-start">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/35">
                {col.heading}
              </h3>
              <ul className="flex flex-col items-center gap-2.5 sm:items-start">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-2 text-[12px] text-white/50 transition-all duration-150 hover:text-white"
                    >
                      <span className="h-px w-0 bg-[#4ade80] transition-all duration-200 group-hover:w-3 max-sm:hidden" aria-hidden />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="flex flex-col items-center gap-4 sm:items-start">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/35">Stay Connected</h3>
            <p className="text-center text-[12px] leading-relaxed text-white/45 sm:text-left">
              Get updates, impact stories and election news straight to your inbox.
            </p>
            <form
              className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors focus-within:border-[#0b5a35]/60"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className="flex">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-transparent px-4 py-3 text-[12px] text-white placeholder:text-white/25 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="group flex items-center gap-1 bg-[#0b5a35] px-4 text-white transition-colors hover:bg-[#15834f]"
                >
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>

            {/* Trust note */}
            <div className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/4 px-3 py-2.5 w-full">
              <span className="text-sm">🇳🇬</span>
              <p className="text-[10px] leading-relaxed text-white/35">
                A non-partisan initiative for every Nigerian citizen, regardless of political affiliation.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1.5 text-center text-[11px] text-white/25 sm:text-left">
            © 2025 Actizens Social Impact Foundation. Made with
            <Heart className="h-3 w-3 fill-[#0b5a35] text-[#0b5a35]" />
            for Nigeria.
          </p>
          <ul className="flex flex-wrap justify-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[11px] text-white/25 transition-colors hover:text-white/60">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
