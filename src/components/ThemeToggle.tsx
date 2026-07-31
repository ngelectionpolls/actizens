"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-gray-200/60 dark:border-white/10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        group relative flex h-8 w-[60px] shrink-0 items-center rounded-full border
        transition-all duration-300
        ${isDark
          ? "border-[#0b5a35]/50 bg-[#0b5a35]/25"
          : "border-gray-200 bg-gray-100"
        }
      `}
    >
      {/* Track icons */}
      <Sun
        className={`absolute left-1.5 h-4 w-4 transition-all duration-300 ${
          isDark ? "text-white/30" : "text-[#fea309]"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute right-1.5 h-4 w-4 transition-all duration-300 ${
          isDark ? "text-[#4ade80]" : "text-gray-400/50"
        }`}
        aria-hidden="true"
      />

      {/* Thumb */}
      <span
        className={`
          absolute h-6 w-6 rounded-full shadow-sm transition-all duration-300
          ${isDark
            ? "translate-x-[32px] bg-[#0b5a35]"
            : "translate-x-1 bg-white"
          }
        `}
        aria-hidden="true"
      />
    </button>
  );
}
