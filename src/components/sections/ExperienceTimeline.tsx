"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";

const milestones = [
  {
    period: "PRODUCTION OWNERSHIP · FLAGSHIP",
    role: "Full-Stack Platform Engineer — Enterprise EdTech SaaS",
    summary:
      "Lead contributor (#1 with 967+ commits) owning full-stack architecture across 161 PostgreSQL models, 88 API modules, 730+ React/TypeScript UI modules, Redis L1/L2 caching, and AWS EC2/RDS/S3 deployments serving 15+ campuses.",
    highlights: [
      "Built Learning Analytics Center (166+ commits) and Educator Growth / Enterprise BI (177+ commits)",
      "Eliminated RDS auth bottlenecks with L1 in-memory + L2 Redis caching and PgBouncer directUrl tuning",
      "Automated AWS EC2 + Capacitor iOS/Android CI/CD pipelines and led OWASP security auditing",
    ],
    tags: ["TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "AWS"],
  },
  {
    period: "ENTERPRISE INTEGRATIONS & OPS",
    role: "API Middleware & Workflow Automation Engineer",
    summary:
      "Designed resilient OAuth 2.0 middleware bridging Zoho CRM/People with NeverSkip School ERP using idempotent upserts, alongside event-driven n8n automation pipelines connecting Slack and Google Drive.",
    highlights: [
      "Eliminated manual cross-platform data entry and duplicate student/staff records",
      "Built webhook-driven n8n workflows with custom JS Code Nodes and instant Slack thread confirmations",
    ],
    tags: ["OAuth 2.0", "REST APIs", "n8n", "Webhooks", "Slack API", "Google Drive API"],
  },
  {
    period: "APPLIED AI & QUANTITATIVE SYSTEMS",
    role: "AI Agent & Machine Learning Builder",
    summary:
      "Architected an NSE/BSE quantitative AI stock research agent using LangGraph, FastAPI, PostgreSQL, and dual scoring engines, plus a Balanced Random Forest clinical diabetes screening system.",
    highlights: [
      "Engineered quantitative-first LangGraph synthesis with pluggable Yahoo Finance / Dhan / Zerodha feeds",
      "Trained and deployed Balanced Random Forest classifier achieving 76.6% accuracy & 76.7% recall",
    ],
    tags: ["Python", "FastAPI", "LangGraph", "Scikit-learn", "Docker"],
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            <Briefcase className="h-3.5 w-3.5" />
            ENGINEERING TRACK RECORD
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ownership &amp; Impact Timeline
          </h2>
          <p
            className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            A scannable view of production systems shipped, integrations
            automated, and AI pipelines engineered.
          </p>
        </motion.div>

        <div className="relative space-y-5 pl-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-teal-500/70 before:via-zinc-700 before:to-transparent">
          {milestones.map((item, idx) => (
            <div key={item.role} className="relative">
              {/* Timeline Dot */}
              <span className="absolute top-6 -left-[22px] flex h-3.5 w-3.5 items-center justify-center rounded-full border border-teal-400 bg-[#09090B]">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              </span>

              <SpotlightCard delay={idx * 0.08} hoverLift={false} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-400">
                    {item.period}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">
                  {item.role}
                </h3>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.summary}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {item.highlights.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} />
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
