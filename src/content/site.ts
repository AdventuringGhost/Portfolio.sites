import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  hero: {
    title: "Azure Gmail Email Agent — DevSecOps Case Study",
    subtitle:
      "Production-grade AI email automation on Azure: identity-based auth, full IaC, and Claude Sonnet 4.6 — for $1.50.",
    ctas: {
      primary: {
        text: "Read the Case Study",
        href: "/projects/azure-email-agent",
      },
      secondary: {
        text: "Resume PDF",
        href: "/resume.pdf",
      },
      ghost: {
        text: "GitHub",
        href: "https://github.com/adventuringghost",
      },
    },
  },
  nav: [], // navigation moved to global dropdown (logo)
  certs: [],
  projects: [
    {
      slug: "warden",
      title: "Warden — Self-Healing Kubernetes Security Agent",
      tagline:
        "AI-driven threat triage and auto-remediation on AKS — two-layer security proven end-to-end for ~$2",
      cardVariant: "accent",
      summaryBullets: [
        "FastAPI webhook server receives Falco runtime alerts and OPA Gatekeeper violations, triages with Claude Sonnet 4.6, and auto-patches low-severity incidents",
        "Two-layer security: OPA Gatekeeper blocks bad workloads at admission; Falco detects threats at runtime via eBPF kernel probes",
        "Full pipeline proven on AKS: shell spawn detected → Falcosidekick → Claude triage → auto-patch → HTTP 200",
        "Total AKS cloud spend across all sessions: ~$2",
      ],
      stack: [
        "Python",
        "FastAPI",
        "Kubernetes / AKS",
        "Falco",
        "OPA Gatekeeper",
        "Claude Sonnet 4.6",
        "Azure Key Vault",
        "Prometheus",
        "Terraform",
        "Azure DevOps",
      ],
      codeUrl: "https://github.com/AdventuringGhost/warden",
      overview:
        "A self-healing Kubernetes security agent deployed on Azure Kubernetes Service. Warden is a Python FastAPI webhook server that receives Falco runtime security alerts and OPA Gatekeeper admission violations, triages each incident with Claude Sonnet 4.6, auto-patches low-severity threats immediately, and drafts remediation runbooks for high-severity incidents requiring human approval. Two-layer security coverage proven end-to-end on a live AKS cluster for ~$2 in total cloud spend.",
      architecture: {
        description:
          "Warden enforces security at two points in the Kubernetes lifecycle. OPA Gatekeeper intercepts workloads at admission — blocking privileged containers, unverified registries, and non-root violations before they reach a node. Falco runs as a privileged DaemonSet using eBPF kernel probes to detect shell spawns, privilege escalation, and suspicious syscalls at runtime. Falcosidekick forwards Falco events to Warden's webhook endpoint. Claude Sonnet 4.6 triages each alert and Warden acts: auto-patching low-severity incidents or generating a runbook for human review. API keys live in Azure Key Vault and are injected at runtime. Prometheus metrics track all triage decisions and outcomes.",
        components: [
          "Python FastAPI webhook server receiving alerts from Falco and OPA Gatekeeper",
          "OPA Gatekeeper ConstraintTemplates (Rego) blocking privileged containers, unverified registries, and non-root violations at admission",
          "Falco DaemonSet using eBPF kernel probes for real-time runtime detection of shell spawns, privilege escalation, and suspicious syscalls",
          "Falcosidekick forwarding Falco events to the Warden webhook endpoint inside the cluster",
          "Claude Sonnet 4.6 for structured alert triage — severity classification and remediation recommendation",
          "Azure Key Vault storing the Claude API key, injected at runtime via managed identity — never in source control",
          "Prometheus metrics tracking alert volume by severity, auto-patch outcomes, and Claude API latency",
          "Terraform provisioning the AKS cluster and Azure supporting resources",
          "Azure DevOps pipeline for infrastructure deployment",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "Kubernetes clusters generate a constant stream of security events — admission violations, runtime anomalies, syscall alerts — that require expert triage, manual response, and accurate severity judgment. Without automation, security teams are buried in noise, slow to respond to real threats, and unable to scale coverage.",
        bullets: [
          "Runtime security events require immediate triage, but manual review is slow and error-prone at volume.",
          "Admission control and runtime detection are often siloed with no unified response layer connecting them.",
          "Low-severity incidents that could be auto-remediated still consume engineer time, reducing capacity for real threats.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "A Python FastAPI webhook server that sits between Kubernetes security tooling and on-call engineers. Warden receives Falco and OPA alerts, classifies severity with Claude Sonnet 4.6, and acts — auto-patching low-severity incidents immediately and surfacing AI-drafted runbooks for high-severity threats that require a human decision.",
        bullets: [
          "Layer 1 — OPA Gatekeeper: Rego policies block non-compliant workloads at admission — no privileged containers, no unverified registries, no non-root violations.",
          "Layer 2 — Falco: eBPF kernel probes detect threats at runtime — shell spawns, privilege escalation, and suspicious syscall patterns.",
          "Claude Sonnet 4.6 triage: structured severity classification — low severity triggers auto-patch, high severity generates a runbook for human review.",
          "Azure Key Vault for secret management: the Claude API key is injected at runtime, never stored in source control or container images.",
        ],
      },
      solutionImage: "/images/warden-opa-constraint-blocking.png",
      solutionImageCaption: "OPA Gatekeeper blocking a privileged container at admission — Layer 1 enforcement working on AKS.",
      outcome: {
        title: "Outcome",
        summary:
          "End-to-end Kubernetes security automation proven on a live AKS cluster: Falco detected a shell spawn, Falcosidekick forwarded the alert to Warden, Claude triaged it as low severity, Warden auto-patched and returned HTTP 200 — all within 3 seconds. Total cloud spend: ~$2.",
        bullets: [
          "Full AKS pipeline proven: shell spawn → Falcosidekick → Claude triage (severity=low) → auto-patch → HTTP 200.",
          "Two-layer security coverage: OPA admission control and Falco runtime detection operating independently on the same cluster.",
          "Total cloud spend across all sessions: ~$2 — production-grade Kubernetes security at near-zero cost.",
          "All AI triage decisions logged with full reasoning chain, original alert payload, and action taken — complete audit trail.",
        ],
      },
      outcomeImage: "/images/warden-falco-event-detected.png",
      outcomeImageCaption: "Falco detecting a shell spawn inside a running container — Layer 2 runtime detection triggering the full triage pipeline.",
      codeSample: {
        language: "python",
        title: "Warden webhook handler — receive alert, triage with Claude, act on severity",
        snippet: `@app.post("/webhook")
async def handle_alert(payload: dict):
    alert = parse_alert(payload)

    triage = await claude_client.triage(
        alert=alert,
        system_prompt=TRIAGE_POLICY,
    )

    if triage.severity == "low":
        await remediate(alert, triage.action)
        metrics.auto_patch_count.inc()
        return {"status": "patched", "severity": triage.severity}

    runbook = await claude_client.draft_runbook(alert, triage)
    metrics.runbook_count.inc()
    return {"status": "runbook_drafted", "severity": triage.severity}`,
      },
      learnings: [
        {
          category: "Kubernetes Security",
          points: [
            "OPA Gatekeeper and Falco address different threat surfaces — admission control stops misconfigurations; runtime detection catches adversarial behaviour that only appears after a workload is running.",
            "Namespace-scoped exclusions are the right pattern for security tooling that needs elevated permissions — Falco's DaemonSet is privileged, so the falco namespace is excluded from BlockPrivilegedContainers constraints.",
            "Parameterised OPA ConstraintTemplates add schema validation complexity that can fail across Kubernetes versions; for a small known-registry list, hardcoded Rego is simpler and more reliable.",
          ],
        },
        {
          category: "AI-Driven Automation",
          points: [
            "Claude Sonnet 4.6 works as a reliable triage component when given structured inputs and constrained output formats — it classifies alerts consistently with defined severity rubrics.",
            "Human approval gates for high-severity actions are non-negotiable; auto-remediation without bounds is a liability, not a feature.",
            "Full logging of AI reasoning with the original alert payload enables post-incident review and builds trust in automated decisions over time.",
          ],
        },
        {
          category: "Secrets & Operations",
          points: [
            "Secrets injected from external vaults can be silently corrupted — validate API key format and length at startup before accepting traffic, not reactively after the first 401.",
            "The ConfigMap-mounted code pattern enables rapid iteration on cluster-internal tooling without custom image builds — acceptable for development, not for production.",
            "WSL2 eBPF limitations mean local Falco detection is not possible; design the dev loop around real cluster validation for eBPF-dependent tooling from the start.",
          ],
        },
      ],
      monitoring: [
        {
          title: "Prometheus Metrics",
          description:
            "Custom metrics track alert volume by severity, auto-patch success and failure rate, Claude API response latency, and runbook generation count. Scraped by the cluster's Prometheus instance and queryable for post-incident analysis.",
        },
        {
          title: "Triage Audit Log",
          description:
            "Every AI triage decision is logged with the original alert payload, Claude's severity classification, the action taken, and a timestamp — giving a complete audit trail for post-incident review and trust-building in automated decisions.",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "wa-m1",
            label: "AKS Cluster Provisioning",
            status: "Complete",
            progress: 100,
            summary:
              "AKS cluster and supporting Azure resources provisioned with Terraform. Azure Key Vault configured for runtime secret injection.",
            tickets: [
              {
                key: "WA-101",
                title: "Terraform AKS + Azure Resources",
                finishingComment:
                  "Cluster provisioned, Key Vault wired up, and Azure DevOps pipeline configured. Infrastructure ready for Warden deployment.",
              },
              {
                key: "WA-102",
                title: "Azure Key Vault Integration",
                finishingComment:
                  "Claude API key stored in Key Vault and injected at runtime. Startup validation added to catch corrupted secrets before traffic is accepted.",
              },
            ],
          },
          {
            id: "wa-m2",
            label: "OPA Gatekeeper Policies",
            status: "Complete",
            progress: 100,
            summary:
              "Admission control layer implemented with Rego ConstraintTemplates. Namespace exclusions configured for Falco's privileged DaemonSet.",
            tickets: [
              {
                key: "WA-201",
                title: "BlockPrivilegedContainers ConstraintTemplate",
                finishingComment:
                  "Rego policy blocks privileged containers cluster-wide. Falco namespace excluded to allow Falco's own DaemonSet to run.",
              },
              {
                key: "WA-202",
                title: "AllowedImageRegistries ConstraintTemplate",
                finishingComment:
                  "Registries hardcoded in Rego after parameterised schema validation errors on AKS. Simpler and more reliable.",
              },
            ],
          },
          {
            id: "wa-m3",
            label: "Falco Runtime Detection",
            status: "Complete",
            progress: 100,
            summary:
              "Falco DaemonSet deployed on AKS with eBPF probes active. Falcosidekick configured to forward events to the Warden webhook endpoint.",
            tickets: [
              {
                key: "WA-301",
                title: "Falco DaemonSet on AKS",
                finishingComment:
                  "Falco running on every node with eBPF probes. WSL2 eBPF limitations documented — full detection validated on-cluster only.",
              },
              {
                key: "WA-302",
                title: "Falcosidekick Webhook Forwarding",
                finishingComment:
                  "Falcosidekick configured to POST structured Falco events to the Warden webhook endpoint inside the cluster.",
              },
            ],
          },
          {
            id: "wa-m4",
            label: "Warden Webhook Server",
            status: "Complete",
            progress: 100,
            summary:
              "FastAPI webhook server deployed via ConfigMap-mounted code. Claude Sonnet 4.6 triage integrated with auto-patch and runbook generation.",
            tickets: [
              {
                key: "WA-401",
                title: "FastAPI Webhook Endpoint",
                finishingComment:
                  "Webhook server receives Falco and OPA alert payloads and routes to the triage pipeline.",
              },
              {
                key: "WA-402",
                title: "Claude Sonnet Triage Integration",
                finishingComment:
                  "Structured triage with severity classification. Low severity triggers auto-patch; high severity generates a runbook for human review.",
              },
              {
                key: "WA-403",
                title: "ConfigMap-Mounted Agent Pattern",
                finishingComment:
                  "Agent code mounted as a Kubernetes ConfigMap and executed via a base Python image — no custom image build required for development iterations.",
              },
            ],
          },
          {
            id: "wa-m5",
            label: "End-to-End Pipeline Proven",
            status: "Complete",
            progress: 100,
            summary:
              "Full AKS pipeline validated: Falco detected a shell spawn, Falcosidekick forwarded to Warden, Claude triaged severity=low, auto-patch applied, HTTP 200 returned.",
            tickets: [
              {
                key: "WA-501",
                title: "AKS End-to-End Demo",
                finishingComment:
                  "Shell spawn in a container triggered Falco. Alert forwarded via Falcosidekick. Claude returned severity=low. Warden auto-patched and returned HTTP 200. Pipeline complete.",
              },
            ],
          },
          {
            id: "wa-m6",
            label: "Case Study Published",
            status: "In Progress",
            progress: 75,
            summary:
              "Portfolio case study written and published to adventuringghost.com.",
            tickets: [
              {
                key: "WA-601",
                title: "Portfolio Entry",
                finishingComment:
                  "Case study content complete. Publishing to portfolio site now.",
              },
            ],
          },
        ],
      },
      portfolioArc: {
        name: "The AI Security & Resilience Stack",
        summary:
          "Three independent projects that together cover the full surface of an AI-augmented infrastructure stack. Warden secures the Kubernetes runtime — Falco and OPA detecting threats as they happen, Claude triaging before an engineer is paged. Covenant controls access at the application layer — OPA as the hard gate between JWT identity and Claude, policy in code not prompts. Watershed closes the loop at the edge — async telemetry buffered through connectivity loss, with Claude flagging anomalies before the data reaches the cloud. Each project stands alone; together they tell one story.",
        peers: ["warden", "covenant", "watershed"],
        costs: [
          { label: "Warden (AKS)", amount: "~$2.00" },
          { label: "Covenant (local Docker)", amount: "$0.00" },
          { label: "Watershed (AWS IoT Core)", amount: "~$0.05" },
        ],
        totalCost: "~$2.05",
      },
    },
    {
      slug: "covenant",
      title: "Covenant — Policy-Enforced AI Access Control",
      tagline:
        "OPA as the hard gate between JWT identity and Claude — the AI doesn't decide who sees what",
      cardVariant: "accent",
      summaryBullets: [
        "OPA Rego policy evaluated on every request before Claude ever runs — hard access gate, not a soft check",
        "Three-role RBAC proven end-to-end: admin 200, user 403 on sensitive data, auditor 403 on query endpoint",
        "pgvector semantic search scoped to tenant_id — cross-tenant results blocked at the query level, not filtered in the response",
        "Policy-as-code: Rego rules are version-controlled, testable PRs — changing a permission is a diff, not a database row",
      ],
      stack: [
        "Python",
        "FastAPI",
        "OPA",
        "PostgreSQL / pgvector",
        "Claude Sonnet 4.6",
        "JWT",
        "Docker",
      ],
      codeUrl: "https://github.com/AdventuringGhost/covenant",
      overview:
        "Covenant is a FastAPI service that enforces OPA Rego policy as a hard gate between JWT identity and Claude Sonnet 4.6. Access is evaluated in the middleware chain before the model runs — a 403 from Rego is a 403, not a suggestion Claude can be prompted around. Three roles (admin, user, auditor) are proven end-to-end with curl demos. pgvector semantic search is scoped by tenant_id, so the AI only ever sees documents it is already permitted to see.",
      architecture: {
        description:
          "The request flow is linear and strictly ordered: JWT validation extracts claims, OPA evaluates policy against those claims, pgvector retrieves tenant-scoped documents, and Claude generates a response from only those permitted documents. If OPA returns false at step two, FastAPI returns 403 immediately and Claude is never called.",
        components: [
          "FastAPI middleware: validates JWT signature, extracts role/user_id/tenant_id claims",
          "OPA REST server (Docker sidecar): evaluates covenant.authz.allow against the input bundle — hard ALLOW or DENY",
          "PostgreSQL with pgvector extension: cosine similarity search filtered by tenant_id — cross-tenant results blocked at query level",
          "Claude Sonnet 4.6: generates response from permitted documents only, system prompt cached via cache_control: ephemeral",
          "Audit log: every OPA decision written with user_id, role, tenant_id, query_hash, docs_returned, opa_decision",
          "Docker Compose: OPA server, Postgres+pgvector, and FastAPI start together — $0 to run locally",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "AI systems that enforce access control inside the prompt are not enforcing access control — they are asking the model to be a security layer. Any sufficiently creative prompt can talk the model past a soft guard. The question is how to put policy enforcement somewhere Claude cannot touch.",
        bullets: [
          "Prompt-based access control is not access control — it's a suggestion the model can be prompted around.",
          "Multi-tenant AI systems need retrieval isolation, not just response filtering — the model should never see cross-tenant data.",
          "Access rules that live in application code or database rows are not auditable, testable, or reviewable the same way code is.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "OPA as middleware, evaluated before the model runs. Rego policies in version control. pgvector retrieval scoped by tenant_id at the query level. Claude only runs on requests that cleared OPA — the AI cannot be a party to the access decision.",
        bullets: [
          "OPA REST server as a FastAPI middleware dependency: POST input bundle, read result.allow — hard gate in the request path.",
          "Rego v1 policies with default allow := false: every identity starts with no access, permissions are explicit grants.",
          "pgvector tenant_id filter applied before embedding search — cross-tenant documents never enter the context window.",
          "Claude Sonnet 4.6 with prompt caching: system prompt cached via cache_control: ephemeral, near-zero latency on repeated requests.",
        ],
      },
      outcome: {
        title: "Outcome",
        summary:
          "Three-role RBAC proven end-to-end with curl demos. Admin sees everything. User is blocked on sensitive data and cross-tenant queries. Auditor reads the audit log and nothing else. Policy changes are Rego diffs, not code changes.",
        bullets: [
          "Admin 200, user 403 (sensitive), auditor 403 (query) — all three verified with curl against a running stack.",
          "Full audit log: every OPA decision written with who asked, what role, what was allowed or denied.",
          "Zero cost to run locally — Docker Compose, OPA sidecar, local Postgres with pgvector.",
          "Rego policy is the single source of truth for access rules — reviewable, testable, and version-controlled.",
        ],
      },
      codeSample: {
        language: "python",
        snippet: `@app.post("/query")
async def query(
    body: QueryRequest,
    claims: dict = Depends(get_jwt_claims),
):
    opa_input = {
        "claims": claims,
        "path": "/query",
        "method": "POST",
        "body": body.model_dump(),
    }
    resp = httpx.post(OPA_URL, json={"input": opa_input})
    if not resp.json().get("result", {}).get("allow", False):
        raise HTTPException(status_code=403, detail="access denied")

    docs = await vector_search(body.query, tenant_id=claims["tenant_id"])
    return await claude_generate(body.query, docs)`,
        title: "Covenant query handler — OPA gate before Claude runs",
      },
      learnings: [
        {
          category: "Access Control Design",
          points: [
            "OPA as middleware is the right pattern for AI access control — policy evaluated before the model runs, not inside the prompt.",
            "default allow := false is the contract: every identity starts with no access, permissions are explicit grants in Rego.",
            "Retrieval scoping at the query level (pgvector tenant_id filter) is stronger than response filtering — the model never sees data it shouldn't.",
          ],
        },
        {
          category: "OPA & Rego",
          points: [
            "OPA has three deployment modes — REST server, Go library, CLI eval. Pick one before writing integration code. Mixing mental models wastes hours.",
            "Rego v1 requires import rego.v1 or --v1-compatible flag. Pin your OPA image version. The error messages for version mismatches are not obvious.",
            "Mount policies as a Docker volume so edits apply without rebuilding the container — fast iteration during policy development.",
          ],
        },
        {
          category: "Database & Docker",
          points: [
            "CREATE EXTENSION vector requires superuser. Split init.sql into numbered files: 00_superuser.sql (postgres user) and 01_app.sql (app user). PostgreSQL processes initdb scripts alphabetically.",
            "Use the official pgvector/pgvector:pg16 image — prebuilt binaries, no kernel header issues on WSL2 or CI runners.",
            "Separate demo token TTL from production token TTL in config from day one. Auth debugging during a live demo is the worst kind of debugging.",
          ],
        },
      ],
      monitoring: [
        {
          title: "OPA Decision Log",
          description:
            "Every policy evaluation is written to the audit log with user_id, role, tenant_id, path, query_hash, documents_returned, and the OPA decision (allow/deny). Auditors can query this log. They cannot query documents.",
        },
        {
          title: "Claude API Usage",
          description:
            "Prompt caching via cache_control: ephemeral on the system prompt. Cache hit rate visible in the Anthropic API response headers. Repeated requests in the same session return significantly faster at lower cost.",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "cv-m1",
            label: "JWT + OPA Integration",
            status: "Complete",
            progress: 100,
            summary:
              "FastAPI middleware validates JWT and POSTs input bundle to OPA REST server. Hard 403 on policy deny. Three-role Rego policy written with default-deny base.",
            tickets: [
              {
                key: "CV-101",
                title: "JWT Middleware",
                finishingComment:
                  "Validates signature, extracts claims, returns 401 on invalid token before OPA is called.",
              },
              {
                key: "CV-102",
                title: "OPA REST Integration",
                finishingComment:
                  "FastAPI POSTs input bundle to OPA sidecar. result.allow false returns 403 immediately.",
              },
              {
                key: "CV-103",
                title: "Rego v1 Policy",
                finishingComment:
                  "Three rules: admin full access, user non-sensitive own-tenant, auditor audit-log only. import rego.v1 and OPA version pinned.",
              },
            ],
          },
          {
            id: "cv-m2",
            label: "pgvector Tenant Isolation",
            status: "Complete",
            progress: 100,
            summary:
              "PostgreSQL with pgvector extension. Documents table with tenant_id column. Cosine similarity search filtered at query level — cross-tenant results impossible.",
            tickets: [
              {
                key: "CV-201",
                title: "Postgres Init Scripts",
                finishingComment:
                  "Split into 00_superuser.sql (CREATE EXTENSION vector as postgres) and 01_app.sql (schema as app user). Alphabetical ordering enforced.",
              },
              {
                key: "CV-202",
                title: "pgvector Tenant-Scoped Search",
                finishingComment:
                  "Embedding search with WHERE tenant_id = claims.tenant_id. Used official pgvector/pgvector:pg16 image to avoid WSL2 build issues.",
              },
            ],
          },
          {
            id: "cv-m3",
            label: "Claude Integration + Prompt Caching",
            status: "Complete",
            progress: 100,
            summary:
              "Claude Sonnet 4.6 receives permitted documents and user query. System prompt cached with cache_control: ephemeral.",
            tickets: [
              {
                key: "CV-301",
                title: "Claude API Integration",
                finishingComment:
                  "Structured prompt with permitted documents. cache_control: ephemeral on system prompt. Claude only called after OPA allow.",
              },
            ],
          },
          {
            id: "cv-m4",
            label: "Three-Role RBAC Demo",
            status: "Complete",
            progress: 100,
            summary:
              "End-to-end proof: admin 200, user 403 on sensitive query, auditor 403 on query endpoint. Audit log verified.",
            tickets: [
              {
                key: "CV-401",
                title: "RBAC End-to-End Demo",
                finishingComment:
                  "All three roles tested with curl. Admin gets response. User blocked on sensitive flag. Auditor blocked on /query entirely. Audit log has all three decisions.",
              },
              {
                key: "CV-402",
                title: "JWT Token Helper",
                finishingComment:
                  "get_token() checks exp claim and auto-refreshes. Demo mode uses 24-hour TTL from .env.",
              },
            ],
          },
          {
            id: "cv-m5",
            label: "Case Study Published",
            status: "Complete",
            progress: 100,
            summary:
              "Standalone case study published to adventuringghost.com/publish/covenant-case-study.html.",
            tickets: [
              {
                key: "CV-501",
                title: "Portfolio Entry",
                finishingComment:
                  "Standalone HTML case study written and deployed.",
              },
            ],
          },
        ],
      },
      portfolioArc: {
        name: "The AI Security & Resilience Stack",
        summary:
          "Three independent projects that together cover the full surface of an AI-augmented infrastructure stack. Warden secures the Kubernetes runtime — Falco and OPA detecting threats as they happen, Claude triaging before an engineer is paged. Covenant controls access at the application layer — OPA as the hard gate between JWT identity and Claude, policy in code not prompts. Watershed closes the loop at the edge — async telemetry buffered through connectivity loss, with Claude flagging anomalies before the data reaches the cloud. Each project stands alone; together they tell one story.",
        peers: ["warden", "covenant", "watershed"],
        costs: [
          { label: "Warden (AKS)", amount: "~$2.00" },
          { label: "Covenant (local Docker)", amount: "$0.00" },
          { label: "Watershed (AWS IoT Core)", amount: "~$0.05" },
        ],
        totalCost: "~$2.05",
      },
    },
    {
      slug: "watershed",
      title: "Watershed — Edge-Resilient IoT Telemetry Pipeline",
      tagline:
        "Async Python agent with offline buffering and AI anomaly detection — built for edge environments where connectivity is unreliable",
      cardVariant: "accent",
      summaryBullets: [
        "Offline buffer proven: 10 sensor readings held in SQLite during simulated outage and synced to AWS IoT Core on reconnect",
        "Claude Sonnet 4.6 anomaly detection proven: high-severity thermal escalation (28°C → 60°C across 5 readings) flagged with diagnosis and remediation",
        "Full MQTT pipeline running locally: Mosquitto broker → async Python agent → SQLite buffer → AWS IoT Core sync",
        "Total spend: ~$0.05 — edge-resilient telemetry at near-zero cost",
      ],
      stack: [
        "Python",
        "MQTT",
        "Mosquitto",
        "SQLite",
        "AWS IoT Core",
        "Claude Sonnet 4.6",
        "Terraform",
      ],
      codeUrl: "https://github.com/AdventuringGhost/Watershed",
      overview:
        "Watershed is an async Python IoT telemetry agent designed for edge environments where connectivity is unreliable. It subscribes to a local MQTT broker (Mosquitto), buffers sensor readings in SQLite during connectivity loss, and syncs to AWS IoT Core on reconnect. Claude Sonnet 4.6 monitors the telemetry stream in real time and flags anomalies — in testing it detected a high-severity thermal escalation from 28°C to 60°C across five readings, returned a specific diagnosis, and issued a remediation recommendation. The pipeline is proven end-to-end locally, with AWS IoT Core wired and Terraform ready for cloud proof.",
      architecture: {
        description:
          "Watershed uses a two-layer resilience model. The inner loop is local and always running: an async Python agent subscribes to Mosquitto via MQTT, writes every reading to SQLite, and immediately analyzes the buffer window with Claude Sonnet 4.6. The outer loop handles cloud sync: on reconnect, buffered readings flush to AWS IoT Core in order. The two loops are decoupled — anomaly detection never waits on cloud connectivity, and the buffer never loses data during an outage.",
        components: [
          "Async Python agent (asyncio): MQTT subscriber, SQLite writer, and anomaly analysis on every reading",
          "Mosquitto MQTT broker: local message bus receiving simulated sensor telemetry",
          "SQLite offline buffer: stores unsynced readings with a synced flag; survives process restarts",
          "AWS IoT Core: cloud telemetry sink — receives buffered readings on reconnect via MQTT over TLS",
          "Claude Sonnet 4.6: analyzes the rolling telemetry window, classifies severity, and returns a structured diagnosis with remediation recommendation",
          "Terraform: provisions AWS IoT Core Thing, certificate, and policy for secure device authentication",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "IoT sensors in edge environments — remote sites, rural infrastructure, field deployments — cannot rely on continuous cloud connectivity. Standard pipelines that drop data during outages or miss anomalies between sync intervals are not safe for industrial or agricultural telemetry.",
        bullets: [
          "Connectivity loss at the edge means lost sensor readings unless the pipeline buffers locally.",
          "Batch-sync approaches delay anomaly detection until the next cloud push — too slow for thermal, pressure, or safety events.",
          "Most IoT tutorials assume a stable connection and skip the resilience layer entirely.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "A fully async Python agent that decouples local processing from cloud sync. Every reading is buffered in SQLite immediately, Claude analyzes the rolling window in real time, and cloud sync is a background task that replays the buffer in order when connectivity returns.",
        bullets: [
          "SQLite offline buffer: every MQTT reading is written locally first — cloud sync never blocks data capture.",
          "Rolling window anomaly detection: Claude Sonnet 4.6 analyzes the last N readings on every message, not just on sync.",
          "Async reconnect loop: cloud sync runs as a background coroutine, replaying buffered readings to AWS IoT Core in order on reconnect.",
          "Terraform-provisioned device identity: AWS IoT Core Thing with X.509 certificate and scoped policy — no shared credentials.",
        ],
      },
      outcome: {
        title: "Outcome",
        summary:
          "End-to-end pipeline proven locally: offline buffer held 10 readings during a simulated outage, Claude detected a high-severity thermal event with a specific diagnosis and remediation recommendation, and the full sync to AWS IoT Core is wired and validated.",
        bullets: [
          "Offline buffer proven: 10 readings held in SQLite during simulated outage, synced in order on reconnect.",
          "Claude anomaly detection proven: 28°C → 60°C thermal escalation across 5 readings flagged as high severity with diagnosis and remediation step.",
          "AWS IoT Core sync: MQTT-over-TLS connection wired, Terraform ready — cloud proof pending final apply.",
          "Total spend: ~$0.05 — Terraform state and IoT Core message costs only.",
        ],
      },
      codeSample: {
        language: "python",
        title: "Watershed agent — buffer every reading, analyze with Claude, sync on reconnect",
        snippet: `async def on_message(client, topic, payload):
    reading = json.loads(payload)
    await db.write(reading)          # SQLite buffer — always local first

    window = await db.recent(n=10)
    analysis = await claude.analyze(window)

    if analysis["severity"] == "high":
        logger.warning("Anomaly: %s", analysis["diagnosis"])

async def sync_loop():
    while True:
        unsynced = await db.unsynced()
        for reading in unsynced:
            await iot_core.publish(reading)
            await db.mark_synced(reading["id"])
        await asyncio.sleep(30)`,
      },
      learnings: [
        {
          category: "Edge Resilience",
          points: [
            "Decouple local processing from cloud sync from the start — combining them in one loop means a connectivity drop blocks anomaly detection.",
            "SQLite is the right buffer for single-device edge agents: zero dependencies, survives restarts, queryable for the rolling window Claude needs.",
            "Simulate the outage before you claim resilience — the buffer is only proven if you have actually disconnected and verified the replay.",
          ],
        },
        {
          category: "AI Anomaly Detection",
          points: [
            "Rolling window context is essential: Claude needs the trajectory (28°C → 35°C → 44°C → 55°C → 60°C) to classify severity accurately — a single reading gives no signal.",
            "Structured output from Claude (severity + diagnosis + remediation) makes downstream handling deterministic and avoids brittle string parsing.",
            "Anomaly detection at the edge is more valuable than at the cloud sink — the agent flags the event before connectivity returns, not after the batch lands.",
          ],
        },
        {
          category: "AWS IoT Core & Terraform",
          points: [
            "X.509 certificate provisioning via Terraform is the right pattern — each device gets a scoped identity, not a shared key.",
            "AWS IoT Core MQTT endpoint uses TLS on port 8883; local Mosquitto uses plaintext on 1883. Keep these configs clearly separated in the agent.",
            "Terraform the IoT resources before writing agent code — the certificate and policy ARNs are needed as config, not as afterthoughts.",
          ],
        },
      ],
      monitoring: [
        {
          title: "SQLite Buffer Audit",
          description:
            "Every reading is written to SQLite with a synced boolean and timestamp. The buffer doubles as an audit log — query unsynced rows to see exactly what was held during an outage and confirm replay order.",
        },
        {
          title: "Claude Analysis Log",
          description:
            "Every anomaly analysis result is logged with the input window, severity classification, diagnosis, and remediation recommendation — full chain of reasoning for every alert.",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "ws-m1",
            label: "Local MQTT Pipeline",
            status: "Complete",
            progress: 100,
            summary:
              "Async Python agent subscribing to Mosquitto, writing every reading to SQLite, and publishing to a local MQTT topic. Full local loop running.",
            tickets: [
              {
                key: "WS-101",
                title: "Async MQTT Subscriber",
                finishingComment:
                  "asyncio-mqtt client subscribing to Mosquitto on localhost. Every message deserialised and handed to the buffer writer.",
              },
              {
                key: "WS-102",
                title: "SQLite Offline Buffer",
                finishingComment:
                  "SQLite schema with synced flag. Reads written locally on every message — buffer survives process restarts.",
              },
            ],
          },
          {
            id: "ws-m2",
            label: "Claude Anomaly Detection",
            status: "Complete",
            progress: 100,
            summary:
              "Rolling window analysis with Claude Sonnet 4.6. High-severity thermal escalation (28°C → 60°C across 5 readings) detected with diagnosis and remediation recommendation.",
            tickets: [
              {
                key: "WS-201",
                title: "Claude Rolling Window Integration",
                finishingComment:
                  "Claude Sonnet 4.6 analyzes the last N readings on every message. Structured output: severity, diagnosis, remediation. Anomaly detected and logged correctly.",
              },
            ],
          },
          {
            id: "ws-m3",
            label: "Offline Buffer Proof",
            status: "Complete",
            progress: 100,
            summary:
              "Simulated connectivity outage: 10 readings buffered in SQLite, replayed to AWS IoT Core in order on reconnect.",
            tickets: [
              {
                key: "WS-301",
                title: "Outage Simulation & Replay",
                finishingComment:
                  "Disconnected MQTT uplink for 10 readings. Buffer held all 10. Reconnected and confirmed in-order replay to AWS IoT Core.",
              },
            ],
          },
          {
            id: "ws-m4",
            label: "AWS IoT Core Integration",
            status: "In Progress",
            progress: 75,
            summary:
              "Terraform provisions IoT Thing, X.509 certificate, and scoped policy. MQTT-over-TLS connection to AWS IoT Core wired in agent. Cloud proof pending final Terraform apply.",
            tickets: [
              {
                key: "WS-401",
                title: "Terraform IoT Core Resources",
                finishingComment:
                  "Thing, certificate, and policy defined in Terraform. ARNs wired into agent config.",
              },
              {
                key: "WS-402",
                title: "Cloud End-to-End Proof",
                finishingComment:
                  "Pending final Terraform apply. Agent sync loop validated against IoT Core endpoint in test.",
              },
            ],
          },
        ],
      },
      portfolioArc: {
        name: "The AI Security & Resilience Stack",
        summary:
          "Three independent projects that together cover the full surface of an AI-augmented infrastructure stack. Warden secures the Kubernetes runtime — Falco and OPA detecting threats as they happen, Claude triaging before an engineer is paged. Covenant controls access at the application layer — OPA as the hard gate between JWT identity and Claude, policy in code not prompts. Watershed closes the loop at the edge — async telemetry buffered through connectivity loss, with Claude flagging anomalies before the data reaches the cloud. Each project stands alone; together they tell one story.",
        peers: ["warden", "covenant", "watershed"],
        costs: [
          { label: "Warden (AKS)", amount: "~$2.00" },
          { label: "Covenant (local Docker)", amount: "$0.00" },
          { label: "Watershed (AWS IoT Core)", amount: "~$0.05" },
        ],
        totalCost: "~$2.05",
      },
    },
    {
      slug: "azure-email-agent",
      title: "Azure Gmail Email Agent",
      tagline: "A DevSecOps case study — AI-powered email automation on Azure for $1.50",
      cardVariant: "accent",
      summaryBullets: [
        "AI email agent on Azure VM — classifies, drafts, and sends replies automatically using Claude Sonnet 4.6",
        "Zero secrets in source control: all credentials fetched at runtime from Azure Key Vault via managed identity",
        "Full IaC lifecycle with Terraform — deploy, prove, destroy, and rebuild from zero in one command",
        "Total Azure cloud spend across all sessions: ~$1.50",
      ],
      stack: [
        "Python",
        "Terraform",
        "Azure VM",
        "Azure Key Vault",
        "Azure Log Analytics",
        "Azure DevOps",
        "Anthropic Claude Sonnet 4.6",
        "Gmail API",
        "OAuth 2.0",
      ],
      codeUrl: "https://github.com/AdventuringGhost/azure-email-agent",
      overview:
        "A production-grade AI email agent deployed on Azure that polls Gmail every 60 seconds, classifies each email as urgent, routine, or spam using Claude Sonnet 4.6, drafts a contextual reply, and sends it automatically. Built to demonstrate DevSecOps fundamentals: identity-based auth, secrets management, full IaC, and CI/CD — all under $2 in cloud spend.",
      architectureImage: "/images/email-agent-azure-portal.png",
      architectureImageCaption:
        "Azure Portal — rg-azure-email-agent resource group showing all 6 resources: Key Vault, Log Analytics workspace, Network Interface, Virtual Machine, Disk, and Virtual Network.",
      architecture: {
        description:
          "The agent runs on an Azure VM with a system-assigned managed identity, eliminating stored credentials entirely. Secrets are fetched from Azure Key Vault at runtime via RBAC. Gmail is polled on a 60-second loop, Claude Sonnet classifies and drafts each reply, and the result is sent back through the Gmail API. All infrastructure is defined in Terraform and deployed through a three-stage Azure DevOps pipeline with a manual approval gate before apply.",
        components: [
          "Azure VM (Ubuntu 22.04) with system-assigned managed identity as the agent runtime",
          "Azure Key Vault in RBAC mode — stores Gmail OAuth tokens and API keys, no hardcoded secrets",
          "Azure Log Analytics workspace for structured observability and agent telemetry",
          "Anthropic Claude Sonnet 4.6 via API — classifies emails and generates contextual draft replies",
          "Gmail API with OAuth 2.0 for polling inbox and sending automated responses",
          "Terraform managing the full stack — VNet, VM, Key Vault, Log Analytics — deployed and destroyed in one command",
          "Azure DevOps three-stage pipeline: plan → manual approval gate → apply",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "Managing email volume manually is time-consuming and error-prone. The real challenge was building an automated solution that meets production-grade security standards — no secrets in code, no public IP, identity-based auth, full IaC — while keeping total cloud spend under $2.",
        bullets: [
          "Email classification and reply drafting is repetitive cognitive work that scales poorly with volume.",
          "Most automation tutorials skip production security: secrets in .env files, public IPs, no audit trail.",
          "Proving a system is reproducible requires destroying it and rebuilding from zero — not just deploying once.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "A Python agent deployed on Azure VM that polls Gmail, uses Claude Sonnet 4.6 to classify and draft replies, and sends them automatically — with every secret managed via Azure Key Vault and managed identity, never touching source control.",
        bullets: [
          "60-second Gmail poll loop — classifies each email as urgent, routine, or spam using Claude Sonnet 4.6.",
          "Contextual reply drafting: Claude generates replies based on email content with a cached system prompt.",
          "All secrets live in Azure Key Vault, fetched at runtime via managed identity — zero credentials in code.",
          "Full IaC with Terraform: entire stack deploys and destroys with one command, proving true reproducibility.",
        ],
      },
      solutionImage: "/images/email-agent-keyvault.png",
      solutionImageCaption:
        "Azure Key Vault — three secrets listed (foundry-api-key, foundry-deployment, gmail-credentials-json), all enabled. No values visible, none in source control.",
      outcome: {
        title: "Outcome",
        summary:
          "A fully working AI email agent proven end-to-end, with the complete IaC lifecycle demonstrated from deploy through destroy.",
        bullets: [
          "Fully working AI email agent — polls, classifies, drafts, and sends replies automatically.",
          "Complete IaC lifecycle demonstrated: deploy, prove, destroy, and rebuild from zero.",
          "Total Azure spend: ~$1.50 across all sessions — production-grade security at near-zero cost.",
          "Zero secrets committed to source control throughout the entire build.",
        ],
      },
      problemImage: "/images/email-agent-vm.png",
      problemImageCaption:
        "Azure VM — vm-azure-email-agent running Ubuntu 22.04, Status: Running, Primary NIC public IP: none. No exposed ports.",
      codeSample: {
        language: "python",
        title: "Claude Client — prompt caching, structured JSON output, graceful fallback",
        snippet: `response = self._client.messages.create(
    model=self._deployment,
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": _SYSTEM_PROMPT,
        "cache_control": {"type": "ephemeral"},
    }],
    messages=[{"role": "user", "content": user_content}],
)`,
      },
      learnings: [
        {
          category: "Security & Identity",
          points: [
            "System-assigned managed identity removes the credential rotation problem entirely — the VM authenticates to Key Vault without any stored secret.",
            "Key Vault in RBAC mode (not legacy access policies) gives fine-grained, auditable permission control per identity.",
            "No public IP on the VM: SSH access via Azure Bastion only, reducing the exposed attack surface to zero ports.",
          ],
        },
        {
          category: "Infrastructure as Code",
          points: [
            "Terraform one-command deploy and destroy proved true reproducibility — the ability to rebuild from zero is the evidence.",
            "A three-stage Azure DevOps pipeline with a manual approval gate before apply mirrors production change management at zero cost.",
            "Tagging all resources in Terraform made cost attribution and cleanup trivial.",
          ],
        },
        {
          category: "AI Integration",
          points: [
            "Prompt caching via cache_control: ephemeral reduces API latency and cost on repeated classifications — essential for a 60-second poll loop.",
            "Structured JSON output from Claude makes downstream parsing reliable and eliminates brittle string matching.",
            "Claude Sonnet 4.6 handles nuanced classification (urgent vs. routine vs. spam) better than keyword rules, with no false positives on test data.",
          ],
        },
      ],
      monitoring: [
        {
          title: "Azure Log Analytics",
          description:
            "Structured logs from the Python agent are shipped to a Log Analytics workspace, providing a queryable audit trail of every email processed, classification result, and reply sent.",
        },
        {
          title: "Cost Tracking",
          description:
            "Total Azure spend across all sessions: CA$2.26 (~$1.50 USD). Virtual Machines accounted for the majority at CA$2.21 — the VM ran only during active demo sessions. Key Vault and bandwidth combined to less than CA$0.01.",
          visual: "cost-analysis",
          image: "/images/email-agent-cost-analysis.png",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "ea-m1",
            label: "Local Environment Setup",
            status: "Complete",
            progress: 100,
            summary:
              "WSL2, Python environment, Gmail API credentials, and OAuth 2.0 flow configured locally before touching any cloud infrastructure.",
            tickets: [
              {
                key: "EA-101",
                title: "WSL2 + Python Environment",
                finishingComment:
                  "Confirmed Gmail API OAuth flow working locally before touching Azure. Test locally first is the rule.",
              },
            ],
          },
          {
            id: "ea-m2",
            label: "Project Scaffold + GitHub",
            status: "Complete",
            progress: 100,
            summary:
              "Repository initialized with .gitignore guarding against credential commits. Folder structure established for agent, Terraform, and pipeline code.",
            tickets: [
              {
                key: "EA-102",
                title: "Repo Init + .gitignore",
                finishingComment:
                  ".gitignore covers .env, *.json token files, and __pycache__ from day one. No credentials ever touched the remote.",
              },
            ],
          },
          {
            id: "ea-m3",
            label: "Terraform Infrastructure",
            status: "Complete",
            progress: 100,
            summary:
              "Full Azure stack defined in Terraform: VNet, VM with managed identity, Key Vault in RBAC mode, and Log Analytics workspace.",
            tickets: [
              {
                key: "EA-103",
                title: "VM + Managed Identity",
                finishingComment:
                  "System-assigned managed identity provisioned at VM creation. Key Vault RBAC role assignment wired in the same Terraform apply.",
              },
              {
                key: "EA-104",
                title: "Key Vault + Log Analytics",
                finishingComment:
                  "Key Vault configured in RBAC mode with purge protection. Log Analytics workspace linked to VM diagnostics settings.",
              },
            ],
          },
          {
            id: "ea-m4",
            label: "Python Agent Code",
            status: "Complete",
            progress: 100,
            summary:
              "Gmail polling loop, Claude classification and reply drafting, Key Vault secret fetch via managed identity SDK — all integrated and tested.",
            tickets: [
              {
                key: "EA-201",
                title: "Gmail Poll + Classification",
                finishingComment:
                  "60-second poll loop with Claude Sonnet 4.6 classifying each email. Prompt caching on the system prompt keeps latency and cost down.",
              },
              {
                key: "EA-202",
                title: "Key Vault SDK Integration",
                finishingComment:
                  "azure-identity DefaultAzureCredential handles managed identity auth transparently — same code works locally (via CLI auth) and on the VM (via managed identity).",
              },
            ],
          },
          {
            id: "ea-m5",
            label: "Azure DevOps Pipeline",
            status: "Complete",
            progress: 100,
            summary:
              "Three-stage pipeline: Terraform plan → manual approval gate → Terraform apply. Mirrors enterprise change management with a human gate before infrastructure changes land.",
            tickets: [
              {
                key: "EA-301",
                title: "Pipeline YAML + Approval Gate",
                finishingComment:
                  "Manual approval gate configured before the apply stage. No infrastructure change lands without a human sign-off — production practice at zero extra cost.",
              },
            ],
          },
          {
            id: "ea-m6",
            label: "Deploy + Prove + Destroy",
            status: "Complete",
            progress: 100,
            summary:
              "Full end-to-end run: deploy via pipeline, prove agent works against live Gmail, destroy all resources. Total spend: ~$1.50.",
            tickets: [
              {
                key: "EA-302",
                title: "End-to-End Demo",
                finishingComment:
                  "Agent classified and replied to test emails correctly. All resources destroyed cleanly after the demo. Azure cost report confirmed ~$1.50 total.",
              },
            ],
          },
          {
            id: "ea-m8",
            label: "Case Study Published",
            status: "In Progress",
            progress: 75,
            summary:
              "Portfolio case study written and published to adventuringghost.com.",
            tickets: [
              {
                key: "EA-402",
                title: "Portfolio Entry",
                finishingComment:
                  "Case study content complete. Publishing to portfolio site now.",
              },
            ],
          },
        ],
      },
    },
    {
      slug: "margin-watch",
      title: "MarginWatch — AI Margin & Equity Intelligence",
      tagline:
        "Live financial dashboard — margin monitoring, TSLA equity analysis, moving averages, EPS, P/E, volume alarms, candlestick ratings, and AI agent evaluation.",
      cardVariant: "accent",
      summaryBullets: [
        "Single-file HTML dashboard — no build step, no backend, deployable to any static host in under two minutes",
        "Seven configurable alert thresholds across gross margin, operating margin, net margin, EPS, P/E, % change, and volume spike",
        "Candlestick pattern engine: 20-session bull/bear/doji classification with 3-candle sequence detection and moving average crossover signals",
        "Claude Sonnet AI agent evaluation: 4-point structured analysis (margin health, valuation & EPS, technical signal, recommended action) with deterministic fallback",
      ],
      stack: ["JavaScript", "Chart.js", "Claude Sonnet", "AI Agent", "AWS S3", "CloudFront"],
      liveUrl: "/margin-watch.html",
      overview:
        "A self-contained financial intelligence dashboard that monitors business profit margins and equity metrics in parallel, flags anomalies across seven configurable thresholds, and runs a structured AI agent evaluation on demand. Built as a single-file HTML application deployable to any static host — AWS S3, GitHub Pages, or Netlify — with zero backend dependencies.",
      architecture: {
        description:
          "A single-file HTML/JS/CSS application with no build step or framework dependency. Chart.js handles all data visualisation — price + MA chart, business margins, revenue/EPS dual-axis, volume bars. A vanilla JS candlestick renderer covers 20 sessions with bull/bear/doji classification. The Claude Sonnet AI agent layer constructs its evaluation prompt from live state — all current readings injected at call time — and returns a structured 4-point assessment. A deterministic fallback ensures the dashboard remains functional if the API is unavailable.",
        components: [
          "Single-file HTML/JS/CSS — no build step, no framework dependency, deployable anywhere static files are served",
          "Chart.js for all data visualisation: price + MA chart, business margins, revenue/EPS dual-axis, volume bars",
          "Candlestick renderer built in vanilla JS — 20-session bull/bear/doji pattern detection with signal classification",
          "Claude Sonnet AI agent layer — structured 4-point evaluation on demand with deterministic fallback",
          "Configurable alert engine with seven thresholds across four trigger modes: % change, floor breach, volume spike, AI anomaly flag",
          "Scheduled review cadence selector (weekly / monthly / quarterly) with next-review date tracking",
          "Event log with timestamped entries for all state changes and evaluations",
          "Live data swap point: simulateTick() is the integration hook — replace with any financial API feed",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "Business owners and investors monitoring equity positions alongside company fundamentals typically work across three or four disconnected tools — a charting platform for price and technicals, a spreadsheet for margin tracking, a separate earnings tracker for EPS and P/E, and manual calendar reminders for review cadence. None of these talk to each other, none apply configurable alert logic, and none provide AI-driven synthesis of the full picture at a glance.",
        bullets: [
          "Margin compression is often identified at month-end close rather than as it happens — by which time corrective action is reactive rather than pre-emptive.",
          "Volume anomalies on equity positions go unnoticed without a dedicated screening tool running alongside business metrics.",
          "P/E ceiling breaches and EPS floor violations have no automated flag in standard portfolio views — they require manual calculation on each review.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "A unified monitoring layer that holds business margins, equity metrics, and technical signals in one state object, evaluates all of them against configurable thresholds on every data tick, and routes the full snapshot to Claude Sonnet for structured analysis when requested.",
        bullets: [
          "Seven alert thresholds — gross margin floor, operating margin floor, net margin floor, EPS floor, P/E ceiling, % change trigger, volume spike multiplier — all adjustable via sliders with live re-evaluation.",
          "Candlestick pattern engine classifies the last three sessions as bullish, bearish, or neutral based on open/close relationships and doji detection, surfaced as a metric card and in the alert panel.",
          "Moving average crossover detection compares MA20 and MA50 to current price and flags golden cross or death cross conditions automatically.",
          "AI evaluation prompt constructed from the live state — price, margins, EPS, P/E, volume ratio, MA positions, candlestick signal — returning a 4-point structured assessment with a recommended action.",
        ],
      },
      outcome: {
        title: "Outcome",
        summary:
          "A deployable financial intelligence tool that consolidates seven metric categories, four alert modes, and an AI evaluation layer into a single 48KB file with no external dependencies beyond Chart.js and the Anthropic API.",
        bullets: [
          "Full alert pipeline operational: threshold breach → floor violation → volume spike → AI anomaly flag, all firing independently and surfacing in the alert panel.",
          "Candlestick pattern recognition across 20 sessions with bull/bear/doji classification and 3-candle sequence detection.",
          "AI agent evaluation structured as 4-point analysis: margin health → valuation & EPS → technical signal → recommended action.",
          "Deployable to AWS S3 + CloudFront in under two minutes — single file, no build pipeline required.",
        ],
      },
      codeSample: {
        language: "javascript",
        title: "MarginWatch AI agent — live state injected into evaluation prompt at call time",
        snippet: `async function runAI() {
  const pe = (S.eps * 4) > 0
    ? (S.price / (S.eps * 4)).toFixed(1) + '×'
    : 'N/A';
  const ma20v = S.priceHist.slice(-20).reduce((a,b)=>a+b,0) / 20;
  const volAvg = S.volHist.slice(-12).reduce((a,b)=>a+b,0) / 12;
  const volR   = (S.vol / volAvg).toFixed(1);

  // All readings injected from live state — agent cannot reference stale data
  const prompt = buildPrompt({ S, pe, ma20v, volR });

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  const d = await r.json();
  const text = d.content?.[0]?.text;
  if (text) {
    document.getElementById('ai-text').textContent = text;
  } else {
    fallbackAI(pe, volR, ma20v);
  }
}`,
      },
      learnings: [
        {
          category: "Dashboard Architecture",
          points: [
            "Single-file architecture is the right choice for a standalone financial tool — it eliminates deployment complexity, makes the integration surface explicit (one swap point for live data), and keeps the codebase auditable by anyone reviewing it.",
            "Chart.js dual-axis configuration for the revenue/EPS chart required explicit yAxisID assignment on both datasets and a right-side axis definition — the default single-axis assumption silently drops the second series without error.",
            "Candlestick rendering in vanilla JS is cleaner than importing a charting library for a single component — absolute positioning within a fixed-height container gives precise control over wick and body geometry.",
          ],
        },
        {
          category: "AI Agent Design",
          points: [
            "Constructing the AI evaluation prompt from live state rather than hardcoded descriptions means the agent always reflects current readings — it cannot hallucinate stale data because the data is injected at call time.",
            "Structured 4-point output format (margin health / valuation / technical / action) is more actionable than a free-form summary — it forces the model to address each category explicitly and gives the reader a predictable reading pattern.",
            "A deterministic fallback evaluation built from the same state object ensures the dashboard remains fully functional if the Anthropic API is unavailable — the fallback uses the same logic the prompt describes, so outputs are consistent.",
          ],
        },
        {
          category: "Alert System",
          points: [
            "Threshold sliders with live re-evaluation on every oninput event give immediate feedback on how threshold changes affect the current alert state — more useful than a save-and-recalculate pattern for a monitoring tool.",
            "Unusual volume detection based on a rolling 12-period average is more robust than a fixed absolute threshold — it adapts to the stock's current trading regime rather than becoming stale as average volumes shift.",
          ],
        },
      ],
      monitoring: [
        {
          title: "Alert Engine",
          description:
            "Seven configurable thresholds evaluated on every data tick — gross margin floor, operating margin floor, net margin floor, EPS floor, P/E ceiling, % change trigger, and volume spike multiplier. Each threshold breach surfaces immediately in the alert panel with a severity level (critical / warning / info / ok).",
        },
        {
          title: "AI Agent Evaluation Log",
          description:
            "Every agent evaluation is timestamped in the event log. The AI constructs its assessment from the live state snapshot at call time — all readings are injected into the prompt, not hardcoded — ensuring the evaluation always reflects current data.",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "mw-m1",
            label: "Dashboard Core",
            status: "Complete",
            progress: 100,
            summary:
              "Single-file HTML application with Chart.js visualisations, metric cards, and state management.",
            tickets: [
              {
                key: "MW-101",
                title: "Price chart with MA20 / MA50 overlay and crossover detection",
                finishingComment:
                  "Chart.js line chart with moving average datasets and golden/death cross badge detection.",
              },
              {
                key: "MW-102",
                title: "Business margin quarterly trend chart (gross, operating, net)",
                finishingComment:
                  "Three-dataset line chart with per-series colour coding and dashed line styles.",
              },
              {
                key: "MW-103",
                title: "Revenue + EPS dual-axis chart",
                finishingComment:
                  "Bar + line combo with explicit yAxisID on both datasets — required to prevent silent dataset drop on single-axis default.",
              },
              {
                key: "MW-104",
                title: "Volume bar chart with unusual volume highlighting",
                finishingComment:
                  "Rolling 12-period average used as dynamic threshold; unusual bars highlighted amber.",
              },
            ],
          },
          {
            id: "mw-m2",
            label: "Alert Engine",
            status: "Complete",
            progress: 100,
            summary:
              "Seven configurable thresholds with four trigger modes — % change, floor breach, volume spike, AI flag.",
            tickets: [
              {
                key: "MW-201",
                title: "Slider-driven threshold configuration with live re-evaluation",
                finishingComment:
                  "oninput events trigger runChecks() on every slider change — immediate feedback without a save step.",
              },
              {
                key: "MW-202",
                title: "Alert panel rendering with severity levels",
                finishingComment:
                  "Critical / warning / info / ok levels rendered with colour-coded badges in the alert panel.",
              },
              {
                key: "MW-203",
                title: "Scheduled review cadence selector with next-review date calculation",
                finishingComment:
                  "Weekly / monthly / quarterly buttons update next-review date in the header.",
              },
            ],
          },
          {
            id: "mw-m3",
            label: "Candlestick & Technical Analysis",
            status: "Complete",
            progress: 100,
            summary:
              "20-session candlestick renderer with bull/bear/doji classification and pattern detection.",
            tickets: [
              {
                key: "MW-301",
                title: "Vanilla JS candlestick renderer with wick and body geometry",
                finishingComment:
                  "Absolute positioning within a fixed-height container for precise wick and body placement — no library import required.",
              },
              {
                key: "MW-302",
                title: "3-candle sequence pattern detection",
                finishingComment:
                  "Last 3 candles classified as bullish momentum, bearish pressure, or doji — surfaced in the rating badge and alert panel.",
              },
              {
                key: "MW-303",
                title: "Moving average crossover detection (golden cross / death cross)",
                finishingComment:
                  "MA20 and MA50 computed from price history; crossover condition checked against current price on every tick.",
              },
            ],
          },
          {
            id: "mw-m4",
            label: "AI Evaluation Layer",
            status: "Complete",
            progress: 100,
            summary:
              "Claude Sonnet integration with structured 4-point evaluation and deterministic fallback.",
            tickets: [
              {
                key: "MW-401",
                title: "Live state-to-prompt construction",
                finishingComment:
                  "All current readings injected at evaluation time — agent cannot reference stale data.",
              },
              {
                key: "MW-402",
                title: "Structured 4-point output format",
                finishingComment:
                  "Margin health / valuation / technical / recommended action — predictable reading pattern for every evaluation.",
              },
              {
                key: "MW-403",
                title: "Deterministic fallback evaluation",
                finishingComment:
                  "Fallback uses the same threshold logic as the prompt — consistent outputs whether API is available or not.",
              },
            ],
          },
          {
            id: "mw-m5",
            label: "Deployment",
            status: "Complete",
            progress: 100,
            summary:
              "Single-file deployment to static host. Live at /margin-watch.html and case study at /projects/margin-watch/.",
            tickets: [
              {
                key: "MW-501",
                title: "Portfolio case study page published",
                finishingComment:
                  "Case study live at adventuringghost.com/projects/margin-watch/.",
              },
              {
                key: "MW-502",
                title: "Standalone tool URL published",
                finishingComment:
                  "Dashboard live at /margin-watch.html — single file, no build pipeline required.",
              },
            ],
          },
        ],
      },
    },
    {
      slug: "aviation-tool-inventory",
      title: "Aviation Tool Inventory — Closed-Loop Accountability with AI Trend Monitoring",
      tagline:
        "A proposal for aviation MRO: closed-core tool accountability, formal lifecycle state machine, per-aircraft checkout records, and a Claude-powered trend agent — for $38–$68/month in infrastructure.",
      cardVariant: "secondary",
      buttonText: "View Proposal",
      summaryBullets: [
        "Formal state machine enforcing the aviation tool lifecycle (Serviceable → On Loan → WMTC → Calibration Centre) — illegal transitions rejected at the system level",
        "Admin notification on every status change and missed calibration due date — the non-negotiable compliance mechanism, not an optional feature",
        "AI trend agent (Claude API) on aggregated event summaries: systematic low stock, loss/attrition patterns, overuse/underuse anomalies, and breakage frequency",
        "Conservative Year 1 ROI: $18,500–$42,000 in operational savings on $38–$68/month infrastructure — a 20x return at the low end",
      ],
      stack: [
        "PostgreSQL",
        "Node.js",
        "React",
        "AWS (RDS / EC2 / VPC)",
        "Claude API",
        "REST API",
        "Barcode Scanning",
      ],
      overview:
        "A purpose-built, closed-loop digital tool inventory system with an AI-powered trend monitoring layer — designed specifically for aviation maintenance organizations under Transport Canada CARs Part 145 and FAA Part 145. The operational core runs within the organization's own AWS VPC: formal tool lifecycle state machine, personnel checkout with aircraft tail number assignment, admin notification on every status change, and barcode-reconciled audits. The AI trend agent operates on aggregated event summaries only and delivers plain-language reorder and attrition recommendations to the admin dashboard. The system is designed to pay for itself within the first grounding event it prevents.",
      architecture: {
        description:
          "Three-layer architecture: a closed operational core for data sovereignty, an AI trend monitoring agent for predictive intelligence, and a React admin dashboard for operational visibility and compliance access. The aggregation boundary between operational data and the AI layer is an architectural constraint, not just a privacy preference — the trend agent never receives individual personnel data.",
        components: [
          "Closed operational database within a private AWS VPC — all tool records, transitions, and calibration data fully within the organization's control",
          "Formal state machine enforcing aviation tool lifecycle: Serviceable → On Loan → WMTC (broken) → Calibration Centre → Serviceable — illegal transitions rejected at the system level",
          "Personnel ID checkout with mandatory location assignment: hangar bay, workbench, or aircraft tail number — every loan is a named, located, timestamped record",
          "Admin notification system — immediate escalation on every status change and missed calibration due date",
          "Barcode scan handler for rapid check-in/check-out and periodic audit reconciliation against live inventory",
          "AI trend agent (Claude API) operating on aggregated, anonymized event summaries — no raw personnel data transmitted externally",
          "Four-signal trend engine: systematic low stock, loss/attrition patterns, overuse/underuse anomalies, and breakage frequency with supplier vs. usage attribution",
          "React admin dashboard: live colour-coded status board, per-aircraft accountability reports, calibration compliance calendar, and exportable AI insight panel",
        ],
      },
      problem: {
        title: "The Cost of Manual Tool Accountability in Regulated Aviation",
        summary:
          "Aviation maintenance organizations operate under one of the strictest accountability frameworks in any industry — yet most still manage tool inventory through paper logs, tag boards, and spreadsheets. The gap between regulatory expectation and operational reality creates compounding risk: FOD incidents, failed audits, grounded aircraft, and technician hours bled into searching for tools rather than turning wrenches.",
        bullets: [
          "FOD incidents caused by untracked tools cost the global aviation industry an estimated $14.5 billion per year; a single FOD engine damage event can exceed $1 million in repair costs before accounting for grounding time, crew disruption, and regulatory investigation",
          "Manual operations lose $36,500–$120,000 annually at a mid-size maintenance organization (10–20 technicians, 500–1,500 tools): search time, audit prep scrambles, calibration overruns, and reactive purchasing — all preventable with real-time digital accountability",
          "Off-the-shelf asset tracking platforms are built for general inventory, not aviation: no formal status state machine, no per-aircraft tail number assignment, no regulatory-grade audit trail, and no AI trend intelligence layer",
        ],
      },
      solution: {
        title: "A Three-Layer Closed-Loop Architecture",
        summary:
          "A purpose-built system aligned to the actual workflow of an aviation tool crib — closed at the operational core for data sovereignty, AI-powered at the trend layer for predictive intelligence, and clean at the surface for administrative visibility and compliance.",
        bullets: [
          "Layer 1 — Operational core: formal state machine (Serviceable → On Loan → WMTC → Calibration Centre), named/located/timestamped checkout records, barcode audit reconciliation, admin notification on every status change",
          "Layer 2 — AI trend agent: Claude API integration on aggregated event summaries only; four signal types (systematic low stock, loss/attrition, overuse/underuse, breakage frequency) delivering plain-language recommendations to the dashboard",
          "Layer 3 — Admin dashboard: live colour-coded status board, per-aircraft accountability reports, calibration compliance calendar, and exportable AI insight panel for procurement decisions",
          "Regulatory alignment built in from the foundation: every status transition logged with actor, timestamp, and location — audit trail always current under Transport Canada CARs Part 145 and FAA Part 145, never reconstructed before an inspection",
        ],
      },
      outcome: {
        title: "Return on Investment",
        summary:
          "Conservative Year 1 savings exceed infrastructure costs by more than 20x. Long-term value compounds as the AI trend layer accumulates pattern data. The system pays for its entire build cost the first time it prevents one aircraft from sitting on the ground for a day.",
        bullets: [
          "Year 1 savings (conservative): $18,500 from search time elimination, reduced audit prep, calibration compliance, and smarter reorder decisions — on $38–$68/month in AWS infrastructure",
          "Year 1 savings (realistic): $42,000 — infrastructure ROI exceeds 50x at this level, with savings realized within the first 90 days of full deployment",
          "Long-term annual benefit (Years 2–5): $16,000–$43,000/year from AI-driven reorder optimization, reduced tool loss and attrition, and on-demand audit readiness as the trend agent accumulates pattern data",
          "FOD prevention value: a single avoided grounding event ($3,000–$15,000 direct cost) exceeds the full annual infrastructure cost; an avoided FOD damage event ($50,000–$1M+) covers the full system build cost",
        ],
      },
      codeSample: {
        language: "typescript",
        title: "AI trend agent — aggregated event summaries routed to Claude; no raw personnel data crosses this boundary",
        snippet: `// Aggregated event data only — no raw personnel records cross this boundary
async function analyzeToolTrends(
  summary: TrendSummary
): Promise<TrendRecommendations> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content:
        "Analyze these aviation tool inventory trends. " +
        "Aggregated data only — no personnel identifiers.\\n\\n" +
        JSON.stringify(summary, null, 2) +
        "\\n\\nReturn JSON with reorderRecommendations, " +
        "attritionAlerts, redistributionOpportunities, " +
        "supplierFlags, and a plain-language summary.",
    }],
  });

  return JSON.parse(response.content[0].text) as TrendRecommendations;
}`,
      },
      learnings: [
        {
          category: "Built for Aviation, Not Adapted to It",
          points: [
            "The formal status state machine — Serviceable → On Loan → WMTC → Calibration Centre — is not a feature bolted onto a general platform. It is the foundation. Aviation tool accountability has a specific workflow; the system is designed around that workflow, not the other way around.",
            "Per-aircraft tail number assignment is the key accountability primitive that general asset tracking platforms miss. A tool on loan must be locatable: hangar bay, workbench, or specific aircraft. Without this, the system cannot answer the pre-return check question that actually prevents FOD.",
            "Admin notification on every status change is non-negotiable in a regulated environment — it is the compliance mechanism, not a convenience feature. The system's value proposition depends on it firing reliably on every transition.",
          ],
        },
        {
          category: "Closed by Design, Open Development Surface",
          points: [
            "The operational core is closed by default: deployed within the organization's own AWS VPC, with no raw operational data transmitted externally. This matters for organizations handling sensitive aircraft registrations, personnel records, and operational schedules.",
            "The AI trend agent is deliberately designed as the open development surface. The trend logic, prompt engineering, and recommendation models can be iterated independently of the operational core — as the organization's needs evolve, the intelligence layer evolves with them.",
            "The aggregation boundary between operational data and AI analysis is an architectural constraint, not just a privacy preference. It ensures the trend agent never receives individual personnel data, which simplifies both the privacy posture and the prompt design.",
          ],
        },
        {
          category: "Regulatory Alignment",
          points: [
            "Transport Canada CARs Part 145 and FAA Part 145 are the compliance baseline, not an afterthought. Every status transition is logged with actor, timestamp, and location. The audit trail is always current — it does not need to be reconstructed before an inspection.",
            "The state machine's illegal transition enforcement serves a dual purpose: it prevents operational errors (a condemned tool cannot be accidentally returned to service) and it creates a tamper-evident transition log where gaps or reversals are immediately visible.",
            "Calibration due date tracking is a regulatory obligation, not a nice-to-have. The notification system treats missed calibration dates as escalations — the administrator is notified immediately, not at the next manual review cycle.",
          ],
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "ati-m1",
            label: "Phase 1 — Operational Core",
            status: "Planned",
            progress: 0,
            summary:
              "Database schema, formal state machine, REST API, barcode scan handler, admin notification system, role-based access control, and cloud deployment on AWS within a private VPC. Estimated delivery: 8–12 weeks. At completion: a fully functional digital tool crib with real-time accountability and a complete, always-current audit trail.",
          },
          {
            id: "ati-m2",
            label: "Phase 2 — Admin Dashboard",
            status: "Planned",
            progress: 0,
            summary:
              "React-based frontend: live colour-coded status board, loan management interface, calibration compliance calendar, per-aircraft accountability reports, and audit log viewer. Estimated delivery: 4–6 weeks following Phase 1. At completion: paper logs and tag boards are fully replaced.",
          },
          {
            id: "ati-m3",
            label: "Phase 3 — AI Trend Agent",
            status: "Planned",
            progress: 0,
            summary:
              "Event aggregation pipeline, Claude API integration, four-signal trend analysis (low stock, attrition, overuse/underuse, breakage frequency), and recommendation display in the admin dashboard. Estimated delivery: 4–6 weeks following Phase 2. At completion: the organization moves from reactive tool management to predictive inventory intelligence.",
          },
        ],
      },
    },
    {
      slug: "nomad-edge",
      title: "Nomad Edge — SCDC Edge Platform",
      tagline:
        "SNS over Kinesis. Nomad over EKS. $8/month over $80. The cost architecture of rural edge computing — and why every tradeoff was the right call.",
      cardVariant: "primary",
      summaryBullets: [
        "SNS/SQS fan-out over Kinesis: ~$0.00/month vs $15 minimum for bursty rural telemetry",
        "Nomad SCDC over EKS: single binary, partition-tolerant clients, under $10/month control plane",
        "Packer-baked AMIs for reproducible, auditable edge node baseline from first boot",
        "Deploy-Prove-Destroy lifecycle — full stack under $2 per portfolio session",
      ],
      stack: [
        "HashiCorp Nomad",
        "Terraform",
        "Packer",
        "AWS SNS/SQS",
        "Node.js",
        "WireGuard",
        "AWS",
      ],
      codeUrl: "https://github.com/AdventuringGhost/nomad-edge-factory",
      architectureImage: "/diagram/nomad-edge-arch.png",
      overview:
        "Nomad Edge is a rural-first edge platform built under a strict cost discipline: every architectural decision had to be justified by operational need, not convention. SNS instead of Kinesis, Nomad instead of EKS, Packer AMIs instead of ephemeral containers — each choice is documented with the cost and complexity reasoning that drove it.",
      architecture: {
        description:
          "In the cloud (us-east-1), a three-node Nomad server cluster — The Brain — runs inside a hardened VPC. At the edge, Nomad clients — The Sentry nodes — run Node.js sensors in local zones or remote sites. A secure VPN/WireGuard bridge connects the two, so distant clients can keep working when the link is flaky and reconcile when it returns.",
        components: [
          "Three Nomad servers (The Brain) in us-east-1 for high availability and consistent scheduling",
          "Nomad clients (The Sentry nodes) at remote sites running Node.js sensor workloads",
          "Terraform modules defining VPC, subnets, security groups, and Nomad cluster topology",
          "Packer pipelines baking immutable AMIs for rural edge nodes",
          "VPN or WireGuard bridge providing secure, resilient connectivity between cloud and edge",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "Field teams in rural and remote areas need consistent access to critical tools, but bandwidth is limited, latency is high, and connectivity drops unexpectedly.",
        bullets: [
          "Centralised, cloud-only systems fail hard when the network does.",
          "Manual configuration of edge devices makes scale and recovery slow.",
          "Operations teams need observability into distant sites without constant SSH access.",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "Use a Single Cluster, Distant Client (SCDC) model with Nomad as orchestrator, backed by Terraform and Packer, and Node.js services designed to tolerate network partitions.",
        bullets: [
          "Run a hardened Nomad control plane in the cloud as the single source of scheduling truth.",
          "Attach distant edge clients over secure tunnels with retry-friendly configurations.",
          "Push offline-capable Node.js workloads to the edge so work continues when the link drops.",
        ],
      },
      outcome: {
        title: "Outcome",
        summary:
          "Nomad Edge turns fragile rural links into a tolerable constraint instead of a blocker, giving teams consistent tools and operators clear visibility.",
        bullets: [
          "Edge workers can continue operating while offline and reconcile state when connectivity returns.",
          "New sites can be brought online with a small Terraform change and a Packer-built image.",
          "Operators gain a single pane of glass for workload health across distant clients.",
        ],
      },
      codeSample: {
        language: "hcl",
        title: "Terraform – Resilient Nomad Edge node (rural Saskatchewan)",
        snippet: `
# Example Terraform: Defining a Resilient Edge Node for Nomad Edge

module "edge_node" {
  source = "./modules/nomad-client"

  region        = "ca-central-1" # Saskatchewan-focused
  instance_type = "t3.medium"
  ami_id       = var.packer_baked_ami # Immutable image from Packer

  # Ensure the node stays alive even if the link to the core fluctuates
  nomad_client_config = {
    client_max_kill_timeout = "24h"
    node_class              = "rural-edge"
  }
}
      `.trim(),
      },
      learnings: [
        {
          category: "Key Decisions & Learnings",
          points: [
            "Adopted an SCDC Topology to centralise control while keeping remote sites operational during network partitions, reducing operational overhead.",
            "Standardised on Immutable Edge Nodes using Packer, which lowers Mean Time To Recovery (MTTR) and reduces the need for on-site expertise.",
            "Codified all resources using Infrastructure as Code (Terraform) to make changes reviewable, auditable, and reproducible.",
            "Structured services to be Offline-first, using local persistence and periodic syncs to tolerate flaky upstream network links.",
          ],
        },
      ],
      monitoring: [
        {
          title: "Cluster Health",
          description:
            "Dashboards for Nomad server and client health, allocation status, and edge node connectivity, with alerts on job failures and node flaps.",
        },
        {
          title: "Edge Telemetry",
          description:
            "Node.js services emit structured logs and metrics from distant clients so rural deployments can be observed without constant SSH access.",
        },
        {
          title: "Cost & Capacity",
          description:
            "Terraform-managed tagging plus cloud-native metrics to understand per-site capacity, cost, and utilisation trends as more clients are added.",
          visual: "cost-analysis",
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "m2",
            label: "The Nervous System",
            status: "Complete",
            progress: 100,
            summary:
              "Solidified the telemetry and edge intake path so that remote sites can report in reliably, even when the network behaves badly.",
            tickets: [
              {
                key: "NE-101",
                title: "Terraform Base Infrastructure",
                finishingComment:
                  "Laid the foundation: VPCs, subnets, security groups, and Nomad server cluster topology defined as reusable Terraform modules. This became the single source of truth for all Nomad Edge environments.",
              },
              {
                key: "NE-102",
                title: "Packer Image Pipeline",
                finishingComment:
                  "Built the Packer pipeline that bakes Nomad client, Node.js runtime, and baseline observability into immutable AMIs. Edge nodes now boot consistent and join cleanly.",
              },
              {
                key: "NE-103",
                title: "Nomad Cluster Bootstrap",
                finishingComment:
                  "Configured the three-node Nomad server cluster (The Brain) in us-east-1 with proper quorum, Raft consensus, and high-availability networking. The control plane is hardened and ready for distant clients.",
              },
              {
                key: "NE-104",
                title: "VPN/WireGuard Bridge",
                finishingComment:
                  "Set up secure tunnels between cloud and edge with aggressive retry logic and keepalives. The bridge tolerates flaky links and reconnects gracefully when connectivity returns.",
              },
            ],
          },
          {
            id: "m3",
            label: "The Brain",
            status: "Complete",
            progress: 100,
            summary:
              "Turning raw telemetry into decisions, history, and alerts by layering analysis and storage on top of the Nomad Edge stream.",
            tickets: [
              {
                key: "NE-201",
                title: "The Analyst",
                finishingComment:
                  "Designing streaming analysis that prefers clear, explainable thresholds over clever magic. After enough high-pressure incidents, boring and reliable wins.",
              },
              {
                key: "NE-202",
                title: "The Historian",
                finishingComment:
                  "Building a history layer that keeps a truthful record of rural outages and recoveries so we can spot patterns, not just fight fires one at a time.",
              },
            ],
          },
        ],
      },
    },
    {
      slug: "nomad-net",
      title: "Nomad-Net: The Physical Nervous System",
      cardVariant: "primary",
      summaryBullets: [
        "Simulates a rugged, industrial-grade ranch network in Cisco Packet Tracer.",
        "Solves 'Last Mile' connectivity by bridging remote sensors to the AWS Cloud.",
        "Emphasizes security through segmentation and high-availability wireless.",
      ],
      overview:
        "Nomad-Net is the physical networking backbone for the Nomad Edge ecosystem. Designed in Cisco Packet Tracer, this project simulates a rugged, industrial-grade ranch network in Lloydminster, SK. It focuses on solving 'Last Mile' connectivity challenges by bridging remote livestock sensors to the AWS Cloud.",
      stack: [
        "Cisco Packet Tracer",
        "Cisco IOS",
        "VLANs",
        "DHCP",
        "WLC",
        "NAT/PAT",
        "ACLs",
      ],
      codeUrl: "https://github.com/AdventuringGhost/nomad-net",
      image: "/images/nomad-net-arch.png",
      architectureImage: "/images/nomad-net-arch.png",
      architecture: {
        description:
          "The architecture simulates a rugged, industrial-grade ranch network. It uses a central router for IP management, VLANs for security segmentation, a Wireless LAN Controller with a mesh of access points for broad coverage, and NAT/PAT with ACLs to securely connect private field sensors to a public AWS endpoint.",
        components: [
          "Cisco 2911 Router as the central gateway.",
          "Layer 2/3 Switches for traffic distribution.",
          "VLANs for secure segmentation of network traffic.",
          "Wireless LAN Controller (WLC) managing multiple Lightweight Access Points.",
          "NAT/PAT configuration for secure edge-to-cloud uplink.",
          "Access Control Lists (ACLs) acting as a firewall.",
        ],
      },
      problem: {
        title: "The Last-Mile Connectivity Gap",
        summary:
          "Rural and agricultural operations, like a large ranch, need to collect data from remote IoT sensors, but standard network solutions fail to provide reliable, secure, and wide-reaching connectivity.",
        bullets: [
          "Standard Wi-Fi has limited range and is unsuitable for large, outdoor areas with obstructions.",
          "Unsecured networks risk exposing sensitive operational data or allowing unauthorized access.",
          "Connecting a private, on-site network to a public cloud endpoint requires careful security and translation.",
        ],
      },
      solution: {
        title: "A Simulated, Secure, and Scalable Ranch Network",
        summary:
          "Design and simulate a complete physical network in Cisco Packet Tracer that uses industrial-grade components and security principles to bridge the gap from remote sensors to the cloud.",
        bullets: [
          "A central router manages IP allocation (DHCP) and inter-network routing.",
          "VLANs segment the network, isolating sensor traffic from other operational systems for security.",
          "A Wireless LAN Controller (WLC) manages a mesh of lightweight access points, providing seamless coverage across a large area.",
          "Network Address Translation (NAT) and Access Control Lists (ACLs) create a secure gateway for sensor data to reach a public AWS endpoint without exposing the internal network.",
        ],
      },
      outcome: {
        title: "A Blueprint for Rural IoT Connectivity",
        summary:
          "The final design serves as a verifiable blueprint for deploying a physical network that reliably and securely connects remote IoT devices to cloud infrastructure.",
        bullets: [
          "The simulation proves the viability of using a WLC-managed mesh for extensive wireless coverage.",
          "Security is enforced through traffic segmentation (VLANs) and a hardened internet gateway (NAT/ACLs).",
          "The design establishes a clear, repeatable pattern for solving the 'Last Mile' problem in similar rural or industrial environments.",
        ],
      },
      learnings: [
        {
          category: "Core Foundation",
          points: [
            "Mastered fundamental Cisco IOS commands for router and switch configuration, including interface setup, hostname, and security settings.",
            "Designed and implemented a scalable IP addressing scheme using subnetting to logically divide the network and manage traffic.",
            "Configured DHCP services on the central router to automate IP address assignment for endpoints, reducing manual configuration overhead.",
          ],
        },
        {
          category: "Security & Segmentation",
          points: [
            "Implemented VLANs to create logically separate networks for different device types (e.g., IoT sensors, office computers, guest access), preventing unauthorized cross-segment communication.",
            "Utilized 'Router-on-a-Stick' with 802.1Q trunking to enable and control inter-VLAN routing on a single physical router interface.",
            "Applied Layer 2 security measures like port security to restrict access to switch ports and mitigate common LAN attacks.",
          ],
        },
        {
          category: "Industrial Wireless",
          points: [
            "Configured a Wireless LAN Controller (WLC) to centrally manage multiple Lightweight Access Points (LAPs), simplifying deployment and maintenance.",
            "Established a mesh wireless network using CAPWAP tunneling, ensuring seamless connectivity and roaming for mobile IoT devices across a large physical area.",
            "Secured wireless traffic using WPA2/WPA3 enterprise authentication to protect sensitive data transmitted from sensors.",
          ],
        },
        {
          category: "Edge-to-Cloud",
          points: [
            "Configured Network Address Translation (NAT) and Port Address Translation (PAT) to map multiple private internal IP addresses to a single public IP for internet access.",
            "Developed and applied Access Control Lists (ACLs) to act as a stateful firewall, permitting only authorized outbound traffic from IoT sensors to a specific AWS cloud endpoint.",
            "Gained a deep understanding of the boundary between private LAN and public WAN, and the security principles required to bridge them safely.",
          ],
        },
      ],
      roadmap: {
        milestones: [
          {
            id: "hn-m1",
            label: "The Core Foundation (Gateways & Identity)",
            status: "Complete",
            progress: 100,
            summary:
              "Establishing the 'Heart' of the ranch network. This stage builds the central nervous system, setting up the primary router to manage all internal IP traffic and identifying device types.",
            tickets: [
              {
                key: "NN-101",
                title: "The Gateway",
              },
              {
                key: "NN-102",
                title: "DHCP Service",
              },
            ],
          },
          {
            id: "hn-m2",
            label: "The Security Sentry (Segmentation & Trunking)",
            status: "Complete",
            progress: 100,
            summary:
              "Protecting data through logical isolation. VLANs are implemented to ensure that a compromised sensor in a remote pasture can’t access the ranch’s financial computers.",
            tickets: [
              {
                key: "NN-103",
                title: "VLAN Design",
              },
              {
                key: "NN-104",
                title: "Inter-VLAN Routing",
              },
            ],
          },
          {
            id: "hn-m3",
            label: "The Extended Pasture (Industrial Wireless Mesh)",
            status: "Complete",
            progress: 100,
            summary:
              "Solving the 'Last Mile' connectivity challenge by deploying a Wireless LAN Controller (WLC) and multiple Lightweight Access Points (APs) to ensure a sensor stays connected while moving.",
            tickets: [
              {
                key: "NN-201",
                title: "WLC Configuration",
              },
              {
                key: "NN-202",
                title: "SSID & Security",
              },
            ],
          },
          {
            id: "hn-m4",
            label: "The Cloud Uplink (Edge-to-AWS Integration)",
            status: "Complete",
            progress: 100,
            summary:
              "Securely bridging the ranch to the global AWS endpoint by configuring Network Address Translation (NAT/PAT) and Access Control Lists (ACLs) to act as a firewall.",
            tickets: [
              {
                key: "NN-301",
                title: "NAT/PAT Handoff",
              },
              {
                key: "NN-302",
                title: "Final Security Hardening",
              },
            ],
          },
        ],
      },
      completionImage: "/images/nomad-net-piece.png",
    },
    {
      slug: "glow-grove",
      title: "Glow Grove — Static Site on AWS (S3 + CloudFront)",
      cardVariant: "secondary",
      summaryBullets: [
        "Built an ultra-low-cost marketing site delivered via S3 origin + CloudFront CDN.",
        "Custom domain and TLS handled by Route 53 and ACM (us-east-1).",
        "Deployment currently manual; GitHub Actions CI/CD planned.",
      ],
      stack: ["Next.js", "AWS S3", "CloudFront", "Route 53", "ACM"],
      codeUrl: "https://github.com/adventuringghost/glow-grove",
      liveUrl: "https://glow-grove.com/",
      overview:
        "Static site exported from Next.js and hosted on Amazon S3 with CloudFront CDN, Route 53 DNS, and ACM TLS.",
      image: "/images/glow-grove-visual.png",
    },
  ],
  skills: [
    {
      group: "Kubernetes Security",
      items: [
        "OPA Gatekeeper (admission control)",
        "Falco — eBPF runtime detection",
        "OPA Rego — policy authoring",
        "Policy-as-code (versioned, testable rules)",
        "Azure Kubernetes Service (AKS)",
        "Prometheus & Grafana",
      ],
    },
    {
      group: "Cloud / DevOps",
      items: [
        "Azure (AKS, Key Vault, Log Analytics, DevOps)",
        "AWS (IoT Core, S3, CloudFront, Route 53)",
        "Terraform (full IaC lifecycle)",
        "CI/CD Pipelines",
        "Secrets management (Key Vault, RBAC)",
        "Docker & Containerization",
      ],
    },
    {
      group: "AI & Automation",
      items: [
        "AI agent design (Claude Sonnet 4.6)",
        "pgvector — semantic search & tenant isolation",
        "MQTT / IoT telemetry pipelines",
        "Edge-resilient async agents (SQLite buffer)",
        "Structured AI output & prompt caching",
      ],
    },
    {
      group: "Networking",
      items: [
        "WireGuard (secure mesh tunnels)",
        "Multi-region topology design",
        "VLAN segmentation & trunking",
        "Cisco IOS (routing, WLC, ACLs)",
        "VPN Technologies",
      ],
    },
    {
      group: "Development",
      items: [
        "Python (FastAPI, asyncio)",
        "PostgreSQL / pgvector",
        "JavaScript / TypeScript",
        "Node.js & Express",
        "Linux / Unix Systems",
      ],
    },
  ],
  links: {
    github: "https://github.com/adventuringghost",
    linkedin: "https://www.linkedin.com/in/kitkat-schlosser-571203168/",
    instagram: "https://instagram.com/adventuringghost",
    email: "hello@adventuringghost.com",
  },
  about: {
    content:
      "I'm a Métis DevSecOps engineer building secure, AI-augmented infrastructure with a rural-first bias. My work covers Kubernetes runtime security (Falco, OPA Gatekeeper), policy-enforced AI access control, and AI-driven anomaly detection on edge telemetry — systems built to hold under connectivity loss and stay honest when AI is in the loop. I come from agricultural and remote communities, and I build with a bias toward calm, reliable systems over clever, fragile ones. Based in Canada and fully available for remote-first roles globally.",

      profileImage: "/images/portfolio-photo.jpg",
    profileImageAlt: "A photo of the author, AdventuringGhost.",
  },
};
