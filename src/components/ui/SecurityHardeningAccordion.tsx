"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { owaspSecurityControls } from "@/data/enterprisePlatform";

export function SecurityHardeningAccordion() {
  const [openId, setOpenId] = useState<string>(owaspSecurityControls[0].id);

  return (
    <section
      className="mt-8 rounded-2xl border p-6 backdrop-blur-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-400">
              OWASP Security Hardening Teardown
            </h2>
          </div>
          <p className="mt-1 font-display text-lg font-bold">
            5 Real Attack Surfaces Audited &amp; Defended (Anonymized)
          </p>
        </div>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-emerald-400">
          5/5 Hardened
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        {owaspSecurityControls.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: isOpen
                  ? "rgba(20, 184, 166, 0.45)"
                  : "var(--border-subtle)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? "" : item.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400">
                    {item.layer}
                  </span>
                  <p className="font-display text-sm font-bold">
                    {item.vulnerability}
                  </p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-teal-400" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="border-t px-4 py-3.5 text-sm"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      <p style={{ color: "var(--text-secondary)" }}>
                        <strong className="text-[var(--text-primary)]">
                          Mitigation:{" "}
                        </strong>
                        {item.defense}
                      </p>
                      <p className="mt-2 font-mono text-xs text-emerald-400">
                        ✓ {item.verification}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
