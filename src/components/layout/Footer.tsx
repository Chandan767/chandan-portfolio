"use client";

import React, { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold">
            {profile.name}{" "}
            <span className="font-mono text-xs text-teal-400">
              (@{profile.handle})
            </span>
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion · All enterprise visuals NDA-safe.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors hover:border-teal-500/50"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{profile.email}</span>
              </>
            )}
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:border-teal-500/50 hover:text-teal-400"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <GithubIcon className="h-4 w-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:border-teal-500/50 hover:text-teal-400"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            aria-label="Send email"
            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:border-teal-500/50 hover:text-teal-400"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
