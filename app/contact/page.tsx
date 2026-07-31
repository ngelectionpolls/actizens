"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mail, Phone, MapPin, Send, MessageSquare, Clock,
  ArrowRight, CheckCircle2, Sparkles, Globe, Users,
} from "lucide-react";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";

const contactInfo = [
  { icon: Mail,   label: "Email",   value: "info@asiffoundation.org", sub: "We respond within 24 hours",  href: "mailto:info@asiffoundation.org", accent: "#4ade80", accentRgb: "74,222,128"  },
  { icon: Phone,  label: "Phone",   value: "+234 810 000 0000",        sub: "Mon–Fri, 9am – 5pm WAT",      href: "tel:+2348100000000",             accent: "#60a5fa", accentRgb: "96,165,250"  },
  { icon: MapPin, label: "Address", value: "Asokoro District, Abuja",  sub: "Federal Capital Territory",   href: "#",                              accent: "#c084fc", accentRgb: "192,132,252" },
  { icon: Globe,  label: "Website", value: "www.asiffoundation.org",   sub: "For press & partnerships",    href: "https://asiffoundation.org",     accent: "#fbbf24", accentRgb: "251,191,36"  },
];

const faqs = [
  { q: "How do I register as an election reporter?", a: "Visit our Register page and complete the simple online form. You will need a valid ID and a smartphone." },
  { q: "How can I donate to a specific state?",       a: "Go to the States page, click your desired state on the map and click 'Donate'. You choose which programme to support." },
  { q: "How long does it take to hear back?",         a: "We respond to all emails within 24 business hours. Phone lines are open Mon–Fri, 9am–5pm WAT." },
  { q: "Can organisations partner with ASIF?",        a: "Yes. We welcome partnerships from civil society, government, media and the private sector. Use the form and select Partnership." },
];

const enquiryTypes = ["General Enquiry", "Press & Media", "Partnerships", "Volunteer / Reporter", "Donation Support", "Technical Issue"];

type FormData = { name: string; email: string; phone: string; type: string; subject: string; message: string };

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(74,222,128,0.14)",
  color: "#e8f5e9",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", type: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", type: "", subject: "", message: "" });
    } catch { setStatus("error"); }
  };

  return (
    <PageLayout activePage="Contact">
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO — two-column: text left, image right ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.20) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 right-0 h-[350px] w-[350px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(74,222,128,0.3) 40px, rgba(74,222,128,0.3) 41px)" }} />
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

              {/* Left — text */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/20 bg-[#4ade80]/6 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(74,222,128,0.75)" }}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Get in Touch
                  </span>
                </AnimateIn>
                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#e8f5e9" }}>
                    Contact <span style={{ color: "#4ade80" }}>ASIF</span>
                  </h1>
                </AnimateIn>
                <AnimateIn direction="left" delay={200}>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: "rgba(165,196,168,0.65)" }}>
                    Have a question, partnership proposal, or press enquiry? We&apos;d love to hear from you.
                    Our team is ready to help.
                  </p>
                </AnimateIn>

                {/* Chips */}
                <AnimateIn direction="left" delay={300}>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {[
                      { icon: Clock, label: "24h Response Time" },
                      { icon: Users, label: "Dedicated Support Team" },
                      { icon: Globe, label: "Nationwide Coverage" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold"
                        style={{ borderColor: "rgba(74,222,128,0.18)", background: "rgba(74,222,128,0.06)", color: "rgba(232,245,233,0.70)" }}>
                        <Icon className="h-3.5 w-3.5 text-[#4ade80]" />
                        {label}
                      </div>
                    ))}
                  </div>
                </AnimateIn>
              </div>

              {/* Right — image */}
              <AnimateIn direction="right" delay={200}>
                <div className="relative overflow-hidden rounded-3xl shadow-2xl"
                  style={{ boxShadow: "0 8px 48px rgba(11,90,53,0.30), 0 0 0 1px rgba(74,222,128,0.08)" }}>
                  <Image
                    src="/images/contact-hero-frame.png"
                    alt="ASIF team members collaborating"
                    width={720}
                    height={480}
                    className="w-full object-cover"
                    priority
                  />
                  {/* subtle green overlay at bottom */}
                  <div className="pointer-events-none absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(6,13,9,0.35) 0%, transparent 45%)" }} />
                </div>
              </AnimateIn>

            </div>
          </div>
        </section>

        {/* ── 2. MAIN CONTENT — deep navy-teal ── */}
        <section
          className="px-4 py-12 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #07090e 0%, #0c1018 50%, #07090e 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.7) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">

              {/* ── Form ── */}
              <AnimateIn direction="left">
                <div className="overflow-hidden rounded-3xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,222,128,0.10)" }}>
                  {/* Form header */}
                  <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: "rgba(74,222,128,0.10)" }}>
                        <MessageSquare className="h-5 w-5 text-[#4ade80]" />
                      </div>
                      <div>
                        <h2 className="text-base font-black text-[#e8f5e9]">Send Us a Message</h2>
                        <p className="text-[11px]" style={{ color: "rgba(165,196,168,0.45)" }}>Fill in the form and we&apos;ll get back to you promptly.</p>
                      </div>
                    </div>
                  </div>

                  {status === "success" ? (
                    <div className="flex flex-col items-center gap-5 p-12 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full"
                        style={{ background: "rgba(74,222,128,0.10)" }}>
                        <CheckCircle2 className="h-10 w-10 text-[#4ade80]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-[#e8f5e9]">Message Sent!</h3>
                        <p className="mt-2 text-sm" style={{ color: "rgba(165,196,168,0.60)" }}>
                          Thank you for reaching out. Our team will respond within 24 hours.
                        </p>
                      </div>
                      <button onClick={() => setStatus("idle")}
                        className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors"
                        style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form className="p-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                            placeholder="Chukwuemeka Okafor" style={{ ...inputStyle }} />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                            placeholder="name@email.com" style={{ ...inputStyle }} />
                        </div>
                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Phone Number
                          </label>
                          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                            placeholder="+234 800 000 0000" style={{ ...inputStyle }} />
                        </div>
                        {/* Enquiry type */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="type" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Enquiry Type <span className="text-red-400">*</span>
                          </label>
                          <select id="type" name="type" required value={form.type} onChange={handleChange}
                            style={{ ...inputStyle }}>
                            <option value="">Select type…</option>
                            {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        {/* Subject */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Subject <span className="text-red-400">*</span>
                          </label>
                          <input id="subject" name="subject" type="text" required value={form.subject} onChange={handleChange}
                            placeholder="Brief description of your enquiry" style={{ ...inputStyle }} />
                        </div>
                        {/* Message */}
                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                          <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.45)" }}>
                            Message <span className="text-red-400">*</span>
                          </label>
                          <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange}
                            placeholder="Tell us more about your enquiry…"
                            style={{ ...inputStyle, resize: "none" }} />
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="mt-4 rounded-xl px-4 py-3 text-sm text-red-400"
                          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.20)" }}>
                          Something went wrong. Please try again or email us directly.
                        </div>
                      )}

                      <div className="mt-6 flex items-center gap-4">
                        <button type="submit" disabled={status === "loading"}
                          className="group relative flex h-12 items-center gap-2.5 overflow-hidden rounded-xl px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                          style={{ background: "linear-gradient(135deg,#0b5a35,#15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                          {status === "loading" ? (
                            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Sending…</>
                          ) : (
                            <><Send className="h-4 w-4" />Send Message<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                          )}
                        </button>
                        <p className="text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>We respect your privacy. No spam, ever.</p>
                      </div>
                    </form>
                  )}
                </div>
              </AnimateIn>

              {/* ── Right column ── */}
              <div className="flex flex-col gap-5">
                {/* Contact info cards */}
                <AnimateIn direction="right">
                  <div className="flex flex-col gap-3">
                    {contactInfo.map(({ icon: Icon, label, value, sub, href, accent, accentRgb }) => (
                      <a key={label} href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                        style={{ background: `rgba(${accentRgb},0.05)`, border: `1px solid rgba(${accentRgb},0.14)` }}>
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                          style={{ background: `rgba(${accentRgb},0.12)` }}>
                          <Icon className="h-5 w-5" style={{ color: accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(165,196,168,0.35)" }}>{label}</p>
                          <p className="truncate text-sm font-bold text-[#e8f5e9]">{value}</p>
                          <p className="text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>{sub}</p>
                        </div>
                        <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 transition-all group-hover:translate-x-0.5"
                          style={{ color: `rgba(${accentRgb},0.35)` }} />
                      </a>
                    ))}
                  </div>
                </AnimateIn>

                {/* Office hours */}
                <AnimateIn direction="right" delay={100}>
                  <div className="rounded-2xl p-5"
                    style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.12)" }}>
                    <div className="mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#4ade80]" />
                      <h3 className="text-sm font-bold text-[#e8f5e9]">Office Hours</h3>
                    </div>
                    {[
                      { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM WAT" },
                      { day: "Saturday",         hours: "10:00 AM – 2:00 PM WAT" },
                      { day: "Sunday",           hours: "Closed" },
                    ].map(({ day, hours }) => (
                      <div key={day} className="flex items-center justify-between py-2"
                        style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}>
                        <span className="text-xs" style={{ color: "rgba(165,196,168,0.60)" }}>{day}</span>
                        <span className={`text-xs font-bold ${hours === "Closed" ? "text-red-400" : "text-[#4ade80]"}`}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </AnimateIn>

                {/* FAQs */}
                <AnimateIn direction="right" delay={200}>
                  <div className="overflow-hidden rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <h3 className="text-sm font-black text-[#e8f5e9]">Common Questions</h3>
                    </div>
                    <div>
                      {faqs.map(({ q, a }, i) => (
                        <details key={q} className="group"
                          style={{ borderBottom: i < faqs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-5 py-4 transition-colors hover:bg-white/3">
                            <span className="text-xs font-bold text-[#e8f5e9]">{q}</span>
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 rotate-90 text-[#4ade80]/40 transition-transform group-open:rotate-[270deg]" />
                          </summary>
                          <p className="px-5 pb-4 pt-1 text-[11px] leading-relaxed" style={{ color: "rgba(165,196,168,0.55)" }}>{a}</p>
                        </details>
                      ))}
                    </div>
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
