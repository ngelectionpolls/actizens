"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper, Search, Calendar, Clock, Tag, ArrowRight,
  BookOpen, Bookmark, Share2, ChevronRight, Sparkles, Eye,
} from "lucide-react";
import { PageLayout } from "@/screens/Asif/PageLayout";
import { AnimateIn } from "@/components/AnimateIn";

const categories = ["All", "News", "Updates", "Events", "Reports", "Press"];

const featuredPost = {
  id: 1,
  title: "ASIF Launches Nationwide Election Monitoring Drive for 2027 General Elections",
  excerpt: "Actizens Social Impact Foundation kicks off its most ambitious monitoring initiative yet, recruiting 8,000+ citizen reporters across all 36 states and the FCT to observe, document and report on the credibility of Nigeria's 2027 elections.",
  category: "News",
  author: "ASIF Communications",
  date: "July 15, 2025",
  readTime: "6 min read",
  image: "/images/asif-group-image.png",
  views: "12.4K",
};

const posts = [
  { id: 2, title: "Lagos and Rivers States Lead Funding Drive with Over ₦295M Raised",          excerpt: "Lagos State has reached 100% of its ₦212M target, while Rivers State surpasses 93%, becoming the fastest growing states in the programme.", category: "Updates", author: "ASIF Team",     date: "July 10, 2025",  readTime: "4 min read", image: "/images/Hero-Section-Picture-1.png", views: "8.7K" },
  { id: 3, title: "Training 8,950 Election Observers: How ASIF Prepared Its Reporters",          excerpt: "An inside look at ASIF's intensive training programme for citizen reporters — from online modules to field simulations.",                      category: "Reports",  author: "ASIF Media",    date: "July 5, 2025",   readTime: "5 min read", image: "/images/Hero-Section-Picture-2.png", views: "6.2K" },
  { id: 4, title: "Citizen Reporting App v2 Released: Faster, Smarter, Multilingual",            excerpt: "ASIF's reporter app now supports Hausa, Igbo and Yoruba, with offline-first report submissions and improved photo compression.",               category: "Updates", author: "ASIF Tech",     date: "June 28, 2025",  readTime: "3 min read", image: "/images/Hero-Section-Picture-3.png", views: "5.1K" },
  { id: 5, title: "Press Statement: ASIF Partners with INEC to Strengthen Observer Access",      excerpt: "ASIF has signed a Memorandum of Understanding with INEC ensuring registered reporters have official accreditation on election day.",          category: "Press",    author: "ASIF Legal",    date: "June 20, 2025",  readTime: "4 min read", image: "/images/Hero-Section-Picture-4.png", views: "4.8K" },
  { id: 6, title: "Community Town Hall: ASIF Meets Voters Across 10 States",                     excerpt: "Our team visited Borno, Yobe, Adamawa and 7 other states to meet voters, register reporters and explain the award programme.",                category: "Events",   author: "ASIF Outreach", date: "June 15, 2025",  readTime: "5 min read", image: "/images/asif-group-image.png",         views: "3.9K" },
  { id: 7, title: "Impact Report: How ASIF Changed Election Reporting in 2023",                  excerpt: "Our 2023 retrospective: 17,000+ reports, 11,000 photos, and documented evidence in over 200 election disputes.",                              category: "Reports",  author: "ASIF Research", date: "June 10, 2025",  readTime: "8 min read", image: "/images/Hero-Section-Picture-1.png", views: "9.3K" },
];

const categoryAccents: Record<string, { color: string; rgb: string }> = {
  News:    { color: "#4ade80", rgb: "74,222,128"   },
  Updates: { color: "#60a5fa", rgb: "96,165,250"   },
  Events:  { color: "#c084fc", rgb: "192,132,252"  },
  Reports: { color: "#fb923c", rgb: "251,146,60"   },
  Press:   { color: "#fbbf24", rgb: "251,191,36"   },
  All:     { color: "#a5c4a8", rgb: "165,196,168"  },
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat  = activeCategory === "All" || p.category === activeCategory;
    const matchText = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchText;
  });

  return (
    <PageLayout activePage="News">
      <div style={{ background: "#060d09" }}>

        {/* ── 1. HERO — deep forest black with gold/newsroom feel ── */}
        <section
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(150deg, #060d09 0%, #0a1a0e 50%, #071209 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(11,90,53,0.18) 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(254,163,9,0.08) 0%, transparent 70%)" }} />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-0 opacity-[0.015]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(74,222,128,0.3) 40px, rgba(74,222,128,0.3) 41px)" }} />
            <div aria-hidden className="pointer-events-none absolute bottom-10 right-0 hidden select-none text-[180px] font-black leading-none tracking-tighter lg:block"
              style={{ color: "rgba(74,222,128,0.025)" }}>NEWS</div>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              {/* Left */}
              <div>
                <AnimateIn direction="left">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fea309]/25 bg-[#fea309]/8 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(254,163,9,0.80)" }}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Newsroom
                  </span>
                </AnimateIn>
                <AnimateIn direction="left" delay={100}>
                  <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "#e8f5e9" }}>
                    ASIF <span style={{ color: "#fea309" }}>News &amp;</span><br />Updates
                  </h1>
                </AnimateIn>
                <AnimateIn direction="left" delay={200}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-[15px]" style={{ color: "rgba(165,196,168,0.70)" }}>
                    Stories, updates and reports from ASIF&apos;s mission to strengthen
                    Nigeria&apos;s democracy — citizen reporting, election monitoring, and beyond.
                  </p>
                </AnimateIn>
                <AnimateIn direction="left" delay={300}>
                  <div className="relative mt-7 max-w-sm">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.30)" }} />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search articles…"
                      className="w-full rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "#e8f5e9",
                      }}
                    />
                  </div>
                </AnimateIn>
              </div>

              {/* Featured preview card */}
              <AnimateIn direction="right" delay={200}>
                <Link href={`/news/${featuredPost.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl p-1 shadow-2xl transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.50)]"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                    <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                      <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,9,0.85) 0%, transparent 55%)" }} />
                      <span className="absolute left-3 top-3 rounded-lg bg-[#fea309] px-2.5 py-1 text-[10px] font-bold text-[#0d1b12]">Featured</span>
                    </div>
                    <div className="px-3 pb-3 pt-3">
                      <div className="flex items-center gap-2 text-[10px]" style={{ color: "rgba(255,255,255,0.40)" }}>
                        <Calendar className="h-3 w-3" />{featuredPost.date}
                        <span className="mx-1" style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
                        <Clock className="h-3 w-3" />{featuredPost.readTime}
                      </div>
                      <h2 className="mt-1.5 text-sm font-bold text-white line-clamp-2">{featuredPost.title}</h2>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── 2. FILTER TABS — sticky dark strip ── */}
        <div className="sticky top-0 z-20 px-4 py-3 sm:px-6 lg:px-10"
          style={{ background: "rgba(6,13,9,0.92)", borderBottom: "1px solid rgba(74,222,128,0.08)", backdropFilter: "blur(16px)" }}>
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const a = categoryAccents[cat] ?? categoryAccents["All"];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex h-8 shrink-0 items-center gap-1.5 rounded-full px-4 text-[11px] font-bold transition-all"
                  style={isActive
                    ? { background: `rgba(${a.rgb},0.18)`, color: a.color, border: `1px solid rgba(${a.rgb},0.30)` }
                    : { background: "rgba(255,255,255,0.05)", color: "rgba(165,196,168,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Tag className="h-3 w-3" />
                  {cat}
                </button>
              );
            })}
            <div className="ml-auto shrink-0 text-[11px]" style={{ color: "rgba(165,196,168,0.35)" }}>
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* ── 3. ARTICLES GRID — obsidian-slate ── */}
        <section
          className="px-4 py-12 sm:px-6 lg:px-10"
          style={{ background: "linear-gradient(160deg, #080c10 0%, #0c1018 50%, #07090e 100%)" }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(11,90,53,0.07) 0%, transparent 70%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(96,165,250,0.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative mx-auto max-w-[1400px]">
            {/* Featured full-width */}
            <AnimateIn direction="up">
              <Link href={`/news/${featuredPost.id}`} className="group mb-8 block">
                <div className="overflow-hidden rounded-3xl transition-all hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]">
                    <div className="relative h-64 overflow-hidden lg:h-auto">
                      <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-500 group-hover:scale-103" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(8,12,16,0.70))" }} />
                    </div>
                    <div className="flex flex-col justify-center gap-5 p-8">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl px-3 py-1 text-[10px] font-bold text-white"
                          style={{ backgroundColor: categoryAccents[featuredPost.category]?.color ?? "#4ade80" }}>
                          {featuredPost.category}
                        </span>
                        <span className="rounded-xl px-3 py-1 text-[10px] font-bold"
                          style={{ background: "rgba(254,163,9,0.12)", border: "1px solid rgba(254,163,9,0.25)", color: "#fbbf24" }}>
                          Latest
                        </span>
                      </div>
                      <h2 className="text-xl font-black text-[#e8f5e9] sm:text-2xl">{featuredPost.title}</h2>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(165,196,168,0.65)" }}>{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-[11px]" style={{ color: "rgba(165,196,168,0.45)" }}>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{featuredPost.date}</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featuredPost.readTime}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{featuredPost.views}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#4ade80] transition-all group-hover:gap-2.5">
                          Read More <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Newspaper className="h-8 w-8" style={{ color: "rgba(255,255,255,0.15)" }} />
                </div>
                <p className="text-base font-bold text-[#e8f5e9]">No articles found</p>
                <p className="text-sm" style={{ color: "rgba(165,196,168,0.45)" }}>Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, i) => {
                  const a = categoryAccents[post.category] ?? categoryAccents["All"];
                  return (
                    <AnimateIn key={post.id} direction="up" delay={i * 60}>
                      <Link href={`/news/${post.id}`}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl transition-all hover:-translate-y-1"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="relative h-44 overflow-hidden">
                          <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,9,0.80) 0%, transparent 50%)" }} />
                          <span className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white"
                            style={{ background: `rgba(${a.rgb},0.80)` }}>
                            {post.category}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                          <div className="flex items-center gap-3 text-[10px]" style={{ color: "rgba(165,196,168,0.40)" }}>
                            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                          </div>
                          <h3 className="text-sm font-bold text-[#e8f5e9] line-clamp-2">{post.title}</h3>
                          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "rgba(165,196,168,0.55)" }}>{post.excerpt}</p>
                          <div className="mt-auto flex items-center justify-between pt-3"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <div className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(165,196,168,0.35)" }}>
                              <Eye className="h-3 w-3" />{post.views}
                            </div>
                            <div className="flex items-center gap-3">
                              <button className="transition-colors hover:opacity-80" style={{ color: "rgba(165,196,168,0.30)" }} onClick={(e) => e.preventDefault()}>
                                <Bookmark className="h-3.5 w-3.5" />
                              </button>
                              <button className="transition-colors hover:opacity-80" style={{ color: "rgba(165,196,168,0.30)" }} onClick={(e) => e.preventDefault()}>
                                <Share2 className="h-3.5 w-3.5" />
                              </button>
                              <div className="flex items-center gap-1 text-[11px] font-bold text-[#4ade80] transition-all group-hover:gap-1.5">
                                Read <ChevronRight className="h-3.5 w-3.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimateIn>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── 4. Newsletter — forest-emerald spotlight ── */}
        <section className="px-4 py-10 sm:px-6 lg:px-10"
          style={{ background: "#060d09" }}>
          <AnimateIn direction="up">
            <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #071a0e 0%, #0b5a35 55%, #083d25 100%)",
                boxShadow: "0 0 80px rgba(11,90,53,0.35), 0 0 0 1px rgba(74,222,128,0.08)",
              }}>
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(254,163,9,0.14) 0%, transparent 70%)" }} />

              <div className="relative grid grid-cols-1 items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#fea309]/30 bg-[#fea309]/12 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(254,163,9,0.85)" }}>
                    <BookOpen className="h-3.5 w-3.5" />
                    Newsletter
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">Never Miss an Update</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Get the latest election news, ASIF updates, and impact stories delivered straight to your inbox.
                  </p>
                </div>
                <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff" }}
                  />
                  <button type="submit"
                    className="flex h-12 shrink-0 items-center gap-2 rounded-xl px-6 text-sm font-bold text-[#0d1b12] transition-all hover:-translate-y-0.5"
                    style={{ background: "#fea309", boxShadow: "0 4px 20px rgba(254,163,9,0.40)" }}>
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </AnimateIn>
        </section>

      </div>
    </PageLayout>
  );
}
