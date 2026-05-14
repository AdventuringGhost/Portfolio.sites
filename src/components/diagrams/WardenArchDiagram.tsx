export function WardenArchDiagram() {
  return (
    <svg
      viewBox="0 0 960 465"
      width="100%"
      aria-label="Warden security architecture: admission control and runtime detection pipeline"
      role="img"
      style={{ display: "block" }}
    >
      <defs>
        <marker id="wa-arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        <marker id="wa-arr-g" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="wa-arr-o" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
        </marker>
        <marker id="wa-arr-p" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="960" height="465" fill="#0f172a" rx="12" />

      {/* Title */}
      <text x="480" y="24" fill="#475569" fontSize={11} fontFamily="monospace" letterSpacing="2" textAnchor="middle">
        WARDEN SECURITY ARCHITECTURE
      </text>

      {/* ── LAYER 1 LABEL ── */}
      <text x="20" y="50" fill="#f59e0b" fontSize={10} fontFamily="monospace" letterSpacing="1.5" textAnchor="start">
        LAYER 1 — ADMISSION CONTROL
      </text>

      {/* ── ROW 1: ADMISSION CONTROL ── */}

      {/* 1. Developer / CI */}
      <rect x="20" y="58" width="135" height="65" rx="8" fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
      <text x="87" y="85" fill="#cbd5e1" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Developer / CI</text>
      <text x="87" y="101" fill="#64748b" fontSize={10} fontFamily="sans-serif" textAnchor="middle">submits workload</text>

      <line x1="155" y1="90" x2="198" y2="90" stroke="#64748b" strokeWidth={1.5} markerEnd="url(#wa-arr)" />

      {/* 2. OPA Gatekeeper */}
      <rect x="200" y="58" width="155" height="65" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth={2} />
      <text x="277" y="82" fill="#fde68a" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">OPA Gatekeeper</text>
      <text x="277" y="98" fill="#fbbf24" fontSize={10} fontFamily="sans-serif" textAnchor="middle">Admission Control</text>
      <text x="277" y="113" fill="#d97706" fontSize={9} fontFamily="monospace" textAnchor="middle">blocks bad configs</text>

      <line x1="355" y1="90" x2="413" y2="90" stroke="#64748b" strokeWidth={1.5} markerEnd="url(#wa-arr)" />

      {/* 3. K8s API Server */}
      <rect x="415" y="58" width="160" height="65" rx="8" fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
      <text x="495" y="85" fill="#cbd5e1" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">K8s API Server</text>
      <text x="495" y="101" fill="#64748b" fontSize={10} fontFamily="sans-serif" textAnchor="middle">accepts approved workloads</text>

      {/* L-shaped connector: K8s API → Running Pods (dashed — workload deployment) */}
      <path
        d="M 495 123 L 495 170 L 95 170 L 95 228"
        stroke="#475569"
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="5,3"
        markerEnd="url(#wa-arr)"
      />

      {/* ── LAYER 2 LABEL ── */}
      {/* starts at x=200 — clear of the connector vertical at x=95 */}
      <text x="200" y="215" fill="#60a5fa" fontSize={10} fontFamily="monospace" letterSpacing="1.5" textAnchor="start">
        LAYER 2 — RUNTIME DETECTION &amp; RESPONSE
      </text>

      {/* ── ROW 2: RUNTIME DETECTION & RESPONSE ── */}

      {/* 4. Running Pods */}
      <rect x="20" y="228" width="150" height="65" rx="8" fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
      <text x="95" y="255" fill="#cbd5e1" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Running Pods</text>
      <text x="95" y="271" fill="#64748b" fontSize={10} fontFamily="sans-serif" textAnchor="middle">active workloads</text>

      <line x1="170" y1="260" x2="218" y2="260" stroke="#64748b" strokeWidth={1.5} markerEnd="url(#wa-arr)" />

      {/* 5. Falco */}
      <rect x="220" y="228" width="155" height="65" rx="8" fill="#0f2744" stroke="#3b82f6" strokeWidth={2} />
      <text x="297" y="253" fill="#bfdbfe" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Falco</text>
      <text x="297" y="269" fill="#60a5fa" fontSize={10} fontFamily="sans-serif" textAnchor="middle">Runtime Detection</text>
      <text x="297" y="284" fill="#3b82f6" fontSize={9} fontFamily="monospace" textAnchor="middle">eBPF syscall probes</text>

      <line x1="375" y1="260" x2="418" y2="260" stroke="#64748b" strokeWidth={1.5} markerEnd="url(#wa-arr)" />

      {/* 6. Warden Agent */}
      <rect x="420" y="228" width="155" height="65" rx="8" fill="#0c2536" stroke="#59d5e0" strokeWidth={2} />
      <text x="497" y="253" fill="#bae6fd" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Warden Agent</text>
      <text x="497" y="269" fill="#38bdf8" fontSize={10} fontFamily="sans-serif" textAnchor="middle">FastAPI webhook</text>

      <line x1="575" y1="260" x2="618" y2="260" stroke="#8b5cf6" strokeWidth={1.5} markerEnd="url(#wa-arr-p)" />

      {/* 7. Claude Sonnet */}
      <rect x="620" y="228" width="160" height="65" rx="8" fill="#1e0a32" stroke="#8b5cf6" strokeWidth={2} />
      <text x="700" y="253" fill="#e9d5ff" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Claude Sonnet</text>
      <text x="700" y="269" fill="#a78bfa" fontSize={10} fontFamily="sans-serif" textAnchor="middle">AI Triage</text>
      <text x="700" y="284" fill="#7c3aed" fontSize={9} fontFamily="monospace" textAnchor="middle">severity classification</text>

      {/* Fork stem from Claude bottom */}
      <line x1="700" y1="293" x2="700" y2="340" stroke="#64748b" strokeWidth={1.5} />

      {/* Severity labels on branches */}
      <text x="654" y="333" fill="#10b981" fontSize={9} fontFamily="monospace" textAnchor="middle">low severity</text>
      <text x="746" y="333" fill="#f97316" fontSize={9} fontFamily="monospace" textAnchor="middle">high severity</text>

      {/* Left branch → Auto-patch */}
      <path d="M 700 340 L 609 340 L 609 395" stroke="#10b981" strokeWidth={2} fill="none" markerEnd="url(#wa-arr-g)" />

      {/* Right branch → Approval Gate */}
      <path d="M 700 340 L 779 340 L 779 395" stroke="#f97316" strokeWidth={2} fill="none" markerEnd="url(#wa-arr-o)" />

      {/* 8a. Auto-patch */}
      <rect x="537" y="395" width="145" height="58" rx="8" fill="#052e16" stroke="#10b981" strokeWidth={2} />
      <text x="609" y="421" fill="#6ee7b7" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Auto-patch</text>
      <text x="609" y="437" fill="#34d399" fontSize={10} fontFamily="sans-serif" textAnchor="middle">K8s API patch applied</text>

      {/* 8b. Approval Gate */}
      <rect x="702" y="395" width="156" height="58" rx="8" fill="#431407" stroke="#f97316" strokeWidth={2} />
      <text x="780" y="421" fill="#fed7aa" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Approval Gate</text>
      <text x="780" y="437" fill="#fb923c" fontSize={10} fontFamily="sans-serif" textAnchor="middle">runbook → human review</text>
    </svg>
  );
}
