export function AviationArchDiagram() {
  return (
    <svg
      viewBox="0 0 960 500"
      width="100%"
      role="img"
      aria-label="Aviation tool inventory three-layer architecture: Operational Core, AI Trend Agent, and Admin Dashboard"
      style={{ display: "block" }}
    >
      <defs>
        <marker id="aa-arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        <marker id="aa-arr-g" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="aa-arr-p" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="aa-arr-c" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="960" height="500" fill="#0f172a" rx="12" />

      {/* Title */}
      <text x="480" y="24" fill="#475569" fontSize={11} fontFamily="monospace" letterSpacing="2" textAnchor="middle">
        THREE-LAYER CLOSED-LOOP ARCHITECTURE
      </text>

      {/* ══════════════════════════════════════
          LAYER 1 — OPERATIONAL CORE (AWS VPC)   y=40-185
          ══════════════════════════════════════ */}
      <rect x="35" y="40" width="890" height="145" rx="8" fill="#0e2238" fillOpacity="0.6" stroke="#22d3ee" strokeWidth="1.5" />

      {/* VPC badge */}
      <rect x="41" y="46" width="80" height="52" rx="4" fill="#0e4a5e" fillOpacity="0.6" />
      <text x="81" y="64" fill="#67e8f9" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="2">LAYER 1</text>
      <text x="81" y="78" fill="#22d3ee" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Operational</text>
      <text x="81" y="92" fill="#22d3ee" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Core</text>

      {/* AWS VPC boundary label */}
      <text x="860" y="58" fill="#334155" fontSize={9} fontFamily="monospace" textAnchor="end">Private AWS VPC</text>

      {/* Layer 1 nodes — y_center=112 */}
      <rect x="136" y="84" width="118" height="55" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="195" y="107" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">PostgreSQL</text>
      <text x="195" y="123" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">RDS — tool records</text>

      <line x1="254" y1="111" x2="278" y2="111" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#aa-arr-c)" />

      <rect x="280" y="84" width="128" height="55" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="344" y="107" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">State Machine</text>
      <text x="344" y="123" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">lifecycle enforcement</text>

      <line x1="408" y1="111" x2="432" y2="111" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#aa-arr-c)" />

      <rect x="434" y="84" width="128" height="55" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="498" y="107" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Notification</text>
      <text x="498" y="123" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">every transition → admin</text>

      <line x1="562" y1="111" x2="586" y2="111" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#aa-arr-c)" />

      <rect x="588" y="84" width="120" height="55" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="648" y="107" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Barcode API</text>
      <text x="648" y="123" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">scan → checkout/return</text>

      <line x1="708" y1="111" x2="732" y2="111" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#aa-arr-c)" />

      <rect x="734" y="84" width="110" height="55" rx="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" />
      <text x="789" y="107" fill="#a5f3fc" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Audit Logger</text>
      <text x="789" y="123" fill="#67e8f9" fontSize={9} fontFamily="monospace" textAnchor="middle">actor + timestamp</text>

      {/* Layer 1 description */}
      <text x="136" y="163" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        All raw operational data stays within the VPC. No personnel records leave this boundary.
      </text>

      {/* ── BOUNDARY LABEL between layers 1 and 2 ── */}
      <line x1="35" y1="201" x2="925" y2="201" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
      <rect x="310" y="192" width="340" height="18" rx="4" fill="#0f172a" />
      <text x="480" y="205" fill="#475569" fontSize={9} fontFamily="monospace" textAnchor="middle" letterSpacing="1">
        AGGREGATION BOUNDARY — summaries only cross here
      </text>

      {/* Arrows Layer 1 → Layer 2 */}
      <line x1="344" y1="185" x2="344" y2="218" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#aa-arr-p)" />
      <line x1="648" y1="185" x2="648" y2="218" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#aa-arr-p)" />

      {/* ══════════════════════════════════════
          LAYER 2 — AI TREND AGENT   y=220-335
          ══════════════════════════════════════ */}
      <rect x="35" y="220" width="890" height="115" rx="8" fill="#1e0a32" fillOpacity="0.5" stroke="#8b5cf6" strokeWidth="1.5" />

      {/* Badge */}
      <rect x="41" y="226" width="80" height="52" rx="4" fill="#2e1065" fillOpacity="0.6" />
      <text x="81" y="243" fill="#c4b5fd" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="2">LAYER 2</text>
      <text x="81" y="258" fill="#a78bfa" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">AI Trend</text>
      <text x="81" y="272" fill="#a78bfa" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Agent</text>

      {/* Layer 2 nodes — y_center=278 */}
      <rect x="140" y="250" width="145" height="55" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="212" y="273" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Event Aggregator</text>
      <text x="212" y="289" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">30-day rolling summary</text>

      <line x1="285" y1="277" x2="320" y2="277" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#aa-arr-p)" />

      <rect x="322" y="250" width="115" height="55" rx="6" fill="#1e0a32" stroke="#8b5cf6" strokeWidth="2" />
      <text x="379" y="273" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Claude API</text>
      <text x="379" y="289" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">claude-sonnet-4-6</text>

      <line x1="437" y1="277" x2="472" y2="277" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#aa-arr-p)" />

      <rect x="474" y="250" width="380" height="55" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="664" y="270" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">4-Signal Trend Analysis</text>
      <text x="664" y="288" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">low stock  ·  loss/attrition  ·  overuse/underuse  ·  breakage frequency</text>

      {/* Layer 2 description */}
      <text x="140" y="328" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        Operates on aggregated event summaries only. No individual personnel data, locations, or raw timestamps.
      </text>

      {/* Arrows Layer 2 → Layer 3 */}
      <line x1="344" y1="335" x2="344" y2="368" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#aa-arr-g)" />
      <line x1="664" y1="335" x2="664" y2="368" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#aa-arr-g)" />

      {/* ══════════════════════════════════════
          LAYER 3 — ADMIN DASHBOARD   y=370-480
          ══════════════════════════════════════ */}
      <rect x="35" y="370" width="890" height="115" rx="8" fill="#052e16" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />

      {/* Badge */}
      <rect x="41" y="376" width="80" height="52" rx="4" fill="#052e16" fillOpacity="0.7" />
      <text x="81" y="393" fill="#6ee7b7" fontSize={8} fontFamily="monospace" textAnchor="middle" fontWeight="700" letterSpacing="2">LAYER 3</text>
      <text x="81" y="408" fill="#34d399" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Admin</text>
      <text x="81" y="422" fill="#34d399" fontSize={10} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Dashboard</text>

      {/* Layer 3 nodes — y_center=422 */}
      <rect x="140" y="394" width="140" height="55" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
      <text x="210" y="417" fill="#6ee7b7" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Live Status Board</text>
      <text x="210" y="433" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">colour-coded tool states</text>

      <rect x="300" y="394" width="155" height="55" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
      <text x="377" y="417" fill="#6ee7b7" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Per-Aircraft Reports</text>
      <text x="377" y="433" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">tools on loan by tail number</text>

      <rect x="475" y="394" width="145" height="55" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
      <text x="547" y="413" fill="#6ee7b7" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Calibration</text>
      <text x="547" y="429" fill="#6ee7b7" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Calendar</text>
      <text x="547" y="443" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">due dates + overdue flags</text>

      <rect x="640" y="394" width="185" height="55" rx="6" fill="#1e0a32" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="732" y="417" fill="#e9d5ff" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">AI Insight Panel</text>
      <text x="732" y="433" fill="#a78bfa" fontSize={9} fontFamily="monospace" textAnchor="middle">recommendations + export</text>

      {/* Layer 3 description */}
      <text x="140" y="472" fill="#94a3b8" fontSize={10} fontFamily="sans-serif" fontStyle="italic">
        Audit trail always current. Compliance evidence on demand — never reconstructed before an inspection.
      </text>
    </svg>
  );
}
