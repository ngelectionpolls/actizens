"use client";

import { UserPlus } from "lucide-react";
import {
  registrationDateLabel, registrationTimeLabel,
  type RecentRegistrationFeed,
} from "@/lib/recent-eyewitness-registrations";
import type { RegistrationFeedStatus } from "@/hooks/useRecentEyewitnessRegistrations";

interface Props {
  feed: RecentRegistrationFeed | null;
  status: RegistrationFeedStatus;
  onRetry: () => void;
}

export function EyewitnessRegistrationTicker({ feed, status, onRetry }: Props) {
  const ready = status === "live" && feed && feed.registrations.length > 0;
  return (
    <div aria-label="Recent eyewitness registrations" className="mt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#a5c4a8]">
          <span className={`h-2 w-2 rounded-full ${ready ? "bg-green-400 motion-safe:animate-pulse" : "bg-white/40"}`} />
          {ready ? "Live" : status === "loading" ? "Loading" : "Registrations"}
        </span>
        <span className="text-xs text-[#a5c4a8]">Eyewitness registrations across Nigeria</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-3">
        {ready ? (
          <div className="registration-ticker flex items-center">
            {[false, true].map((duplicate) => (
              <div key={String(duplicate)} aria-hidden={duplicate || undefined} className="flex items-center">
                {feed.registrations.map((registration, index) => (
                  <span key={`${registration.registeredAt}-${index}`} className="inline-flex items-center gap-1.5 whitespace-nowrap px-5 text-xs text-[#a5c4a8]">
                    <UserPlus className="mr-1 h-3.5 w-3.5 text-[#fea309]" aria-hidden />
                    <time dateTime={registration.registeredAt} title={registrationDateLabel(registration.registeredAt)} className="font-semibold text-[#a5c4a8]">
                      {registrationTimeLabel(registration.registeredAt, Date.parse(feed.fetchedAt))}
                    </time>
                    <strong className="text-[#4ade80]">{registration.firstName}{registration.lastInitial ? ` ${registration.lastInitial}.` : ""}</strong>
                    <span>registered · Assigned to</span>
                    <strong className="text-[#e8f5e9]">{registration.state === "FCT" ? "FCT" : `${registration.state} State`}</strong>
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p role={status === "unavailable" ? "alert" : "status"} className="px-5 text-xs leading-relaxed text-[#a5c4a8]">
            {status === "loading" ? "Loading recent eyewitness registrations…" :
              status === "empty" ? "No completed eyewitness profiles with matched coverage locations are available yet." :
                <>Recent eyewitness registrations are unavailable.{" "}
                  <button type="button" onClick={onRetry} className="font-bold text-white underline focus:outline-none focus:ring-2 focus:ring-[#4ade80]">Try again</button>
                </>}
          </p>
        )}
      </div>
      <p className="mt-2 text-[10px] leading-relaxed text-[#a5c4a8]/70">
        NGelectionpolls · Completed profiles with matched coverage locations · Newest account registrations first · Refreshes every 30 seconds
      </p>
    </div>
  );
}