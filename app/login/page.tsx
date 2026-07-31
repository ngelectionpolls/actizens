"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Target, 
  Trophy, 
  Users, 
  Lightbulb, 
  RefreshCw, 
  ArrowLeft,
  Send
} from 'lucide-react';

interface LeftHeroLayoutProps {
  badge?: string;
  title: string;
  subtitle: string;
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    desc: string;
  }>;
  bottomCard?: React.ReactNode;
}

export default function ASIFAuthFlow({ onNavigateToRegister }: { onNavigateToRegister?: () => void }) {
  const [currentPage, setCurrentPage] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['2', '5', '9', '0', '1', '3']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegisterClick = () => {
    if (onNavigateToRegister) {
      onNavigateToRegister();
    } else {
      window.location.href = '/register';
    }
  };

  const LeftHeroLayout = ({ badge, title, subtitle, features, bottomCard }: LeftHeroLayoutProps) => (
    <div className="relative flex w-full min-h-[620px] flex-col justify-between overflow-hidden rounded-l-2xl bg-gray-50 p-8 text-gray-800 dark:bg-[#0d2010] dark:text-[#e8f5e9] md:w-1/2">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/asif-team.png" 
          alt="ASIF Community" 
          className="h-full w-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-transparent dark:from-[#0d2010] dark:via-[#0d2010]/90 dark:to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* ASIF Logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0">
            <Image src="/images/ASIF-Logo.png" alt="ASIF Logo" width={48} height={48} className="h-full w-full object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="font-league-spartan text-xl font-extrabold leading-none tracking-tight text-[#0F5C3B] dark:text-[#4ade80]">ASIF</span>
            <span className="mt-0.5 font-league-spartan text-[9px] font-bold uppercase leading-tight tracking-wider text-gray-500 dark:text-gray-400">ACTIZENS SOCIAL IMPACT FOUNDATION</span>
          </div>
        </div>

        <div className="my-auto py-6">
          {badge && <p className="mb-1 text-xs font-semibold text-[#0F5C3B] dark:text-[#4ade80]">{badge}</p>}
          <h1 className="mb-2 whitespace-pre-line text-2xl font-extrabold leading-tight text-gray-900 dark:text-[#e8f5e9]">{title}</h1>
          <p className="mb-6 max-w-sm text-xs leading-relaxed text-gray-600 dark:text-[#a5c4a8]">{subtitle}</p>

          <div className="max-w-xs space-y-3">
            {features && features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 rounded-full bg-[#E2EBE6] p-2 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-[#e8f5e9]">{feat.title}</h4>
                  <p className="text-[11px] leading-snug text-gray-500 dark:text-[#a5c4a8]">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {bottomCard && (
          <div className="flex max-w-xs items-center gap-3 rounded-xl border border-gray-200 bg-white/80 p-3 text-xs text-gray-600 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#111f14]/80 dark:text-[#a5c4a8]">
            <div className="rounded-lg bg-[#E2EBE6] p-2 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
              <Users className="h-4 w-4" />
            </div>
            <div>{bottomCard}</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 font-sans text-gray-800 dark:bg-[#0a1a0d] dark:text-[#e8f5e9]">
      <div className="flex w-full max-w-4xl min-h-[620px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-white/8 dark:bg-[#111f14] md:flex-row">

        {/* 1. LOGIN */}
        {currentPage === 'login' && (
          <>
            <LeftHeroLayout
              badge="Welcome Back"
              title={"Continue Making\nan Impact."}
              subtitle="Log in to access your Eyewitness Reporter Dashboard, submit reports, track your impact, and stay connected with the ASIF community."
              features={[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, title: "Secure Account", desc: "Your information is protected." },
                { icon: <Target className="w-3.5 h-3.5" />, title: "Track Your Impact", desc: "View your reports and achievements." },
                { icon: <Trophy className="w-3.5 h-3.5" />, title: "Earn Recognition", desc: "Monitor your progress and awards." }
              ]}
              bottomCard={<p>Thousands of citizens are already making a difference with <strong className="text-[#0F5C3B] dark:text-[#4ade80]">ASIF.</strong></p>}
            />

            <div className="flex w-full flex-col justify-between p-8 dark:bg-[#111f14] md:w-1/2 lg:p-12">
              <div className="mx-auto my-auto w-full max-w-sm">
                <div className="mb-6 text-center">
                  <h2 className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">
                    Welcome Back <span>👋</span>
                  </h2>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Sign in to your ASIF account.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-[#a5c4a8]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs focus:border-[#0F5C3B] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-[#a5c4a8]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-9 text-xs focus:border-[#0F5C3B] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex cursor-pointer items-center gap-1.5 text-gray-600 dark:text-[#a5c4a8]">
                      <input type="checkbox" className="rounded text-[#0F5C3B] focus:ring-[#0F5C3B] dark:border-white/20" defaultChecked />
                      Remember me
                    </label>
                    <button type="button" onClick={() => setCurrentPage('forgot')} className="font-semibold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">
                      Forget Password
                    </button>
                  </div>

                  <button type="button" onClick={() => setCurrentPage('verify')}
                    className="w-full rounded-lg bg-[#0F5C3B] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b482e]">
                    Login
                  </button>
                </form>

                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/8" /></div>
                  <span className="relative bg-white px-3 text-[10px] text-gray-400 dark:bg-[#111f14] dark:text-gray-500">Or continue with</span>
                </div>

                <div className="flex justify-center gap-3">
                  <button className="flex h-9 w-10 items-center justify-center rounded-lg border border-gray-200 text-xs font-bold text-blue-600 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5">f</button>
                  <button className="flex h-9 w-10 items-center justify-center rounded-lg border border-gray-200 text-xs font-bold text-red-500 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5">G</button>
                  <button className="flex h-9 w-10 items-center justify-center rounded-lg border border-gray-200 text-xs font-bold text-black hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5">⌘</button>
                </div>

                <p className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account?{' '}
                  <button onClick={handleRegisterClick} className="font-bold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">Register Now</button>
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-[10px] text-gray-400 dark:border-white/8 dark:text-gray-500">
                <span>© 2024 ASIF. All Rights Reserved.</span>
                <div className="flex gap-2">
                  <a href="#privacy" className="hover:underline">Privacy Policy</a>
                  <a href="#terms" className="hover:underline">Terms Of Use</a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 2. FORGOT PASSWORD */}
        {currentPage === 'forgot' && (
          <>
            <LeftHeroLayout
              title={"Trouble signing in?\nWe've got you ."}
              subtitle="Enter your email address and we'll send you a link to reset your password."
              features={[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, title: "Secure Process", desc: "Your account is safe with us." },
                { icon: <Mail className="w-3.5 h-3.5" />, title: "Quick & Easy", desc: "Reset your password in a few clicks." },
                { icon: <Lock className="w-3.5 h-3.5" />, title: "Regain Access", desc: "Get back to making an impact." }
              ]}
            />
            <div className="flex w-full flex-col justify-center p-8 dark:bg-[#111f14] md:w-1/2 lg:p-12">
              <div className="mx-auto w-full max-w-sm">
                <div className="mb-6 text-center">
                  <div className="mb-2 inline-flex rounded-full bg-[#E2EBE6] p-2 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">Forgot <span className="text-[#0F5C3B] dark:text-[#4ade80]">Password?</span></h2>
                  <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">No worries! Enter your email and we'll send a reset link.</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-[#a5c4a8]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs focus:border-[#0F5C3B] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9] dark:placeholder:text-gray-500" />
                    </div>
                  </div>
                  <button type="button" onClick={() => setCurrentPage('check-email')}
                    className="w-full rounded-lg bg-[#0F5C3B] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b482e]">
                    Send Reset Link
                  </button>
                </form>
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/8" /></div>
                  <span className="relative bg-white px-3 text-[10px] text-gray-400 dark:bg-[#111f14] dark:text-gray-500">Remember your password?</span>
                </div>
                <div className="text-center">
                  <button onClick={() => setCurrentPage('login')} className="text-xs font-semibold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">Back to Login</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 3. CHECK YOUR EMAIL */}
        {currentPage === 'check-email' && (
          <div className="my-auto mx-auto flex w-full max-w-lg flex-col items-center justify-center p-8 text-center lg:p-12">
            <div className="mb-3 rounded-full bg-[#E2EBE6] p-3 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">Check Your Email?</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">We&apos;ve sent a password reset link to</p>
            <p className="my-1 text-xs font-bold text-[#0F5C3B] dark:text-[#4ade80]">example@email.com</p>
            <p className="mb-6 text-xs text-gray-400 dark:text-gray-500">The link will expire in 15 minutes for your security</p>

            <div className="mb-4 flex w-full items-center gap-3 rounded-xl border border-[#0F5C3B]/10 bg-[#E2EBE6]/60 p-3 text-left dark:border-[#0b5a35]/25 dark:bg-[#0b5a35]/15">
              <div className="shrink-0 rounded-full bg-white p-2 text-[#0F5C3B] shadow-xs dark:bg-[#162b1a] dark:text-[#4ade80]">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-[#e8f5e9]">Didn&apos;t receive the email?</h4>
                <p className="text-[11px] text-gray-500 dark:text-[#a5c4a8]">Check your spam folder or try again</p>
              </div>
            </div>

            <div className="mb-4 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-2.5 text-xs font-semibold text-[#0F5C3B] hover:border-gray-300 dark:border-white/10 dark:text-[#4ade80] dark:hover:border-white/20">
              <RefreshCw className="h-4 w-4" />
              <span>Resend Link</span>
            </div>

            <button onClick={() => setCurrentPage('reset')}
              className="mb-6 w-full rounded-lg bg-[#0F5C3B] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b482e]">
              Send Reset Link
            </button>

            <div className="relative mb-4 w-full text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/8" /></div>
              <span className="relative bg-white px-3 text-[10px] text-gray-400 dark:bg-[#111f14] dark:text-gray-500">Remember your password?</span>
            </div>

            <button onClick={() => setCurrentPage('login')} className="text-xs font-bold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">Back to Login</button>
          </div>
        )}

        {/* 4. ACCOUNT VERIFICATION (OTP) */}
        {currentPage === 'verify' && (
          <>
            <LeftHeroLayout
              badge="Create Your Account"
              title={"Verify Your Account\nYou're Almost There!"}
              subtitle="We sent 6-digit verification code to user@email.com. Please enter the code below to complete your registration."
              features={[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, title: "Secured & Verified", desc: "We verify every account to keep our community safe." },
                { icon: <Users className="w-3.5 h-3.5" />, title: "Trusted Community", desc: "Connect with other reporters and make an even bigger impact." },
                { icon: <Trophy className="w-3.5 h-3.5" />, title: "Make an Impact", desc: "Your voice matters, Let's build a better society." }
              ]}
              bottomCard={
                <div>
                  <p className="font-bold text-[#0F5C3B] dark:text-[#4ade80]">Your data is safe with us.</p>
                  <p className="text-[10px] text-gray-500 dark:text-[#a5c4a8]">We use industry standard security to protect your information</p>
                </div>
              }
            />
            <div className="flex w-full flex-col justify-center p-8 dark:bg-[#111f14] md:w-1/2 lg:p-12">
              <div className="mx-auto w-full max-w-sm text-center">
                <h2 className="mb-1 flex items-center justify-center gap-1.5 text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">
                  Verify Your Email <Mail className="h-4 w-4 text-[#0F5C3B] dark:text-[#4ade80]" />
                </h2>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Enter the 6-digits code sent to</p>
                <p className="mb-6 text-xs font-bold text-[#0F5C3B] dark:text-[#4ade80]">user@gmail.com</p>

                <div className="mx-auto mb-4 flex max-w-xs justify-between">
                  {otp.map((digit, idx) => (
                    <input key={idx} type="text" maxLength={1} value={digit}
                      onChange={(e) => { const n = [...otp]; n[idx] = e.target.value; setOtp(n); }}
                      className="h-11 w-9 rounded-md border border-gray-300 text-center text-base font-bold focus:border-[#0F5C3B] focus:outline-none dark:border-white/15 dark:bg-[#162b1a] dark:text-[#e8f5e9]"
                    />
                  ))}
                </div>

                <p className="mb-6 text-[10px] text-gray-400 dark:text-gray-500">
                  The code will expire in <span className="font-semibold text-[#0F5C3B] dark:text-[#4ade80]">10:00 Minutes</span>
                </p>

                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/8" /></div>
                  <span className="relative bg-white px-3 text-[10px] text-gray-400 dark:bg-[#111f14] dark:text-gray-500">Didn&apos;t receive the code?</span>
                </div>

                <p className="mb-3 text-xs text-gray-400 dark:text-gray-500">Resend code in <span className="font-semibold text-[#0F5C3B] dark:text-[#4ade80]">00:45</span></p>

                <button onClick={() => setCurrentPage('reset')}
                  className="mb-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#0F5C3B] py-2 text-xs font-semibold text-[#0F5C3B] transition hover:bg-[#E2EBE6] dark:border-[#4ade80]/50 dark:text-[#4ade80] dark:hover:bg-[#0b5a35]/15">
                  <Send className="h-3.5 w-3.5" /> Resend Code
                </button>

                <button onClick={handleRegisterClick} className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign Up
                </button>
              </div>
            </div>
          </>
        )}

        {/* 5. RESET PASSWORD */}
        {currentPage === 'reset' && (
          <>
            <LeftHeroLayout
              title={"Create a new password\nsecure password"}
              subtitle="Your new password must be different from previously used passwords."
              features={[
                { icon: <Lock className="w-3.5 h-3.5" />, title: "Use 8 or more characters", desc: "" },
                { icon: <span className="text-xs font-bold">Aa</span>, title: "Include uppercase and lowercase letters", desc: "" },
                { icon: <span className="text-xs font-bold">123</span>, title: "Add numbers and symbols", desc: "" }
              ]}
            />
            <div className="flex w-full flex-col justify-center p-8 dark:bg-[#111f14] md:w-1/2 lg:p-12">
              <div className="mx-auto w-full max-w-sm">
                <div className="mb-6 text-center">
                  <div className="mb-2 inline-flex rounded-full bg-[#E2EBE6] p-2 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">Reset Password</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Enter your new password below.</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-[#a5c4a8]">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-9 text-xs focus:border-[#0F5C3B] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9]" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-500 dark:text-[#a5c4a8]">Password strength <strong className="text-[#0F5C3B] dark:text-[#4ade80]">Strong</strong></span>
                    <div className="mt-1 grid grid-cols-4 gap-1.5">
                      <div className="h-1 rounded-full bg-[#0F5C3B]" />
                      <div className="h-1 rounded-full bg-[#0F5C3B]" />
                      <div className="h-1 rounded-full bg-[#0F5C3B]" />
                      <div className="h-1 rounded-full bg-gray-200 dark:bg-white/15" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-gray-700 dark:text-[#a5c4a8]">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                      <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-9 text-xs focus:border-[#0F5C3B] focus:outline-none dark:border-white/10 dark:bg-[#162b1a] dark:text-[#e8f5e9]" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button type="button" onClick={() => setCurrentPage('success')}
                    className="mt-2 w-full rounded-lg bg-[#0F5C3B] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b482e]">
                    Reset Password
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button onClick={() => setCurrentPage('login')} className="text-xs font-semibold text-[#0F5C3B] hover:underline dark:text-[#4ade80]">Back to Login</button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 6. SUCCESS */}
        {currentPage === 'success' && (
          <div className="my-auto mx-auto flex w-full max-w-lg flex-col items-center justify-center p-8 text-center lg:p-12">
            <div className="mb-4 rounded-full bg-[#E2EBE6] p-3 text-[#0F5C3B] dark:bg-[#0b5a35]/30 dark:text-[#4ade80]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="mb-2 flex items-center justify-center gap-2 text-xl font-bold text-gray-900 dark:text-[#e8f5e9]">
              Password Reset Successful!
            </h2>
            <p className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">Your password has been reset successfully</p>
            <p className="mb-8 text-xs text-gray-400 dark:text-gray-500">You can login with your new password</p>
            <button onClick={() => setCurrentPage('login')}
              className="w-full rounded-lg bg-[#0F5C3B] py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0b482e]">
              Go to Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
