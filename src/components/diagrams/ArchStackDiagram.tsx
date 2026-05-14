export function ArchStackDiagram() {
  return (
    <svg
      viewBox="0 0 960 540"
      width="100%"
      aria-label="Architecture stack showing Edge (Watershed), Access Control (Covenant), and Runtime Security (Warden) layers"
      role="img"
      style={{ display: "block" }}
    >
      <defs>
        <marker id="as-arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        <marker id="as-arr-t" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="as-arr-a" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="as-arr-b" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
        <marker id="as-arr-g" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="960" height="540" fill="#0f172a" rx="12" />

      {/* ── LEFT CONNECTOR LINE ── */}
      <line x1="22" y1="120" x2="22" y2="460" stroke="#334155" strokeWidth="1.5" strokeDasharray="4,4" />
      <circle cx="22" cy="120" r="5" fill="#22d3ee" />
      <circle cx="22" cy="290" r="5" fill="#f59e0b" />
      <circle cx="22" cy="460" r="5" fill="#3b82f6" />
      {/* Connector label — rotated vertical */}
      <text
        x="10"
        y="290"
        fill="#475569"
        fontSize={9}
        fontFamily="monospace"
        textAnchor="middle"
        letterSpacing="1"
        transform="rotate(-90, 10, 290)"
      >
        48V CAN / HTTPS / MQTT
      </text>

      {/* ══════════════════════════════════════
          LAYER 1 — EDGE (Watershed)   y=50–190
          ══════════════════════════════════════ */}
      <rect x="35" y="50" width="910" height="140" rx="8" fill="#0e7490" fillOpacity="0.13" stroke="#22d3ee" strokeWidth="1.5" />

      {/* Badge */}
      <rect x="40" y="56" width="75" height="52" rx="4" fill="#0e7490" fillOpacity="0.35" />
      <text x="77" y="74" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="2">EDGE</text>
      <text x="77" y="94" fill="#22d3ee" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Watershed</text>

      {/* Flow nodes — y_center=120, node h=54, y_top=93 */}
      <rect x="130" y="93" width="120" height="54" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="190" y="116" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">SQLite Buffer</text>
      <text x="190" y="133" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">offline storage</text>

      <line x1="250" y1="120" x2="273" y2="120" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#as-arr-t)" />

      <rect x="275" y="93" width="115" height="54" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="332" y="116" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">MQTT Broker</text>
      <text x="332" y="133" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">Mosquitto</text>

      <line x1="390" y1="120" x2="413" y2="120" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#as-arr-t)" />

      <rect x="415" y="93" width="120" height="54" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="475" y="116" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">AWS IoT Core</text>
      <text x="475" y="133" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">cloud sync</text>

      <line x1="535" y1="120" x2="558" y2="120" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#as-arr-t)" />

      <rect x="560" y="93" width="135" height="54" rx="6" fill="#1e0a32" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="627" y="116" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Claude Sonnet</text>
      <text x="627" y="133" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">anomaly detection</text>

      {/* Layer 1 description */}
      <text x="130" y="163" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        Edge-resilient telemetry. Operates during network partition.
      </text>

      {/* ══════════════════════════════════════
          LAYER 2 — ACCESS CONTROL (Covenant)  y=210–350
          ══════════════════════════════════════ */}
      <rect x="35" y="210" width="910" height="140" rx="8" fill="#78350f" fillOpacity="0.13" stroke="#f59e0b" strokeWidth="1.5" />

      {/* Badge */}
      <rect x="40" y="216" width="75" height="55" rx="4" fill="#78350f" fillOpacity="0.45" />
      <text x="77" y="233" fill="#fcd34d" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="1.5">ACCESS</text>
      <text x="77" y="246" fill="#fcd34d" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="1.5">CONTROL</text>
      <text x="77" y="262" fill="#fbbf24" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Covenant</text>

      {/* Flow nodes — y_center=290, y_top=263 */}
      <rect x="130" y="263" width="120" height="54" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="190" y="286" fill="#fde68a" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Request</text>
      <text x="190" y="302" fill="#fbbf24" fontSize={9} fontFamily="monospace" textAnchor="middle">JWT claims</text>

      <line x1="250" y1="290" x2="273" y2="290" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#as-arr-a)" />

      <rect x="275" y="263" width="125" height="54" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
      <text x="337" y="286" fill="#fde68a" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">OPA Rego Gate</text>
      <text x="337" y="302" fill="#d97706" fontSize={9} fontFamily="monospace" textAnchor="middle">hard deny</text>

      <line x1="400" y1="290" x2="423" y2="290" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#as-arr-a)" />

      <rect x="425" y="263" width="125" height="54" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="487" y="286" fill="#fde68a" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">pgvector Search</text>
      <text x="487" y="302" fill="#fbbf24" fontSize={9} fontFamily="monospace" textAnchor="middle">tenant_id scoped</text>

      <line x1="550" y1="290" x2="573" y2="290" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#as-arr-a)" />

      <rect x="575" y="263" width="130" height="54" rx="6" fill="#1e0a32" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="640" y="286" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Claude Sonnet</text>
      <text x="640" y="302" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">permitted context</text>

      {/* Layer 2 description */}
      <text x="130" y="333" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        Policy enforced before AI runs. Hard gate, not a soft check.
      </text>

      {/* ══════════════════════════════════════
          LAYER 3 — RUNTIME SECURITY (Warden)  y=370–510
          ══════════════════════════════════════ */}
      <rect x="35" y="370" width="910" height="140" rx="8" fill="#1e3a5f" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />

      {/* Badge */}
      <rect x="40" y="376" width="75" height="60" rx="4" fill="#1e3a5f" fillOpacity="0.55" />
      <text x="77" y="394" fill="#93c5fd" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="1.5">RUNTIME</text>
      <text x="77" y="407" fill="#93c5fd" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="1.5">SECURITY</text>
      <text x="77" y="424" fill="#60a5fa" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Warden</text>

      {/* Flow nodes — y_center=460, y_top=433 */}
      <rect x="130" y="433" width="92" height="54" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="176" y="456" fill="#bfdbfe" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">K8s Workload</text>
      <text x="176" y="472" fill="#60a5fa" fontSize={9} fontFamily="monospace" textAnchor="middle">submit</text>

      <line x1="222" y1="460" x2="242" y2="460" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#as-arr-b)" />

      <rect x="244" y="433" width="100" height="54" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="294" y="456" fill="#fde68a" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">OPA Gatekeeper</text>
      <text x="294" y="472" fill="#d97706" fontSize={9} fontFamily="monospace" textAnchor="middle">admission</text>

      <line x1="344" y1="460" x2="364" y2="460" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#as-arr-b)" />

      <rect x="366" y="433" width="95" height="54" rx="6" fill="#0f2744" stroke="#3b82f6" strokeWidth="2" />
      <text x="413" y="456" fill="#bfdbfe" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Falco eBPF</text>
      <text x="413" y="472" fill="#60a5fa" fontSize={9} fontFamily="monospace" textAnchor="middle">runtime</text>

      <line x1="461" y1="460" x2="481" y2="460" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#as-arr-b)" />

      <rect x="483" y="433" width="108" height="54" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="537" y="456" fill="#bfdbfe" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Falcosidekick</text>
      <text x="537" y="472" fill="#60a5fa" fontSize={9} fontFamily="monospace" textAnchor="middle">forwarding</text>

      <line x1="591" y1="460" x2="611" y2="460" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#as-arr)" />

      <rect x="613" y="433" width="100" height="54" rx="6" fill="#1e0a32" stroke="#8b5cf6" strokeWidth="2" />
      <text x="663" y="456" fill="#e9d5ff" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Claude Sonnet</text>
      <text x="663" y="472" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">triage</text>

      <line x1="713" y1="460" x2="733" y2="460" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#as-arr-g)" />

      <rect x="735" y="433" width="100" height="54" rx="6" fill="#052e16" stroke="#10b981" strokeWidth="2" />
      <text x="785" y="456" fill="#6ee7b7" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Auto-patch</text>
      <text x="785" y="472" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">&lt;3 seconds</text>

      {/* Layer 3 description */}
      <text x="130" y="500" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        Two-layer K8s security. Detect and remediate within 3 seconds.
      </text>
    </svg>
  );
}
