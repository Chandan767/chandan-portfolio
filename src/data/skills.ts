export interface SkillPillar {
  title: string;
  tag: string;
  description: string;
  icon: "layout" | "server" | "database" | "cloud" | "shield";
  skills: string[];
}

export const skillPillars: SkillPillar[] = [
  {
    title: "Frontend",
    tag: "UI & INTERACTION",
    description: "Type-safe, responsive interfaces & data-rich dashboards",
    icon: "layout",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Recharts",
      "shadcn/ui",
    ],
  },
  {
    title: "Backend & APIs",
    tag: "DISTRIBUTED SERVICES",
    description: "Modular REST APIs, real-time sockets & OAuth integrations",
    icon: "server",
    skills: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma ORM",
      "SQLAlchemy",
      "REST APIs",
      "Socket.IO",
      "BullMQ",
      "OAuth 2.0",
    ],
  },
  {
    title: "Databases & Performance",
    tag: "STORAGE & CACHING",
    description: "High-throughput schemas, pooling & sub-50ms caching",
    icon: "database",
    skills: [
      "PostgreSQL",
      "AWS RDS",
      "PgBouncer",
      "Redis (ioredis)",
      "Query & Index Tuning",
    ],
  },
  {
    title: "Cloud, DevOps & Automation",
    tag: "INFRA & WORKFLOWS",
    description: "Containerized deploys, native mobile builds & event ops",
    icon: "cloud",
    skills: [
      "AWS (EC2, RDS, S3)",
      "Docker & Compose",
      "Nginx",
      "PM2",
      "GitHub Actions CI/CD",
      "Capacitor (iOS/Android)",
      "n8n",
    ],
  },
  {
    title: "AI / ML, Agents & Security",
    tag: "INTELLIGENCE & HARDENING",
    description: "LangGraph agents, predictive pipelines & OWASP controls",
    icon: "shield",
    skills: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Scikit-learn",
      "Pandas",
      "OWASP Security Auditing",
      "RBAC",
      "Helmet/CORS",
    ],
  },
];

export interface ArchitectureNode {
  id: string;
  label: string;
  shortRole: string;
  tier: "edge" | "core" | "data" | "external";
  metric: string;
  whatIEngineered: string;
  tech: string[];
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: "clients",
    label: "Client Web & Mobile",
    shortRole: "React · Next.js · Capacitor",
    tier: "edge",
    metric: "730+ TS/React Modules",
    whatIEngineered:
      "Built 730+ modular TypeScript/React components, interactive Recharts BI & financial dashboards, and automated Capacitor iOS/Android native builds for 450+ active users.",
    tech: ["React", "TypeScript", "Capacitor", "Recharts", "Tailwind CSS"],
  },
  {
    id: "edge-proxy",
    label: "AWS ALB + Nginx",
    shortRole: "TLS · Reverse Proxy · Rate Limits",
    tier: "edge",
    metric: "15+ Campuses Traffic",
    whatIEngineered:
      "Tuned AWS Application Load Balancer → Nginx → Express proxy trust chains, burst rate-limiting, CORS policies, and zero-downtime PM2 upstream routing.",
    tech: ["AWS ALB", "Nginx", "PM2", "Helmet/CORS"],
  },
  {
    id: "node-api",
    label: "Node.js API Layer",
    shortRole: "88 Route Modules · 91 Controllers",
    tier: "core",
    metric: "967+ Commits Shipped",
    whatIEngineered:
      "Architected 88 Express route modules and 91 controllers with Zod validation, granular role-matrix RBAC, multi-format exports (Excel/PDF/DOCX), and OWASP security hardening.",
    tech: ["Node.js", "Express", "TypeScript", "Zod", "RBAC"],
  },
  {
    id: "redis",
    label: "Redis Cache & Socket Adapter",
    shortRole: "L1/L2 Auth · Real-Time Pub/Sub",
    tier: "core",
    metric: "Zero-DB Session Auth",
    whatIEngineered:
      "Engineered L1 in-memory + L2 Redis (ioredis) user caching to eliminate redundant RDS auth lookups, paired with a Socket.IO Redis adapter with strict room ACLs.",
    tech: ["Redis (ioredis)", "Socket.IO Adapter", "BullMQ"],
  },
  {
    id: "postgres",
    label: "PostgreSQL + PgBouncer",
    shortRole: "161 Prisma Models · AWS RDS",
    tier: "data",
    metric: "161 Normalized Models",
    whatIEngineered:
      "Designed and maintained a 161-model Prisma schema on AWS RDS with composite indexes on high-read tables and PgBouncer-safe directUrl migration workflows.",
    tech: ["PostgreSQL", "Prisma ORM", "PgBouncer", "AWS RDS"],
  },
  {
    id: "s3",
    label: "AWS S3 Storage",
    shortRole: "Evidence Uploads & Exports",
    tier: "data",
    metric: "Hardened File Pipeline",
    whatIEngineered:
      "Implemented validated file upload pipelines for MOOC certificates, curriculum spreadsheets, and generated reports with MIME verification and strict access controls.",
    tech: ["AWS S3", "Signed URLs", "Upload Hardening"],
  },
  {
    id: "integrations",
    label: "n8n & External APIs",
    shortRole: "Zoho ↔ NeverSkip · Slack → Drive",
    tier: "external",
    metric: "Idempotent Event Sync",
    whatIEngineered:
      "Built OAuth 2.0 enterprise middleware syncing Zoho CRM/People to NeverSkip ERP without duplicates, plus event-driven n8n workflows archiving Slack files to Google Drive.",
    tech: ["OAuth 2.0", "n8n", "Slack API", "Google Drive API", "Webhooks"],
  },
  {
    id: "ml-service",
    label: "Python AI & ML Engine",
    shortRole: "FastAPI · LangGraph · Scikit-learn",
    tier: "external",
    metric: "Quant + Clinical ML",
    whatIEngineered:
      "Built an NSE/BSE quantitative AI stock research agent using LangGraph, FastAPI, and dual scoring engines, alongside a Balanced Random Forest diabetes prediction system (76.6% accuracy).",
    tech: ["Python", "FastAPI", "LangGraph", "Scikit-learn", "Docker"],
  },
];
