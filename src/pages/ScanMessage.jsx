import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import RealTimeAlert from "../components/RealTimeAlert";
import { saveScan, getScanHistory } from "../utils/historyStorage";
import { processIncomingMessage } from "../services/realtimeDetectionService";
import { API_ENDPOINTS, API_BASE_URL } from "../services/apiConfig";

function ScanMessage() {
  const [activeTab, setActiveTab] = useState("manual"); // "manual" | "realtime"
  const [message, setMessage] = useState("");
  const [simulatedMessage, setSimulatedMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [isRealTimeTrigger, setIsRealTimeTrigger] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    setRecentScans(getScanHistory().slice(0, 5));
  }, []);

  // 5 Standard Faculty Demo Presets (All route through actual /predict backend)
  const demoPresets = [
    {
      id: "demo1",
      num: "DEMO 1",
      badge: "DEMO 1 — Legitimate",
      type: "safe",
      title: "Legitimate Personal Message",
      text: "Hey, are we still meeting for lunch today?",
    },
    {
      id: "demo2",
      num: "DEMO 2",
      badge: "DEMO 2 — Banking Phishing",
      type: "phishing",
      title: "Urgent Account Suspension",
      text: "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example",
    },
    {
      id: "demo3",
      num: "DEMO 3",
      badge: "DEMO 3 — Delivery Scam",
      type: "scam",
      title: "Package Customs Fee Scam",
      text: "FedEx: Your package is waiting. Pay the customs fee immediately at http://bit.ly/example",
    },
    {
      id: "demo4",
      num: "DEMO 4",
      badge: "DEMO 4 — Reward Scam",
      type: "scam",
      title: "Prize & Cash Reward Lure",
      text: "Congratulations! You have won a cash reward. Claim your prize now at http://bit.ly/example",
    },
    {
      id: "demo5",
      num: "DEMO 5",
      badge: "DEMO 5 — Safe Message",
      type: "safe",
      title: "Safe Project Meeting SMS",
      text: "Don't forget our project meeting at 4 PM tomorrow.",
    },
  ];

  // Presets for Real-Time Simulation
  const simulatedPresets = [
    {
      id: "bank",
      label: "🚨 Banking Smishing",
      text: "URGENT: Your Chase checking account has been locked due to suspicious activity. Verify your identity at https://secure-chase-update.tk immediately to avoid suspension.",
    },
    {
      id: "delivery",
      label: "📦 Delivery Scam",
      text: "FedEx: Your parcel #94028 could not be delivered due to unpaid customs fee of $2.40. Pay now: http://fedx-customs-pay.com to release package.",
    },
    {
      id: "card",
      label: "💳 Credit Card Alert",
      text: "ALERT: Unauthorized charge of $499.00 on your Wells Fargo Visa card. If this was not you, call fraud helpline http://wellsfargo-security.biz immediately.",
    },
    {
      id: "meeting",
      label: "✓ Safe Meeting SMS",
      text: "Hi Alex, just confirming our project presentation at 4:00 PM in Conference Room B. See you there!",
    },
  ];

  const loadSample = (sampleText) => {
    setMessage(sampleText);
    setError("");
    setDuplicateWarning("");
    setResult(null);
  };

  const loadSimulatedPreset = (presetText) => {
    setSimulatedMessage(presetText);
    setError("");
    setDuplicateWarning("");
  };

  const handleClear = () => {
    setMessage("");
    setError("");
    setDuplicateWarning("");
    setResult(null);
  };

  const handleClearSimulated = () => {
    setSimulatedMessage("");
    setError("");
    setDuplicateWarning("");
  };

  const analyzeMessage = async () => {
    if (!message.trim()) {
      setError("Please enter a message to analyze.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setDuplicateWarning("");
    setResult(null);
    setIsRealTimeTrigger(false);

    try {
      const response = await fetch(API_ENDPOINTS.PREDICT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // Persist real scan result to localStorage for Dashboard and History
      const updatedHistory = saveScan(data);
      setRecentScans(updatedHistory.slice(0, 5));
    } catch (err) {
      console.error("Scan error:", err);
      setError(
        `Unable to connect to PhishGuard AI backend. Please make sure the Flask server is running at ${API_BASE_URL}.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Handler for Real-Time Detection Demo
  const handleSimulateIncoming = async (overrideText) => {
    const textToProcess = overrideText || simulatedMessage;
    if (!textToProcess || !textToProcess.trim()) {
      setError("Please select a preset or enter a simulated incoming message.");
      return;
    }

    setLoading(true);
    setError("");
    setDuplicateWarning("");
    setIsRealTimeTrigger(true);

    const outcome = await processIncomingMessage(textToProcess, {
      preventDuplicates: true,
      autoSaveHistory: true,
    });

    setLoading(false);

    if (outcome.isDuplicate) {
      setDuplicateWarning(
        "⏱️ Duplicate message skipped: This identical message was processed within the last 15 seconds."
      );
      return;
    }

    if (!outcome.success) {
      setError(outcome.error || "Failed to process simulated incoming message.");
      return;
    }

    // Success: update active result and refresh recent scans
    setResult(outcome.data);
    setRecentScans(getScanHistory().slice(0, 5));
  };

  // Helper to determine risk styling class based on final label and risk score
  const getRiskTheme = (res) => {
    if (!res) return "";
    const label = (res.label || "").toLowerCase();
    const riskLevel = (res.risk_level || "").toLowerCase();

    if (
      label.includes("phish") ||
      riskLevel.includes("critical") ||
      riskLevel.includes("high") ||
      res.risk_score >= 60
    ) {
      return "risk-danger";
    }
    if (
      label.includes("suspicious") ||
      riskLevel.includes("medium") ||
      (res.risk_score >= 30 && res.risk_score < 60)
    ) {
      return "risk-warning";
    }
    return "risk-safe";
  };

  // Helper to get color code for the risk score meter
  const getRiskScoreColor = (score) => {
    if (score >= 60) return "#ef4444"; // red
    if (score >= 30) return "#f59e0b"; // amber
    return "#10b981"; // emerald green
  };

  const getBadgeClass = (label) => {
    if (!label) return "status-neutral";
    const lbl = label.toLowerCase();
    if (lbl.includes("phish")) return "status-danger";
    if (lbl.includes("suspicious")) return "status-warning";
    return "status-safe";
  };

  // 5 standard social engineering categories from backend
  const socialEngineeringCategories = [
    {
      key: "urgency",
      label: "Urgency",
      detectedText: "Urgency detected",
      cleanText: "Urgency not detected",
    },
    {
      key: "fear_threat",
      label: "Fear / Threat",
      detectedText: "Fear/threat detected",
      cleanText: "Fear/threat not detected",
    },
    {
      key: "account_verification",
      label: "Account Verification",
      detectedText: "Account verification detected",
      cleanText: "Account verification not detected",
    },
    {
      key: "authority_impersonation",
      label: "Authority / Impersonation",
      detectedText: "Authority/impersonation detected",
      cleanText: "Authority/impersonation not detected",
    },
    {
      key: "reward",
      label: "Reward Language",
      detectedText: "Reward language detected",
      cleanText: "Reward language not detected",
    },
  ];

  return (
    <div className="page">
      <Navbar />

      <main className="scan-page">
        <div className="scan-header">
          <span className="section-heading-small">MULTI-LAYER DEFENSE ENGINE</span>
          <h1>Scan Message</h1>
          <p>
            Evaluate SMS, emails, or chat messages with our hybrid Natural Language Processing,
            URL heuristic defense, and social engineering detection engine.
          </p>
        </div>

        {/* Workflow Pipeline Banner */}
        <div className="pipeline-workflow-bar" id="pipeline-workflow-banner">
          <div className="pipeline-bar-header">
            <span className="pipeline-bar-title">Detection Workflow Pipeline</span>
            <span className="pipeline-bar-subtitle">
              ML Classification + URL/Social Engineering Analysis → Risk Assessment
            </span>
          </div>
          <div className="pipeline-flow-chips">
            <div className="pipeline-flow-chip">Incoming Message</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip">Message Preprocessing</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip">TF-IDF Feature Extraction</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip active-chip">Logistic Regression Classification</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip">URL + Social Engineering Analysis</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip risk-chip">Risk Score (0–100)</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip">Explanation</div>
            <span className="pipeline-flow-separator">→</span>
            <div className="pipeline-flow-chip alert-chip">Security Alert</div>
          </div>
        </div>

        <div className="scan-container">
          {/* Left Column: Input / Simulation Panel */}
          <div className="scan-input-card">
            {/* Mode Switcher Tabs */}
            <div className="scan-mode-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "manual"}
                className={`scan-mode-tab ${activeTab === "manual" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("manual");
                  setError("");
                  setDuplicateWarning("");
                }}
                id="tab-manual-scan"
              >
                🛡️ Manual Scan
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "realtime"}
                className={`scan-mode-tab ${activeTab === "realtime" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("realtime");
                  setError("");
                  setDuplicateWarning("");
                }}
                id="tab-realtime-demo"
              >
                ⚡ Real-Time Demo (Simulation)
              </button>
            </div>

            {activeTab === "manual" ? (
              <>
                <div className="panel-header">
                  <h3>Manual Message Input</h3>
                  <span>Passive & Confidential Analysis</span>
                </div>

                <textarea
                  id="message-input-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Paste or type an SMS or message here to analyze..."
                  rows={8}
                />

                {/* 5 Faculty Demo Presets */}
                <div className="demo-presets-container">
                  <div className="demo-presets-title">
                    <span>Faculty Demo Presets (5 Scenarios)</span>
                    <small>All route to real /predict backend</small>
                  </div>
                  <div className="demo-presets-grid">
                    {demoPresets.map((preset) => (
                      <div
                        key={preset.id}
                        className={`demo-preset-item ${message === preset.text ? "preset-active" : ""}`}
                        onClick={() => loadSample(preset.text)}
                        id={`preset-${preset.id}`}
                        title="Click to load into message scanner"
                      >
                        <span
                          className={`demo-preset-badge ${
                            preset.type === "safe"
                              ? "badge-demo-safe"
                              : preset.type === "phishing"
                              ? "badge-demo-phish"
                              : "badge-demo-scam"
                          }`}
                        >
                          {preset.badge}
                        </span>
                        <span className="demo-preset-text">{preset.text}</span>
                        <div className="demo-preset-actions">
                          <button
                            type="button"
                            className="demo-btn-load"
                            onClick={(e) => {
                              e.stopPropagation();
                              loadSample(preset.text);
                            }}
                          >
                            Load
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="error-message" role="alert" id="scan-error-alert">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="scan-actions">
                  <button
                    id="scan-analyze-button"
                    onClick={analyzeMessage}
                    disabled={loading}
                    className="primary-btn scan-btn"
                  >
                    {loading ? (
                      <>
                        <span className="btn-spinner"></span>
                        <span>Analyzing message...</span>
                      </>
                    ) : (
                      <>
                        <span>🛡️ Scan Message</span>
                      </>
                    )}
                  </button>

                  {(message || result) && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="secondary-btn"
                      id="scan-clear-button"
                      disabled={loading}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="privacy-note">
                  🔒 <strong>Passive Defensive Inspection:</strong> URLs are evaluated statically using regex & heuristics without visiting or resolving them. No personal data is stored on remote servers.
                </p>
              </>
            ) : (
              <>
                <div className="panel-header">
                  <h3>Incoming Stream Simulator</h3>
                  <span className="badge-listener">Android Listener Ready</span>
                </div>

                {/* Important Platform Limitation Notice */}
                <div className="platform-limitation-banner" id="platform-limitation-notice">
                  <div className="platform-banner-header">
                    <span className="platform-icon">📱</span>
                    <strong>Platform Notice & Architecture Note</strong>
                  </div>
                  <p className="platform-banner-text">
                    Standard web browsers operate inside an OS security sandbox and <strong>cannot directly intercept phone SMS or system notifications</strong>.
                  </p>
                  <p className="platform-banner-subtext">
                    This interactive simulator exercises PhishGuard's <strong>automated ingestion foundation</strong>, engineered to directly receive and analyze background streams from a companion <strong>Android SMS/Notification Listener Service</strong>.
                  </p>
                </div>

                <div className="simulated-input-section">
                  <label htmlFor="simulated-message-input" className="simulated-input-label">
                    Simulate Incoming SMS / Notification Text:
                  </label>
                  <textarea
                    id="simulated-message-input"
                    value={simulatedMessage}
                    onChange={(e) => setSimulatedMessage(e.target.value)}
                    placeholder="Enter or pick a simulated incoming message to trigger real-time interception..."
                    rows={4}
                  />
                </div>

                <div className="simulation-presets-section">
                  <span className="preset-label">Simulate Inbound Scenarios:</span>
                  <div className="sim-preset-grid">
                    {simulatedPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        className="sim-preset-btn"
                        onClick={() => loadSimulatedPreset(preset.text)}
                        title={preset.text}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {duplicateWarning && (
                  <div className="duplicate-warning-box" role="alert" id="sim-duplicate-warning">
                    <span className="duplicate-icon">⏱️</span>
                    <span>{duplicateWarning}</span>
                  </div>
                )}

                {error && (
                  <div className="error-message" role="alert" id="sim-error-alert">
                    <span className="error-icon">⚠️</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="scan-actions">
                  <button
                    id="simulate-incoming-button"
                    onClick={() => handleSimulateIncoming()}
                    disabled={loading}
                    className="primary-btn realtime-btn"
                  >
                    {loading ? (
                      <>
                        <span className="btn-spinner"></span>
                        <span>Intercepting & Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span className="radar-pulse">⚡</span>
                        <span>Simulate Incoming Message</span>
                      </>
                    )}
                  </button>

                  {simulatedMessage && (
                    <button
                      type="button"
                      onClick={handleClearSimulated}
                      className="secondary-btn"
                      id="sim-clear-button"
                      disabled={loading}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="privacy-note">
                  ⚡ <strong>Real-Time Pipeline:</strong> Automatically routes newly arrived messages through <code style={{ color: "#38bdf8" }}>POST /predict</code>, runs deduplication, evaluates threat level, and commits to local audit history.
                </p>
              </>
            )}
          </div>

          {/* Right Column: Dynamic Result Panel */}
          <div className="scan-result-card-container">
            {loading ? (
              <div className="result-card empty-result" id="scan-loading-card">
                <div className="loader"></div>
                <h3>Analyzing message...</h3>
                <p>
                  Executing TF-IDF vectorization, Logistic Regression inference, defensive URL parsing, and social engineering heuristic evaluation...
                </p>
              </div>
            ) : result ? (
              <div className={`result-card ${getRiskTheme(result)}`} id="scan-result-display">
                <div className="panel-header">
                  <span className="result-title">EVALUATION REPORT</span>
                  <span className="model-tag">TF-IDF + Logistic Regression</span>
                </div>

                {/* Real-Time Security Alert (Task 2): Prominently rendered for Phishing or High/Critical Risk */}
                <RealTimeAlert
                  result={result}
                  onDismiss={() => {}}
                  isRealTime={isRealTimeTrigger}
                />

                {/* Executive Verdict Summary: Visible first for College Viva / Faculty Demo */}
                <div className={`executive-verdict-card ${getRiskTheme(result)}`} id="executive-verdict-summary">
                  <div className="executive-verdict-top">
                    <div className="verdict-primary-col">
                      <span className="verdict-label-small">FINAL CLASSIFICATION VERDICT</span>
                      <div className="verdict-headline-wrap">
                        <span className="verdict-icon">
                          {result.label === "Phishing" ? "🚨" : result.label === "Suspicious" ? "⚠️" : "✅"}
                        </span>
                        <h2 className="verdict-title" id="exec-verdict-label">{result.label}</h2>
                        <span className="verdict-pill" id="exec-verdict-level">{result.risk_level || "Standard Risk"}</span>
                      </div>
                    </div>
                    <div className="verdict-score-col">
                      <span className="verdict-label-small">COMPOSITE RISK SCORE</span>
                      <div className="verdict-score-number" style={{ color: getRiskScoreColor(result.risk_score) }} id="exec-verdict-score">
                        {result.risk_score}<span>/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="verdict-body-grid">
                    <div className="verdict-reason-cell">
                      <strong>Primary Reason:</strong>
                      <p id="exec-verdict-reason">{result.explanation}</p>
                    </div>
                    <div className="verdict-action-cell">
                      <strong>Recommended Action:</strong>
                      <p id="exec-verdict-action">{result.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* 8 Delineated Sections / Cards */}
                <div className="result-sections-stack">
                  {/* CARD 1: AI Detection Result */}
                  <div className={`result-box-card ${getRiskTheme(result)}`} id="card-ai-detection">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">1</span>
                        <h4>AI Detection Result</h4>
                      </div>
                      <span className={`status-pill-tier ${getBadgeClass(result.label)}`}>
                        {result.label}
                      </span>
                    </div>
                    <div className="detection-summary-row">
                      <div className="detection-icon-wrap">
                        {result.label === "Phishing" ? "🚨" : result.label === "Suspicious" ? "⚠️" : "✅"}
                      </div>
                      <div className="detection-meta-text">
                        <span className="sub-caption">ML Model Verdict</span>
                        <h3 className="classification-title" id="result-classification-label">{result.label}</h3>
                        <small className="prediction-raw">
                          Model Category: {result.prediction === "spam" ? "Spam / Malicious" : "Legitimate (Ham)"}
                        </small>
                      </div>
                      <div className="risk-level-badge-large" id="result-risk-level-badge">
                        {result.risk_level || "Standard"}
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: Risk Score Visualization (Task 2) */}
                  <div className="result-box-card" id="card-risk-score">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">2</span>
                        <h4>Risk Score Analysis</h4>
                      </div>
                      <div className="score-badge-inline" style={{ color: getRiskScoreColor(result.risk_score), borderColor: getRiskScoreColor(result.risk_score) }}>
                        <strong id="result-risk-score-val">{result.risk_score}</strong>
                        <span>/100</span>
                      </div>
                    </div>

                    {/* Explicit 4-Tier Display */}
                    <div className="risk-tier-badges">
                      <div className={`tier-chip ${result.risk_score < 30 ? "tier-active tier-low" : ""}`}>
                        <span className="tier-range">0–29</span>
                        <span className="tier-name">Low Risk</span>
                      </div>
                      <div className={`tier-chip ${result.risk_score >= 30 && result.risk_score < 60 ? "tier-active tier-medium" : ""}`}>
                        <span className="tier-range">30–59</span>
                        <span className="tier-name">Medium Risk</span>
                      </div>
                      <div className={`tier-chip ${result.risk_score >= 60 && result.risk_score < 80 ? "tier-active tier-high" : ""}`}>
                        <span className="tier-range">60–79</span>
                        <span className="tier-name">High Risk</span>
                      </div>
                      <div className={`tier-chip ${result.risk_score >= 80 ? "tier-active tier-critical" : ""}`}>
                        <span className="tier-range">80–100</span>
                        <span className="tier-name">Critical Risk</span>
                      </div>
                    </div>

                    {/* 0 to 100 Visual Meter with Marker */}
                    <div className="risk-visual-meter-wrapper">
                      <div className="risk-progress-track">
                        <div
                          className="risk-progress-fill"
                          style={{
                            width: `${Math.max(3, Math.min(100, result.risk_score))}%`,
                            backgroundColor: getRiskScoreColor(result.risk_score),
                          }}
                        ></div>
                      </div>

                      {/* Aligned Marker Indicator: 0 ----- ▲ ----- 100 */}
                      <div className="risk-marker-track">
                        <div
                          className="risk-meter-marker"
                          style={{
                            left: `${Math.max(2, Math.min(96, result.risk_score))}%`,
                          }}
                        >
                          <span
                            className="risk-marker-arrow"
                            style={{ color: getRiskScoreColor(result.risk_score) }}
                          >
                            ▲
                          </span>
                          <span
                            className="risk-marker-tag"
                            style={{
                              borderColor: getRiskScoreColor(result.risk_score),
                              color: getRiskScoreColor(result.risk_score),
                            }}
                          >
                            {result.risk_score}/100
                          </span>
                        </div>
                      </div>

                      <div className="risk-progress-labels">
                        <span>0 (Low)</span>
                        <span>30 (Medium)</span>
                        <span>60 (High)</span>
                        <span>100 (Critical)</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: Confidence */}
                  <div className="result-box-card" id="card-confidence">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">3</span>
                        <h4>Model Confidence</h4>
                      </div>
                      <span className="confidence-pill" id="result-confidence-val">
                        {typeof result.confidence === "number"
                          ? `${(result.confidence * 100).toFixed(2)}%`
                          : "N/A"}
                      </span>
                    </div>
                    <div className="confidence-visual-wrap">
                      <div className="confidence-track">
                        <div
                          className="confidence-fill"
                          style={{
                            width: `${typeof result.confidence === "number" ? (result.confidence * 100).toFixed(1) : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="confidence-caption-row">
                        <span className="meta-sub">Statistical Confidence:</span>
                        <strong>
                          {typeof result.confidence === "number"
                            ? `${(result.confidence * 100).toFixed(1)}% certainty for ${result.prediction === "spam" ? "spam/phishing" : "legitimate"} prediction`
                            : "Confidence rating unavailable"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4: Phishing Indicators */}
                  <div className="result-box-card" id="card-phishing-indicators">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">4</span>
                        <h4>Phishing Indicators</h4>
                      </div>
                      <span className="indicator-count-pill">
                        {result.indicators ? result.indicators.length : 0} Detected
                      </span>
                    </div>
                    {result.indicators && result.indicators.length > 0 ? (
                      <div className="indicator-tags-wrap">
                        {result.indicators.map((ind, idx) => (
                          <span key={idx} className="indicator-chip">
                            ⚠️ {ind}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="clean-state-text">✓ No specific phishing indicators detected.</p>
                    )}
                  </div>

                  {/* CARD 5: URL Analysis */}
                  <div className="result-box-card" id="card-url-analysis">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">5</span>
                        <h4>URL Analysis</h4>
                      </div>
                      <span
                        className={
                          result.url_analysis && result.url_analysis.suspicious_url
                            ? "status-pill-danger"
                            : result.url_analysis && result.url_analysis.has_url
                            ? "status-pill-safe"
                            : "status-neutral"
                        }
                      >
                        {result.url_analysis && result.url_analysis.has_url
                          ? result.url_analysis.suspicious_url
                            ? "⚠️ Suspicious Link Detected"
                            : "✓ Safe Link Pattern"
                          : "No URL Detected"}
                      </span>
                    </div>

                    <div className="url-meta-grid">
                      <div className="url-meta-box">
                        <span className="meta-caption">URL Detected</span>
                        <strong>{result.url_analysis && result.url_analysis.has_url ? "Yes" : "No"}</strong>
                      </div>
                      <div className="url-meta-box">
                        <span className="meta-caption">Suspicious URL</span>
                        <strong
                          className={
                            result.url_analysis && result.url_analysis.suspicious_url
                              ? "danger-text"
                              : "safe-text"
                          }
                        >
                          {result.url_analysis && result.url_analysis.suspicious_url ? "Yes" : "No"}
                        </strong>
                      </div>
                    </div>

                    {result.detected_urls && result.detected_urls.length > 0 ? (
                      <div className="url-list-section">
                        <span className="url-list-heading">Detected URL(s):</span>
                        {result.detected_urls.map((url, idx) => (
                          <div key={idx} className="url-item">
                            <span className="url-link-icon">🔗</span>
                            <span className="url-text">{url}</span>
                          </div>
                        ))}

                        {result.url_analysis &&
                        result.url_analysis.reasons &&
                        result.url_analysis.reasons.length > 0 ? (
                          <div className="heuristic-reasons">
                            <span className="reasons-caption">URL-related reasons:</span>
                            <ul>
                              {result.url_analysis.reasons.map((reason, idx) => (
                                <li key={idx} className="reason-item">
                                  <span className="bullet-danger">●</span> {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="clean-heuristic-note">
                            No suspicious patterns (shorteners, raw IP, high-risk TLDs) found in URL structure.
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="clean-state-text">✓ No external URLs or hyperlinks identified in message text.</p>
                    )}
                  </div>

                  {/* CARD 6: Social Engineering Analysis */}
                  <div className="result-box-card" id="card-social-engineering">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">6</span>
                        <h4>Social Engineering Analysis</h4>
                      </div>
                    </div>
                    <div className="se-boolean-grid">
                      {socialEngineeringCategories.map((item) => {
                        const isDetected = Boolean(
                          result.social_engineering && result.social_engineering[item.key]
                        );
                        return (
                          <div
                            key={item.key}
                            className={`se-boolean-row ${isDetected ? "se-row-detected" : "se-row-clean"}`}
                          >
                            <span className="se-check-symbol">{isDetected ? "✓" : "✗"}</span>
                            <span className="se-text-label">
                              {isDetected ? item.detectedText : item.cleanText}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CARD 7: Why Was This Detected? */}
                  <div className="result-box-card" id="card-why-detected">
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">7</span>
                        <h4>Why Was This Detected?</h4>
                      </div>
                    </div>
                    <p className="explanation-paragraph">{result.explanation}</p>
                  </div>

                  {/* CARD 8: Security Recommendation */}
                  <div
                    className={`result-box-card recommendation-box ${getRiskTheme(result)}`}
                    id="card-recommendation"
                  >
                    <div className="card-box-header">
                      <div className="header-title-group">
                        <span className="card-step-badge">8</span>
                        <h4>Security Recommendation</h4>
                      </div>
                      <span className="rec-icon">🛡️</span>
                    </div>
                    <p className="rec-text">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="result-card empty-result" id="scan-awaiting-card">
                <div className="large-icon">🛡️</div>
                <h3>Awaiting Message Input</h3>
                <p>
                  Paste or type any message on the left or choose a test sample, then click <strong>Scan Message</strong> to generate an instant multi-layer risk assessment.
                </p>
                <div className="detection-pillars">
                  <span>🤖 NLP & ML</span>
                  <span>🔗 URL Checks</span>
                  <span>🧠 Social Engineering</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STEP 12 / TASK 1: Recent Scans Section on Scan Page */}
        <section className="scan-recent-history-section" id="scan-recent-history-section">
          <div className="recent-history-header">
            <div>
              <span className="section-heading-small">LOCAL AUDIT TRAIL</span>
              <h2>Recent Scans</h2>
            </div>
            <Link to="/history" className="view-all-link">
              View All History →
            </Link>
          </div>

          {recentScans && recentScans.length > 0 ? (
            <div className="recent-scans-table-wrapper">
              <table className="recent-scans-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Message</th>
                    <th>Classification</th>
                    <th>Risk Score</th>
                    <th>Confidence</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan, idx) => (
                    <tr key={scan.id || idx}>
                      <td className="recent-scan-time">{scan.timestamp}</td>
                      <td className="recent-scan-msg" title={scan.message}>
                        {scan.message.length > 65
                          ? `${scan.message.substring(0, 65)}...`
                          : scan.message}
                      </td>
                      <td>
                        <span
                          className={
                            scan.classification === "Phishing"
                              ? "status-danger"
                              : scan.classification === "Suspicious"
                              ? "status-warning"
                              : "status-safe"
                          }
                        >
                          {scan.classification === "Phishing"
                            ? "🚨 "
                            : scan.classification === "Suspicious"
                            ? "⚠️ "
                            : "✓ "}
                          {scan.classification}
                        </span>
                      </td>
                      <td>
                        <strong style={{ color: getRiskScoreColor(scan.risk_score) }}>
                          {scan.risk_score}/100
                        </strong>
                      </td>
                      <td>
                        {typeof scan.confidence === "number"
                          ? `${(scan.confidence * 100).toFixed(1)}%`
                          : "—"}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="history-view-btn"
                          onClick={() => {
                            setMessage(scan.message);
                            setResult(scan);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          title="Load into scanner"
                        >
                          Reload
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-recent-scans">
              <span>No scans performed yet. Messages analyzed will be recorded here.</span>
            </div>
          )}
        </section>

        {/* 7-Step Detection Pipeline Architecture Section */}
        <section className="how-it-works-panel" id="how-it-works-section">
          <div className="how-it-works-header">
            <span className="section-heading-small">SYSTEM PIPELINE EXPLANATION</span>
            <h3>How PhishGuard AI Works (7-Step Architecture)</h3>
            <p>Concise multi-layer detection architecture designed for college viva presentation.</p>
          </div>
          <div className="pipeline-steps-grid-7">
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 1</span>
                <h4>Message Detection</h4>
              </div>
              <p>Accepts raw message input via manual scan, real-time simulation, or Android SMS listener broadcast.</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 2</span>
                <h4>Preprocessing</h4>
              </div>
              <p>Cleans text, strips anomalous characters, normalizes casing, and prepares message for vectorization.</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 3</span>
                <h4>NLP + TF-IDF</h4>
              </div>
              <p>Transforms text into numerical feature vectors using Term Frequency-Inverse Document Frequency weighting.</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 4</span>
                <h4>Logistic Regression</h4>
              </div>
              <p>Classifies message spam vs. ham probabilities (97.58% test accuracy on UCI SMS baseline).</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 5</span>
                <h4>URL & Social Engineering</h4>
              </div>
              <p>Parallel deterministic analysis: detects URL shorteners/raw IPs and psychological manipulation triggers.</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 6</span>
                <h4>Risk Scoring</h4>
              </div>
              <p>Synthesizes ML confidence and heuristic weights into an explainable 0–100 risk score and 4-tier risk level.</p>
            </div>
            <div className="step-card-7">
              <div className="step-card-7-header">
                <span className="step-number-pill">Step 7</span>
                <h4>Alert & Recommendation</h4>
              </div>
              <p>Triggers immediate visual security warnings and delivers actionable guidance to protect the user.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ScanMessage;