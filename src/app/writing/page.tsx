import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { engineeringNotes } from "@/data/writing";
import { TechBadge } from "@/components/ui/TechBadge";

export const metadata: Metadata = {
  title: "Engineering Notes & ADRs — Chandan V N (@Chandan767)",
  description:
    "Architecture decision records and production engineering notes on Redis L1/L2 caching, PgBouncer + Prisma, PM2 cluster mode, idempotent OAuth 2.0 integrations, and LangGraph AI agents.",
};

export default function WritingIndexPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium text-teal-400 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Portfolio
        </Link>

        <header className="mt-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            <BookOpen className="h-3.5 w-3.5" />
            ARCHITECTURE DECISION RECORDS &amp; FIELD NOTES
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Engineering Writing
          </h1>
          <p
            className="mt-3 max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Short, 3-minute breakdowns of real production bottlenecks, trade-offs,
            and architecture decisions across backend systems, integrations, and AI agents.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {engineeringNotes.map((note) => (
            <Link
              key={note.slug}
              href={`/writing/${note.slug}`}
              className="group flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-500/45"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                  <span className="text-teal-400">{note.date}</span>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Clock className="h-3 w-3" />
                    {note.readTime}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-xl font-bold tracking-tight group-hover:text-teal-400">
                  {note.title}
                </h2>

                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {note.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {note.tags.slice(0, 4).map((tag) => (
                    <TechBadge key={tag} label={tag} />
                  ))}
                </div>
              </div>

              <div
                className="mt-6 flex items-center justify-between border-t pt-4 font-mono text-xs font-semibold text-teal-400"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <span>Read Engineering Note</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
