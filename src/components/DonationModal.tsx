"use client";

import { useEffect, useRef, useState } from "react";
import { X, Heart, Gift, Check, ShieldCheck, TrendingUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stateName: string;
  statePercentage: number;
  raisedAmount: number;
  targetAmount: number;
}

type Frequency  = "once" | "monthly";
type CurrencyId = "NGN" | "USD" | "GBP" | "EUR" | "CAD";
type Allocation = "hero" | "platform";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CURRENCIES: { id: CurrencyId; flag: string; label: string; sub: string; symbol: string; rate?: string }[] = [
  { id: "USD", flag: "US", label: "USD ($)",  sub: "US Dollar · United States",    symbol: "$",  rate: "$1 = ₦1,530"  },
  { id: "GBP", flag: "GB", label: "GBP (£)",  sub: "Pound Sterling · United Kingdom", symbol: "£",  rate: "£1 = ₦1,950"  },
  { id: "EUR", flag: "EU", label: "EUR (€)",  sub: "Euro · Europe",                symbol: "€",  rate: "€1 = ₦1,660"  },
  { id: "CAD", flag: "CA", label: "CAD (C$)", sub: "Canadian Dollar · Canada",     symbol: "C$", rate: "C$1 = ₦1,130" },
];

const PRESETS: Record<CurrencyId, number[]> = {
  NGN: [1_000, 5_000, 10_000, 25_000, 50_000],
  USD: [10, 25, 50, 100, 250],
  GBP: [10, 20, 50, 100, 200],
  EUR: [10, 25, 50, 100, 250],
  CAD: [10, 25, 50, 100, 250],
};

const ALLOCATIONS: { id: Allocation; label: string; dot: string }[] = [
  { id: "hero",     label: "Donate to the Hero Award Program for the State", dot: "#22c55e" },
  { id: "platform", label: "Donate to Support the Platform",                 dot: "#3b82f6" },
];

const PAYMENT_METHODS = [
  {
    id: "paystack",
    name: "Paystack",
    sub: "Card · Bank · USSD",
    bg: "#1a1a2e",
    iconBg: "#1e3a5f",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect width="24" height="24" rx="4" fill="#0ba4db" />
        <path d="M5 9h14M5 12h10M5 15h7" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    sub: "Card · Bank transfer",
    bg: "#1a1a2e",
    iconBg: "#3d2200",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect width="24" height="24" rx="4" fill="#f5a623" />
        <path d="M12 4c0 4.5-3.5 7-3.5 10s3.5 5.5 3.5 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 7c0 3-2 5-2 8s2 4.5 2 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
        <path d="M17 7c0 3 2 5 2 8s-2 4.5-2 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
      </svg>
    ),
  },
  {
    id: "stripe",
    name: "Stripe",
    sub: "Global cards",
    bg: "#1a1a2e",
    iconBg: "#1e1b4b",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <rect width="24" height="24" rx="4" fill="#635bff" />
        <path d="M11.5 9.5c0-1.1.9-1.5 2-1.5 1.4 0 2.8.5 3.8 1.3l1.4-2.6C17.3 5.7 15.5 5 13.5 5c-2.8 0-5 1.5-5 4.5 0 4.5 5.5 3.5 5.5 5.5 0 1.2-1 1.5-2.3 1.5-1.6 0-3.1-.7-4.2-1.7L6 17.4C7.4 18.7 9.4 19.5 11.7 19.5c3 0 5.3-1.5 5.3-4.5 0-4.7-5.5-3.7-5.5-5.5z" fill="white" />
      </svg>
    ),
  },
];

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmt(amount: number, currency: CurrencyId): string {
  const sym = currency === "NGN" ? "₦" : (CURRENCIES.find((c) => c.id === currency)?.symbol ?? "$");
  return sym + amount.toLocaleString();
}

function fmtNGN(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DonationModal({
  isOpen, onClose,
  stateName, statePercentage, raisedAmount, targetAmount,
}: DonationModalProps) {
  // Form state
  const [frequency,  setFrequency]  = useState<Frequency>("once");
  const [diaspora,   setDiaspora]   = useState(false);
  const [currency,   setCurrency]   = useState<CurrencyId>("USD");
  const [preset,     setPreset]     = useState<number | null>(null);
  const [custom,     setCustom]     = useState("");
  const [allocation, setAllocation] = useState<Allocation>("hero");
  const [message,    setMessage]    = useState("");
  const [method,     setMethod]     = useState<string | null>("paystack");
  const [anonymous,  setAnonymous]  = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // When switching diaspora off, revert to NGN
  useEffect(() => {
    if (!diaspora) { setCurrency("NGN"); setPreset(null); setCustom(""); }
    else           { setCurrency("USD"); setPreset(null); setCustom(""); }
  }, [diaspora]);

  // Reset when currency changes
  useEffect(() => { setPreset(null); setCustom(""); }, [currency]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) {
      // Full reset
      setFrequency("once"); setDiaspora(false); setCurrency("USD");
      setPreset(null); setCustom(""); setAllocation("most");
      setMessage(""); setMethod("paystack"); setAnonymous(false);
      setSubmitted(false); setLoading(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeCurrency  = diaspora ? currency : "NGN";
  const sym             = activeCurrency === "NGN" ? "₦" : (CURRENCIES.find((c) => c.id === currency)?.symbol ?? "$");
  const presets         = PRESETS[activeCurrency];
  const selectedAmount  = preset ?? (custom ? parseFloat(custom) : null);
  const rateNote        = diaspora ? CURRENCIES.find((c) => c.id === currency)?.rate : null;
  const canDonate       = selectedAmount !== null && selectedAmount > 0 && method !== null;

  const handleDonate = () => {
    if (!canDonate) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // ─── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        ref={overlayRef}
        onClick={handleOverlay}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      >
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0d1f12] p-8 text-center shadow-2xl">
          <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/20 ring-4 ring-[#22c55e]/30">
            <Check className="h-9 w-9 text-[#22c55e]" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Thank you! 🎉</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Your donation of <span className="font-bold text-[#22c55e]">{selectedAmount ? fmt(selectedAmount, activeCurrency) : "—"}</span> to <span className="font-bold text-white">{stateName}</span> is being processed. Every naira helps deploy trained election observers across Nigeria.
          </p>
          <div className="mt-6 rounded-xl bg-white/5 p-4 text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#22c55e]">Your impact</p>
            <p className="mt-1.5 text-sm text-white/70">Field reporters empowered · Election transparency strengthened · Democracy protected.</p>
          </div>
          <div className="mt-5 flex flex-col gap-2.5">
            <button onClick={onClose} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#22c55e] text-sm font-bold text-[#0a1a0d] transition hover:bg-[#16a34a]">
              <Heart className="h-4 w-4" /> Back to Map
            </button>
            <button onClick={() => setSubmitted(false)} className="h-11 w-full rounded-xl border border-white/10 text-sm font-semibold text-white/60 transition hover:border-white/20 hover:text-white">
              Make another donation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main modal ────────────────────────────────────────────────────────────
  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-[#0d1f12] shadow-2xl"
           style={{ maxHeight: "min(92vh, 780px)" }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="shrink-0 border-b border-white/8 px-6 pt-6 pb-5">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-3 pr-10">
            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[#22c55e]" />
            <div>
              <h2 className="text-lg font-extrabold leading-tight text-white">Donate to {stateName}</h2>
              <p className="mt-0.5 text-[12px] leading-relaxed text-white/50">
                Support democracy — your gift funds field reporters, verification and nationwide election coverage.
              </p>
            </div>
          </div>

          {/* State progress strip */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#22c55e] transition-all duration-700"
                     style={{ width: `${Math.min(statePercentage, 100)}%` }} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-white/40">
              <TrendingUp className="h-3 w-3 text-[#22c55e]" />
              <span className="font-semibold text-[#22c55e]">{statePercentage}%</span>
              <span>funded · {fmtNGN(raisedAmount)} raised</span>
            </div>
          </div>
        </div>

        {/* ── Scrollable form ──────────────────────────────────────────────── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* Give once / Monthly */}
          <div>
            <div className="flex overflow-hidden rounded-full bg-white/8 p-1">
              {(["once", "monthly"] as Frequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold transition-all duration-200 ${
                    frequency === f
                      ? "bg-[#22c55e] text-[#0a1a0d] shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {f === "monthly" && <Heart className="h-3.5 w-3.5 fill-current" />}
                  {f === "once" ? "Give once" : "Monthly"}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-[11px] text-white/40">
              Boost <span className="font-semibold text-[#22c55e]">your impact</span> by giving monthly ↗
            </p>
          </div>

          {/* Diaspora checkbox */}
          <button
            type="button"
            onClick={() => setDiaspora((v) => !v)}
            className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
              diaspora
                ? "border-[#22c55e]/50 bg-[#22c55e]/8"
                : "border-white/10 bg-white/4 hover:border-white/20"
            }`}
          >
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
              diaspora ? "border-[#22c55e] bg-[#22c55e]" : "border-white/30"
            }`}>
              {diaspora && <Check className="h-3 w-3 text-[#0a1a0d]" strokeWidth={3} />}
            </div>
            <div>
              <p className="text-sm font-bold text-white">I'm donating from the diaspora</p>
              <p className="mt-0.5 text-[11px] leading-snug text-white/50">
                Tick this to complete your donation in your own currency — US Dollars, Pounds Sterling, Euros or Canadian Dollars.
              </p>
            </div>
          </button>

          {/* Currency selector (diaspora only) */}
          {diaspora && (
            <div>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Your Currency</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CURRENCIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCurrency(c.id)}
                    className={`flex flex-col rounded-xl border px-3 py-2.5 text-left transition-all ${
                      currency === c.id
                        ? "border-[#22c55e] bg-[#22c55e]/10"
                        : "border-white/10 bg-white/4 hover:border-white/20"
                    }`}
                  >
                    <p className={`text-xs font-bold ${currency === c.id ? "text-[#22c55e]" : "text-white"}`}>
                      <span className="mr-1 text-[10px] opacity-70">{c.flag}</span>{c.label}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-tight text-white/40">{c.sub}</p>
                  </button>
                ))}
              </div>
              {rateNote && (
                <p className="mt-2 text-[11px] text-white/40">
                  Estimated rate: <span className="font-semibold text-white/60">{rateNote}.</span>
                </p>
              )}
            </div>
          )}

          {/* Amount presets */}
          <div>
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Choose an Amount{diaspora ? ` (in ${activeCurrency === "NGN" ? "₦ NGN" : sym + " " + activeCurrency})` : ""}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setPreset(amt); setCustom(""); }}
                  className={`rounded-xl border py-2.5 text-sm font-bold transition-all ${
                    preset === amt
                      ? "border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]"
                      : "border-white/12 bg-white/5 text-white/70 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {fmt(amt, activeCurrency)}
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className={`mt-2.5 flex overflow-hidden rounded-xl border bg-white/5 transition-all focus-within:border-[#22c55e]/60 focus-within:bg-[#22c55e]/5 ${
              custom && !preset ? "border-[#22c55e]/50" : "border-white/12"
            }`}>
              <span className="flex items-center border-r border-white/10 px-3.5 text-sm font-bold text-white/40">{sym}</span>
              <input
                type="number"
                min={0}
                placeholder="Enter a custom amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setPreset(null); }}
                className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white placeholder:text-white/25 outline-none"
              />
            </div>
          </div>

          {/* Allocate to */}
          <div>
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Allocate To</p>
            <div className="grid grid-cols-2 gap-2">
              {ALLOCATIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAllocation(a.id)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${
                    allocation === a.id
                      ? "border-[#22c55e]/60 bg-[#22c55e]/10"
                      : "border-white/10 bg-white/4 hover:border-white/20"
                  }`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: a.dot }} />
                  <span className={`text-[12px] font-semibold ${allocation === a.id ? "text-[#22c55e]" : "text-white/70"}`}>
                    {a.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Leave a Message <span className="normal-case font-normal tracking-normal">(optional)</span>
            </p>
            <textarea
              rows={3}
              placeholder="A word of encouragement for the team..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-[#22c55e]/50 focus:bg-[#22c55e]/5"
            />
          </div>

          {/* Payment method */}
          <div>
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">Payment Method</p>
            <div className="grid grid-cols-3 gap-2.5">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setMethod(pm.id)}
                  className={`relative flex flex-col items-start gap-2 rounded-xl border p-3.5 text-left transition-all ${
                    method === pm.id
                      ? "border-[#22c55e]/60 bg-[#22c55e]/8"
                      : "border-white/10 bg-white/4 hover:border-white/20"
                  }`}
                >
                  {/* Check badge */}
                  {method === pm.id && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#22c55e]">
                      <Check className="h-2.5 w-2.5 text-[#0a1a0d]" strokeWidth={3} />
                    </span>
                  )}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8">
                    {pm.icon}
                  </div>
                  <div>
                    <p className={`text-[12px] font-bold ${method === pm.id ? "text-[#22c55e]" : "text-white"}`}>{pm.name}</p>
                    <p className="text-[10px] text-white/40">{pm.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Anonymous checkbox */}
          <button
            type="button"
            onClick={() => setAnonymous((v) => !v)}
            className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
              anonymous
                ? "border-[#22c55e]/40 bg-[#22c55e]/6"
                : "border-white/10 bg-white/4 hover:border-white/20"
            }`}
          >
            <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
              anonymous ? "border-[#22c55e] bg-[#22c55e]" : "border-white/30"
            }`}>
              {anonymous && <Check className="h-3 w-3 text-[#0a1a0d]" strokeWidth={3} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Don't display my name or profile publicly as a donor on the platform</p>
              <p className="mt-0.5 text-[11px] text-white/40">Your gift will be recorded as "Anonymous" anywhere donors are shown.</p>
            </div>
          </button>

          {/* Bottom spacer so CTA doesn't overlap last item */}
          <div className="h-1" />
        </div>

        {/* ── Sticky CTA footer ────────────────────────────────────────────── */}
        <div className="shrink-0 border-t border-white/8 bg-[#0d1f12] px-6 py-4">
          <button
            type="button"
            onClick={handleDonate}
            disabled={!canDonate || loading}
            className="group relative flex h-13 h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#22c55e] text-sm font-bold text-[#0a1a0d] shadow-lg shadow-[#22c55e]/20 transition-all hover:bg-[#16a34a] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a1a0d]/30 border-t-[#0a1a0d]" />
                Processing…
              </span>
            ) : (
              <>
                <Heart className="h-4 w-4" />
                {selectedAmount && selectedAmount > 0
                  ? `Donate ${fmt(selectedAmount, activeCurrency)}`
                  : "Donate"}
              </>
            )}
          </button>

          <div className="mt-2.5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#22c55e]" />
            <p className="text-[10px] text-white/30">
              Secure checkout via your selected gateway. This is a demonstration — no real charge is made.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
