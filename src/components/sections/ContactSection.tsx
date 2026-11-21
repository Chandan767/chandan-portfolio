"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, FileDown, FileText, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot spam guard
    if (honeypot.trim() !== "") return;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SpotlightCard hoverLift={false} className="relative p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Direct CTA & Links */}
            <div className="flex flex-col justify-between lg:col-span-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  OPEN TO FULL-STACK, BACKEND &amp; AI ROLES
                </span>

                <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Looking for an Engineer who can own{" "}
                  <span className="gradient-text">
                    architecture, reliability, and AI integrations
                  </span>{" "}
                  end-to-end?
                </h2>

                <p
                  className="mt-4 text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Send a quick note using the form or copy my email directly. I
                  respond quickly to recruiter outreach, hiring managers, and
                  founders.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-xs font-semibold transition-colors hover:border-teal-500/50"
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-teal-400" />
                        <span>{profile.email}</span>
                      </>
                    )}
                  </motion.button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-colors hover:border-teal-500/50"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Mail className="h-3.5 w-3.5 text-teal-400" />
                    Direct Email
                  </a>
                </div>
              </div>

              <div
                className="mt-8 flex flex-wrap items-center gap-4 border-t pt-5 text-xs sm:text-sm"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <FileText className="h-4 w-4" />
                  Web Resume
                </Link>
                <a
                  href={profile.resumePath}
                  download="Chandan_Resume.pdf"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-400"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <FileDown className="h-4 w-4" />
                  PDF
                </a>
              </div>
            </div>

            {/* Right: Working 3-Field Contact Form with Honeypot */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border p-5 lg:col-span-6"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              {/* Hidden Honeypot Field */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera — Engineering Manager"
                  className="mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500"
                  style={{
                    backgroundColor: "var(--bg-card-solid)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Work Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500"
                  style={{
                    backgroundColor: "var(--bg-card-solid)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[11px] uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the role, team, or system challenge..."
                  className="mt-1.5 w-full resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-teal-500"
                  style={{
                    backgroundColor: "var(--bg-card-solid)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    Email Draft Opened!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </SpotlightCard>
      </div>

      {/* Floating Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-[#0C0C0F] px-4 py-3 font-mono text-xs font-medium text-emerald-400 shadow-2xl"
          >
            <Check className="h-4 w-4" />
            Copied {profile.email} to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
