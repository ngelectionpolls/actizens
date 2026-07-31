import { Target, TrendingUp, BarChart3, FileUp, Camera, Flag, Sparkles } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

const fundingMetrics = [
  { icon: Target,     value: "₦1.295B", label: "Total Target",     sub: "Across all states",  pct: null },
  { icon: TrendingUp, value: "₦538.42M",label: "Total Raised",     sub: "Live & growing",     pct: null },
  { icon: BarChart3,  value: "41.6%",   label: "Overall Progress", sub: "Of national target", pct: 41.6 },
];

const participationMetrics = [
  { icon: FileUp, value: "23,450", label: "Reports Uploaded", sub: "From the field" },
  { icon: Camera, value: "19,320", label: "Photos & Videos",  sub: "Evidence captured" },
  { icon: Flag,   value: "37",     label: "States Reporting", sub: "All 36 + FCT" },
];

export const DemocracyImpactMetricsSection = (): JSX.Element => {
  return (
    <section
      id="impact"
      className="relative mx-4 my-10 overflow-hidden rounded-3xl sm:mx-6 lg:mx-8"
      style={{
        background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 50%, #083d25 100%)",
        boxShadow: "0 0 80px rgba(11,90,53,0.30), 0 0 0 1px rgba(74,222,128,0.08)",
      }}
    >
      {/* dot overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      {/* Gold glow — top right */}
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(254,163,9,0.12) 0%, transparent 70%)" }} />
      {/* Bright green glow — bottom left */}
      <div aria-hidden className="pointer-events-none absolute -bottom-16 left-0 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />
      {/* Teal centre */}
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/2 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)" }} />

      <div className="relative px-6 py-12 sm:px-8 lg:px-14 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <AnimateIn direction="left">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/65">
                  <Sparkles className="h-3 w-3" />
                  Live Impact Data
                </span>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                  Building a Transparent Democracy
                </h2>
                <p className="mt-1.5 text-sm text-white/55">Track our collective progress in real time.</p>
              </div>
            </AnimateIn>
            <AnimateIn direction="right">
              <div className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/8 px-4 py-2 sm:self-auto">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
                </span>
                <span className="text-[11px] font-bold text-white/80">Live Data</span>
              </div>
            </AnimateIn>
          </div>

          {/* Metric groups */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <AnimateIn direction="left" delay={100}>
              <div className="rounded-2xl p-6 sm:p-7"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/35">Funding Metrics</p>
                <div className="grid grid-cols-3 gap-5">
                  {fundingMetrics.map(({ icon: Icon, value, label, sub, pct }) => (
                    <div key={label} className="flex flex-col gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition-transform hover:scale-110">
                        <Icon className="text-white" style={{ height: 20, width: 20 }} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white sm:text-xl">{value}</p>
                        <p className="mt-0.5 text-[11px] font-semibold text-white/65">{label}</p>
                        <p className="text-[10px] text-white/30">{sub}</p>
                      </div>
                      {pct !== null && pct !== undefined && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/12">
                          <div className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${pct}%`, background: "linear-gradient(90deg, #4ade80, #22c55e)" }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={100}>
              <div className="rounded-2xl p-6 sm:p-7"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}>
                <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-white/35">Participation Metrics</p>
                <div className="grid grid-cols-3 gap-5">
                  {participationMetrics.map(({ icon: Icon, value, label, sub }) => (
                    <div key={label} className="flex flex-col gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fea309]/15 transition-transform hover:scale-110">
                        <Icon className="text-[#fea309]" style={{ height: 20, width: 20 }} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white sm:text-xl">{value}</p>
                        <p className="mt-0.5 text-[11px] font-semibold text-white/65">{label}</p>
                        <p className="text-[10px] text-white/30">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
};
