"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Terminal, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

const accentColorMap = {
  teal: "text-teal-400",
  zinc: "text-zinc-200",
  emerald: "text-emerald-400",
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-14 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Immediate first-paint headline & CTAs (3-second rule) */}
          <div className="lg:col-span-7">
            {/* Availability Pill */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5">
              <span className="status-pulse relative flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] font-medium tracking-wide text-emerald-400 sm:text-xs">
                {profile.availability}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem]">
              Building Scalable{" "}
              <span className="gradient-text">Enterprise Platforms</span>, API
              Integrations &amp; Intelligent Systems.
            </h1>

            {/* Concise Bio */}
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {profile.bio}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#flagship"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-sm transition-opacity hover:opacity-90"
              >
                Explore Flagship Work
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors hover:border-teal-500/50"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                <FileText className="h-4 w-4 text-teal-400" />
                Interactive Resume
              </Link>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors hover:border-teal-500/50 hover:text-teal-400"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors hover:border-teal-500/50 hover:text-teal-400"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Tight Production Snapshot Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-zinc-800 bg-[#0C0C0F] p-1 shadow-2xl shadow-black/40">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

              <div className="rounded-xl bg-[#0C0C0F] p-5 text-zinc-100">
                <div className="flex items-center justify-between border-b border-zinc-800/90 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                      <Terminal className="h-3.5 w-3.5 text-teal-400" />
                      production_snapshot.ts
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    VERIFIED
                  </span>
                </div>

                <div className="mt-4 font-mono text-xs leading-6 sm:text-[13px]">
                  <p className="text-zinc-500">
                    {"// Verified production ownership (NDA-safe)"}
                  </p>
                  <p className="mt-1">
                    <span className="text-zinc-400">export const</span>{" "}
                    <span className="font-semibold text-zinc-100">engineeringScale</span>{" "}
                    <span className="text-zinc-500">= {"{"}</span>
                  </p>

                  <div className="mt-1.5 space-y-1.5 pl-4">
                    {profile.productionSnapshot.map((item) => (
                      <div
                        key={item.key}
                        className="flex flex-wrap items-baseline gap-x-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-zinc-900"
                      >
                        <span className="text-zinc-400">{item.key}:</span>
                        <span className={`font-semibold ${accentColorMap[item.accent]}`}>
                          {item.value}
                        </span>
                        <span className="text-zinc-600">,</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-1.5 text-zinc-500">{"} as const;"}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-800/90 pt-3 font-mono text-[11px] text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                    AWS · PostgreSQL · Redis · LangGraph
                  </span>
                  <span className="text-emerald-400">Zero OOM · PM2</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* About / Availability Context Strip (Recruiter quick-scan row) */}
        <div
          className="mt-10 grid gap-3 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {profile.contextStrip.map((item) => (
            <div key={item.label} className="px-2 py-1">
              <p
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {item.label}
              </p>
              <p className="mt-1 text-xs font-semibold sm:text-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
