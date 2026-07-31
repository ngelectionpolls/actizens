"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const initial: Record<string, string> = {
    up:    "opacity-0 translate-y-8",
    left:  "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    none:  "opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`${initial[direction]} ${visible ? "!opacity-100 !translate-x-0 !translate-y-0" : ""} ${className}`}
      style={{
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
