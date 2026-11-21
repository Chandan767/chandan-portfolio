import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { engineeringNotes } from "@/data/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...engineeringNotes.map((n) => ({
      url: `${base}/writing/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
