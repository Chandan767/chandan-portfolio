"use client";

import React from "react";
import { Database, GitCommitHorizontal, Globe, Server } from "lucide-react";
import { profile } from "@/data/profile";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MetricCounter } from "@/components/ui/MetricCounter";

const iconMap = {
  git: GitCommitHorizontal,
  database: Database,
  server: Server,
  globe: Globe,
};

export function ImpactBentoGrid() {
  return (
    <section className="py-8" aria-label="Verified engineering scale">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profile.impactMetrics.map((metric, index) => {
            const Icon = iconMap[metric.icon as keyof typeof iconMap] ?? Server;
            const isProduction = metric.icon === "globe";

            return (
              <SpotlightCard
                key={metric.label}
                delay={index * 0.06}
                className="p-5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase tracking-widest ${
                      isProduction ? "text-emerald-400" : "text-teal-400"
                    }`}
                  >
                    {metric.badge}
                  </span>
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        isProduction ? "text-emerald-400" : "text-teal-400"
                      }`}
                    />
                  </span>
                </div>

                <div className="mt-4">
                  <div className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                    <MetricCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      className="gradient-text"
                    />
                  </div>
                  <p className="mt-1 text-sm font-semibold">{metric.label}</p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {metric.sublabel}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
