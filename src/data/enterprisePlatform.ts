export interface EnterpriseTab {
  id: string;
  shortLabel: string;
  title: string;
  commitsBadge: string;
  ownership: {
    context: string;
    ownedEndToEnd: string;
    impact: string;
  };
  challenge: string;
  solution: string;
  highlights: string[];
  tech: string[];
  preview: {
    headerTitle: string;
    statusLabel: string;
    kpis: { label: string; value: string; delta: string }[];
    rows: { label: string; meta: string; progress: number; status: "Live" | "Synced" | "Verified" }[];
  };
}

export interface ProductionGem {
  title: string;
  category: string;
  detail: string;
  metric: string;
}

export interface SecurityControl {
  id: string;
  vulnerability: string;
  layer: string;
  defense: string;
  verification: string;
}

export const productionReliabilityGems: ProductionGem[] = [
  {
    title: "PM2 Cluster Mode & OOM Guard",
    category: "NODE.JS RELIABILITY",
    detail:
      "Configured PM2 cluster mode with 800MB rolling memory restarts and 1GB max-old-space-size heap limits to eliminate OOM crashes on AWS EC2.",
    metric: "Zero OOM Downtime",
  },
  {
    title: "Composite Indexes & DB Saturation Fix",
    category: "POSTGRESQL TUNING",
    detail:
      "Added composite indexes on (campus, checklistId), DanielsonObservationScore, and Notification paired with L1/L2 Redis caching on auth, counts, and settings.",
    metric: "Sub-50ms P95 Reads",
  },
  {
    title: "Multi-Curriculum Tenant Isolation",
    category: "DATA INTEGRITY",
    detail:
      "Isolated ICSE vs. CBSE curriculum tracks per campus and eliminated cross-section state mutation bugs across shared checklist pipelines.",
    metric: "15+ Isolated Campuses",
  },
  {
    title: "12-Month Compliance Audit Logging",
    category: "GOVERNANCE",
    detail:
      "Implemented a structured 12-month audit log retention policy tracking sensitive enterprise actions, approvals, and role changes.",
    metric: "12-Mo Audit Trail",
  },
  {
    title: "Automated Native Mobile CI/CD",
    category: "RELEASE ENGINEERING",
    detail:
      "Automated Capacitor SPM / Xcode (iphoneos) iOS builds and signed Android APK pipelines directly inside GitHub Actions.",
    metric: "iOS + Android CI/CD",
  },
];

export const owaspSecurityControls: SecurityControl[] = [
  {
    id: "socket-acl",
    vulnerability: "Socket.IO Cross-Room Eavesdropping",
    layer: "Real-Time WebSockets",
    defense:
      "Enforced server-side JWT verification on handshake and strict per-room campus/role ACL validation before allowing any socket.join() subscription.",
    verification: "Blocked unauthorized cross-campus room joins in integration tests.",
  },
  {
    id: "ssrf",
    vulnerability: "SSRF & Cloud Metadata IP Access",
    layer: "Outbound HTTP / Webhooks",
    defense:
      "Implemented URL allowlisting and private/link-local IP range blocking (169.254.169.254, 10.0.0.0/8, 127.0.0.1) prior to any server-side fetch.",
    verification: "Eliminated AWS EC2 IMDS exposure vectors across ingestion endpoints.",
  },
  {
    id: "svg-xss",
    vulnerability: "Stored XSS via SVG / File Uploads",
    layer: "AWS S3 Upload Pipeline",
    defense:
      "Restricted MIME types and magic-byte validation on uploads, stripped inline SVG script payloads, and enforced Content-Disposition attachment headers.",
    verification: "Zero executable script rendering from user-uploaded MOOC evidence.",
  },
  {
    id: "cors",
    vulnerability: "Permissive CORS & Credential Leakage",
    layer: "Nginx + Express Edge",
    defense:
      "Replaced wildcard origins with an explicit environment-bound origin allowlist, strict credential flags, and Helmet security headers.",
    verification: "Verified strict Origin rejection on cross-site preflight probes.",
  },
  {
    id: "mass-assignment",
    vulnerability: "Mass Assignment & Privilege Escalation",
    layer: "88 API Route Modules",
    defense:
      "Validated every request payload through strict Zod schemas that strip unknown keys (e.g., role, campusId) before Prisma persistence.",
    verification: "Prevented role/tenant tampering across all mutation controllers.",
  },
];

export const enterprisePlatform = {
  slug: "enterprise-edtech-platform",
  badge: "FLAGSHIP PRODUCTION SYSTEM · PRIVATE PRODUCTION (NDA)",
  title: "Enterprise EdTech & Educator Growth Platform",
  subtitle:
    "Multi-campus academic operations, real-time analytics, and educator professional development platform serving 15+ campuses and 450+ active users.",
  stats: [
    { label: "Commits", value: "967+" },
    { label: "DB Models", value: "161" },
    { label: "API Modules", value: "88" },
    { label: "UI Modules", value: "730+" },
  ],
  tabs: [
    {
      id: "lac",
      shortLabel: "Learning Analytics Center",
      title: "Learning Analytics Center (LAC)",
      commitsBadge: "166+ commits",
      ownership: {
        context: "Multi-engineer enterprise monorepo",
        ownedEndToEnd:
          "LAC Prisma schema, auto-assignment engine, Term 1/2 Excel pipelines, ICSE/CBSE campus isolation & role-matrix drilldowns",
        impact: "Zero cross-section state leakage across 15+ campuses",
      },
      challenge:
        "Coordinate thousands of curriculum assessment items across 15+ campuses, ICSE/CBSE tracks, Grades K1–12 & PU I–II, multiple sections, and academic terms.",
      solution:
        "Built the checklist & auto-assignment engine, Term 1/Term 2 Excel normalization pipelines, ICSE vs. CBSE campus isolation, grade/subject/teacher drilldown analytics, section deduplication, and role-matrix access controls.",
      highlights: [
        "Automated checklist & curriculum item assignment across K1–12 and PU I–II cohorts",
        "Isolated ICSE vs. CBSE curriculum tracks per campus and fixed cross-section state mutation bugs",
        "Term 1 & Term 2 Excel ingestion & normalization pipelines with section deduplication",
      ],
      tech: ["TypeScript", "Prisma", "PostgreSQL", "Redis", "xlsx", "React"],
      preview: {
        headerTitle: "LAC · Term 2 Assessment Matrix (Anonymized)",
        statusLabel: "15 Campuses Synced",
        kpis: [
          { label: "Checklists Assigned", value: "4,820", delta: "+18%" },
          { label: "Deduplicated Rows", value: "100%", delta: "0 dupes" },
          { label: "Term Sync Latency", value: "1.4s", delta: "-64%" },
        ],
        rows: [
          { label: "Campus Alpha · ICSE Grade 6–10", meta: "12 sections · Term 2", progress: 94, status: "Synced" },
          { label: "Campus Beta · CBSE PU I–II", meta: "8 sections · Term 2", progress: 88, status: "Live" },
          { label: "Campus Gamma · K1–5 Literacy", meta: "14 sections · Term 2", progress: 97, status: "Verified" },
        ],
      },
    },
    {
      id: "performance",
      shortLabel: "Performance & Reliability",
      title: "Performance Engineering (Redis + PostgreSQL + PM2)",
      commitsBadge: "61+ commits",
      ownership: {
        context: "High-concurrency AWS EC2 + RDS production stack",
        ownedEndToEnd:
          "L1/L2 Redis session caching, composite indexes ((campus, checklistId), ObservationScore, Notification), PgBouncer directUrl & PM2 cluster mode",
        impact: "Eliminated DB saturation & OOM crashes under peak campus load",
      },
      challenge:
        "High-traffic dashboards, auth checks, and single-process Node.js memory spikes caused RDS query saturation under PgBouncer pooling and OOM risk on EC2.",
      solution:
        "Engineered L1 in-memory + L2 Redis caching for zero-DB session verification and hot counts, added composite PostgreSQL indexes, configured Prisma directUrl for PgBouncer-safe migrations, and deployed PM2 Cluster Mode with 800MB rolling restarts & 1GB heap caps.",
      highlights: [
        "Two-tier L1 in-memory + L2 Redis caching eliminating redundant DB auth & settings lookups",
        "Composite PostgreSQL indexes on (campus, checklistId), DanielsonObservationScore, and Notification",
        "PM2 Cluster Mode with 800MB rolling memory restarts, 1GB max heap, and tuned ALB → Nginx rate limits",
      ],
      tech: ["Redis (ioredis)", "PostgreSQL Indexing", "PgBouncer", "PM2 Cluster", "AWS RDS", "Nginx"],
      preview: {
        headerTitle: "Cache & Runtime Telemetry (Anonymized)",
        statusLabel: "PM2 Cluster Active",
        kpis: [
          { label: "Auth Cache Hit Rate", value: "98.6%", delta: "L1 + L2" },
          { label: "P95 Dashboard API", value: "42ms", delta: "-78%" },
          { label: "Memory Guard", value: "800MB", delta: "Rolling" },
        ],
        rows: [
          { label: "L1/L2 Session Verification", meta: "ioredis · zero-DB auth", progress: 99, status: "Live" },
          { label: "Composite Index Scan Ratio", meta: "PostgreSQL · RDS", progress: 95, status: "Verified" },
          { label: "PM2 Cluster + ALB Proxy", meta: "Zero-OOM rolling restarts", progress: 97, status: "Synced" },
        ],
      },
    },
    {
      id: "educator-bi",
      shortLabel: "Educator Growth & BI",
      title: "Educator Growth, Observations & Enterprise BI",
      commitsBadge: "177+ commits",
      ownership: {
        context: "Core educator lifecycle & executive reporting suite",
        ownedEndToEnd:
          "Multi-cycle goal workflows, Cluster 1–5 observation rubrics, Socket.IO Redis adapter real-time updates & multi-format BI exports",
        impact: "Real-time visibility for 450+ educators and campus leaders",
      },
      challenge:
        "Leaders and management needed real-time visibility across Self-Reflections, Goal Cycles, and Cluster 1–5 Observation Rubrics without spreadsheet drift.",
      solution:
        "Built multi-cycle goal workflows (Self-Reflection → Goal Setting → Mid-Year Review → Cycle 2), Cluster 1–5 observation & debrief flows, and a Unified Enterprise BI Dashboard with Recharts visualizations and multi-format exports (Excel, PDF, DOCX).",
      highlights: [
        "End-to-end educator lifecycle: Self-Reflection → Goal Setting → Mid-Year Review → Cycle 2",
        "Cluster 1–5 classroom observation rubrics with structured leader debrief workflows",
        "Unified Enterprise BI Dashboard with Recharts analytics and Excel, PDF, & DOCX exports",
      ],
      tech: ["React", "Recharts", "Socket.IO (Redis Adapter)", "Zod", "Express"],
      preview: {
        headerTitle: "Enterprise BI · Growth Cycles (Anonymized)",
        statusLabel: "Real-Time Socket.IO",
        kpis: [
          { label: "Active Educators", value: "450+", delta: "15 campuses" },
          { label: "Cluster 1–5 Rubrics", value: "1,290", delta: "Cycle 2" },
          { label: "Report Exports", value: "XLSX/PDF", delta: "+DOCX" },
        ],
        rows: [
          { label: "Self-Reflection → Goal Setting", meta: "Cycle 1 completion", progress: 96, status: "Verified" },
          { label: "Cluster 1–5 Classroom Observations", meta: "Debriefs logged", progress: 84, status: "Live" },
          { label: "Executive BI Multi-Format Export", meta: "Excel · PDF · DOCX", progress: 91, status: "Synced" },
        ],
      },
    },
    {
      id: "mooc-devops",
      shortLabel: "MOOC, Mobile CI/CD & Security",
      title: "MOOC Workflow, Mobile CI/CD & Compliance Auditing",
      commitsBadge: "Full-Stack Hardening",
      ownership: {
        context: "Production security, governance & mobile release pipeline",
        ownedEndToEnd:
          "DB-backed MOOC approval trails, 12-month audit log retention, GitHub Actions for EC2 + Capacitor iOS/Android & OWASP auditing",
        impact: "Automated mobile builds & enterprise-grade security posture",
      },
      challenge:
        "Track educator PD hours at scale with verifiable evidence, compliance audit logs, automated native mobile builds, and enterprise OWASP security.",
      solution:
        "Built a DB-backed MOOC catalog & multi-round approval/rejection trail, implemented a 12-month compliance audit log retention policy, automated GitHub Actions pipelines for AWS EC2 + Capacitor SPM/Xcode iOS & Android APK builds, and completed full-stack OWASP hardening.",
      highlights: [
        "12-month compliance audit log retention policy across enterprise approvals and admin actions",
        "Automated GitHub Actions CI/CD for AWS EC2 and Capacitor SPM/Xcode (iphoneos) iOS + Android APK builds",
        "Full-stack OWASP hardening: RBAC, SVG upload XSS, SSRF blocking, Socket.IO room ACLs, strict CORS",
      ],
      tech: ["GitHub Actions", "Capacitor (iOS/Android)", "AWS EC2 & S3", "OWASP Security", "Audit Logging"],
      preview: {
        headerTitle: "Release Pipeline & Security Audit (Anonymized)",
        statusLabel: "OWASP Hardened",
        kpis: [
          { label: "Mobile CI/CD", value: "iOS + APK", delta: "Capacitor" },
          { label: "Audit Retention", value: "12 Mos", delta: "Compliance" },
          { label: "Security Controls", value: "5+ Layers", delta: "OWASP" },
        ],
        rows: [
          { label: "MOOC Approval & 12-Mo Audit Trail", meta: "S3 verified evidence", progress: 95, status: "Verified" },
          { label: "GitHub Actions → EC2 & Mobile", meta: "Xcode SPM + Android APK", progress: 98, status: "Live" },
          { label: "OWASP & Socket.IO Room ACLs", meta: "XSS · SSRF · CORS hardened", progress: 100, status: "Verified" },
        ],
      },
    },
  ] satisfies EnterpriseTab[],
};
