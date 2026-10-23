/**
 * PhishGuard AI - API Configuration
 * 
 * Configures the base URL for PhishGuard AI backend services.
 * In development, defaults to local Flask server (http://127.0.0.1:5000).
 * In production (e.g. Vercel), can be overridden using VITE_API_BASE_URL.
 */

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

// Ensure no trailing slash for consistent endpoint concatenation
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  HEALTH: `${API_BASE_URL}/`,
};
