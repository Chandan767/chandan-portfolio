import { ImageResponse } from "next/og";

export const alt = "Chandan V N (@Chandan767) — Full-Stack, AI & Integration Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090B",
          padding: "64px",
          color: "#F4F4F5",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              backgroundColor: "#10B981",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              color: "#14B8A6",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Full-Stack · Integrations · AI Agents
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Chandan V N (@Chandan767)
          </div>
          <div style={{ fontSize: "30px", color: "#A1A1AA", maxWidth: "960px" }}>
            Building Scalable Enterprise Platforms, API Integrations &amp;
            Intelligent Systems.
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          {[
            "967+ Commits",
            "161 DB Models",
            "LangGraph AI",
            "15+ Campuses",
          ].map((stat) => (
            <div
              key={stat}
              style={{
                border: "1px solid #27272A",
                backgroundColor: "#121216",
                borderRadius: "14px",
                padding: "14px 22px",
                fontSize: "22px",
                color: "#14B8A6",
                fontWeight: 700,
              }}
            >
              {stat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
