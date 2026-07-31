import { AlertTriangle, Banknote, Clock, Shield, Car, FileText, EyeOff, Package, Flag, Trophy, Medal, Sparkles } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";

const reportingItems = [
  { label: "Vote buying",                               icon: Banknote },
  { label: "Ballot snatching & stuffing",               icon: AlertTriangle },
  { label: "Delay in election proceedings",             icon: Clock },
  { label: "Violence",                                  icon: Shield },
  { label: "Late arrival of INEC officials",            icon: Car },
  { label: "Capture & upload INEC Form ECBA",           icon: FileText },
  { label: "Voters intimidation",                       icon: EyeOff },
  { label: "Late arrival of materials",                 icon: Package },
  { label: "Other threats to free & fair elections",    icon: Flag },
];

const prizes = [
  {
    rank: "1st", place: "Gold Champion",
    amount: "₦20,000,000", label: "Twenty Million Naira",
    icon: Trophy,
    gradient: "linear-gradient(135deg, #b8860b, #d4a017, #f0c040)",
    glow: "0 0 50px rgba(240,192,64,0.30)",
    ring: "0 0 0 1px rgba(240,192,64,0.25)",
    badge: { bg: "rgba(240,192,64,0.12)", color: "#f0c040" },
  },
  {
    rank: "2nd", place: "Silver",
    amount: "₦10,000,000", label: "Ten Million Naira",
    icon: Medal,
    gradient: "linear-gradient(135deg, #5a6370, #7a8390, #9ca3af)",
    glow: "0 0 30px rgba(156,163,175,0.15)",
    ring: "",
    badge: { bg: "rgba(156,163,175,0.12)", color: "#9ca3af" },
  },
  {
    rank: "3rd", place: "Bronze",
    amount: "₦5,000,000", label: "Five Million Naira",
    icon: Medal,
    gradient: "linear-gradient(135deg, #7a3510, #a04820, #d97706)",
    glow: "0 0 30px rgba(217,119,6,0.20)",
    ring: "",
    badge: { bg: "rgba(217,119,6,0.12)", color: "#f59e0b" },
  },
];

export const ReportingAndPrizesSection = (): JSX.Element => {
  return (
    <section
      id="the-award"
      className="relative w-full overflow-hidden px-4 py-14 sm:px-6 lg:px-10"
      style={{ background: "linear-gradient(160deg, #080c14 0%, #0d1220 50%, #080a10 100%)" }}
    >
      {/* Background accents */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(11,90,53,0.10) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-[350px] w-[350px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(254,163,9,0.07) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

          {/* ── What You Will Report ── */}
          <AnimateIn direction="left">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(11,90,53,0.25) 0%, rgba(8,20,14,0.90) 100%)", border: "1px solid rgba(74,222,128,0.12)" }}>
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)" }} />
              {/* dot texture */}
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

              <div className="relative flex flex-col gap-6 p-6 sm:p-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(165,196,168,0.60)" }}>
                    Field Reporting
                  </span>
                  <h2 className="mt-3 text-2xl font-black leading-tight text-[#e8f5e9] sm:text-3xl">
                    What You Will Report
                  </h2>
                  <p className="mt-1.5 text-sm" style={{ color: "rgba(165,196,168,0.55)" }}>
                    Capture these incidents in real time from your polling unit.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {reportingItems.map(({ label, icon: Icon }) => (
                    <div key={label}
                      className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all hover:bg-white/6"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                        style={{ background: "rgba(74,222,128,0.10)" }}>
                        <Icon className="h-3.5 w-3.5 text-[#4ade80]" />
                      </div>
                      <span className="text-[11px] font-medium leading-tight" style={{ color: "rgba(232,245,233,0.75)" }}>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" />
                  <p className="text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>
                    All reports are AI-screened then reviewed by our editorial team before being counted.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* ── Prizes ── */}
          <AnimateIn direction="right" delay={100}>
            <div className="flex h-full flex-col rounded-3xl p-6 sm:p-8"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fea309]/25 bg-[#fea309]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(254,163,9,0.85)" }}>
                  <Sparkles className="h-3 w-3" />
                  Prize Pool
                </span>
                <h2 className="mt-3 text-2xl font-black leading-tight text-[#e8f5e9] sm:text-3xl">
                  Prizes For Winning Groups
                </h2>
                <p className="mt-1.5 text-sm" style={{ color: "rgba(165,196,168,0.55)" }}>
                  In every state &amp; FCT — 3 winning groups each.
                </p>
              </div>

              {/* Podium */}
              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
                {/* 2nd */}
                <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl p-5 sm:pb-7"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg" style={{ background: prizes[1].gradient }}>
                    <Medal className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: prizes[1].badge.bg, color: prizes[1].badge.color }}>2nd Place</span>
                  <p className="text-center text-xl font-black text-[#e8f5e9]">{prizes[1].amount}</p>
                  <p className="text-center text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>{prizes[1].label}</p>
                </div>

                {/* 1st — elevated */}
                <div className="relative flex flex-1 flex-col items-center gap-3 overflow-hidden rounded-2xl p-5 sm:pb-10 sm:pt-8"
                  style={{ background: prizes[0].gradient, boxShadow: prizes[0].glow }}>
                  <div aria-hidden className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-inner">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold text-white">🏆 1st Place</span>
                  <p className="text-center text-2xl font-black text-white">{prizes[0].amount}</p>
                  <p className="text-center text-[10px] text-white/65">{prizes[0].label}</p>
                </div>

                {/* 3rd */}
                <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl p-5 sm:pb-7"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg" style={{ background: prizes[2].gradient }}>
                    <Medal className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: prizes[2].badge.bg, color: prizes[2].badge.color }}>3rd Place</span>
                  <p className="text-center text-xl font-black text-[#e8f5e9]">{prizes[2].amount}</p>
                  <p className="text-center text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>{prizes[2].label}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl px-4 py-3"
                style={{ background: "rgba(11,90,53,0.18)", border: "1px solid rgba(74,222,128,0.12)" }}>
                <Trophy className="h-4 w-4 text-[#4ade80]" />
                <p className="text-[11px] font-bold text-[#4ade80]">
                  3 winning groups in each of the 36 States + FCT
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};
