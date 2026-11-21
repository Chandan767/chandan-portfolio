"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  FileDown,
  Layers,
  Moon,
  Search,
  Sun,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  group: "Actions" | "Case Studies" | "Navigate";
  icon: React.ElementType;
  run: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  const items = useMemo<CommandItem[]>(() => {
    const navigateTo = (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    };

    return [
      {
        id: "copy-email",
        label: copiedEmail ? "Email Copied to Clipboard!" : `Copy Email (${profile.email})`,
        hint: "Action",
        group: "Actions",
        icon: copiedEmail ? Check : Copy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopiedEmail(true);
            setTimeout(() => {
              setCopiedEmail(false);
              setOpen(false);
            }, 900);
          } catch {
            window.location.href = `mailto:${profile.email}`;
          }
        },
      },
      {
        id: "open-web-resume",
        label: "Open Interactive Web Resume (/resume)",
        hint: "Page",
        group: "Actions",
        icon: FileDown,
        run: () => navigateTo("/resume"),
      },
      {
        id: "open-writing",
        label: "Read Engineering Notes & ADRs (/writing)",
        hint: "4 Notes",
        group: "Navigate",
        icon: Terminal,
        run: () => navigateTo("/writing"),
      },
      {
        id: "download-resume",
        label: "Download Resume (PDF)",
        hint: "Chandan_Resume.pdf",
        group: "Actions",
        icon: FileDown,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.resumePath;
          link.download = "Chandan_Resume.pdf";
          link.click();
          setOpen(false);
        },
      },
      {
        id: "toggle-theme",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Theme`,
        hint: "Appearance",
        group: "Actions",
        icon: theme === "dark" ? Sun : Moon,
        run: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        hint: p.badge,
        group: "Case Studies" as const,
        icon: p.slug === "ai-stock-analysis-agent" ? TrendingUp : Layers,
        run: () => navigateTo(`/projects/${p.slug}`),
      })),
      {
        id: "nav-flagship",
        label: "Flagship Enterprise Platform",
        hint: "Section",
        group: "Navigate",
        icon: Terminal,
        run: () => navigateTo("/#flagship"),
      },
      {
        id: "nav-projects",
        label: "AI Agents & Featured Projects",
        hint: "Section",
        group: "Navigate",
        icon: ArrowRight,
        run: () => navigateTo("/#projects"),
      },
      {
        id: "nav-architecture",
        label: "Interactive Architecture Explorer",
        hint: "Section",
        group: "Navigate",
        icon: ArrowRight,
        run: () => navigateTo("/#architecture"),
      },
      {
        id: "nav-experience",
        label: "Engineering Timeline",
        hint: "Section",
        group: "Navigate",
        icon: ArrowRight,
        run: () => navigateTo("/#experience"),
      },
      {
        id: "nav-skills",
        label: "Skills & Production Tooling",
        hint: "Section",
        group: "Navigate",
        icon: ArrowRight,
        run: () => navigateTo("/#skills"),
      },
      {
        id: "nav-contact",
        label: "Contact & Links",
        hint: "Section",
        group: "Navigate",
        icon: ArrowRight,
        run: () => navigateTo("/#contact"),
      },
    ];
  }, [copiedEmail, router, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      filtered[activeIndex].run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/65 px-4 pt-[14vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: "var(--bg-card-solid)",
              borderColor: "var(--border-strong)",
            }}
          >
            {/* Search Input */}
            <div
              className="flex items-center gap-3 border-b px-4 py-3.5"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <Search className="h-4 w-4 shrink-0 text-teal-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Jump to a project, section, or action..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd
                className="rounded border px-1.5 py-0.5 font-mono text-[10px]"
                style={{
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p
                  className="py-8 text-center font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  No matching commands found.
                </p>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={item.run}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-teal-500/12 text-teal-400" : ""
                      }`}
                      style={
                        !isActive ? { color: "var(--text-primary)" } : undefined
                      }
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 opacity-80" />
                        <span className="truncate font-medium">{item.label}</span>
                      </span>
                      <span
                        className="shrink-0 font-mono text-[10px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div
              className="flex items-center justify-between border-t px-4 py-2.5 font-mono text-[10px]"
              style={{
                borderColor: "var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              <span>↑↓ Navigate · ↵ Select</span>
              <span>Chandan767 · Command Palette</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
