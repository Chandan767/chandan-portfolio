export interface EngineeringNote {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  tldr: string;
  sections: {
    heading: string;
    body: string[];
    code?: {
      filename: string;
      snippet: string;
    };
  }[];
  takeaways: string[];
}

export const engineeringNotes: EngineeringNote[] = [
  {
    slug: "zero-db-session-verification-redis",
    title: "Zero-DB Session Verification with L1 + L2 Redis Caching",
    subtitle:
      "How two-tier in-memory + ioredis caching eliminated per-request RDS auth lookups across 15+ campuses.",
    date: "Engineering Note · ADR-01",
    readTime: "3 min read",
    category: "Backend & Caching",
    tags: ["Redis", "ioredis", "Express", "Prisma", "PostgreSQL"],
    tldr: "Every authenticated API call used to hit PostgreSQL via PgBouncer just to re-verify user status and role permissions. Moving session/user resolution to an L1 in-memory LRU + L2 Redis cache eliminated redundant DB reads and dropped dashboard P95 latency dramatically.",
    sections: [
      {
        heading: "1. The Bottleneck Under Peak Campus Traffic",
        body: [
          "In a multi-campus platform with 88 Express route modules and 450+ concurrent educators, authentication middleware runs on virtually every request. Querying the User and Role tables on PostgreSQL for each API call quickly became the #1 source of RDS connection pressure under PgBouncer pooling.",
          "Even worse, a single page load firing 6 parallel dashboard requests triggered 6 identical auth queries within milliseconds.",
        ],
      },
      {
        heading: "2. Two-Tier L1 (Memory) + L2 (Redis) Architecture",
        body: [
          "Instead of jumping straight to a larger RDS instance, we introduced a two-tier lookup in auth middleware: a short-TTL L1 in-memory cache (15–30s) inside each Node.js worker backed by a shared L2 Redis cache (ioredis) across PM2 cluster workers.",
          "When an admin changes a user's role or deactivates an account, we explicitly invalidate the L2 Redis key and broadcast a lightweight invalidation event so stale permissions cannot linger.",
        ],
        code: {
          filename: "auth-cache-flow.ts",
          snippet: `async function resolveAuthUser(userId: string) {
  // L1: Instant worker-local hit (~0.05ms)
  const localHit = l1Cache.get(userId);
  if (localHit) return localHit;

  // L2: Shared Redis hit (~1-2ms, zero RDS load)
  const redisPayload = await redis.get(\`auth:user:\${userId}\`);
  if (redisPayload) {
    const parsed = JSON.parse(redisPayload);
    l1Cache.set(userId, parsed, 20_000);
    return parsed;
  }

  // Fallback: Single indexed Prisma read + hydrate both tiers
  const user = await prisma.user.findUnique({ where: { id: userId }, select: AUTH_SELECT });
  if (user) {
    await redis.set(\`auth:user:\${userId}\`, JSON.stringify(user), "EX", 300);
    l1Cache.set(userId, user, 20_000);
  }
  return user;
}`,
        },
      },
      {
        heading: "3. Trade-offs & Guardrails",
        body: [
          "Caching auth state requires strict discipline around invalidation. We kept L1 TTLs intentionally short (seconds, not minutes), excluded sensitive password hashes from cached payloads, and paired auth caching with composite PostgreSQL indexes on high-read domain tables.",
        ],
      },
    ],
    takeaways: [
      "Always profile your auth middleware first — it silently multiplies every frontend fan-out request.",
      "L1 + L2 caching gives sub-millisecond hits while Redis keeps PM2 cluster workers consistent.",
      "Fix query patterns and caching before throwing money at vertical RDS scaling.",
    ],
  },
  {
    slug: "prisma-migrations-pgbouncer-pm2-cluster",
    title: "Prisma Migrations Behind PgBouncer & PM2 Cluster Mode",
    subtitle:
      "Production lessons on directUrl migrations, composite indexes, and 800MB rolling memory restarts on AWS EC2.",
    date: "Engineering Note · ADR-02",
    readTime: "3 min read",
    category: "Databases & Infra",
    tags: ["PostgreSQL", "PgBouncer", "Prisma", "PM2", "AWS EC2"],
    tldr: "Transaction-pooled PgBouncer connections keep RDS healthy under high concurrency, but they break Prisma schema migrations unless you separate pooled runtime URLs from directUrl. Pairing this with PM2 cluster mode and 800MB rolling memory restarts eliminated both migration locks and EC2 OOM crashes.",
    sections: [
      {
        heading: "1. Why PgBouncer Breaks Naive Prisma Setups",
        body: [
          "PgBouncer in transaction pooling mode multiplexes hundreds of short-lived app queries onto a small pool of PostgreSQL connections. However, Prisma Migrate relies on session-level advisory locks and prepared statements that fail or hang behind transaction pooling.",
          "The fix is explicit connection separation in schema.prisma: DATABASE_URL points to PgBouncer (?pgbouncer=true) for runtime queries, while directUrl connects straight to AWS RDS exclusively during CI/CD migrations.",
        ],
        code: {
          filename: "prisma/schema.prisma",
          snippet: `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL") // PgBouncer transaction pool
  directUrl = env("DIRECT_URL")   // Direct AWS RDS for migrations
}`,
        },
      },
      {
        heading: "2. Eliminating EC2 OOM Crashes with PM2 Cluster Mode",
        body: [
          "Generating large multi-campus Excel/PDF/DOCX exports in a single Node.js process occasionally spiked heap usage. Moving to PM2 Cluster Mode with explicit max_memory_restart: '800M' and --max-old-space-size=1024 ensured graceful rolling worker restarts with zero dropped requests behind Nginx.",
        ],
        code: {
          filename: "ecosystem.config.cjs",
          snippet: `module.exports = {
  apps: [{
    name: "platform-api",
    script: "dist/server.js",
    exec_mode: "cluster",
    instances: "max",
    max_memory_restart: "800M",
    node_args: "--max-old-space-size=1024",
  }],
};`,
        },
      },
    ],
    takeaways: [
      "Always configure Prisma directUrl when running behind PgBouncer transaction pooling.",
      "Pair composite indexes on high-read filters like (campus, checklistId) with connection pooling.",
      "Set explicit PM2 memory restart thresholds before a heavy report export takes down your EC2 instance.",
    ],
  },
  {
    slug: "idempotent-oauth2-sync-middleware",
    title: "Designing Idempotent OAuth 2.0 Sync Middleware (Zoho → ERP)",
    subtitle:
      "Preventing duplicate student & staff records across incompatible CRM and School ERP APIs.",
    date: "Engineering Note · ADR-03",
    readTime: "3 min read",
    category: "API Integrations",
    tags: ["OAuth 2.0", "TypeScript", "Node.js", "Webhooks", "Idempotency"],
    tldr: "Enterprise API integrations fail in predictable ways: expired OAuth tokens, replayed webhooks, and mismatched field schemas. Solving this cleanly requires a proactive token guard, deterministic JSON schema normalization, and idempotent upsert keys.",
    sections: [
      {
        heading: "1. Why Naive Sync Scripts Create Duplicates",
        body: [
          "Webhooks from CRM platforms like Zoho can fire more than once for the same admissions update, and network timeouts often trigger retries. If your middleware blindly calls POST /students on the target ERP (NeverSkip), you end up with duplicate profiles and broken fee/attendance links.",
        ],
      },
      {
        heading: "2. Three-Stage Resilient Sync Pipeline",
        body: [
          "Stage 1 — Proactive OAuth 2.0 Token Guard: Cache the access token with an expiry buffer (e.g., refresh 5 minutes early) and serialize concurrent refresh calls so parallel webhooks never invalidate each other.",
          "Stage 2 — Deterministic Field Normalizer: Validate and map phone formats, date strings, campus codes, and grade enums via strict JSON schema before touching the downstream ERP.",
          "Stage 3 — Idempotent Upsert + Audit Log: Key every sync operation by a stable external source ID so replayed webhooks safely update rather than duplicate, while malformed payloads land in a structured retry log.",
        ],
      },
    ],
    takeaways: [
      "Treat every incoming webhook as at-least-once delivery — idempotency is mandatory.",
      "Serialize OAuth2 refresh calls to prevent token-refresh race conditions under burst traffic.",
      "Log normalized payload diffs so ops teams can reconcile upstream data errors in minutes.",
    ],
  },
  {
    slug: "quantitative-first-ai-agents-langgraph",
    title: "Quantitative-First AI Agents with LangGraph",
    subtitle:
      "Why separating deterministic financial scoring from LLM reasoning prevents hallucinations in NSE/BSE equity research.",
    date: "Engineering Note · ADR-04",
    readTime: "3 min read",
    category: "Agentic AI & ML",
    tags: ["LangGraph", "FastAPI", "Python", "Scikit-learn", "FinTech"],
    tldr: "Asking an LLM directly to 'analyze a stock' produces confident-sounding hallucinations. In my NSE/BSE AI Stock Research platform, deterministic Python engines compute momentum and fundamental scores first — LangGraph only synthesizes verified quantitative outputs with explicit confidence levels.",
    sections: [
      {
        heading: "1. The Problem With Pure-LLM Financial Agents",
        body: [
          "LLMs excel at synthesis and narrative clarity, not arithmetic or time-series math. Passing raw OHLCV candles or unnormalized quarterly filings straight to an LLM leads to miscalculated ratios, inconsistent scoring, and high token latency.",
        ],
      },
      {
        heading: "2. Deterministic Dual Scoring → LangGraph Synthesis",
        body: [
          "We split the architecture into two strict layers: (1) Pluggable data providers (Yahoo Finance, Dhan, Zerodha) feed a Pandas/NumPy/Scikit-learn engine that computes Today's Market Score (intraday momentum, volume surges, technical setups) and Long-Term Quality Score (ROE/ROCE, FCF, balance sheet, valuation).",
          "(2) Only after regime and sector filtering completes does the LangGraph research agent receive the structured JSON scorecard to synthesize a human-readable thesis with explicit confidence bounds.",
        ],
      },
    ],
    takeaways: [
      "Keep math deterministic in Python/Pandas; use LLMs strictly for synthesis and explanation.",
      "Abstract data providers early so broker/market feeds can be swapped without touching agent prompts.",
      "Always surface explicit confidence levels alongside AI-generated research summaries.",
    ],
  },
];

export function getNoteBySlug(slug: string): EngineeringNote | undefined {
  return engineeringNotes.find((n) => n.slug === slug);
}
