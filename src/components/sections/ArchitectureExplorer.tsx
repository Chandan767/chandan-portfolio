"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  HardDrive,
  Laptop,
  Network,
  Webhook,
  Zap,
} from "lucide-react";
import { architectureNodes, type ArchitectureNode } from "@/data/skills";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechBadge } from "@/components/ui/TechBadge";

const nodeIconMap: Record<string, React.ElementType> = {
  clients: Laptop,
  "edge-proxy": Network,
  "node-api": Cpu,
  redis: Zap,
  postgres: Database,
  s3: HardDrive,
  integrations: Webhook,
  "ml-service": BrainCircuit,
};

const tierLabels: Record<ArchitectureNode["tier"], { title: string; color: string }> = {
  edge: { title: "Edge & Client Tier", color: "text-zinc-400" },
  core: { title: "Application & Real-Time Tier", color: "text-teal-400" },
  data: { title: "Data & Storage Tier", color: "text-emerald-400" },
  external: { title: "Integrations & AI Agents Tier", color: "text-amber-400" },
};

export function ArchitectureExplorer() {
  const [selectedId, setSelectedId] = useState<string>(architectureNodes[2].id);
  const selectedNode =
    architectureNodes.find((n) => n.id === selectedId) ?? architectureNodes[0];

  const tiers: ArchitectureNode["tier"][] = ["edge", "core", "data", "external"];

  return (
    <section id="architecture" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            <Cloud className="h-3.5 w-3.5" />
            INTERACTIVE SYSTEM TOPOLOGY
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Production Architecture Explorer
          </h2>
          <p
            className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Click or hover any node in the production stack to inspect what I
            engineered in that layer.
          </p>
        </motion.div>

        <SpotlightCard hoverLift={false} className="p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Interactive Block Diagram */}
            <div className="space-y-4 lg:col-span-8">
              {tiers.map((tier) => {
                const nodes = architectureNodes.filter((n) => n.tier === tier);
                const tierInfo = tierLabels[tier];

                return (
                  <div
                    key={tier}
                    className="rounded-xl border p-3.5"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                    }}
                  >
                    <p
                      className={`mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest ${tierInfo.color}`}
                    >
                      {tierInfo.title}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {nodes.map((node) => {
                        const Icon = nodeIconMap[node.id] ?? Cpu;
                        const isSelected = node.id === selectedNode.id;

                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedId(node.id)}
                            onMouseEnter={() => setSelectedId(node.id)}
                            className={`group flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
                              isSelected
                                ? "border-teal-500/70 bg-teal-500/10 shadow-sm"
                                : "hover:border-teal-500/35"
                            }`}
                            style={
                              !isSelected
                                ? {
                                    backgroundColor: "var(--bg-card)",
                                    borderColor: "var(--border-subtle)",
                                  }
                                : undefined
                            }
                          >
                            <span
                              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                isSelected
                                  ? "border-teal-400/50 bg-teal-500 text-zinc-950"
                                  : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-teal-400"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate font-display text-sm font-bold">
                                  {node.label}
                                </span>
                                {isSelected && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                                )}
                              </div>
                              <p
                                className="mt-0.5 truncate font-mono text-[11px]"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {node.shortRole}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Layer Engineering Inspector */}
            <div className="lg:col-span-4">
              <div
                className="sticky top-24 flex h-full flex-col justify-between rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                        LAYER INSPECTOR
                      </span>
                      <TechBadge label={selectedNode.metric} variant="emerald" />
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                      {selectedNode.label}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-teal-400">
                      {selectedNode.shortRole}
                    </p>

                    <div
                      className="my-5 h-px w-full"
                      style={{ backgroundColor: "var(--border-subtle)" }}
                    />

                    <p
                      className="font-mono text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      What I Engineered
                    </p>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedNode.whatIEngineered}
                    </p>

                    <div className="mt-6">
                      <p
                        className="mb-2.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.tech.map((t) => (
                          <TechBadge key={t} label={t} variant="teal" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div
                  className="mt-8 rounded-lg border px-3 py-2.5 font-mono text-[11px]"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  Tip: Hover or click any of the 8 stack layers to inspect
                  ownership details.
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
