import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Compass,
  ExternalLink,
  Layers,
  Lock,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { StockAgentDemo } from "@/components/ui/StockAgentDemo";
import { CacheArchitectureToggle } from "@/components/ui/CacheArchitectureToggle";
import { DiabetesSandbox } from "@/components/ui/DiabetesSandbox";
import { SecurityHardeningAccordion } from "@/components/ui/SecurityHardeningAccordion";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found — Chandan" };
  }
  return {
    title: `${project.title} — Chandan V N (@Chandan767)`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <article className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium text-teal-400 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Portfolio
        </Link>

        {/* Hero Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <TechBadge label={project.badge} variant="emerald" />
            {project.isPrivateProduction && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-amber-400">
                <Lock className="h-3 w-3" />
                Private Production (NDA)
              </span>
            )}
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {project.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p
            className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.summary}
          </p>
        </header>

        {/* Impact Metrics Strip */}
        <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.impactMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border p-4 backdrop-blur-md"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <p className="font-display text-2xl font-extrabold gradient-text">
                {metric.value}
              </p>
              <p
                className="mt-1 font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </section>

        {/* Visual Architecture Pipeline */}
        <section
          className="mt-8 rounded-2xl border p-6 backdrop-blur-md"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-400" />
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
                System Architecture Flow
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              NDA-Safe Diagram
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {project.architectureFlow.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div
                  className="flex-1 rounded-xl border p-4 text-center"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <p className="font-display text-sm font-bold">{step.label}</p>
                  <p className="mt-1 font-mono text-[11px] text-teal-400">
                    {step.sublabel}
                  </p>
                </div>
                {idx < project.architectureFlow.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 rotate-90 text-teal-400 lg:rotate-0" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Interactive Proof Micro-Demos per Project */}
        {project.slug === "enterprise-edtech-platform" && (
          <>
            <CacheArchitectureToggle />
            <SecurityHardeningAccordion />
          </>
        )}
        {project.slug === "ai-stock-analysis-agent" && <StockAgentDemo />}
        {project.slug === "diabetes-prediction-system" && <DiabetesSandbox />}

        {/* Problem & Solution */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div
            className="rounded-2xl border p-6 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-amber-400">
              The Engineering Problem
            </p>
            <p
              className="mt-3 text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.problem}
            </p>
          </div>

          <div
            className="rounded-2xl border p-6 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Architected Solution
            </p>
            <p
              className="mt-3 text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.solution}
            </p>
          </div>
        </section>

        {/* Quantified Before / After Deltas */}
        {project.benchmarks.length > 0 && (
          <section
            className="mt-8 rounded-2xl border p-6 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              Before / After Engineering Deltas
            </p>
            <div className="mt-4 space-y-3">
              {project.benchmarks.map((b) => (
                <div
                  key={b.metric}
                  className="grid gap-3 rounded-xl border p-4 md:grid-cols-12"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <div className="md:col-span-4">
                    <p className="font-display text-sm font-bold">{b.metric}</p>
                  </div>
                  <div className="md:col-span-4">
                    <span className="font-mono text-[10px] uppercase text-amber-400">
                      Before
                    </span>
                    <p
                      className="mt-0.5 text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {b.before}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <span className="font-mono text-[10px] uppercase text-emerald-400">
                      After
                    </span>
                    <p className="mt-0.5 text-xs font-medium leading-relaxed text-emerald-400">
                      {b.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Trade-offs & What I'd Do Differently (Engineering Judgment) */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div
            className="rounded-2xl border p-6 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              <Scale className="h-4 w-4" />
              Key Trade-offs &amp; Decisions
            </div>
            <div className="mt-4 space-y-4">
              {project.tradeoffs.map((t) => (
                <div key={t.decision}>
                  <p className="font-display text-sm font-bold">{t.decision}</p>
                  <p
                    className="mt-1 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl border p-6 backdrop-blur-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
              <Compass className="h-4 w-4" />
              What I&apos;d Do Differently in v2
            </div>
            <ul className="mt-4 space-y-3">
              {project.whatIdDoDifferently.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Key Highlights & Stack */}
        <section
          className="mt-8 rounded-2xl border p-6 backdrop-blur-md sm:p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <h2 className="font-display text-xl font-bold tracking-tight">
            Key Engineering Highlights
          </h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed sm:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div
            className="mt-6 border-t pt-6"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p
              className="mb-3 font-mono text-xs uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechBadge key={t} label={t} variant="teal" />
              ))}
            </div>
          </div>

          <div className="mt-6">
            {project.isPrivateProduction ? (
              <span
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                Private Production Repository (NDA-Safe Architecture Overview)
              </span>
            ) : project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-500/35 bg-teal-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-teal-400 transition-colors hover:bg-teal-500/20"
              >
                View Source on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </section>

        {/* Next Project Navigation */}
        <div
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div>
            <p
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Next Case Study
            </p>
            <p className="mt-1 font-display text-lg font-bold">
              {nextProject.title}
            </p>
          </div>
          <Link
            href={`/projects/${nextProject.slug}`}
            className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
          >
            Read Case Study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
