"use client";

import { useEffect, useState } from "react";
import type { RecentRegistrationFeed } from "@/lib/recent-eyewitness-registrations";

export type RegistrationFeedStatus = "loading" | "live" | "empty" | "unavailable";
interface FeedState {
  feed: RecentRegistrationFeed | null;
  status: RegistrationFeedStatus;
}

export function useRecentEyewitnessRegistrations() {
  const [state, setState] = useState<FeedState>({ feed: null, status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let pending = false;
    let controller: AbortController | undefined;
    async function load() {
      if (pending) return;
      pending = true;
      const request = new AbortController();
      controller = request;
      const timeout = window.setTimeout(() => request.abort(), 15_000);
      try {
        const response = await fetch("/api/eyewitness-registrations/recent", {
          cache: "no-store", signal: request.signal,
        });
        if (!response.ok) throw new Error("Registration feed unavailable");
        const feed: RecentRegistrationFeed = await response.json();
        if (!disposed) setState({ feed, status: feed.registrations.length ? "live" : "empty" });
      } catch {
        if (!disposed) setState({ feed: null, status: "unavailable" });
      } finally {
        window.clearTimeout(timeout);
        pending = false;
      }
    }
    setState({ feed: null, status: "loading" });
    void load();
    const interval = window.setInterval(() => void load(), 30_000);
    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(interval);
    };
  }, [attempt]);

  return { ...state, retry: () => setAttempt((value) => value + 1) };
}