import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getScanHistory, clearScanHistory } from "../utils/historyStorage";

function History() {
  const [history, setHistory] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const records = getScanHistory();
    setHistory(records);
  };

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all scan history? This action cannot be undone."
    );
    if (confirmed) {
      clearScanHistory();
      setHistory([]);
      setSelectedScan(null);
    }
  };

  const getStatusClass = (label) => {
    if (!label) return "status-neutral";
    const lbl = label.toLowerCase();
    if (lbl.includes("phish")) return "status-danger";
    if (lbl.includes("suspicious")) return "status-warning";
    return "status-safe";
  };

  const getRiskScoreColor = (score) => {
    if (score >= 60) return "#ef4444";
    if (score >= 30) return "#f59e0b";
    return "#10b981";
  };

  // Filter history by category and search query
  const filteredHistory = history.filter((item) => {
    const label = (item.label || item.classification || "").toLowerCase();
    const msg = (item.message || "").toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesCategory =
      filterCategory === "all" ||
      (filterCategory === "phishing" && label.includes("phish")) ||
      (filterCategory === "suspicious" && label.includes("suspicious")) ||
      (filterCategory === "legitimate" && (label.includes("legitimate") || label.includes("ham") || label.includes("safe")));

    const matchesSearch = !query || msg.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page">
      <Navbar />

      <main className="dashboard history-page-container">
        <div className="dashboard-header">
          <div>
            <span className="section-heading-small">LOCAL AUDIT TRAIL</span>
            <h1>Scan History</h1>
            <p>
              Review past message analyses and inspection reports preserved locally in your browser.
            </p>
          </div>

          <div className="history-header-actions">
            {history.length > 0 && (
              <button
                type="button"
                className="secondary-btn clear-history-btn"
                onClick={handleClearHistory}
                id="clear-history-button"
                title="Clear all stored scan records"
              >
                🗑️ Clear History
              </button>
            )}

            <Link to="/scan" className="primary-btn">
              + New Scan
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        {history.length > 0 && (
          <div className="history-filter-bar">
            <div className="filter-tabs">
              <button
                type="button"
                className={`filter-tab ${filterCategory === "all" ? "active" : ""}`}
                onClick={() => setFilterCategory("all")}
              >
                All Scans ({history.length})
              </button>
              <button
                type="button"
                className={`filter-tab ${filterCategory === "phishing" ? "active" : ""}`}
                onClick={() => setFilterCategory("phishing")}
              >
                🚨 Phishing ({history.filter((h) => (h.label || "").toLowerCase().includes("phish")).length})
              </button>
              <button
                type="button"
                className={`filter-tab ${filterCategory === "suspicious" ? "active" : ""}`}
                onClick={() => setFilterCategory("suspicious")}
              >
                ⚠️ Suspicious ({history.filter((h) => (h.label || "").toLowerCase().includes("suspicious")).length})
              </button>
              <button
                type="button"
                className={`filter-tab ${filterCategory === "legitimate" ? "active" : ""}`}
                onClick={() => setFilterCategory("legitimate")}
              >
                ✓ Legitimate ({history.filter((h) => !(h.label || "").toLowerCase().includes("phish") && !(h.label || "").toLowerCase().includes("suspicious")).length})
              </button>
            </div>

            <div className="history-search-wrap">
              <input
                type="text"
                placeholder="Search analyzed messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="history-search-input"
              />
            </div>
          </div>
        )}

        {history.length === 0 ? (
          <div className="empty-history-card">
            <div className="empty-history-icon">🗂️</div>
            <h3>No Scan History Found</h3>
            <p>
              You haven't scanned any messages yet. Once you analyze messages in the scanner, your results will appear here with timestamps, risk scores, and threat indicators.
            </p>
            <Link to="/scan" className="primary-btn">
              Scan Your First Message →
            </Link>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="empty-history-card">
            <div className="empty-history-icon">🔍</div>
            <h3>No Matching Records</h3>
            <p>
              No scans matched your active filter or search query. Try switching the filter tab or clearing the search.
            </p>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                setFilterCategory("all");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="history-content-layout">
            <div className="history-table-container">
              <div className="history-table-wrapper">
                <div className="history-table">
                  <div className="history-header">
                    <span>MESSAGE CONTENT</span>
                    <span>CLASSIFICATION</span>
                    <span>RISK SCORE</span>
                    <span>CONFIDENCE</span>
                    <span>TIMESTAMP</span>
                    <span>ACTION</span>
                  </div>

                  {filteredHistory.map((item, index) => (
                    <div className="history-row" key={item.id || index}>
                      <div className="history-message">
                        <span className="history-icon-bubble">💬</span>
                        <div className="message-text-group">
                          <p className="message-snippet" title={item.message}>
                            {item.message}
                          </p>
                          {item.detected_urls && item.detected_urls.length > 0 && (
                            <small className="url-count-indicator">
                              🔗 {item.detected_urls.length} {item.detected_urls.length === 1 ? "URL" : "URLs"}
                            </small>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className={getStatusClass(item.label)}>
                          {item.label === "Phishing" ? "🚨 " : item.label === "Suspicious" ? "⚠️ " : "✓ "}
                          {item.label}
                        </span>
                      </div>

                      <div className="score-cell">
                        <strong style={{ color: getRiskScoreColor(item.risk_score) }}>
                          {item.risk_score}/100
                        </strong>
                        <small className="risk-level-caption">{item.risk_level}</small>
                      </div>

                      <div className="confidence-cell">
                        {typeof item.confidence === "number"
                          ? `${(item.confidence * 100).toFixed(1)}%`
                          : "—"}
                      </div>

                      <div className="date">
                        <span>{item.timestamp}</span>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="history-view-btn"
                          onClick={() => setSelectedScan(item)}
                          title="View scan details"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="history-footer-stats">
                <span>Showing {history.length} {history.length === 1 ? "record" : "records"} stored in browser localStorage.</span>
              </div>
            </div>

            {/* Modal or Expanded Detail Side Drawer */}
            {selectedScan && (
              <div className="scan-detail-modal-overlay" onClick={() => setSelectedScan(null)}>
                <div className="scan-detail-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Scan Details</h3>
                    <button
                      type="button"
                      className="modal-close-btn"
                      onClick={() => setSelectedScan(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="modal-meta-row">
                      <span className={getStatusClass(selectedScan.label)}>
                        {selectedScan.label}
                      </span>
                      <span className="modal-timestamp">{selectedScan.timestamp}</span>
                    </div>

                    <div className="modal-section">
                      <label>Analyzed Message:</label>
                      <div className="modal-message-box">
                        {selectedScan.message}
                      </div>
                    </div>

                    <div className="modal-metrics-grid">
                      <div>
                        <label>Risk Score:</label>
                        <strong style={{ color: getRiskScoreColor(selectedScan.risk_score) }}>
                          {selectedScan.risk_score} / 100
                        </strong>
                      </div>
                      <div>
                        <label>Risk Level:</label>
                        <strong>{selectedScan.risk_level}</strong>
                      </div>
                      <div>
                        <label>Model Confidence:</label>
                        <strong>
                          {typeof selectedScan.confidence === "number"
                            ? `${(selectedScan.confidence * 100).toFixed(2)}%`
                            : "N/A"}
                        </strong>
                      </div>
                    </div>

                    {selectedScan.explanation && (
                      <div className="modal-section">
                        <label>Explanation:</label>
                        <p>{selectedScan.explanation}</p>
                      </div>
                    )}

                    {selectedScan.recommendation && (
                      <div className="modal-section modal-rec-box">
                        <label>Recommendation:</label>
                        <p>{selectedScan.recommendation}</p>
                      </div>
                    )}

                    {selectedScan.detected_urls && selectedScan.detected_urls.length > 0 && (
                      <div className="modal-section">
                        <label>Extracted URLs:</label>
                        <ul className="modal-url-list">
                          {selectedScan.detected_urls.map((u, i) => (
                            <li key={i}>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default History;