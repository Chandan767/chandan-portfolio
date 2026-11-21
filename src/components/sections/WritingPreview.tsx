"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { engineeringNotes } from "@/data/writing";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";

export function WritingPreview() {
  return (
    <section id="writing" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              <BookOpen className="h-3.5 w-3.5" />
              ENGINEERING NOTES · ADRs
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Architecture Decisions &amp; Field Notes
            </h2>
            <p
              className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              3-minute technical write-ups documenting real bottlenecks, caching
              strategies, and system design trade-offs.
            </p>
          </div>

          <Link
            href="/writing"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-teal-500/35 bg-teal-500/10 px-4 py-2.5 font-mono text-xs font-semibold text-teal-400 transition-colors hover:bg-teal-500/20"
          >
            All Engineering Notes
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {engineeringNotes.map((note, idx) => (
            <SpotlightCard key={note.slug} delay={idx * 0.06} className="p-6">
              <Link href={`/writing/${note.slug}`} className="flex h-full flex-col justify-between">
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

                  <h3 className="mt-3 font-display text-lg font-bold tracking-tight transition-colors group-hover:text-teal-400">
                    {note.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {note.subtitle}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {note.tags.slice(0, 3).map((tag) => (
                      <TechBadge key={tag} label={tag} />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-teal-400">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
