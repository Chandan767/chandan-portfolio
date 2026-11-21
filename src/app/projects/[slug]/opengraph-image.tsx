import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/projects";

export const alt = "Project Case Study — Chandan V N (@Chandan767)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  const title = project?.title ?? "Engineering Case Study";
  const category = project?.category ?? "Full-Stack & Systems Engineering";
  const metrics = project?.impactMetrics.slice(0, 3) ?? [];

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
            "radial-gradient(circle at 80% 10%, rgba(20,184,166,0.22), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "20px",
              color: "#14B8A6",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: "20px", color: "#A1A1AA" }}>
            Chandan V N · @Chandan767
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>
          {project?.summary && (
            <div style={{ fontSize: "24px", color: "#A1A1AA", maxWidth: "980px" }}>
              {project.summary.slice(0, 150)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "18px" }}>
          {metrics.map((m) => (
            <div
              key={m.label}
              style={{
                border: "1px solid #27272A",
                backgroundColor: "#121216",
                borderRadius: "14px",
                padding: "14px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span style={{ fontSize: "26px", color: "#14B8A6", fontWeight: 700 }}>
                {m.value}
              </span>
              <span style={{ fontSize: "15px", color: "#A1A1AA" }}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
