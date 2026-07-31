import { ArrowRight, Play, Users, MapPin, Star } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

const highlights = [
  { icon: Users, value: "20", label: "Citizens per polling unit", color: "#4ade80" },
  { icon: MapPin, value: "37", label: "States & FCT covered",    color: "#fea309" },
];

export const AwardOverviewSection = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-6">
      {/* Eyebrow */}
      <AnimateIn direction="left">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#fea309]/25 bg-[#fea309]/8 px-3 py-1.5">
          <Star className="h-3.5 w-3.5 fill-[#fea309] text-[#fea309]" />
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(254,163,9,0.85)" }}>
            About the Award
          </span>
        </div>
      </AnimateIn>

      <AnimateIn direction="left" delay={100}>
        <h2 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl" style={{ color: "#e8f5e9" }}>
          What is the{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-[#4ade80]">Active Citizens</span>
            <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full" style={{ background: "rgba(74,222,128,0.35)" }} />
          </span>{" "}
          Hero Award?
        </h2>
      </AnimateIn>

      <AnimateIn direction="left" delay={200}>
        <p className="text-sm leading-relaxed sm:text-[15px]" style={{ color: "rgba(165,196,168,0.80)" }}>
          The Active Citizens Hero Award is a nationwide election monitoring initiative by
          Actizens Social Impact Foundation (ASIF). It empowers trained citizens to observe,
          document and report election-day incidents, promote transparency and safeguard the
          democratic process.
        </p>
      </AnimateIn>

      {/* Highlight pills */}
      <div className="flex flex-wrap gap-3">
        {highlights.map(({ icon: Icon, value, label, color }, i) => (
          <AnimateIn key={label} direction="left" delay={300 + i * 100}>
            <div
              className="group flex items-center gap-3 rounded-2xl border px-5 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ borderColor: `${color}20`, background: `rgba(${color === "#4ade80" ? "74,222,128" : "254,163,9"},0.06)` }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `${color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <p className="text-2xl font-black leading-none" style={{ color }}>{value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(165,196,168,0.55)" }}>
                  {label}
                </p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* CTAs */}
      <AnimateIn direction="left" delay={500}>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button type="button"
            className="group relative flex h-11 items-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0b5a35, #15834f)", boxShadow: "0 4px 20px rgba(11,90,53,0.40)" }}>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
          <button type="button"
            className="group flex h-11 items-center gap-2.5 rounded-xl border px-6 text-sm font-bold transition-all hover:-translate-y-0.5"
            style={{ borderColor: "rgba(74,222,128,0.20)", background: "rgba(74,222,128,0.05)", color: "#4ade80" }}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ background: "rgba(74,222,128,0.15)" }}>
              <Play className="h-2.5 w-2.5 translate-x-px fill-[#4ade80] text-[#4ade80]" aria-hidden />
            </span>
            See How It Works
          </button>
        </div>
      </AnimateIn>
    </div>
  );
};
