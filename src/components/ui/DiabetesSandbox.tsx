"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BrainCircuit, RotateCcw } from "lucide-react";

const defaults = {
  glucose: 124,
  bmi: 28.5,
  age: 36,
  bloodPressure: 76,
  insulin: 110,
};

export function DiabetesSandbox() {
  const [inputs, setInputs] = useState(defaults);

  const result = useMemo(() => {
    // Transparent clinical risk approximation mirroring feature weights of the Balanced RF model
    const z =
      -6.4 +
      inputs.glucose * 0.032 +
      inputs.bmi * 0.068 +
      inputs.age * 0.024 +
      inputs.bloodPressure * 0.008 +
      inputs.insulin * 0.0025;

    const probability = Math.round((1 / (1 + Math.exp(-z))) * 100);
    const tier =
      probability >= 65
        ? { label: "Elevated Risk", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/35" }
        : probability >= 40
        ? { label: "Moderate Risk", color: "text-teal-400", bg: "bg-teal-500/15 border-teal-500/35" }
        : { label: "Low Risk", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/35" };

    const contributions = [
      { label: "Glucose", weight: Math.min(100, Math.round((inputs.glucose / 200) * 100)) },
      { label: "BMI", weight: Math.min(100, Math.round((inputs.bmi / 50) * 100)) },
      { label: "Age", weight: Math.min(100, Math.round((inputs.age / 80) * 100)) },
      { label: "Insulin", weight: Math.min(100, Math.round((inputs.insulin / 300) * 100)) },
    ];

    return { probability, tier, contributions };
  }, [inputs]);

  const sliders: {
    key: keyof typeof defaults;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
  }[] = [
    { key: "glucose", label: "Plasma Glucose", unit: "mg/dL", min: 70, max: 200, step: 1 },
    { key: "bmi", label: "Body Mass Index (BMI)", unit: "kg/m²", min: 18, max: 48, step: 0.5 },
    { key: "age", label: "Patient Age", unit: "yrs", min: 20, max: 75, step: 1 },
    { key: "bloodPressure", label: "Blood Pressure", unit: "mm Hg", min: 50, max: 120, step: 1 },
    { key: "insulin", label: "Serum Insulin", unit: "μU/mL", min: 20, max: 300, step: 5 },
  ];

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
            <BrainCircuit className="h-4 w-4 text-teal-400" />
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-teal-400">
              Interactive Clinical Screening Sandbox
            </h2>
          </div>
          <p className="mt-1 font-display text-lg font-bold">
            Real-Time Risk Score &amp; Feature Importance Simulator
          </p>
        </div>

        <button
          type="button"
          onClick={() => setInputs(defaults)}
          className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors hover:border-teal-500/50"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Sliders */}
        <div className="space-y-4 lg:col-span-7">
          {sliders.map((s) => (
            <div key={s.key}>
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor={`slider-${s.key}`}
                  className="font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.label}
                </label>
                <span className="font-mono font-semibold text-teal-400">
                  {inputs[s.key]} {s.unit}
                </span>
              </div>
              <input
                id={`slider-${s.key}`}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={inputs[s.key]}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [s.key]: Number(e.target.value),
                  }))
                }
                className="mt-1.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-teal-400"
              />
            </div>
          ))}
        </div>

        {/* Live Prediction Output */}
        <div
          className="flex flex-col justify-between rounded-xl border p-5 lg:col-span-5"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2">
              <span
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Estimated Risk Probability
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${result.tier.bg} ${result.tier.color}`}
              >
                <Activity className="h-3 w-3" />
                {result.tier.label}
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold gradient-text">
                {result.probability}%
              </span>
              <span
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Balanced RF benchmark: 76.7% recall
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <p
                className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Normalized Feature Signal
              </p>
              {result.contributions.map((c) => (
                <div key={c.label}>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span style={{ color: "var(--text-secondary)" }}>{c.label}</span>
                    <span className="text-teal-400">{c.weight}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                      animate={{ width: `${c.weight}%` }}
                      transition={{ duration: 0.25 }}
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            className="mt-5 border-t pt-3 font-mono text-[10px]"
            style={{
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            Interactive client-side approximation for demo purposes — not medical advice.
          </p>
        </div>
      </div>
    </section>
  );
}
