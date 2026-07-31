import { Bot, Eye, FileCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

const STEPS = [
  {
    number: "01", title: "AI Screening",
    description: "Reports are instantly scanned by AI to detect duplicates, spam and invalid submissions.",
    icon: Bot,
    accent: "#4ade80",
    accentRgb: "74,222,128",
  },
  {
    number: "02", title: "Human Review",
    description: "Our editorial team reviews flagged reports for accuracy, clarity and relevance.",
    icon: Eye,
    accent: "#60a5fa",
    accentRgb: "96,165,250",
  },
  {
    number: "03", title: "Evidence Validation",
    description: "Photos, videos and supporting details are cross-checked to confirm authenticity.",
    icon: FileCheck,
    accent: "#c084fc",
    accentRgb: "192,132,252",
  },
  {
    number: "04", title: "Final Approval",
    description: "Verified reports are approved, counted on leaderboards and contribute to state impact scores.",
    icon: BadgeCheck,
    accent: "#fea309",
    accentRgb: "254,163,9",
  },
];

export const ReportVerificationSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 lg:px-10"
      style={{ background: "linear-gradient(160deg, #07080f 0%, #0e0b18 50%, #080710 100%)" }}
    >
      {/* Indigo glow */}
      <div aria-hidden className="pointer-events-none absolute -right-20 top-0 h-[450px] w-[450px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,90,53,0.08) 0%, transparent 70%)" }} />
      {/* Subtle hex grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(192,132,252,0.8) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <AnimateIn direction="left">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c084fc]/20 bg-[#c084fc]/6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "rgba(192,132,252,0.75)" }}>
                Verification Process
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#e8f5e9] sm:text-3xl lg:text-4xl">
                How Reports Are Verified
              </h2>
              <p className="mt-1.5 text-sm" style={{ color: "rgba(165,196,168,0.55)" }}>
                Every submission goes through a rigorous 4-stage review pipeline.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn direction="right">
            <div className="hidden items-center gap-3 rounded-2xl px-5 py-3 sm:flex"
              style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.14)" }}>
              <BadgeCheck className="h-6 w-6 text-[#4ade80]" />
              <div>
                <p className="text-2xl font-black leading-none text-[#4ade80]">100%</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(165,196,168,0.45)" }}>Verified Reports</p>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Pipeline */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AnimateIn key={step.title} direction="up" delay={idx * 100}>
                <div className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: `rgba(${step.accentRgb},0.04)`, border: `1px solid rgba(${step.accentRgb},0.12)` }}>
                  {/* Colored top bar */}
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ backgroundColor: step.accent }} />

                  {/* Step badge */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg px-2.5 py-1 text-[10px] font-bold"
                      style={{ background: `rgba(${step.accentRgb},0.12)`, color: step.accent }}>
                      Step {step.number}
                    </span>
                    {/* Progress dots */}
                    <div className="flex gap-1" aria-hidden>
                      {STEPS.map((_, i) => (
                        <div key={i} className="h-1.5 w-1.5 rounded-full transition-all"
                          style={{ background: i <= idx ? step.accent : "rgba(255,255,255,0.08)" }} />
                      ))}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `rgba(${step.accentRgb},0.12)` }}>
                    <Icon style={{ width: 26, height: 26, color: step.accent }} strokeWidth={1.75} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#e8f5e9]">{step.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed" style={{ color: "rgba(165,196,168,0.55)" }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector (desktop) */}
                  {idx < STEPS.length - 1 && (
                    <div aria-hidden
                      className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full lg:flex"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <ArrowRight className="h-3 w-3" style={{ color: "rgba(255,255,255,0.25)" }} />
                    </div>
                  )}
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
