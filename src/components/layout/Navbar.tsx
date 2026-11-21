"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Flagship", href: "/#flagship" },
  { label: "Projects", href: "/#projects" },
  { label: "Architecture", href: "/#architecture" },
  { label: "Writing", href: "/writing" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors"
      style={{
        backgroundColor: "var(--nav-bg)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg border transition-transform duration-200 group-hover:scale-105"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-strong)",
              color: "var(--accent-primary)",
            }}
          >
            <Terminal className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            {profile.shortName}
            <span className="font-mono text-xs font-medium text-teal-400">
              .{profile.handle.toLowerCase()}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:text-teal-400"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] transition-colors hover:border-teal-500/50 sm:inline-flex"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <span>Quick Jump</span>
            <kbd
              className="rounded border px-1 py-0.5 text-[10px]"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-teal-500/50"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-zinc-300" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-700" />
            )}
          </button>

          <Link
            href="/resume"
            className="btn-primary hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" />
            Resume
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border md:hidden"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-primary)",
            }}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t md:hidden"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-card-solid)",
            }}
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.resumePath}
                download="Chandan_Resume.pdf"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
              >
                <FileDown className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
