import React from "react";
import { UserRound, BadgeCheck, Monitor, MessageSquare, Trophy, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

const steps = [
  { number: "01", title: "Register",      description: "Sign up and complete your profile to join the programme.",                             icon: UserRound,     highlight: false },
  { number: "02", title: "Get Verified",  description: "Verify your identity and get assigned to a polling unit near you.",                    icon: BadgeCheck,    highlight: false },
  { number: "03", title: "Monitor",       description: "Observe all election activities at your polling unit on election day.",                 icon: Monitor,       highlight: false },
  { number: "04", title: "Report",        description: "Capture and submit incidents in real time via the app.",                               icon: MessageSquare, highlight: false },
  { number: "05", title: "Win & Impact",  description: "Top reporting groups in each state earn cash prizes.",                                 icon: Trophy,        highlight: true  },
];

export const ParticipationStepsSection = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <AnimateIn direction="right">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.40)" }}>
          How It Works — 5 Steps
        </p>
      </AnimateIn>

      <ol className="relative flex flex-col gap-0">
        {/* Connecting line */}
        <div aria-hidden className="absolute left-[19px] top-6 h-[calc(100%-52px)] w-px"
          style={{ background: "linear-gradient(to bottom, rgba(74,222,128,0.40), rgba(74,222,128,0.40) 80%, rgba(254,163,9,0.60))" }} />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <AnimateIn key={step.title} direction="right" delay={i * 80}>
              <li className="relative flex items-start gap-4 pb-4 last:pb-0">
                {/* Circle */}
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{
                    background: step.highlight
                      ? "linear-gradient(135deg, #fea309, #f97316)"
                      : "linear-gradient(135deg, rgba(11,90,53,0.8), rgba(21,131,79,0.8))",
                    boxShadow: step.highlight
                      ? "0 4px 16px rgba(254,163,9,0.40)"
                      : "0 4px 16px rgba(11,90,53,0.35), 0 0 0 1px rgba(74,222,128,0.12)",
                  }}
                >
                  <Icon style={{ height: 17, width: 17 }} className="text-white" />
                </div>

                {/* Card */}
                <div
                  className={`group flex-1 rounded-2xl border px-4 py-3 transition-all hover:-translate-y-px ${
                    step.highlight ? "" : ""
                  }`}
                  style={{
                    borderColor: step.highlight ? "rgba(254,163,9,0.22)" : "rgba(74,222,128,0.10)",
                    background: step.highlight
                      ? "linear-gradient(135deg, rgba(254,163,9,0.08), rgba(249,115,22,0.06))"
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tabular-nums"
                      style={{ color: step.highlight ? "#fea309" : "rgba(74,222,128,0.70)" }}>
                      {step.number}
                    </span>
                    <h3 className="text-sm font-bold text-[#e8f5e9]">{step.title}</h3>
                    {step.highlight && (
                      <span className="ml-auto flex items-center gap-1 rounded-full bg-[#fea309] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0d1b12]">
                        <Trophy className="h-2.5 w-2.5" />
                        Reward
                      </span>
                    )}
                    {!step.highlight && (
                      <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" style={{ color: "rgba(74,222,128,0.40)" }} />
                    )}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "rgba(165,196,168,0.55)" }}>
                    {step.description}
                  </p>
                </div>
              </li>
            </AnimateIn>
          );
        })}
      </ol>
    </div>
  );
};
