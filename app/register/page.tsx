"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NGELECTIONPOLLS_LOGIN_URL } from "@/lib/registration";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  ChevronDown,
  FileText,
  Activity,
  Award,
  Users,
  Leaf,
  GraduationCap,
  Heart,
  Shield,
  Building2,
  PlusCircle,
  Facebook,
} from "lucide-react";

type RoleVariant = "eyewitness" | "reporter" | "generic";

function AsifLogo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b5a35] text-sm font-black text-white">
      A
    </div>
  );
}

export default function RegisterPage() {
  const [variant, setVariant] = useState<RoleVariant>("eyewitness");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", fullName: "", username: "",
    email: "", phone: "", state: "", lga: "", password: "",
    confirmPassword: "", interests: [] as string[], hearAboutUs: "", agreeTerms: false,
  });

  const handleInterestToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter((i) => i !== item)
        : [...prev.interests, item],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) { alert("Passwords do not match"); return; }
  };

  const contentMap = {
    eyewitness: {
      tag: "Register as Eyewitness",
      titleHeader: "Be the Voice.",
      titleAccent: "Drive the Change.",
      subtitle: "Join thousands of citizen reporters across the country who are making a difference through truth, transparency, and action.",
      features: [
        { icon: ShieldCheck, title: "Your Voice Matters", desc: "Report issues in your community and help drive real change." },
        { icon: Activity, title: "Report & Track Your Impact", desc: "Submit reports and track the real change you're making." },
        { icon: Award, title: "Earn Recognition", desc: "Earn points, badges, and awards as you create impact." },
      ],
      badgeType: "quote",
      buttonText: "Create Eyewitness Account",
      cardTitle: "Register as Eyewitness",
      useFirstLastName: true,
      hasExtraFields: true,
    },
    reporter: {
      tag: "Register as Reporter",
      titleHeader: "Report Today.",
      titleAccent: "Create Tomorrow.",
      subtitle: "Create your reporter account to submit reports, track issues in your community, earn recognition, and be part of the movement.",
      features: [
        { icon: FileText, title: "Submit Reports", desc: "Report issues in your community and help drive real change." },
        { icon: Activity, title: "Track Your Impact", desc: "Submit reports and track the real change you're making." },
        { icon: Award, title: "Earn Recognition", desc: "Earn points, badges, and awards as you create impact." },
        { icon: Users, title: "Join a Community", desc: "Connect with other reporters and make an even bigger impact." },
      ],
      badgeType: "safety",
      buttonText: "Create Reporter Account",
      cardTitle: "Register as Reporter",
      useFirstLastName: false,
      hasExtraFields: true,
    },
    generic: {
      tag: "Create Your Account",
      titleHeader: "Join the Movement",
      titleAccent: "Create an Impact",
      subtitle: "Create your ASIF account to become an Eyewitness Reporter, submit reports, track your impact, and earn recognition.",
      features: [
        { icon: ShieldCheck, title: "Be part of a community", desc: "Join thousands of citizens working together for a better society." },
        { icon: Activity, title: "Report & Track Your Impact", desc: "Submit reports and track the real change you're making." },
        { icon: Award, title: "Earn Recognition", desc: "Earn points, badges, and awards as you create impact." },
      ],
      badgeType: "data-safe",
      buttonText: "Create Account",
      cardTitle: "Create Your Account",
      useFirstLastName: true,
      hasExtraFields: false,
    },
  };

  const current = contentMap[variant];

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500 dark:focus:border-[#0b5a35]/60";
  const iconInputClass = "w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500 dark:focus:border-[#0b5a35]/60";
  const selectClass = "w-full appearance-none rounded-lg border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-xs text-gray-600 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#a5c4a8] dark:focus:border-[#0b5a35]/60";
  const labelClass = "mb-1 block text-xs font-medium text-gray-700 dark:text-[#a5c4a8]";

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#fafafa] font-sans text-[#101828] dark:bg-[#0a1a0d] dark:text-[#e8f5e9]">
      <main className="mx-auto w-full max-w-[1340px] px-4 py-6 sm:px-8 sm:py-8">
        {/* Header Logo */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <AsifLogo />
            <div className="flex flex-col">
              <span className="text-sm font-extrabold leading-tight text-[#0b5a35]">ASIF</span>
              <span className="text-[8px] font-semibold leading-tight text-gray-700 dark:text-gray-400">
                ACTIZENS SOCIAL<br />IMPACT FOUNDATION
              </span>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* LEFT SIDE */}
          <div className="relative flex flex-col justify-between py-2 lg:col-span-5">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#0b5a35] dark:text-[#4ade80]">{current.tag}</span>
                <h1 className="mt-1 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#101828] dark:text-[#e8f5e9] sm:text-4xl">
                  {current.titleHeader} <br />
                  <span className="text-[#0b5a35] dark:text-[#4ade80]">{current.titleAccent}</span>
                </h1>
                <p className="mt-3 max-w-md text-xs leading-relaxed text-gray-600 dark:text-[#a5c4a8] sm:text-sm">{current.subtitle}</p>
              </div>

              <div className="space-y-4 pt-2">
                {current.features.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf5f0] text-[#0b5a35] dark:bg-[#0b5a35]/25 dark:text-[#4ade80]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-[#e8f5e9]">{feat.title}</h3>
                        <p className="text-[11px] leading-normal text-gray-500 dark:text-[#a5c4a8]">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-8 flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl p-4 lg:min-h-[360px]">
              <Image
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="ASIF Team"
                fill
                className="object-cover object-center opacity-90 dark:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {current.badgeType === "quote" && (
                <div className="relative z-10 max-w-xs rounded-xl border border-white/40 bg-white/95 p-4 shadow-lg backdrop-blur-xs dark:border-white/10 dark:bg-[#111f14]/95">
                  <p className="text-[11px] italic leading-snug text-gray-700 dark:text-[#a5c4a8]">
                    &ldquo;Every report you submit brings us closer to a more transparent and accountable society.&rdquo;
                  </p>
                  <p className="mt-1 text-xs font-bold text-[#0b5a35] dark:text-[#4ade80]">ASIF Team</p>
                </div>
              )}

              {(current.badgeType === "safety" || current.badgeType === "data-safe") && (
                <div className="relative z-10 flex max-w-xs items-start gap-3 rounded-xl border border-white/40 bg-white/95 p-3.5 shadow-lg backdrop-blur-xs dark:border-white/10 dark:bg-[#111f14]/95">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#edf5f0] text-[#0b5a35] dark:bg-[#0b5a35]/25 dark:text-[#4ade80]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#e8f5e9]">Your data is safe with us.</h4>
                    <p className="mt-0.5 text-[10px] leading-tight text-gray-500 dark:text-[#a5c4a8]">We use industry standard security to protect your information.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE — form */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs dark:border-white/8 dark:bg-[#111f14] dark:shadow-none sm:p-8 lg:col-span-7">
            {/* Role switcher */}
            <div className="mb-6 flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-[#162b1a]">
              {(["eyewitness", "reporter", "generic"] as RoleVariant[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setVariant(role)}
                  className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold capitalize transition-all ${
                    variant === role
                      ? "bg-white text-[#0b5a35] shadow-xs dark:bg-[#0b5a35] dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-white/8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">{current.cardTitle}</h2>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">Fill in the details below to create your account</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-600 dark:border-white/8 dark:bg-[#162b1a] dark:text-gray-300">
                <UserPlus className="h-4 w-4" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name inputs */}
              {current.useFirstLastName ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="text" required placeholder="Enter your first name" value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={iconInputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="text" required placeholder="Enter your last name" value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={iconInputClass} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="text" required placeholder="Enter your full name" value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={iconInputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Username</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="text" required placeholder="Choose a username" value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className={iconInputClass} />
                    </div>
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input type="email" required placeholder="Enter your email address" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={iconInputClass} />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="flex overflow-hidden rounded-lg border border-gray-200 transition focus-within:border-[#0b5a35] dark:border-white/10 dark:focus-within:border-[#0b5a35]/60">
                  <div className="flex shrink-0 items-center gap-1 border-r border-gray-200 bg-gray-50 px-3 text-xs text-gray-600 dark:border-white/10 dark:bg-[#1a3520] dark:text-[#a5c4a8]">
                    <Phone className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                    <span className="text-[11px] font-medium">🇳🇬 +234</span>
                    <ChevronDown className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input type="tel" required placeholder="Enter your phone number" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                </div>
              </div>

              {/* Extra fields */}
              {current.hasExtraFields && (
                <>
                  <div>
                    <label className={labelClass}>State of Residence</label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className={selectClass}>
                        <option value="">Select your state</option>
                        <option value="abuja">FCT Abuja</option>
                        <option value="lagos">Lagos</option>
                        <option value="kano">Kano</option>
                        <option value="rivers">Rivers</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Local Government Area (LGA)</label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <select value={formData.lga} onChange={(e) => setFormData({ ...formData, lga: e.target.value })} className={selectClass}>
                        <option value="">Select your LGA</option>
                        <option value="lga1">Abuja Municipal</option>
                        <option value="lga2">Ikeja</option>
                        <option value="lga3">Port Harcourt</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </>
              )}

              {/* Password */}
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input type={showPassword ? "text" : "password"} required placeholder="Create Password" value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-xs text-gray-900 placeholder-gray-400 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">Use 8 or more characters with a mix of letters, numbers & symbols.</p>
              </div>

              <div>
                <label className={labelClass}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input type={showConfirmPassword ? "text" : "password"} required placeholder="Confirm your password" value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-xs text-gray-900 placeholder-gray-400 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500">
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Extra interest fields */}
              {current.hasExtraFields && (
                <>
                  <div>
                    <label className={labelClass}>
                      Areas of Interest <span className="font-normal text-gray-400 dark:text-gray-500">(Select all that apply)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {[
                        { key: "environment", label: "Environment", icon: Leaf },
                        { key: "education", label: "Education", icon: GraduationCap },
                        { key: "health", label: "Health", icon: Heart },
                        { key: "security", label: "Security", icon: Shield },
                        { key: "infrastructure", label: "Infrastructure", icon: Building2 },
                        { key: "other", label: "Other", icon: PlusCircle },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = formData.interests.includes(item.key);
                        return (
                          <button
                            type="button"
                            key={item.key}
                            onClick={() => handleInterestToggle(item.key)}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-2.5 text-xs transition ${
                              isSelected
                                ? "border-[#0b5a35] bg-[#edf5f0] font-semibold text-[#0b5a35] dark:border-[#4ade80]/50 dark:bg-[#0b5a35]/20 dark:text-[#4ade80]"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-white/10 dark:bg-[#162b1a] dark:text-[#a5c4a8] dark:hover:border-white/20"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Icon className="h-3.5 w-3.5 text-[#0b5a35] dark:text-[#4ade80]" />
                              {item.label}
                            </span>
                            <input type="checkbox" readOnly checked={isSelected} className="rounded border-gray-300 text-[#0b5a35] focus:ring-[#0b5a35] dark:border-white/20" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>How did you hear about us?</label>
                    <div className="relative">
                      <select value={formData.hearAboutUs} onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value })}
                        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-xs text-gray-600 transition focus:border-[#0b5a35] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#a5c4a8] dark:focus:border-[#0b5a35]/60">
                        <option value="">Select an option</option>
                        <option value="social">Social Media</option>
                        <option value="tv">TV / Radio</option>
                        <option value="friend">Friend / Colleague</option>
                        <option value="event">Community Event</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </>
              )}

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="agreeTerms" required checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-gray-300 text-[#0b5a35] focus:ring-[#0b5a35] dark:border-white/20" />
                <label htmlFor="agreeTerms" className="text-[11px] leading-snug text-gray-600 dark:text-[#a5c4a8]">
                  I agree to the{" "}
                  <Link href="/terms" className="font-bold text-[#0b5a35] hover:underline dark:text-[#4ade80]">Terms of Service</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-bold text-[#0b5a35] hover:underline dark:text-[#4ade80]">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="mt-2 w-full cursor-pointer rounded-lg bg-[#0b5a35] py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#084827]">
                {current.buttonText}
              </button>

              {/* Social Login */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/8" /></div>
                <span className="relative bg-white px-3 text-[10px] font-semibold uppercase text-gray-400 dark:bg-[#111f14] dark:text-gray-500">Or sign in with</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button type="button" className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Sign up with Facebook">
                  <Facebook className="h-4 w-4 text-[#1877F2]" />
                </button>
                <button type="button" className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Sign up with Google">
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </button>
                <button type="button" className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5" aria-label="Sign up with Apple">
                  <svg className="h-4 w-4 fill-current text-gray-900 dark:text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.66-1.07 1.73-.93 2.76 1.01.08 2.02-.51 2.64-1.26z" />
                  </svg>
                </button>
              </div>

              <p className="mt-6 pt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link href={NGELECTIONPOLLS_LOGIN_URL} className="font-bold text-[#0b5a35] hover:underline dark:text-[#4ade80]">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-8 w-full border-t border-gray-100 bg-white py-4 text-center dark:border-white/8 dark:bg-[#0d1a0f]">
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Actizens Social Impact Foundation. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
