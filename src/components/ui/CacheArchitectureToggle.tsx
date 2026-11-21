"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2, Zap } from "lucide-react";

const states = {
  before: {
    badge: "BEFORE · DIRECT RDS + SINGLE NODE",
    statusTone: "amber",
    summary:
      "Every API request queried PostgreSQL through PgBouncer for auth & counts, while heavy BI exports risked single-process OOM crashes.",
    path: [
      { step: "Client Request", detail: "6 parallel dashboard calls", bad: false },
      { step: "Single Node Process", detail: "No cluster · OOM risk", bad: true },
      { step: "PgBouncer Pool", detail: "Saturated by auth reads", bad: true },
      { step: "AWS RDS Scan", detail: "Sequential table scans", bad: true },
    ],
    deltas: [
      { label: "Session Verification", value: "RDS Query / req", bad: true },
      { label: "Dashboard P95", value: "~190–450ms", bad: true },
      { label: "Runtime Resilience", value: "Single Process", bad: true },
    ],
  },
  after: {
    badge: "AFTER · L1/L2 REDIS + COMPOSITE INDEXES + PM2 CLUSTER",
    statusTone: "emerald",
    summary:
      "Two-tier L1 memory + L2 Redis caching handles 98%+ of auth checks with zero DB hits; composite indexes accelerate campus reads; PM2 cluster enforces 800MB rolling restarts.",
    path: [
      { step: "Client Request", detail: "ALB + Nginx rate-limited", bad: false },
      { step: "PM2 Cluster Mode", detail: "800MB rolling restarts", bad: false },
      { step: "L1 + L2 Redis", detail: "Zero-DB session hit (~1ms)", bad: false },
      { step: "Indexed RDS", detail: "(campus, checklistId) scan", bad: false },
    ],
    deltas: [
      { label: "Session Verification", value: "Zero-DB Redis Hit", bad: false },
      { label: "Dashboard P95", value: "~42ms (-78%)", bad: false },
      { label: "Runtime Resilience", value: "PM2 Cluster (0 OOM)", bad: false },
    ],
  },
} as const;

export function CacheArchitectureToggle() {
  const [mode, setMode] = useState<"before" | "after">("after");
  const current = states[mode];

  return (
    <section
      className="mt-8 rounded-2xl border p-6 backdrop-blur-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-teal-400" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              Interactive Performance Teardown
            </h2>
          </div>
          <p className="mt-1 font-display text-lg font-bold">
            Uncached Direct RDS vs. L1/L2 Redis + PM2 Cluster
          </p>
        </div>

        {/* Toggle Switch */}
        <div
          className="inline-flex rounded-xl border p-1"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <button
            type="button"
            onClick={() => setMode("before")}
            className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
              mode === "before"
                ? "bg-amber-500/20 text-amber-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Before (Uncached)
          </button>
          <button
            type="button"
            onClick={() => setMode("after")}
            className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors ${
              mode === "after"
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            After (Production)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-5"
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {current.summary}
          </p>

          {/* Request Flow Path */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
            {current.path.map((node, idx) => (
              <React.Fragment key={node.step}>
                <div
                  className={`flex-1 rounded-xl border p-3.5 ${
                    node.bad
                      ? "border-amber-500/35 bg-amber-500/5"
                      : "border-emerald-500/30 bg-emerald-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold">
                      {node.step}
                    </span>
                    {node.bad ? (
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    )}
                  </div>
                  <p
                    className={`mt-1 font-mono text-[11px] ${
                      node.bad ? "text-amber-400" : "text-teal-400"
                    }`}
                  >
                    {node.detail}
                  </p>
                </div>
                {idx < current.path.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 rotate-90 text-zinc-500 lg:rotate-0" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quantified Delta Strip */}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {current.deltas.map((d) => (
              <div
                key={d.label}
                className="rounded-xl border p-3"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {d.label}
                </p>
                <p
                  className={`mt-1 font-mono text-sm font-bold ${
                    d.bad ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
