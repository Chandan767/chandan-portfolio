"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Lock,
  TrendingUp,
  Webhook,
  Workflow,
} from "lucide-react";
import { projects } from "@/data/projects";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { LiveGitHubActivity } from "@/components/ui/LiveGitHubActivity";

const iconBySlug: Record<string, React.ElementType> = {
  "ai-stock-analysis-agent": TrendingUp,
  "zoho-neverskip-integration": Webhook,
  "n8n-slack-drive-automation": Workflow,
  "diabetes-prediction-system": BrainCircuit,
};

export function ProjectsShowcase() {
  const featured = projects.filter((p) => p.featuredInGrid);

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            FEATURED SYSTEMS · AGENTIC AI · INTEGRATIONS · ML
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            AI Agents, Enterprise Integrations &amp; ML
          </h2>
          <p
            className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Quantitative LangGraph equity research agents, OAuth 2.0 middleware,
            event-driven workflow automation, and clinical ML pipelines — each
            with architecture trade-offs and interactive demos.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => {
            const Icon = iconBySlug[project.slug] ?? Workflow;
            return (
              <SpotlightCard
                key={project.slug}
                delay={index * 0.08}
                className="flex flex-col p-6"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400">
                        <Icon className="h-5 w-5" />
                      </span>
                      <TechBadge label={project.badge} variant="teal" />
                    </div>

                    <p
                      className="mt-4 font-mono text-[11px] font-medium uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {project.category}
                    </p>

                    <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight">
                      {project.title}
                    </h3>

                    <p
                      className="mt-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.summary}
                    </p>

                    {/* Mini Visual Architecture Flow */}
                    <div
                      className="mt-5 rounded-xl border p-3"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <p
                        className="mb-2 font-mono text-[10px] uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Architecture Pipeline
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.architectureFlow.slice(0, 4).map((step, i) => (
                          <React.Fragment key={step.label}>
                            <span
                              className="rounded-md border px-2 py-1 font-mono text-[10px] font-medium"
                              style={{
                                backgroundColor: "var(--bg-card)",
                                borderColor: "var(--border-subtle)",
                              }}
                            >
                              {step.label}
                            </span>
                            {i < 3 && (
                              <ArrowRight className="h-3 w-3 shrink-0 text-teal-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 5).map((t) => (
                        <TechBadge key={t} label={t} />
                      ))}
                    </div>
                  </div>

                  {/* Case Study CTA + Public Repo or Private Production NDA Badge */}
                  <div
                    className="mt-6 flex items-center justify-between gap-2 border-t pt-4"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-teal-400 transition-colors hover:text-emerald-400"
                    >
                      Case Study &amp; Trade-offs
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>

                    {project.isPrivateProduction ? (
                      <span
                        className="inline-flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px]"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <Lock className="h-3 w-3 text-amber-400" />
                        Private Production (NDA)
                      </span>
                    ) : project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs transition-colors hover:text-teal-400"
                        style={{ color: "var(--text-muted)" }}
                      >
                        GitHub →
                      </a>
                    ) : null}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Live GitHub Activity Strip */}
        <LiveGitHubActivity />
      </div>
    </section>
  );
}
