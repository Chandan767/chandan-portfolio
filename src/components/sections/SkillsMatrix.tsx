"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cloud, Database, Layout, Server, Shield } from "lucide-react";
import { skillPillars } from "@/data/skills";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";

const iconMap = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  shield: Shield,
};

export function SkillsMatrix() {
  return (
    <section id="skills" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            TECHNICAL STACK · 5 CORE PILLARS
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Skills &amp; Production Tooling
          </h2>
          <p
            className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Battle-tested tools shipped across high-traffic web apps,
            multi-tenant databases, LangGraph AI agents, and automated
            workflows.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon];

            return (
              <SpotlightCard
                key={pillar.title}
                delay={index * 0.06}
                className="p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-teal-400">
                    {pillar.tag}
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <Icon className="h-4 w-4 text-teal-400" />
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                  {pillar.title}
                </h3>
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {pillar.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.skills.map((skill) => (
                    <TechBadge key={skill} label={skill} />
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
