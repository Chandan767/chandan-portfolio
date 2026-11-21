import React from "react";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "teal" | "emerald" | "muted";
}

const variantClasses: Record<NonNullable<TechBadgeProps["variant"]>, string> = {
  default:
    "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]",
  teal:
    "border-teal-500/30 bg-teal-500/10 text-teal-400",
  emerald:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  muted:
    "border-[var(--border-strong)] bg-transparent text-[var(--text-primary)]",
};

export function TechBadge({ label, variant = "default" }: TechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium tracking-tight transition-colors ${variantClasses[variant]}`}
    >
      {label}
    </span>
  );
}
