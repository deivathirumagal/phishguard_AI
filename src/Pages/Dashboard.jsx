import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getDashboardStats } from "../utils/historyStorage";

function Dashboard() {
  const [stats, setStats] = useState({
    totalScans: 0,
    phishingCount: 0,
    legitimateCount: 0,
    suspiciousCount: 0,
    latestScan: null,
    currentRiskLevel: "No Scans Yet",
    recentScans: [],
  });

  useEffect(() => {
    // Load dynamic metrics from actual localStorage scan history
    const currentStats = getDashboardStats();
    setStats(currentStats);
  }, []);

  const getRiskColorClass = (riskLevel) => {
    if (!riskLevel) return "risk-empty";
    const lvl = riskLevel.toLowerCase();
    if (lvl.includes("critical") || lvl.includes("high") || lvl.includes("phish")) {
      return "danger-text";
    }
    if (lvl.includes("medium") || lvl.includes("suspicious")) {
      return "warning-text";
    }
    if (lvl.includes("low") || lvl.includes("legitimate")) {
      return "safe-text";
    }
    return "";
  };

  const getBadgeClass = (label) => {
    if (!label) return "status-neutral";
    const lbl = label.toLowerCase();
    if (lbl.includes("phish")) return "status-danger";
    if (lbl.includes("suspicious")) return "status-warning";
    return "status-safe";
  };

  return (
    <div className="page">
      <Navbar />

      <main className="dashboard">
        <div className="dashboard-header">
          <div>
            <span className="section-heading-small">SECURITY POSTURE & METRICS</span>
            <h1>Security Dashboard</h1>
            <p>
              Real-time phishing detection telemetry aggregated from your local scanning activity.
            </p>
          </div>

          <Link to="/scan" className="primary-btn" id="dashboard-scan-btn">
            ⚡ + Scan Message
          </Link>
        </div>

        {/* Top Metric Cards (Powered by actual data, no fake stats) */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">📨</div>
            <p>Total Messages Scanned</p>
            <h2 id="metric-total-scans">{stats.totalScans}</h2>
            <small>{stats.totalScans === 1 ? "1 message analyzed" : `${stats.totalScans} messages analyzed`}</small>
          </div>

          <div className="stat-card safe">
            <div className="stat-icon-wrap safe-wrap">✓</div>
            <p>Legitimate Messages</p>
            <h2 id="metric-legitimate">{stats.legitimateCount}</h2>
            <small>Clean & verified safe</small>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon-wrap warning-wrap">⚠️</div>
            <p>Suspicious Messages</p>
            <h2 id="metric-suspicious">{stats.suspiciousCount}</h2>
            <small>Heuristic flags triggered</small>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon-wrap danger-wrap">🚨</div>
            <p>Phishing Detected</p>
            <h2 id="metric-phishing">{stats.phishingCount}</h2>
            <small>High & critical threats</small>
          </div>
        </div>

        {/* Current Risk Level & Latest Scan Quick Bar */}
        <div className="status-banner-card">
          <div className="status-banner-item">
            <span className="banner-title">Current Risk Level:</span>
            <span className={`banner-value ${getRiskColorClass(stats.currentRiskLevel)}`} id="current-risk-level-display">
              {stats.currentRiskLevel}
            </span>
          </div>

          <div className="status-banner-item">
            <span className="banner-title">Latest Scan:</span>
            <span className="banner-subvalue" id="latest-scan-display">
              {stats.latestScan ? (
                <>
                  <span className={`mini-badge ${getBadgeClass(stats.latestScan.label)}`}>
                    {stats.latestScan.label}
                  </span>
                  <span className="latest-time">{stats.latestScan.timestamp}</span>
                  <span className="latest-score">({stats.latestScan.risk_score}/100)</span>
                </>
              ) : (
                <span className="text-muted">No scan history recorded yet</span>
              )}
            </span>
          </div>
        </div>

        {/* Threat Distribution Visual Representation (Task 3) */}
        <div className="threat-distribution-panel">
          <div className="threat-distribution-header">
            <div>
              <span className="section-heading-small">THREAT COMPOSITION</span>
              <h3>Threat Distribution Breakdown</h3>
            </div>
            <span className="sample-size-badge">
              {stats.totalScans} {stats.totalScans === 1 ? "Sample" : "Samples"}
            </span>
          </div>

          {stats.totalScans > 0 ? (
            <div className="distribution-content">
              {/* Segmented Progress Bar */}
              <div className="distribution-bar-track">
                {stats.legitimateCount > 0 && (
                  <div
                    className="dist-segment dist-legitimate"
                    style={{ width: `${(stats.legitimateCount / stats.totalScans) * 100}%` }}
                    title={`Legitimate: ${((stats.legitimateCount / stats.totalScans) * 100).toFixed(1)}%`}
                  ></div>
                )}
                {stats.suspiciousCount > 0 && (
                  <div
                    className="dist-segment dist-suspicious"
                    style={{ width: `${(stats.suspiciousCount / stats.totalScans) * 100}%` }}
                    title={`Suspicious: ${((stats.suspiciousCount / stats.totalScans) * 100).toFixed(1)}%`}
                  ></div>
                )}
                {stats.phishingCount > 0 && (
                  <div
                    className="dist-segment dist-phishing"
                    style={{ width: `${(stats.phishingCount / stats.totalScans) * 100}%` }}
                    title={`Phishing: ${((stats.phishingCount / stats.totalScans) * 100).toFixed(1)}%`}
                  ></div>
                )}
              </div>

              {/* Legend & Percentages */}
              <div className="distribution-legend">
                <div className="legend-item">
                  <span className="legend-dot safe-dot"></span>
                  <span className="legend-name">Legitimate:</span>
                  <strong className="safe-text">
                    {((stats.legitimateCount / stats.totalScans) * 100).toFixed(1)}%
                  </strong>
                  <small>({stats.legitimateCount})</small>
                </div>
                <div className="legend-item">
                  <span className="legend-dot warning-dot"></span>
                  <span className="legend-name">Suspicious:</span>
                  <strong className="warning-text">
                    {((stats.suspiciousCount / stats.totalScans) * 100).toFixed(1)}%
                  </strong>
                  <small>({stats.suspiciousCount})</small>
                </div>
                <div className="legend-item">
                  <span className="legend-dot danger-dot"></span>
                  <span className="legend-name">Phishing:</span>
                  <strong className="danger-text">
                    {((stats.phishingCount / stats.totalScans) * 100).toFixed(1)}%
                  </strong>
                  <small>({stats.phishingCount})</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-distribution-state">
              <span>No scan history recorded yet to calculate threat distribution.</span>
            </div>
          )}
        </div>

        {/* Lower Grid: Recent Activity & Quick Scanner Card */}
        <div className="dashboard-grid">
          {/* Left Column: Recent Activity Feed */}
          <div className="panel" id="recent-activity-panel">
            <div className="panel-header">
              <h3>Recent Scan Activity</h3>
              <Link to="/history" className="view-all-link">
                View All History →
              </Link>
            </div>

            {stats.recentScans && stats.recentScans.length > 0 ? (
              <div className="activity-list">
                {stats.recentScans.map((item, idx) => (
                  <div className="activity-row" key={item.id || idx}>
                    <div
                      className={`activity-icon ${
                        item.label === "Phishing"
                          ? "danger-bg"
                          : item.label === "Suspicious"
                          ? "warning-bg"
                          : "safe-bg"
                      }`}
                    >
                      {item.label === "Phishing"
                        ? "🚨"
                        : item.label === "Suspicious"
                        ? "⚠️"
                        : "✓"}
                    </div>

                    <div className="activity-details">
                      <strong className="activity-msg" title={item.message}>
                        {item.message.length > 60
                          ? `${item.message.substring(0, 60)}...`
                          : item.message}
                      </strong>
                      <div className="activity-meta">
                        <span className={`activity-pill ${getBadgeClass(item.label)}`}>
                          {item.label}
                        </span>
                        <span className="activity-date">{item.timestamp}</span>
                      </div>
                    </div>

                    <div className="activity-score">
                      <span className={getRiskColorClass(item.risk_level)}>
                        {item.risk_score}/100
                      </span>
                      <small>{item.risk_level}</small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-panel-state">
                <span className="empty-state-icon">📭</span>
                <h4>No Scans in Local History</h4>
                <p>
                  You have not scanned any messages yet. Start analyzing an SMS or message to monitor detection telemetry here.
                </p>
                <Link to="/scan" className="primary-btn empty-btn">
                  Analyze First Message →
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Quick Scan CTA & Security Principles */}
          <div className="dashboard-side-col">
            <div className="panel quick-panel">
              <div className="quick-panel-icon">⚡</div>
              <h3>Instant Message Scanner</h3>
              <p>
                Suspect a message might be an SMS phishing scam or credential theft attempt? Run our multi-layered passive evaluation now.
              </p>
              <Link to="/scan" className="full-btn">
                Launch Scanner →
              </Link>
            </div>

            <div className="panel engine-info-panel">
              <span className="section-heading-small">DEFENSE ARCHITECTURE</span>
              <h4>PhishGuard Dual Engine</h4>
              <ul className="engine-checklist">
                <li>
                  <span className="check-bullet">●</span>
                  <span><strong>Machine Learning:</strong> Logistic Regression trained on authentic SMS Spam corpus</span>
                </li>
                <li>
                  <span className="check-bullet">●</span>
                  <span><strong>URL Heuristics:</strong> Shorteners, IP address hosts, excessive subdomains, risky TLDs</span>
                </li>
                <li>
                  <span className="check-bullet">●</span>
                  <span><strong>Behavioral NLP:</strong> Urgency, account threats, credential harvesting, authority spoofing</span>
                </li>
              </ul>
              <Link to="/about" className="learn-pipeline-link">
                Learn how it works →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;