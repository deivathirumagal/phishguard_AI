/**
 * PhishGuard AI - Real-Time Message Detection Service
 * 
 * Foundation service designed to receive incoming messages (from a real-time event,
 * webhook, simulated stream, or future Android SMS/notification listener)
 * and route them through the multi-layer PhishGuard detection pipeline:
 * 
 * Flow:
 * Incoming Message 
 *   ↓
 * Real-Time Detection Service 
 *   ↓ 
 * Flask /predict API 
 *   ↓ 
 * AI Classification & Heuristics
 *   ↓ 
 * Risk Score & Security Alert
 *   ↓ 
 * Commit to Local Scan History
 */

import { saveScan } from "../utils/historyStorage";

// Cache to prevent duplicate processing of the same message in rapid succession
const recentlyProcessed = new Map();
const DEDUPLICATION_WINDOW_MS = 15000; // 15 seconds

/**
 * Generates a simple hash/key for deduplication.
 * @param {string} msg 
 * @returns {string}
 */
function createMessageKey(msg) {
  return msg.trim().toLowerCase();
}

/**
 * Cleans expired entries from the deduplication cache.
 */
function cleanupRecentCache() {
  const now = Date.now();
  for (const [key, timestamp] of recentlyProcessed.entries()) {
    if (now - timestamp > DEDUPLICATION_WINDOW_MS) {
      recentlyProcessed.delete(key);
    }
  }
}

/**
 * Processes an incoming message through the PhishGuard AI backend.
 * 
 * @param {string} rawMessage The message content to evaluate.
 * @param {Object} options Optional configuration.
 * @param {boolean} options.preventDuplicates Whether to reject identical messages processed recently (default: true).
 * @param {boolean} options.autoSaveHistory Whether to save the result into scan history (default: true).
 * @returns {Promise<Object>} Structured result { success: boolean, data?: Object, error?: string, isDuplicate?: boolean }
 */
export async function processIncomingMessage(rawMessage, options = {}) {
  const { preventDuplicates = true, autoSaveHistory = true } = options;

  // 1. Validate non-empty message
  if (!rawMessage || typeof rawMessage !== "string" || !rawMessage.trim()) {
    return {
      success: false,
      error: "Please enter a message to analyze.",
    };
  }

  const trimmedMessage = rawMessage.trim();
  const messageKey = createMessageKey(trimmedMessage);

  // 2. Prevent duplicate processing if enabled
  if (preventDuplicates) {
    cleanupRecentCache();
    if (recentlyProcessed.has(messageKey)) {
      return {
        success: false,
        error: "This message was already processed a moment ago. Duplicate processing skipped.",
        isDuplicate: true,
      };
    }
  }

  // 3. Dispatch to Flask /predict API
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: trimmedMessage,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `PhishGuard backend responded with error status ${response.status}.`,
      };
    }

    const data = await response.json();

    // Mark as processed in the deduplication cache
    if (preventDuplicates) {
      recentlyProcessed.set(messageKey, Date.now());
    }

    // 4. Automatically persist into existing scan history if requested
    if (autoSaveHistory) {
      saveScan(data);
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error("Real-Time Detection Service Error:", err);
    return {
      success: false,
      error:
        "Unable to connect to PhishGuard AI backend. Please make sure the Flask server is running at http://127.0.0.1:5000.",
    };
  }
}
