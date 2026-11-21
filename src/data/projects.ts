export interface ArchitectureStep {
  label: string;
  sublabel: string;
  accent?: "teal" | "emerald" | "zinc";
}

export interface TradeoffItem {
  decision: string;
  rationale: string;
}

export interface BenchmarkDelta {
  metric: string;
  before: string;
  after: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  badge: string;
  featuredInGrid: boolean;
  isPrivateProduction?: boolean;
  summary: string;
  problem: string;
  solution: string;
  highlights: string[];
  impactMetrics: { label: string; value: string }[];
  architectureFlow: ArchitectureStep[];
  benchmarks: BenchmarkDelta[];
  tradeoffs: TradeoffItem[];
  whatIdDoDifferently: string[];
  tech: string[];
  githubUrl?: string;
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: "enterprise-edtech-platform",
    title: "Enterprise EdTech & Educator Growth Platform",
    shortTitle: "Enterprise EdTech Platform",
    category: "Enterprise Full-Stack · Multi-Campus SaaS",
    badge: "Flagship · 967+ Commits",
    featuredInGrid: false,
    isPrivateProduction: true,
    summary:
      "End-to-end architecture and production ownership of a multi-campus educator growth, learning analytics, and enterprise BI platform serving 15+ campuses and 450+ active users.",
    problem:
      "Managing curriculum checklists across ICSE/CBSE K1–12 & PU I–II, multi-cycle educator appraisals, real-time BI reporting, and PD tracking at multi-campus scale caused RDS saturation, OOM instability, and manual spreadsheet overhead.",
    solution:
      "Architected a 161-model PostgreSQL/Prisma modular monolith with 88 API route modules, L1/L2 Redis caching, composite indexes, PM2 cluster mode with 800MB rolling restarts, Socket.IO Redis adapter, 730+ React modules, Capacitor iOS/Android CI/CD, and 12-month compliance audit logging.",
    highlights: [
      "Learning Analytics Center (166+ commits): auto-assignment engine, Term 1/2 Excel pipelines, ICSE/CBSE campus isolation, and role-matrix drilldowns.",
      "Performance & Reliability (61+ commits): L1 in-memory + L2 Redis caching, composite PostgreSQL indexes, PgBouncer directUrl migrations, and PM2 Cluster Mode (800MB rolling restarts / 1GB heap cap).",
      "Educator Growth & Enterprise BI (177+ commits): multi-cycle reflections & goals, Cluster 1–5 observation rubrics, Recharts BI dashboards, and Excel/PDF/DOCX exports.",
      "Compliance, Mobile CI/CD & Security: 12-month audit log retention, GitHub Actions for EC2 + Capacitor SPM/Xcode iOS & Android APK builds, and full-stack OWASP hardening.",
    ],
    impactMetrics: [
      { label: "Commits Shipped", value: "967+" },
      { label: "DB Models", value: "161" },
      { label: "API Modules", value: "88" },
      { label: "Production Reach", value: "15+ Campuses" },
    ],
    architectureFlow: [
      { label: "Web & Mobile", sublabel: "React · Capacitor", accent: "zinc" },
      { label: "AWS ALB + Nginx", sublabel: "TLS · Rate Limits", accent: "teal" },
      { label: "PM2 Cluster API", sublabel: "88 Route Modules", accent: "zinc" },
      { label: "Redis L1/L2", sublabel: "Cache · Socket.IO", accent: "emerald" },
      { label: "PostgreSQL + PgBouncer", sublabel: "161 Prisma Models", accent: "teal" },
    ],
    benchmarks: [
      {
        metric: "Session & Auth Verification",
        before: "Per-request RDS query under PgBouncer",
        after: "L1 in-memory + L2 Redis hit (zero-DB auth)",
      },
      {
        metric: "High-Read Campus & Observation Queries",
        before: "Sequential scans during peak term reviews",
        after: "Composite indexes ((campus, checklistId), ObservationScore)",
      },
      {
        metric: "Node.js Runtime Stability on EC2",
        before: "Single-process OOM crash risk on heavy exports",
        after: "PM2 Cluster Mode + 800MB rolling memory restarts",
      },
    ],
    tradeoffs: [
      {
        decision: "Modular Monolith + Redis + PgBouncer over Microservices",
        rationale:
          "Kept ACID transactional integrity across 161 tightly related academic models while eliminating distributed-transaction overhead and keeping EC2 ops lean.",
      },
      {
        decision: "L1/L2 Caching + Composite Indexing before RDS Vertical Scaling",
        rationale:
          "Solved the root query saturation bottleneck at 0 extra AWS infrastructure cost instead of masking bad access patterns with a larger RDS instance.",
      },
    ],
    whatIdDoDifferently: [
      "Introduce a dedicated PostgreSQL read replica + BullMQ async job outbox for heavy multi-campus Excel/PDF/DOCX BI exports so report generation never shares API worker CPU.",
      "Add OpenTelemetry tracing across Express → Prisma → Redis earlier to surface slow composite query regressions automatically in CI.",
    ],
    tech: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "PgBouncer",
      "Redis (ioredis)",
      "PM2 Cluster",
      "Socket.IO",
      "AWS EC2/RDS/S3",
      "Capacitor",
      "GitHub Actions",
    ],
  },
  {
    slug: "ai-stock-analysis-agent",
    title: "AI Stock Research & Prediction Agent (NSE/BSE)",
    shortTitle: "AI Stock Prediction Agent",
    category: "Agentic AI · Quantitative FinTech",
    badge: "LangGraph AI Agent",
    featuredInGrid: true,
    summary:
      "Quantitative-first AI equity research and prediction platform for Indian markets (NSE/BSE), combining dual technical/fundamental scoring engines with a LangGraph synthesis agent.",
    problem:
      "Equity analysis across NSE/BSE requires stitching together intraday momentum, ROE/ROCE fundamentals, sector regimes, and news sentiment — while avoiding ungrounded LLM hallucinations.",
    solution:
      "Engineered a quantitative-first pipeline (Market Data → Technical & Fundamental Calculations → Dual Scoring Engines → Regime Filtering → LangGraph AI Explanation Agent) with pluggable data providers and Dockerized FastAPI + React architecture.",
    highlights: [
      "Dual Scoring Engines: Today's Market Score (intraday momentum, volume surges, technical setups) and Long-Term Quality Score (ROE/ROCE, FCF, balance sheet, valuation).",
      "LangGraph Research Agent synthesizing verified quantitative signals into actionable thesis summaries with explicit confidence levels.",
      "Pluggable Provider Abstractions (MarketDataProvider, FundamentalDataProvider, NewsDataProvider) supporting Yahoo Finance, Dhan, and Zerodha feeds.",
      "Full-stack Docker Compose deployment with FastAPI async backend, PostgreSQL/SQLAlchemy, Redis caching, and React/TypeScript financial charts.",
    ],
    impactMetrics: [
      { label: "Markets Covered", value: "NSE / BSE" },
      { label: "Scoring Engines", value: "2 (Short/Long)" },
      { label: "Agent Framework", value: "LangGraph" },
      { label: "Deployment", value: "Docker + Render" },
    ],
    architectureFlow: [
      { label: "Pluggable Feeds", sublabel: "Yahoo · Dhan · Zerodha", accent: "zinc" },
      { label: "Quant Engine", sublabel: "Pandas · Scikit-learn", accent: "teal" },
      { label: "Dual Scorer", sublabel: "Momentum + Quality", accent: "zinc" },
      { label: "LangGraph Agent", sublabel: "Confidence Synthesis", accent: "emerald" },
      { label: "React Dashboard", sublabel: "FastAPI · Redis · PG", accent: "teal" },
    ],
    benchmarks: [
      {
        metric: "Signal Grounding & Reliability",
        before: "Pure LLM prompts hallucinating P/E or momentum numbers",
        after: "Deterministic Pandas/NumPy scoring computed before LLM synthesis",
      },
      {
        metric: "Repeated Ticker Lookups",
        before: "Live upstream provider round-trip on every request",
        after: "Redis TTL caching + async FastAPI fan-out across providers",
      },
    ],
    tradeoffs: [
      {
        decision: "Deterministic Quantitative Scoring Before LangGraph Synthesis",
        rationale:
          "Separating math (technical indicators, ROE/ROCE, regime filters) from LLM reasoning drastically reduces token cost, latency, and financial hallucinations.",
      },
      {
        decision: "Pluggable Provider Interfaces Over Hardcoded Broker SDKs",
        rationale:
          "Decoupling MarketDataProvider and FundamentalDataProvider lets the platform swap Yahoo Finance, Dhan, or Zerodha without rewriting scoring logic.",
      },
    ],
    whatIdDoDifferently: [
      "Add walk-forward historical backtesting with Sharpe/Sortino attribution directly into the UI so users can verify dual-score alpha across market regimes.",
      "Stream LangGraph agent reasoning steps over Server-Sent Events (SSE) for sub-second perceived latency on cold ticker research.",
    ],
    tech: [
      "Python 3.11",
      "FastAPI",
      "LangGraph",
      "SQLAlchemy",
      "PostgreSQL",
      "Redis",
      "Scikit-learn",
      "React",
      "TypeScript",
      "Docker",
    ],
    githubUrl: "https://github.com/Chandan767/stockanalysis",
  },
  {
    slug: "zoho-neverskip-integration",
    title: "Zoho → NeverSkip Enterprise API Integration",
    shortTitle: "Zoho → NeverSkip API Sync",
    category: "Backend Middleware · Enterprise API Sync",
    badge: "Enterprise Integration",
    featuredInGrid: true,
    isPrivateProduction: true,
    summary:
      "Automated OAuth 2.0 middleware synchronizing admissions, student, and staff records between Zoho CRM/People and NeverSkip School ERP with zero duplicates.",
    problem:
      "Manual data entry between Zoho (CRM/People/Admissions) and NeverSkip (School ERP) caused sync delays, duplicate student/staff records, and formatting mismatches across campuses.",
    solution:
      "Built a resilient TypeScript/Node.js integration service with automated OAuth 2.0 token refresh, JSON schema field normalization, idempotent upserts, and structured retry/error logging.",
    highlights: [
      "Automated OAuth 2.0 token lifecycle & refresh management for uninterrupted Zoho ↔ NeverSkip API orchestration.",
      "Deterministic field mapping and JSON schema payload normalization bridging incompatible CRM and ERP formats.",
      "Idempotent upsert pipeline preventing duplicate student and staff records even under webhook replays.",
      "Structured audit & retry logging for rapid reconciliation of malformed upstream records.",
    ],
    impactMetrics: [
      { label: "Duplicate Records", value: "0%" },
      { label: "Auth Flow", value: "OAuth 2.0" },
      { label: "Sync Mode", value: "Idempotent" },
      { label: "Manual Entry", value: "Eliminated" },
    ],
    architectureFlow: [
      { label: "Zoho CRM / People", sublabel: "Webhooks · REST", accent: "zinc" },
      { label: "OAuth2 Token Guard", sublabel: "Auto-Refresh", accent: "teal" },
      { label: "Schema Normalizer", sublabel: "Field Mapping", accent: "zinc" },
      { label: "Idempotent Upsert", sublabel: "Dedup + Retries", accent: "emerald" },
      { label: "NeverSkip ERP", sublabel: "Synced Records", accent: "teal" },
    ],
    benchmarks: [
      {
        metric: "Cross-System Record Duplication",
        before: "Frequent duplicate student/staff profiles from manual re-entry",
        after: "0% duplicates via deterministic external-ID idempotent upserts",
      },
      {
        metric: "OAuth Session Continuity",
        before: "Expired access tokens stalling manual sync scripts",
        after: "Automated proactive token refresh + retry queue logging",
      },
    ],
    tradeoffs: [
      {
        decision: "Idempotent Upsert Keys + Retry Logging Over Blind Cron Overwrites",
        rationale:
          "Blind periodic overwrites risk clobbering manual ERP corrections; idempotent upserts with structured error logs keep both systems auditable and safe on replay.",
      },
    ],
    whatIdDoDifferently: [
      "Add cryptographic webhook signature verification and a BullMQ dead-letter queue with automated Slack ops alerts for failed ERP payloads.",
      "Expose a lightweight reconciliation dashboard so admissions teams can replay malformed records without engineering intervention.",
    ],
    tech: [
      "Node.js",
      "TypeScript",
      "REST APIs",
      "OAuth 2.0",
      "Webhooks",
      "JSON Schema Mapping",
    ],
  },
  {
    slug: "n8n-slack-drive-automation",
    title: "n8n Slack → Google Drive Automation Pipeline",
    shortTitle: "n8n Slack → Drive Pipeline",
    category: "Workflow Automation · Event-Driven Ops",
    badge: "Event-Driven Ops",
    featuredInGrid: true,
    summary:
      "Event-driven n8n automation capturing Slack channel attachments, resolving structured Google Drive folders dynamically, checking duplicates, and replying in-thread.",
    problem:
      "Teams shared important files, reports, and attachments across busy Slack channels, making manual archiving into structured Google Drive folders slow, inconsistent, and error-prone.",
    solution:
      "Designed an event-driven n8n workflow triggered by Slack file-share webhooks, using custom JavaScript Code Nodes for dynamic folder resolution, standardized naming, duplicate checks, and instant Slack confirmation replies.",
    highlights: [
      "Real-time Slack webhook trigger listening for file shares and structured channel messages.",
      "Dynamic Google Drive folder resolution & creation based on channel, date, and document metadata.",
      "Standardized file naming convention and pre-upload duplicate detection via Drive API.",
      "Instant threaded Slack confirmation replies with direct Google Drive share links for the team.",
    ],
    impactMetrics: [
      { label: "Trigger Model", value: "Event-Driven" },
      { label: "Duplicate Checks", value: "Automated" },
      { label: "Confirmation", value: "Instant Reply" },
      { label: "Ops Overhead", value: "Zero Manual" },
    ],
    architectureFlow: [
      { label: "Slack Channel", sublabel: "File Share Event", accent: "zinc" },
      { label: "n8n Webhook", sublabel: "Event Listener", accent: "teal" },
      { label: "JS Code Node", sublabel: "Naming & Routing", accent: "zinc" },
      { label: "Google Drive API", sublabel: "Folder + Upload", accent: "emerald" },
      { label: "Slack Thread Reply", sublabel: "Drive Link Ack", accent: "teal" },
    ],
    benchmarks: [
      {
        metric: "Document Archival Speed",
        before: "Manual download, rename & upload across channels",
        after: "Event-driven sub-5s archival with automated Slack thread link",
      },
      {
        metric: "Folder Hygiene & Duplicates",
        before: "Ad-hoc filenames & duplicate uploads in shared Drive",
        after: "Standardized naming + Drive API pre-upload duplicate check",
      },
    ],
    tradeoffs: [
      {
        decision: "n8n + Custom JS Code Nodes Over Bespoke Microservice",
        rationale:
          "Delivered rapid ops maintainability and visual retry inspection while keeping custom folder-routing logic cleanly testable in JavaScript.",
      },
    ],
    whatIdDoDifferently: [
      "Add Slack HMAC request signing validation and rate-limit exponential backoff for bulk multi-file channel drops.",
      "Index archived Drive file IDs into a lightweight metadata table to support instant Slack slash-command search.",
    ],
    tech: [
      "n8n",
      "Slack API",
      "Google Drive API",
      "Webhooks",
      "JavaScript (n8n Code Nodes)",
    ],
    githubUrl: "https://github.com/Chandan767/Automation-",
  },
  {
    slug: "diabetes-prediction-system",
    title: "Diabetes Prediction System",
    shortTitle: "Diabetes Prediction ML",
    category: "Machine Learning · Healthcare Analytics",
    badge: "76.6% Accuracy · ML",
    featuredInGrid: true,
    summary:
      "End-to-end clinical risk screening ML system powered by a Balanced Random Forest Classifier achieving 76.6% accuracy, 74.5% precision, and 76.7% recall behind a FastAPI service.",
    problem:
      "Early risk screening for diabetes requires handling class-imbalanced clinical datasets (glucose, BMI, insulin, age, blood pressure, pedigree function) without sacrificing recall on high-risk patients.",
    solution:
      "Built a reproducible Python ML pipeline with data cleaning, feature scaling, and a Balanced Random Forest Classifier tuned for clinical recall, served via a real-time FastAPI web interface.",
    highlights: [
      "Cleaned and engineered clinical feature set with domain-aware zero-value imputation and scaling.",
      "Trained and evaluated a Balanced Random Forest Classifier achieving 76.6% accuracy, 74.5% precision, and 76.7% recall.",
      "Benchmarked classifiers across precision-recall tradeoffs to minimize false negatives in screening.",
      "FastAPI inference endpoint returning real-time risk classification from patient health parameters.",
    ],
    impactMetrics: [
      { label: "Accuracy", value: "76.6%" },
      { label: "Precision", value: "74.5%" },
      { label: "Recall", value: "76.7%" },
      { label: "Classifier", value: "Balanced RF" },
    ],
    architectureFlow: [
      { label: "Clinical Input UI", sublabel: "8 Health Metrics", accent: "zinc" },
      { label: "FastAPI Service", sublabel: "Schema Validation", accent: "teal" },
      { label: "Preprocessor", sublabel: "Impute + Scale", accent: "zinc" },
      { label: "Balanced RF Model", sublabel: "76.7% Recall", accent: "emerald" },
      { label: "Risk Assessment", sublabel: "Score + Class", accent: "teal" },
    ],
    benchmarks: [
      {
        metric: "Positive Class Recall (Clinical Safety)",
        before: "Standard imbalanced classifier missed high-risk minority cases",
        after: "Balanced Random Forest raised recall to 76.7% at 76.6% accuracy",
      },
      {
        metric: "Clinical Data Quality",
        before: "Biologically impossible 0s in Glucose/BMI/Insulin skewed splits",
        after: "Domain-aware median imputation + standardized inference pipeline",
      },
    ],
    tradeoffs: [
      {
        decision: "Balanced Random Forest Over Uncalibrated Black-Box Neural Net",
        rationale:
          "On tabular clinical datasets, Balanced Random Forest handles class imbalance cleanly, resists overfitting, and provides interpretable feature importances for clinicians.",
      },
    ],
    whatIdDoDifferently: [
      "Add SHAP per-patient waterfall explanations to the FastAPI response so clinicians see why a specific score was flagged.",
      "Apply Platt/isotonic probability calibration and drift monitoring for continuous clinical validation.",
    ],
    tech: [
      "Python",
      "Scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
    ],
    githubUrl: "https://github.com/Chandan767/diabities_prediction",
  },
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
