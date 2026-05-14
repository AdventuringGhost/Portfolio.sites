export function AviationStateMachineDiagram() {
  return (
    <svg
      viewBox="0 0 860 415"
      width="100%"
      role="img"
      aria-label="Aviation tool lifecycle state machine: Serviceable, On Loan, WMTC, Calibration Centre, and Condemned states with transitions"
      style={{ display: "block" }}
    >
      <defs>
        <marker id="sm-arr" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
        </marker>
        <marker id="sm-arr-g" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="sm-arr-r" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
        <marker id="sm-arr-a" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="sm-arr-b" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="860" height="415" fill="#0f172a" rx="12" />

      {/* Title */}
      <text x="430" y="26" fill="#475569" fontSize={11} fontFamily="monospace" letterSpacing="2" textAnchor="middle">
        TOOL LIFECYCLE — FORMAL STATE MACHINE
      </text>
      <text x="430" y="42" fill="#334155" fontSize={9} fontFamily="monospace" letterSpacing="1" textAnchor="middle">
        Transport Canada CARs Part 145 / FAA Part 145 — all transitions logged with actor, timestamp, location
      </text>

      {/* ── STATE BOXES ── */}

      {/* SERVICEABLE (top-left) */}
      <rect x="40" y="65" width="170" height="68" rx="8" fill="#052e16" stroke="#10b981" strokeWidth={2} />
      <text x="125" y="93" fill="#6ee7b7" fontSize={13} fontFamily="sans-serif" textAnchor="middle" fontWeight="700">SERVICEABLE</text>
      <text x="125" y="111" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">available for use</text>

      {/* ON LOAN (top-right) */}
      <rect x="570" y="65" width="170" height="68" rx="8" fill="#0f2744" stroke="#3b82f6" strokeWidth={2} />
      <text x="655" y="93" fill="#bfdbfe" fontSize={13} fontFamily="sans-serif" textAnchor="middle" fontWeight="700">ON LOAN</text>
      <text x="655" y="111" fill="#60a5fa" fontSize={9} fontFamily="monospace" textAnchor="middle">ID + location assigned</text>

      {/* WMTC BROKEN (bottom-right) */}
      <rect x="570" y="250" width="170" height="68" rx="8" fill="#2d0a0a" stroke="#ef4444" strokeWidth={2} />
      <text x="655" y="276" fill="#fca5a5" fontSize={13} fontFamily="sans-serif" textAnchor="middle" fontWeight="700">WMTC</text>
      <text x="655" y="292" fill="#f87171" fontSize={9} fontFamily="monospace" textAnchor="middle">broken — quarantined</text>
      <text x="655" y="308" fill="#7f1d1d" fontSize={8} fontFamily="monospace" textAnchor="middle">illegal transitions blocked</text>

      {/* CALIBRATION CENTRE (bottom-left) */}
      <rect x="40" y="250" width="170" height="68" rx="8" fill="#1c0f03" stroke="#f59e0b" strokeWidth={2} />
      <text x="125" y="274" fill="#fde68a" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="700">CALIBRATION</text>
      <text x="125" y="290" fill="#fde68a" fontSize={12} fontFamily="sans-serif" textAnchor="middle" fontWeight="700">CENTRE</text>
      <text x="125" y="308" fill="#fbbf24" fontSize={9} fontFamily="monospace" textAnchor="middle">out for recalibration</text>

      {/* ── ARROWS ── */}

      {/* → SERVICEABLE to ON LOAN: checkout (top, y=89) */}
      <line x1="210" y1="89" x2="570" y2="89" stroke="#3b82f6" strokeWidth={1.5} markerEnd="url(#sm-arr-b)" />
      <text x="390" y="82" fill="#60a5fa" fontSize={9} fontFamily="monospace" textAnchor="middle">checkout — personnel ID + location required</text>

      {/* ← ON LOAN to SERVICEABLE: return (y=109, dashed) */}
      <line x1="570" y1="109" x2="210" y2="109" stroke="#10b981" strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#sm-arr-g)" />
      <text x="390" y="126" fill="#34d399" fontSize={9} fontFamily="monospace" textAnchor="middle">return — pre-check complete</text>

      {/* ↓ ON LOAN to WMTC: fault reported (right side, x=655) */}
      <line x1="655" y1="133" x2="655" y2="250" stroke="#ef4444" strokeWidth={1.5} markerEnd="url(#sm-arr-r)" />
      <text
        x="678"
        y="191"
        fill="#f87171"
        fontSize={9}
        fontFamily="monospace"
        textAnchor="middle"
        transform="rotate(90 678 191)"
      >
        fault reported
      </text>

      {/* Admin notification badge — fault arrow */}
      <rect x="695" y="175" width="82" height="16" rx="4" fill="#7f1d1d" />
      <text x="736" y="187" fill="#fca5a5" fontSize={8} fontFamily="monospace" textAnchor="middle">&#9889; admin notified</text>

      {/* ← WMTC to CAL CENTRE: needs recalibration (bottom, y=284) */}
      <line x1="570" y1="284" x2="210" y2="284" stroke="#f59e0b" strokeWidth={1.5} markerEnd="url(#sm-arr-a)" />
      <text x="390" y="276" fill="#fbbf24" fontSize={9} fontFamily="monospace" textAnchor="middle">needs recalibration</text>

      {/* Admin notification badge — recal arrow */}
      <rect x="335" y="300" width="82" height="16" rx="4" fill="#78350f" />
      <text x="376" y="312" fill="#fde68a" fontSize={8} fontFamily="monospace" textAnchor="middle">&#9889; admin notified</text>

      {/* ↑ CAL CENTRE to SERVICEABLE: calibrated (left side, x=125) */}
      <line x1="125" y1="250" x2="125" y2="133" stroke="#10b981" strokeWidth={1.5} markerEnd="url(#sm-arr-g)" />
      <text
        x="96"
        y="191"
        fill="#34d399"
        fontSize={9}
        fontFamily="monospace"
        textAnchor="middle"
        transform="rotate(-90 96 191)"
      >
        calibrated
      </text>

      {/* CONDEMNED terminal state */}
      <line x1="655" y1="318" x2="655" y2="360" stroke="#475569" strokeWidth={1} strokeDasharray="3,3" markerEnd="url(#sm-arr)" />
      <text x="676" y="344" fill="#475569" fontSize={8} fontFamily="monospace">irreparable</text>
      <rect x="552" y="360" width="206" height="44" rx="6" fill="#0f172a" stroke="#475569" strokeWidth={1} strokeDasharray="4,3" />
      <text x="655" y="381" fill="#94a3b8" fontSize={11} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">CONDEMNED</text>
      <text x="655" y="396" fill="#64748b" fontSize={9} fontFamily="monospace" textAnchor="middle">terminal — removed from service permanently</text>

      {/* Legend */}
      <text x="40" y="410" fill="#334155" fontSize={9} fontFamily="monospace">
        solid arrow = valid transition   dashed = return path   &#9889; = admin escalation triggered
      </text>
    </svg>
  );
}
