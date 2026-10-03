"use client";

import { useEffect, useState } from "react";
import type { ReporterCoverage } from "@/lib/reporter-coverage";

export function useReporterCoverage() {
  const [coverage, setCoverage] = useState<ReporterCoverage | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let disposed = false;
    let pending = false;
    let controller: AbortController | undefined;

    async function load() {
      if (pending) return;
      pending = true;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 15_000);
      try {
        const response = await fetch("/api/reporter-coverage", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Coverage unavailable");
        const data: ReporterCoverage = await response.json();
        if (!disposed) {
          setCoverage(data);
          setError(false);
        }
      } catch {
        if (!disposed) {
          setCoverage(null);
          setError(true);
        }
      } finally {
        window.clearTimeout(timeout);
        pending = false;
        if (!disposed) setLoading(false);
      }
    }

    setLoading(true);
    void load();
    const interval = window.setInterval(() => void load(), 60_000);
    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(interval);
    };
  }, [attempt]);

  return { coverage, error, loading, retry: () => setAttempt((value) => value + 1) };
}