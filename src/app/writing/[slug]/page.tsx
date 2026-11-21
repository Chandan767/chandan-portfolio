import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Clock, Terminal } from "lucide-react";
import { engineeringNotes, getNoteBySlug } from "@/data/writing";
import { TechBadge } from "@/components/ui/TechBadge";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return engineeringNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Note Not Found — Chandan" };
  return {
    title: `${note.title} — Chandan V N`,
    description: note.subtitle,
  };
}

export default async function EngineeringNotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium text-teal-400 transition-colors hover:text-emerald-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Engineering Notes
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-teal-400">{note.date}</span>
            <span style={{ color: "var(--border-strong)" }}>·</span>
            <span className="inline-flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
              <Clock className="h-3.5 w-3.5" />
              {note.readTime}
            </span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {note.title}
          </h1>

          <p
            className="mt-3 text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {note.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <TechBadge key={tag} label={tag} variant="teal" />
            ))}
          </div>
        </header>

        {/* TL;DR Callout */}
        <div
          className="mt-8 rounded-2xl border p-5"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "rgba(20, 184, 166, 0.35)",
          }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-teal-400">
            TL;DR
          </p>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            {note.tldr}
          </p>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-8">
          {note.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight">
                {sec.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {sec.body.map((para) => (
                  <p
                    key={para}
                    className="text-sm leading-relaxed sm:text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {sec.code && (
                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-[#0C0C0F]">
                  <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2 font-mono text-[11px] text-zinc-400">
                    <Terminal className="h-3.5 w-3.5 text-teal-400" />
                    {sec.code.filename}
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 text-zinc-200">
                    <code>{sec.code.snippet}</code>
                  </pre>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Key Takeaways */}
        <section
          className="mt-10 rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Key Production Takeaways
          </h2>
          <ul className="mt-3 space-y-2.5">
            {note.takeaways.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
