"use client";

import { Menu, X, User, LogIn, UserPlus, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { NGELECTIONPOLLS_SIGNUP_URL, NGELECTIONPOLLS_LOGIN_URL } from "@/lib/registration";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigationItems = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "The Award",    href: "/the-award" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "State",        href: "/states" },
  { label: "News",         href: "/news" },
  { label: "Contact",      href: "/contact" },
];

interface MainNavigationSectionProps {
  activePage?: string;
}

export const MainNavigationSection = ({ activePage }: MainNavigationSectionProps): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  const isActive = (href: string) =>
    activePage
      ? activePage === navigationItems.find((n) => n.href === href)?.label
      : pathname === href;

  return (
    <nav
      className="relative z-50 h-14 w-full overflow-visible border-b border-black/6 bg-white/90 backdrop-blur-md dark:border-white/8 dark:bg-[#0a1a0d]/90 sm:h-16"
      style={{ WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-4 pl-72 sm:pl-80 sm:pr-6">

        {/* ── Logo ── */}
        <Link
          href="/"
          aria-label="ASIF Home"
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 sm:left-8"
        >
          <AsifLogo />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#0b5a35]/10 text-[#0b5a35] dark:bg-[#0b5a35]/25 dark:text-[#4ade80]"
                      : "text-[#374151] hover:bg-[#0b5a35]/8 hover:text-[#0b5a35] dark:text-[#c9deca] dark:hover:bg-[#0b5a35]/20 dark:hover:text-[#4ade80]"
                  }`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b5a35] dark:bg-[#4ade80]" />
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop auth + theme ── */}
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <ThemeToggle />

          {/* Divider */}
          <div className="h-5 w-px bg-black/10 dark:bg-white/10" />

          {/* Login */}
          <Link
            href={NGELECTIONPOLLS_LOGIN_URL}
            className="group flex h-9 items-center gap-1.5 rounded-full border border-[#0b5a35]/30 bg-transparent px-4 text-[13px] font-semibold text-[#0b5a35] transition-all duration-200 hover:border-[#0b5a35] hover:bg-[#0b5a35]/8 dark:border-[#4ade80]/30 dark:text-[#4ade80] dark:hover:border-[#4ade80]/70 dark:hover:bg-[#4ade80]/8"
          >
            <LogIn className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            Login
          </Link>

          {/* Register */}
          <Link
            href={NGELECTIONPOLLS_SIGNUP_URL}
            className="group relative flex h-9 items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-[#0b5a35] to-[#15834f] px-5 text-[13px] font-semibold text-white shadow-sm shadow-[#0b5a35]/25 transition-all duration-200 hover:shadow-md hover:shadow-[#0b5a35]/30"
          >
            {/* Sheen */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <UserPlus className="h-3.5 w-3.5" />
            Register Here
          </Link>
        </div>

        {/* ── Mobile right cluster ── */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 ${
              mobileOpen
                ? "border-[#0b5a35]/40 bg-[#0b5a35]/10 text-[#0b5a35] dark:border-[#4ade80]/40 dark:bg-[#4ade80]/10 dark:text-[#4ade80]"
                : "border-black/10 bg-transparent text-[#374151] hover:border-[#0b5a35]/30 hover:bg-[#0b5a35]/8 hover:text-[#0b5a35] dark:border-white/10 dark:text-[#c9deca] dark:hover:bg-[#0b5a35]/20"
            }`}
          >
            {mobileOpen
              ? <X className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`absolute left-0 right-0 top-full z-50 overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-black/6 bg-white/95 px-4 pb-6 pt-2 shadow-xl backdrop-blur-md dark:border-white/8 dark:bg-[#0a1a0d]/95">

          {/* Nav links */}
          <ul className="flex flex-col py-2">
            {navigationItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  {idx > 0 && (
                    <div className="mx-2 h-px bg-black/4 dark:bg-white/5" />
                  )}
                  <Link
                    href={item.href}
                    onClick={(e) => { handleAnchorClick(e, item.href); setMobileOpen(false); }}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-150 ${
                      active
                        ? "bg-[#0b5a35]/10 text-[#0b5a35] dark:bg-[#0b5a35]/25 dark:text-[#4ade80]"
                        : "text-[#1a2e20] hover:bg-[#0b5a35]/6 hover:text-[#0b5a35] dark:text-[#c9deca] dark:hover:bg-[#0b5a35]/15 dark:hover:text-[#4ade80]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {active && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b5a35] dark:bg-[#4ade80]" />
                      )}
                      {!active && <span className="h-1.5 w-1.5 shrink-0" />}
                      {item.label}
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-opacity ${active ? "opacity-60" : "opacity-20"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-3 h-px bg-black/6 dark:bg-white/8" />

          {/* Auth buttons */}
          <div className="flex flex-col gap-2.5">
            <Link
              href={NGELECTIONPOLLS_LOGIN_URL}
              onClick={() => setMobileOpen(false)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#0b5a35]/30 bg-transparent text-sm font-semibold text-[#0b5a35] transition-all hover:border-[#0b5a35] hover:bg-[#0b5a35]/8 dark:border-[#4ade80]/30 dark:text-[#4ade80] dark:hover:bg-[#4ade80]/8"
            >
              <LogIn className="h-4 w-4" />
              Login to your account
            </Link>
            <Link
              href={NGELECTIONPOLLS_SIGNUP_URL}
              onClick={() => setMobileOpen(false)}
              className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#0b5a35] to-[#15834f] text-sm font-semibold text-white shadow-sm shadow-[#0b5a35]/20 transition-all hover:shadow-md hover:shadow-[#0b5a35]/30"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <UserPlus className="h-4 w-4" />
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function AsifLogo() {
  return (
    <div className="relative flex h-72 w-72 shrink-0 items-center justify-center">
      <Image
        src="/images/ASIF-Logo.png"
        alt="ASIF Logo"
        width={288}
        height={288}
        className="h-full w-full object-contain"
        priority
      />
    </div>
  );
}
