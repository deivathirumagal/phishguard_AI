import React from "react";

/**
 * RealTimeAlert Component
 * 
 * Reusable security alert component that displays an immediate warning banner
 * whenever a message is identified as Phishing or categorized as High / Critical Risk.
 * 
 * @param {Object} props
 * @param {Object} props.result The scan result object from the detection service
 * @param {Function} [props.onDismiss] Optional callback when the alert is dismissed
 * @param {boolean} [props.isRealTime] Whether the alert was triggered from real-time monitoring
 */
export default function RealTimeAlert({ result, onDismiss, isRealTime = true }) {
  if (!result) return null;

  const isPhishing = result.label === "Phishing";
  const isSuspicious = result.label === "Suspicious";
  const isHighRisk = result.risk_level === "High Risk" || result.risk_level === "Critical Risk";
  const isMediumRisk = result.risk_level === "Medium Risk";

  // Show the alert if it qualifies as a threat or suspicious message
  if (!isPhishing && !isSuspicious && !isHighRisk && !isMediumRisk) {
    return null;
  }

  const isCritical = result.risk_level === "Critical Risk";
  const alertThemeClass = isCritical
    ? "critical-alert"
    : isSuspicious && !isHighRisk
    ? "suspicious-alert high-alert"
    : "high-alert";

  return (
    <div
      id="realtime-security-alert"
      className={`realtime-alert-card ${alertThemeClass}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="alert-top-banner">
        <div className="alert-title-group">
          <div className="alert-icon-wrapper pulse-danger">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <div className="alert-badge-tag">
              {isRealTime ? "⚡ REAL-TIME SECURITY INTERCEPT" : "⚠️ SECURITY THREAT WARNING"}
            </div>
            <h3 className="alert-headline">
              {isPhishing ? "Phishing Threat Detected!" : "Suspicious Message Flagged!"}
            </h3>
          </div>
        </div>

        {onDismiss && (
          <button
            type="button"
            className="alert-dismiss-btn"
            onClick={onDismiss}
            aria-label="Dismiss real-time alert"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <div className="alert-stats-strip">
        <div className="alert-stat-box">
          <span className="alert-stat-label">AI Verdict</span>
          <span className={`alert-stat-value ${isPhishing ? "verdict-badge-phish" : "text-amber-400"}`} style={{ color: isPhishing ? "#ef4444" : "#fbbf24" }}>
            {result.label || (isPhishing ? "Phishing" : "Suspicious")}
          </span>
        </div>
        <div className="alert-stat-box">
          <span className="alert-stat-label">Risk Score</span>
          <span className="alert-stat-value text-red-400">
            {result.risk_score ?? "N/A"}
            <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 400 }}> / 100</span>
          </span>
        </div>
        <div className="alert-stat-box">
          <span className="alert-stat-label">Risk Level</span>
          <span className={`alert-stat-value level-${(result.risk_level || "high").toLowerCase().replace(/\s+/g, "-")}`}>
            {result.risk_level || "High Risk"}
          </span>
        </div>
        {result.confidence != null && (
          <div className="alert-stat-box">
            <span className="alert-stat-label">AI Confidence</span>
            <span className="alert-stat-value" style={{ color: "#fde047" }}>
              {typeof result.confidence === "number"
                ? `${(result.confidence * (result.confidence <= 1 ? 100 : 1)).toFixed(1)}%`
                : result.confidence}
            </span>
          </div>
        )}
      </div>

      {result.explanation && (
        <div className="alert-section">
          <h4 className="alert-section-title">
            <span style={{ color: "#f87171" }}>🛑</span> Detection Analysis
          </h4>
          <p className="alert-section-text">{result.explanation}</p>
        </div>
      )}

      {result.recommendation && (
        <div className="alert-section">
          <h4 className="alert-section-title">
            <span style={{ color: "#fbbf24" }}>💡</span> Security Recommendation
          </h4>
          <p className="alert-section-text">{result.recommendation}</p>
        </div>
      )}

      {/* Mandatory safety guidance */}
      <div className="alert-safety-guidance">
        <span className="guidance-icon">⚠️</span>
        <span className="guidance-text">
          <strong>CRITICAL SAFETY DIRECTIVE:</strong> Do not click suspicious links. Do not provide passwords, OTPs, or personal financial information.
        </span>
      </div>
    </div>
  );
}
