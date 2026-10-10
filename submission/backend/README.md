# PhishGuard AI – Backend Service

## Overview

The PhishGuard AI backend is a lightweight, high-performance REST API built with **Python 3** and **Flask**. It hosts the trained Machine Learning classifier, deterministic URL analysis engine, and behavioral social engineering heuristic analyzers.

---

## Key Modules

- **`app.py`**: The central application file containing:
  - Flask web server initialization and CORS configuration.
  - Model and TF-IDF vectorizer deserialization via `joblib`.
  - `GET /`: Health check endpoint.
  - `POST /predict`: Comprehensive threat evaluation endpoint.
  - `extract_urls(text)`: Regular expression extractor for HTTP/HTTPS links and bare domain patterns.
  - `analyze_urls(urls)`: Heuristic classifier checking for IP-based links, known URL shortening services (`bit.ly`, `tinyurl.com`, `is.gd`, `t.co`, etc.), and suspicious TLDs.
  - `detect_social_engineering(text)`: Pattern matcher identifying 5 cognitive manipulation vectors (`urgency`, `fear_threat`, `account_verification`, `authority_impersonation`, `reward`).
  - `calculate_risk_score(...)`: Clamped 0–100 risk calculation engine.
  - `generate_explanation(...)` & `generate_recommendation(...)`: Natural language summary generators explaining why a message was flagged.
- **`train_model.py`**: Standalone training pipeline script that trains a `LogisticRegression` model on `dataset/SMSSpamCollection` using `TfidfVectorizer` and evaluates it on an 80/20 stratified split (achieving 97.58% test accuracy).
- **`requirements.txt`**: Pinned Python dependencies.

---

## Request & Response Format

### `POST /predict`

#### Request Payload
```json
{
  "message": "URGENT: Your account has been locked. Verify at http://bit.ly/secure"
}
```

#### Response Structure
```json
{
  "message": "URGENT: Your account has been locked. Verify at http://bit.ly/secure",
  "prediction": "spam",
  "label": "Phishing",
  "confidence": 0.7245,
  "risk_score": 100,
  "risk_level": "Critical Risk",
  "detected_urls": ["http://bit.ly/secure"],
  "url_analysis": {
    "has_url": true,
    "suspicious_url": true,
    "reasons": ["Uses a known URL shortening service (bit.ly) which hides the real destination"]
  },
  "social_engineering": {
    "urgency": true,
    "fear_threat": true,
    "reward": false,
    "account_verification": true,
    "authority_impersonation": false
  },
  "indicators": ["Urgency", "Fear/Threat", "Account Verification"],
  "explanation": "The message was flagged because it contains urgent language, uses fear or threats regarding account status, requests account verification or sensitive credentials, and includes a suspicious shortened or unverified URL.",
  "recommendation": "Do not click links, provide passwords, or share personal information."
}
```

---

## How to Start the Backend

1. Navigate to this directory:
   ```powershell
   cd backend
   ```

2. Activate virtual environment (or create one):
   ```powershell
   # If venv exists:
   & "venv\Scripts\Activate.ps1"
   
   # Or run directly:
   & "venv\Scripts\python.exe" app.py
   ```

3. Confirm backend is listening on:
   ```text
   http://127.0.0.1:5000
   ```
