"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Layers,
  Lock,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  enterprisePlatform,
  productionReliabilityGems,
} from "@/data/enterprisePlatform";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";

export function FlagshipEnterprise() {
  const [activeTabId, setActiveTabId] = useState(enterprisePlatform.tabs[0].id);
  const activeTab =
    enterprisePlatform.tabs.find((t) => t.id === activeTabId) ??
    enterprisePlatform.tabs[0];

  return (
    <section id="flagship" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <Lock className="h-3.5 w-3.5" />
              {enterprisePlatform.badge}
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {enterprisePlatform.title}
            </h2>
            <p
              className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {enterprisePlatform.subtitle}
            </p>
          </div>

          <Link
            href={`/projects/${enterprisePlatform.slug}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-teal-500/35 bg-teal-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-teal-400 transition-colors hover:bg-teal-500/20"
          >
            Full Case Study + OWASP &amp; Benchmarks
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Main Flagship Case Study Card */}
        <SpotlightCard hoverLift={false} className="p-5 sm:p-7">
          {/* Interactive Tab Strip */}
          <div
            className="flex flex-wrap gap-2 border-b pb-4"
            style={{ borderColor: "var(--border-subtle)" }}
            role="tablist"
            aria-label="Enterprise platform modules"
          >
            {enterprisePlatform.tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative rounded-xl px-3.5 py-2 text-left text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "text-[var(--btn-primary-text)]"
                      : "hover:text-teal-400"
                  }`}
                  style={!isActive ? { color: "var(--text-secondary)" } : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="flagship-active-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="btn-primary absolute inset-0 rounded-xl shadow-sm"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span>{tab.shortLabel}</span>
                    <span
                      className={`hidden rounded-md px-1.5 py-0.5 font-mono text-[10px] sm:inline-block ${
                        isActive
                          ? "bg-teal-500/20 text-teal-700"
                          : "bg-teal-500/10 text-teal-400"
                      }`}
                    >
                      {tab.commitsBadge}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              {/* Explicit "My Exact Ownership (I vs. We)" Bar */}
              <div
                className="mb-6 grid gap-3 rounded-xl border p-3.5 sm:grid-cols-3"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "rgba(20, 184, 166, 0.28)",
                }}
              >
                <div>
                  <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                    <UserCheck className="h-3.5 w-3.5" />
                    Context
                  </p>
                  <p className="mt-1 text-xs font-medium">
                    {activeTab.ownership.context}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-teal-400">
                    What I Owned End-to-End
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {activeTab.ownership.ownedEndToEnd}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    Verified Impact
                  </p>
                  <p className="mt-1 text-xs font-semibold text-emerald-400">
                    {activeTab.ownership.impact}
                  </p>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-12">
                {/* Left: Engineering Details */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                        {activeTab.title}
                      </h3>
                      <TechBadge label={activeTab.commitsBadge} variant="teal" />
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div
                        className="rounded-xl border p-4"
                        style={{
                          backgroundColor: "var(--bg-elevated)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                          Challenge
                        </p>
                        <p
                          className="mt-1.5 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {activeTab.challenge}
                        </p>
                      </div>

                      <div
                        className="rounded-xl border p-4"
                        style={{
                          backgroundColor: "var(--bg-elevated)",
                          borderColor: "var(--border-subtle)",
                        }}
                      >
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                          Engineered Solution
                        </p>
                        <p
                          className="mt-1.5 text-sm leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {activeTab.solution}
                        </p>
                      </div>
                    </div>

                    {/* Crisp Engineering Highlights */}
                    <ul className="mt-5 space-y-2.5">
                      {activeTab.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Row */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 pt-4">
                    {activeTab.tech.map((tech) => (
                      <TechBadge key={tech} label={tech} />
                    ))}
                  </div>
                </div>

                {/* Right: Clean Anonymized UI Dashboard Preview */}
                <div className="lg:col-span-5">
                  <div
                    className="h-full rounded-xl border p-4 sm:p-5"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between border-b pb-3"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-teal-400" />
                        <span className="font-mono text-xs font-semibold">
                          {activeTab.preview.headerTitle}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                        <Activity className="h-3 w-3" />
                        {activeTab.preview.statusLabel}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                      {activeTab.preview.kpis.map((kpi) => (
                        <div
                          key={kpi.label}
                          className="rounded-lg border p-2.5"
                          style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-subtle)",
                          }}
                        >
                          <p
                            className="truncate font-mono text-[10px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {kpi.label}
                          </p>
                          <p className="mt-1 font-display text-base font-bold sm:text-lg">
                            {kpi.value}
                          </p>
                          <p className="font-mono text-[10px] text-emerald-400">
                            {kpi.delta}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-3">
                      {activeTab.preview.rows.map((row, idx) => (
                        <div
                          key={row.label}
                          className="rounded-lg border p-3"
                          style={{
                            backgroundColor: "var(--bg-card)",
                            borderColor: "var(--border-subtle)",
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-semibold">
                              {row.label}
                            </span>
                            <span className="shrink-0 rounded bg-teal-500/15 px-1.5 py-0.5 font-mono text-[10px] text-teal-400">
                              {row.status}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[11px]">
                            <span style={{ color: "var(--text-muted)" }}>
                              {row.meta}
                            </span>
                            <span className="font-mono font-semibold text-teal-400">
                              {row.progress}%
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/70">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${row.progress}%` }}
                              transition={{
                                duration: 0.6,
                                delay: 0.1 + idx * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-4 flex items-center justify-between pt-2 font-mono text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-teal-400" />
                        Illustrative anonymized telemetry
                      </span>
                      <span>NDA-Safe</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SpotlightCard>

        {/* Production Reliability & Scale — Hidden Gems Strip */}
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-teal-400" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              Production Reliability &amp; Scale Highlights (Git-Verified)
            </h3>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {productionReliabilityGems.map((gem, idx) => (
              <SpotlightCard
                key={gem.title}
                delay={idx * 0.05}
                className="flex flex-col justify-between p-4"
              >
                <div>
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-teal-400">
                    {gem.category}
                  </span>
                  <h4 className="mt-1.5 font-display text-sm font-bold leading-snug">
                    {gem.title}
                  </h4>
                  <p
                    className="mt-1.5 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {gem.detail}
                  </p>
                </div>
                <p className="mt-3 font-mono text-[10px] font-semibold text-emerald-400">
                  ● {gem.metric}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
