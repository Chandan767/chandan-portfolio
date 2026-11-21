"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileDown, Mail, MapPin, Printer } from "lucide-react";
import { profile } from "@/data/profile";
import { skillPillars } from "@/data/skills";

export default function InteractiveResumePage() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Action Bar (hidden when printing) */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-teal-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors hover:border-teal-500/50"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              <Printer className="h-3.5 w-3.5 text-teal-400" />
              Print / Save PDF
            </button>
            <a
              href={profile.resumePath}
              download="Chandan_Resume.pdf"
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
            >
              <FileDown className="h-3.5 w-3.5" />
              Download PDF
            </a>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div
          className="rounded-2xl border p-6 sm:p-10 print:border-0 print:bg-white print:p-0 print:text-black"
          style={{
            backgroundColor: "var(--bg-card-solid)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {/* Header */}
          <header
            className="border-b pb-6"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 font-mono text-sm font-semibold text-teal-400 print:text-teal-700">
              Full-Stack &amp; Systems Engineer · TypeScript · Node.js · PostgreSQL · Redis · Applied AI
            </p>
            <div
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                Bengaluru, India (Remote &amp; Hybrid)
              </span>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-teal-400">
                <Mail className="h-3.5 w-3.5" />
                {profile.email}
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                github.com/Chandan767
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mt-6">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400 print:text-teal-700">
              Engineering Summary
            </h2>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-stack and systems engineer with verified production ownership
              (967+ commits, #1 contributor) across a 161-model PostgreSQL/Prisma
              enterprise platform serving 15+ campuses and 450+ active users.
              Experienced in high-throughput Redis caching, PgBouncer tuning, PM2
              cluster reliability, OAuth 2.0 ERP integrations, n8n workflow
              automation, and LangGraph / Scikit-learn AI systems.
            </p>
          </section>

          {/* Core Production Ownership */}
          <section className="mt-7">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400 print:text-teal-700">
              Production Experience &amp; Flagship Ownership
            </h2>
            <div className="mt-3 space-y-5">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-bold">
                    Enterprise EdTech &amp; Educator Growth Platform (Production SaaS)
                  </h3>
                  <span className="font-mono text-xs text-emerald-400 print:text-emerald-700">
                    967+ Commits · #1 Contributor
                  </span>
                </div>
                <ul
                  className="mt-2 list-disc space-y-1.5 pl-5 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <li>
                    Owned end-to-end architecture across <strong>161 PostgreSQL models</strong>,{" "}
                    <strong>88 API route modules</strong>, 91 controllers, and 730+ TypeScript/React modules serving 15+ campuses.
                  </li>
                  <li>
                    <strong>Learning Analytics Center (166+ commits):</strong> Built auto-assignment engine, Term 1/2 Excel pipelines, ICSE/CBSE campus isolation, and role-matrix drilldowns.
                  </li>
                  <li>
                    <strong>Performance &amp; Reliability (61+ commits):</strong> Engineered L1 in-memory + L2 Redis caching for zero-DB auth, composite PostgreSQL indexes, PgBouncer <code>directUrl</code> migrations, and PM2 Cluster Mode (800MB rolling memory restarts / 1GB heap cap).
                  </li>
                  <li>
                    <strong>Educator Growth, BI &amp; Security (177+ commits):</strong> Shipped Cluster 1–5 observation rubrics, Recharts BI exports (Excel/PDF/DOCX), 12-month compliance audit logging, Capacitor iOS/Android GitHub Actions CI/CD, and OWASP hardening.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mt-7">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400 print:text-teal-700">
              Selected Systems &amp; AI Projects
            </h2>
            <div className="mt-3 space-y-4 text-sm" style={{ color: "var(--text-secondary)" }}>
              <div>
                <p className="font-display font-bold text-[var(--text-primary)]">
                  AI Stock Research &amp; Prediction Agent (NSE/BSE) —{" "}
                  <span className="font-mono text-xs font-normal text-teal-400">
                    Python · FastAPI · LangGraph · PostgreSQL · Redis · React · Docker
                  </span>
                </p>
                <p className="mt-1">
                  Quantitative-first equity research platform combining Today&apos;s Market Score and Long-Term Quality Score engines with pluggable market feeds (Yahoo/Dhan/Zerodha) and a LangGraph explanation agent.
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-[var(--text-primary)]">
                  Zoho → NeverSkip Enterprise API Integration —{" "}
                  <span className="font-mono text-xs font-normal text-teal-400">
                    Node.js · TypeScript · OAuth 2.0 · Webhooks · JSON Schema
                  </span>
                </p>
                <p className="mt-1">
                  Resilient OAuth 2.0 middleware synchronizing Zoho CRM/People records to NeverSkip ERP with automated token refresh, deterministic field mapping, and 0% duplicate idempotent upserts.
                </p>
              </div>
              <div>
                <p className="font-display font-bold text-[var(--text-primary)]">
                  n8n Slack → Google Drive Automation &amp; Diabetes Prediction ML —{" "}
                  <span className="font-mono text-xs font-normal text-teal-400">
                    n8n · Slack/Drive APIs · Scikit-learn · FastAPI
                  </span>
                </p>
                <p className="mt-1">
                  Built event-driven Slack-to-Drive archival workflows with duplicate detection, plus a Balanced Random Forest diabetes screening classifier (76.6% accuracy, 74.5% precision, 76.7% recall).
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mt-7">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400 print:text-teal-700">
              Technical Skills
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {skillPillars.map((pillar) => (
                <div key={pillar.title} className="text-sm">
                  <span className="font-display font-bold">{pillar.title}: </span>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {pillar.skills.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
