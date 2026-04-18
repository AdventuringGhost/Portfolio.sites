import type { SiteContent } from "./types";

export const siteContent: SiteContent = {
  hero: {
    title: "Nomad Edge — SCDC DevOps Case Study",
    subtitle:
      "Building digital systems with ancestral resilience: Métis innovation for the rural edge.",
    ctas: {
      primary: {
        text: "Read the Nomad Edge Case Study",
        href: "/projects/nomad-edge",
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
      slug: "nomad-edge",
      title: "Nomad Edge — SCDC Edge Platform (Hero Case Study)",
      tagline:
        "Single Cluster, Distant Client (SCDC) architecture for resilient, rural-first operations using Nomad, Terraform, Packer, and Node.js.",
      cardVariant: "accent",
      summaryBullets: [
        "Production-grade Nomad Edge platform using Nomad, Terraform, Packer, and Node.js",
        "Implements the Single Cluster, Distant Client (SCDC) model for rural and remote sites",
        "Automates the full lifecycle from image bake to deployment and monitoring",
        "Managed as a living project with Linear milestones, tickets, and post-incident reviews",
      ],
      stack: [
        "HashiCorp Nomad",
        "Terraform",
        "Packer",
        "Node.js",
        "AWS",
        "Linear",
      ],
      codeUrl: "https://github.com/AdventuringGhost/nomad-edge-factory",
      architectureImage: "/diagram/nomad-edge-arch.png",
      overview:
        "The Hero project. Nomad Edge is a production-grade SCDC platform that takes workloads from Terraform module to Packer image to Nomad deployment, with telemetry and incident workflows managed in Linear.",
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
      slug: "azure-email-agent",
      title: "Azure Gmail Email Agent",
      tagline: "A DevSecOps case study — AI-powered email automation on Azure for $1.50",
      cardVariant: "secondary",
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
          "A fully working AI email agent proven end-to-end, with the complete IaC lifecycle demonstrated via screen-recorded rebuild from zero.",
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
            "Terraform one-command deploy and destroy proved true reproducibility — the rebuild-from-zero screen recording is the evidence.",
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
        "Built an ultra‑low‑cost marketing site delivered via S3 origin + CloudFront CDN.",
        "Custom domain and TLS handled by Route 53 and ACM (us-east-1).",
        "Deployment currently manual; GitHub Actions CI/CD planned.",
      ],
      stack: ["Next.js", "AWS S3", "CloudFront", "Route 53", "ACM"],
      codeUrl: "https://github.com/adventuringghost/glow-grove",
      liveUrl: "https://glow-grove.com/",
      overview:
        "Static site exported from Next.js and hosted on Amazon S3 with CloudFront CDN, Route 53 DNS, and ACM TLS.",
      image: "/images/glow-grove-visual.png",
    },
    {
      slug: "portfolio-rebuild",
      title: "Portfolio Rebuild — Next.js & TypeScript Refactor",
      cardVariant: "ghost",
      summaryBullets: [
        "Rebuilt personal portfolio from v1 using Next.js App Router and TypeScript",
        "Fixed complex navigation and routing issues with Link component integration",
        "Implemented dynamic project pages with MDX support for rich case studies",
        "Deployed to AWS S3 + CloudFront with custom domain and TLS",
      ],
      stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "AWS", "MDX"],
      codeUrl: "https://github.com/adventuringghost/portfolio-v2",
      architectureImage: "/images/portfolio-rebuild-header.png",
      overview:
        "A complete redesign and refactor of my portfolio site, focusing on clean code architecture, better component composition, and seamless project showcase capabilities.",
      architecture: {
        description:
          "Single-page Next.js application using the App Router with server-side rendering for case studies. Dynamic project pages powered by MDX allow rich content embedding. All assets are optimized and deployed via S3 with CloudFront CDN for global distribution.",
        components: [
          "Next.js App Router for file-based routing and server components",
          "TypeScript for type-safe component development",
          "Tailwind CSS for responsive, utility-first styling",
          "MDX integration for dynamic project case study pages",
          "AWS S3 + CloudFront for static asset delivery and CDN",
          "Radix UI primitives for accessible button and component patterns",
        ],
      },
      problem: {
        title: "Problem",
        summary:
          "The original portfolio lacked proper organization and had complex state management. Navigation was inconsistent, and adding new projects required manual updates across multiple files.",
        bullets: [
          "No clear separation between content and presentation layer",
          "Button routing issues in development vs. production environments",
          "Manual page creation was error-prone and not scalable",
        ],
      },
      solution: {
        title: "Solution",
        summary:
          "Implement a content-driven architecture with TypeScript for type safety, dynamic route generation from a centralized content file, and proper component composition using Radix UI primitives.",
        bullets: [
          "Centralized site content in a single TypeScript file with typed exports",
          "Dynamic project pages generated from slugs in the content configuration",
          "Fixed Button component to properly handle Next.js Link integration with Radix Slot",
          "Implemented responsive design with Tailwind CSS breakpoints",
        ],
      },
      outcome: {
        title: "Outcome",
        summary:
          "Now adding projects is as simple as updating the content file with new entries. The site is faster, more maintainable, and provides a better user and developer experience.",
        bullets: [
          "New projects can be added by simply editing the content configuration",
          "All pages are statically optimized and deploy instantly to AWS",
          "Navigation works flawlessly in both development and production",
          "Type safety prevents content-related bugs before they reach production",
        ],
      },
      learnings: [
        {
          category: "Key Decisions & Learnings",
          points: [
            "Chose Next.js App Router over Pages Router for better performance and modern patterns",
            "Implemented typed content structure to catch errors at build time, not runtime",
            "Fixed Radix UI Slot integration issues by understanding how asChild merges attributes",
            "Kept styling simple with Tailwind to avoid theme complexity",
          ],
        },
      ],
      monitoring: [],
      roadmap: {
        milestones: [
          {
            id: "p1",
            label: "Architecture Design",
            status: "Complete",
            progress: 100,
            summary: "Plan content structure and component hierarchy",
          },
          {
            id: "p2",
            label: "Core Components",
            status: "Complete",
            progress: 100,
            summary: "Build base UI components and layout system",
          },
          {
            id: "p3",
            label: "Dynamic Pages",
            status: "Complete",
            progress: 100,
            summary: "Implement MDX-powered project pages",
          },
          {
            id: "p4",
            label: "AWS Deployment",
            status: "Complete",
            progress: 100,
            summary: "Deploy to S3 + CloudFront with custom domain",
          },
        ],
      },
    },
    {
      slug: "ai-thesis",
      title: "The Ghost in the Machine: Why AI is the New Currency of Intent",
      tagline: "From capability stacks to agentic action in real-world work",
      cardVariant: "primary",
      summaryBullets: [
        "Frames AI as a tiered capability stack: Deep Learning -> Gen AI -> Agentic AI.",
        "Defines an AI agent as intent converted into action through memory, planning, and tool use.",
        "Provides a practical learning path for professionals to start applying agentic workflows now.",
      ],
      buttonText: "Read more",
      stack: ["ChatGPT", "Gemini", "Cursor", "GitHub Copilot", "Research"],
      overview:
        "AI is no longer just a chatbot feature set. It is becoming the new currency of intent: the ability to convert what you mean into systems that act. This article reframes AI as a practical toolkit for both white-collar and blue-collar professionals, then outlines how to start applying agentic workflows in daily operations.",
      image: "/images/thesis.png",
      architecture: {
        description:
          "To spend this new currency effectively, we have to understand what AI actually is: not a magic trick, but a stack of capabilities that progresses from models to action.",
        components: [
          "As shown in the framework, the field has moved from Deep Learning foundations to Gen AI creation and now to Agentic AI execution.",
          "For white-collar professionals, this shifts work from one-off assistance to AI-managed workflows such as scheduling and coordination.",
          "For blue-collar professionals, this points to autonomous equipment that can detect pests, adapt to soil conditions, and execute tasks in real time.",
        ],
      },
      architectureImage: "/images/photo.two.jpg",
      architectureImageCaption:
        "Figure 1: The AI Evolution. From deep learning foundations to Gen AI capabilities, leading to Agentic AI systems capable of complex action.",
      problem: {
        title: "2. The Anatomy of an Agent",
        summary:
          "If AI is the currency, the AI agent is the transaction. The key shift happens when a system moves from interpreting your request to planning and executing action.",
        bullets: [
          "An effective agent combines perception, reasoning, memory, and tool use in a continuous loop.",
          "Memory allows context retention across tasks, from farm history to client histories and project constraints.",
          "In the Nomad Edge and Nomad-Net work, this appears as systems that can plan steps, call tools, and adapt based on feedback.",
        ],
      },
      problemImage: "/images/photo.three.jpg",
      problemImageCaption:
        "Figure 2: The Agentic Loop. An agent is a synthesis of Perception, Brain (reasoning/memory), and the ability to use specific tools.",
      solution: {
        title: "3. Human Will in the Loop",
        summary:
          "Human judgment remains the anchor. The most reliable operating model is still Human-in-the-Loop (HITL), where AI accelerates execution while humans define direction, risk boundaries, and final accountability.",
        bullets: [
          "Use AI for the What: drafting, summarizing, and boilerplate acceleration.",
          "Keep humans on the Why: architecture decisions, safety, and trade-off selection.",
          "Treat AI as a power tool that multiplies skilled labor rather than replacing expertise.",
        ],
      },
      outcome: {
        title: "4. How to Start Spending This Currency",
        summary:
          "The barrier to entry has never been lower. You do not need a PhD to start applying AI in your trade or office, but you do need a practical sequence for learning and deployment.",
        bullets: [
          "Start with core concepts, then move into applied agent workflows and tool orchestration.",
          "Use structured projects to bridge theory into repeatable execution patterns.",
          "Follow a curated roadmap of essential resources to build practical competence in deploying AI agents in 2026.",
        ],
      },
      outcomeImage: "/images/photo.five.jpg",
      outcomeImageCaption:
        "Figure 3: A Learning Path. A curated set of essential resources for mastering practical AI-agent deployment in 2026.",
      learnings: [
        {
          category: "The Toolbox: An Interface Comparison",
          points: [
            '**ChatGPT (The Multi-Tool):** Generalist brainstorming and translating complex concepts into "plain English."',
            "**Gemini (The Connected Foreman):** Real-time research and verification against live documentation (Google, 2024).",
            "**Cursor (The Specialized Workshop):** Deep, project-wide contextual understanding for hardcore building, though at a higher cost.",
            '**GitHub Copilot (The Apprentice):** Automates "toil"—the repetitive, manual grunt work and boilerplate code (Beyer et al., 2016).',
          ],
        },
        {
          category: "References",
          points: [
            "Bender, E. M., et al. (2021). On the Dangers of Stochastic Parrots. ACM Conference on Fairness, Accountability, and Transparency.",
            "Google. (2024). Gemini: A Family of Highly Capable Multimodal Models. Technical Report.",
            "IBM. (2023). The Quantified Value of Human-in-the-loop AI. IBM Institute for Business Value.",
            "ISO/IEC 42001. (2023). Information technology - Artificial intelligence - Management system.",
            "LangChain. (2026). LangChain and LangGraph Documentation.",
            "Microsoft. (2023). AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation.",
            "NIST. (2023). AI Risk Management Framework (AI RMF 1.0).",
            "OpenAI. (2023). GPT-4 Technical Report.",
            "OpenAI. (2026). API Documentation for Tool Use and Agent Workflows.",
            "Pan, Y. (2016). Heading toward Artificial Intelligence 2.0. Engineering, 2(4).",
            "Schick, T., et al. (2023). Toolformer: Language Models Can Teach Themselves to Use Tools. NeurIPS.",
            "Wang, G., et al. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models.",
            "Yao, S., et al. (2023). ReAct: Synergizing Reasoning and Acting in Language Models.",
            "Schlosser, K. (2026). The Nomad Edge Project: A Case Study in Distributed Resilience. Portfolio Research.",
            "Zanzotto, F. M. (2020). Human-in-the-loop Artificial Intelligence. IEEE Intelligent Systems.",
          ],
        },
      ],
      monitoring: [],
      roadmap: {
        milestones: [
          {
            id: "t1",
            label: "Research Phase",
            status: "Complete",
            progress: 100,
            summary: "Initial research and literature review",
          },
          {
            id: "t2",
            label: "Analysis",
            status: "Complete",
            progress: 100,
            summary: "Deep dive analysis and findings",
          },
          {
            id: "t3",
            label: "Documentation",
            status: "Complete",
            progress: 100,
            summary: "Final thesis write-up and conclusions",
          },
        ],
      },
    },
  ],
  skills: [
    {
      group: "Cloud/DevOps",
      items: [
        "AWS (EC2, S3, Lambda, CloudFront, Route 53)",
        "Docker & Containerization",
        "CI/CD Pipelines",
        "Infrastructure as Code (Terraform)",
        "Monitoring & Logging (CloudWatch)",
        "Serverless Architecture",
      ],
    },
    {
      group: "Networking",
      items: [
        "Cisco IOS Configuration",
        "VLAN Design & Implementation",
        "Routing Protocols (OSPF, EIGRP)",
        "Network Security & Firewalls",
        "VPN Technologies",
        "Network Troubleshooting",
      ],
    },
    {
      group: "Development",
      items: [
        "JavaScript/TypeScript",
        "Node.js & Express",
        "React & Next.js",
        "Python",
        "RESTful APIs",
        "Database Design (MongoDB, PostgreSQL)",
      ],
    },
    {
      group: "Tools",
      items: [
        "Git & GitHub",
        "Linux/Unix Systems",
        "VS Code & Development Tools",
        "Postman & API Testing",
        "Wireshark & Network Analysis",
        "AWS CLI & SDKs",
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
      "I'm a Métis Cloud & DevOps engineer focused on resilient, rural-first infrastructure. My work is about more than clusters and pipelines; it's about keeping people online when they are hours away from the nearest city. I use cloud platforms, Nomad, Terraform, and automation as tools to solve human problems for the agricultural and rural communities I come from, with a bias toward calm, reliable systems over clever, fragile ones.",
    profileImage: "/images/portfolio-photo.jpg",
    profileImageAlt: "A photo of the author, AdventuringGhost.",
  },
};
