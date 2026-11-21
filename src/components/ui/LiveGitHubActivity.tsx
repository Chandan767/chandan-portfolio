"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

interface RepoSummary {
  name: string;
  language: string | null;
  html_url: string;
  updated_at: string;
}

const fallbackRepos: RepoSummary[] = [
  {
    name: "stockanalysis",
    language: "Python",
    html_url: "https://github.com/Chandan767/stockanalysis",
    updated_at: "2026-10-01T00:00:00Z",
  },
  {
    name: "diabities_prediction",
    language: "Python",
    html_url: "https://github.com/Chandan767/diabities_prediction",
    updated_at: "2026-09-15T00:00:00Z",
  },
  {
    name: "Automation-",
    language: "JavaScript",
    html_url: "https://github.com/Chandan767/Automation-",
    updated_at: "2026-09-01T00:00:00Z",
  },
];

export function LiveGitHubActivity() {
  const [publicRepos, setPublicRepos] = useState<number>(40);
  const [recentRepos, setRecentRepos] = useState<RepoSummary[]>(fallbackRepos);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("https://api.github.com/users/Chandan767").then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(
        "https://api.github.com/users/Chandan767/repos?sort=updated&per_page=3"
      ).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([user, repos]) => {
        if (!active) return;
        if (user?.public_repos) {
          setPublicRepos(user.public_repos);
          setIsLive(true);
        }
        if (Array.isArray(repos) && repos.length > 0) {
          setRecentRepos(repos.slice(0, 3));
        }
      })
      .catch(() => {
        // Silently keep verified fallback
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="mt-6 rounded-2xl border p-5 backdrop-blur-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <GithubIcon className="h-4 w-4 text-teal-400" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-400">
            GitHub Activity · @{profile.handle}
          </span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
            {isLive ? "Live API" : "Verified"} · {publicRepos} Public Repos
          </span>
        </div>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-teal-400 transition-colors hover:text-emerald-400"
        >
          View Profile
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {recentRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 transition-colors hover:border-teal-500/45"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate font-mono text-xs font-semibold group-hover:text-teal-400">
                <GitBranch className="h-3.5 w-3.5 shrink-0 text-teal-400" />
                <span className="truncate">{repo.name}</span>
              </p>
              <p
                className="mt-0.5 font-mono text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                {repo.language ?? "Repository"}
              </p>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-hover:text-teal-400" />
          </a>
        ))}
      </div>
    </div>
  );
}
