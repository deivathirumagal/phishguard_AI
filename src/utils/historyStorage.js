/**
 * PhishGuard AI - Local History Storage Utility
 * Manages scan results persistence in browser localStorage without requiring a database.
 */

const STORAGE_KEY = "phishguard_scan_history";

/**
 * Retrieves all stored scan records, sorted newest first.
 * @returns {Array} Array of scan record objects.
 */
export function getScanHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to retrieve scan history from localStorage:", err);
    return [];
  }
}

/**
 * Saves a new scan result to localStorage.
 * Prepend to the list so the newest scan is at index 0.
 * @param {Object} scanResult The API response object from /predict.
 * @returns {Array} The updated list of scan records.
 */
export function saveScan(scanResult) {
  try {
    const history = getScanHistory();
    const now = new Date();
    
    // Format timestamp nicely for human display
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newRecord = {
      id: "scan_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      timestamp: `${formattedDate}, ${formattedTime}`,
      isoTimestamp: now.toISOString(),
      message: scanResult.message || "",
      classification: scanResult.label || scanResult.classification || "Unknown",
      label: scanResult.label || scanResult.classification || "Unknown",
      prediction: scanResult.prediction || "ham",
      confidence: scanResult.confidence,
      risk_score: typeof scanResult.risk_score === "number" ? scanResult.risk_score : 0,
      risk_level: scanResult.risk_level || "Low Risk",
      detected_urls: Array.isArray(scanResult.detected_urls) ? scanResult.detected_urls : [],
      url_analysis: scanResult.url_analysis || { has_url: false, suspicious_url: false, reasons: [] },
      social_engineering: scanResult.social_engineering || {},
      indicators: Array.isArray(scanResult.indicators) ? scanResult.indicators : [],
      explanation: scanResult.explanation || "",
      recommendation: scanResult.recommendation || "",
    };

    // Prepend and cap at max 100 recent scans to keep localStorage lightweight
    const updated = [newRecord, ...history].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save scan record to localStorage:", err);
    return getScanHistory();
  }
}

/**
 * Clears all scan records from localStorage.
 */
export function clearScanHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (err) {
    console.error("Failed to clear scan history from localStorage:", err);
    return [];
  }
}

/**
 * Calculates dynamic aggregate statistics from actual scan history.
 * If history is empty, returns zero/empty state values.
 * @returns {Object} Calculated metrics
 */
export function getDashboardStats() {
  const history = getScanHistory();

  if (!history || history.length === 0) {
    return {
      totalScans: 0,
      phishingCount: 0,
      legitimateCount: 0,
      suspiciousCount: 0,
      latestScan: null,
      currentRiskLevel: "No Scans Yet",
      recentScans: [],
    };
  }

  const totalScans = history.length;
  let phishingCount = 0;
  let legitimateCount = 0;
  let suspiciousCount = 0;

  history.forEach((scan) => {
    const label = (scan.label || "").toLowerCase();
    if (label.includes("phish")) {
      phishingCount++;
    } else if (label.includes("suspicious")) {
      suspiciousCount++;
    } else {
      legitimateCount++;
    }
  });

  const latestScan = history[0];

  // Derive current overall risk level from the most recent scan
  let currentRiskLevel = latestScan.risk_level || "Low Risk";

  return {
    totalScans,
    phishingCount,
    legitimateCount,
    suspiciousCount,
    latestScan,
    currentRiskLevel,
    recentScans: history.slice(0, 5),
  };
}
