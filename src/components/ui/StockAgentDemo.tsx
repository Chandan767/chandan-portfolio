"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bot, ShieldCheck, TrendingUp } from "lucide-react";

interface StockSample {
  symbol: string;
  name: string;
  sector: string;
  marketScore: number;
  qualityScore: number;
  confidence: string;
  regime: string;
  signals: { label: string; value: string }[];
  synthesis: string;
}

const sampleStocks: StockSample[] = [
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "NSE · IT Services",
    marketScore: 78,
    qualityScore: 94,
    confidence: "High · 89%",
    regime: "Bullish Consolidation",
    signals: [
      { label: "ROE / ROCE", value: "51.2% / 64.1%" },
      { label: "Volume Surge", value: "1.42x 20D Avg" },
      { label: "FCF Yield", value: "Strong (+14%)" },
    ],
    synthesis:
      "LangGraph Agent: Strong long-term capital efficiency (ROCE > 60%) paired with steady institutional accumulation above the 50-DMA. Quantitative risk-reward favors phased accumulation.",
  },
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "NSE · Energy & Digital",
    marketScore: 84,
    qualityScore: 86,
    confidence: "High · 85%",
    regime: "Momentum Breakout",
    signals: [
      { label: "RSI (14)", value: "61.4 (Healthy)" },
      { label: "Volume Surge", value: "1.88x 20D Avg" },
      { label: "Sector Rank", value: "Top Quartile" },
    ],
    synthesis:
      "LangGraph Agent: Intraday momentum score elevated on expanding volume and telecom/retail EBITDA growth. Regime filter confirms trend continuation with controlled volatility.",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    sector: "NSE · Private Banking",
    marketScore: 71,
    qualityScore: 91,
    confidence: "Moderate-High · 82%",
    regime: "Mean Reversion",
    signals: [
      { label: "Valuation", value: "Below 5Y P/B" },
      { label: "Asset Quality", value: "GNPA 1.3%" },
      { label: "Trend Setup", value: "Base Forming" },
    ],
    synthesis:
      "LangGraph Agent: High long-term quality score anchored by industry-leading asset quality and attractive historical valuation; short-term momentum awaits breakout confirmation.",
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    sector: "NSE · IT Services",
    marketScore: 81,
    qualityScore: 92,
    confidence: "High · 87%",
    regime: "Trend Expansion",
    signals: [
      { label: "ROE / ROCE", value: "31.8% / 40.2%" },
      { label: "EMA Alignment", value: "20 > 50 > 200" },
      { label: "Dividend Yield", value: "2.4%" },
    ],
    synthesis:
      "LangGraph Agent: Aligned multi-timeframe moving averages reinforce strong fundamental cash generation. Quantitative dual-score places INFY in the top decile of NSE large-caps.",
  },
];

export function StockAgentDemo() {
  const [selectedSymbol, setSelectedSymbol] = useState(sampleStocks[0].symbol);
  const stock =
    sampleStocks.find((s) => s.symbol === selectedSymbol) ?? sampleStocks[0];

  return (
    <section
      className="mt-8 rounded-2xl border p-6 backdrop-blur-md"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-subtle)",
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-teal-400" />
          <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
            Interactive Dual-Score &amp; LangGraph Agent Simulator
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
          <Activity className="h-3.5 w-3.5" />
          Sample NSE Output
        </span>
      </div>

      {/* Ticker Switcher */}
      <div className="mt-4 flex flex-wrap gap-2">
        {sampleStocks.map((item) => {
          const isActive = item.symbol === stock.symbol;
          return (
            <button
              key={item.symbol}
              type="button"
              onClick={() => setSelectedSymbol(item.symbol)}
              className={`rounded-xl border px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                isActive
                  ? "btn-primary border-transparent shadow-sm"
                  : "hover:border-teal-500/50"
              }`}
              style={
                !isActive
                  ? {
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }
                  : undefined
              }
            >
              {item.symbol}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stock.symbol}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-5 grid gap-5 lg:grid-cols-12"
        >
          {/* Scores */}
          <div
            className="rounded-xl border p-4 lg:col-span-5"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-display text-lg font-bold">{stock.name}</p>
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {stock.sector} · {stock.regime}
                </p>
              </div>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                {stock.confidence}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Today&apos;s Market Score (Momentum)
                  </span>
                  <span className="font-mono font-bold text-teal-400">
                    {stock.marketScore}/100
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stock.marketScore}%` }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-teal-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Long-Term Quality Score (Fundamentals)
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {stock.qualityScore}/100
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stock.qualityScore}%` }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Signals & LangGraph Synthesis */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-7">
            <div className="grid grid-cols-3 gap-3">
              {stock.signals.map((sig) => (
                <div
                  key={sig.label}
                  className="rounded-xl border p-3"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-subtle)",
                  }}
                >
                  <p
                    className="font-mono text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {sig.label}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold text-teal-400 sm:text-sm">
                    {sig.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl border p-4"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-teal-400">
                <Bot className="h-4 w-4" />
                Agentic Synthesis Output
              </div>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {stock.synthesis}
              </p>
              <p
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Grounded strictly on quantitative calculations — illustrative preview
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
