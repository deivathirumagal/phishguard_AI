# PhishGuard AI — Real-Time Phishing Message Detection System

**PhishGuard AI** is an intelligent, multi-layered cyber defense system designed to evaluate incoming mobile and web messages passively, accurately, and explainably. The system combines statistical Machine Learning (TF-IDF vectorization and Logistic Regression) with parallel deterministic heuristic layers (defensive URL analysis and behavioral social engineering detection) to protect users from SMS phishing (smishing) and social engineering threats.

---

## Key Features

1. **Multi-Layer Hybrid Defense:** Combines statistical ML probability with parallel deterministic heuristics for URL link obfuscation and behavioral social engineering triggers.
2. **Executive Verdict Summary:** Displays the 5 most critical answers (Classification, Risk Score, Risk Level, Reason, Recommended Action) prominently at the top of the evaluation report.
3. **8 Detailed Inspection Cards:** Deep technical breakdown covering AI detection, 4-tier visual risk meter, model confidence, phishing indicators, URL heuristics, social engineering checklist, explanation, and recommendation.
4. **Faculty Demo Mode:** Five built-in demonstration presets (Legitimate, Banking Phishing, Delivery Scam, Reward Scam, Safe Meeting) routing directly through the actual `/predict` backend.
5. **Defensive, Passive URL Heuristics:** Zero-resolution link inspection checking for known shorteners (`bit.ly`, `tinyurl`), raw IP hosts, suspicious TLDs, and excessive subdomains without connecting to external web servers.
6. **Social Engineering Rule Engine:** Pattern-matching detection across five psychological categories: Urgency, Fear/Threat, Account Verification, Authority Impersonation, and Reward Baiting.
7. **Security Alert Banner:** High-visibility pulsing red alert banner triggered on Phishing or High/Critical risk scores, suppressed for clean, low-risk messages.
8. **Real-Time Web Simulation:** Interactive demonstration of automated stream ingestion with a 15-second deduplication cache.
9. **Persistent Local Audit History:** HTML5 `localStorage` audit trail with real-time text search, category filtering (All, Phishing, Suspicious, Legitimate), and 1-click scan reloading.
10. **Live Dashboard Telemetry:** Computes dynamic threat distribution metrics and recent scan feeds directly from actual scans.
11. **Android Companion Foundation:** Native Android broadcast receiver architecture inspecting `SMS_RECEIVED` to forward incoming messages to the backend API.

---

## System Architecture

```text
Incoming Message
       ↓
Client Layer (React Web / Android Companion)
       ↓  HTTP POST /predict
Flask REST API (JSON Validation)
       ↓
Text Preprocessing (Normalization & ASCII Cleaning)
       ↓
TF-IDF Feature Extraction  +  URL Analysis  +  Social Engineering
       ↓                            ↓                   ↓
Logistic Regression (ML)            +-------------------+
       ↓                                    ↓
       +------------------------------------+
                         ↓
               Risk Scoring Engine (0–100)
                         ↓
               Explainability Engine
                         ↓
               Security Alert System
                         ↓
               Local Audit Trail & Dashboard
```

---

## Technology Stack

- **Frontend:** React 19, Vite v8.2.1, React Router DOM v7, Custom Vanilla CSS
- **Backend:** Python 3.13, Flask 3.1, Flask-CORS 5.0, Joblib 1.4
- **Machine Learning:** scikit-learn (`TfidfVectorizer`, `LogisticRegression`)
- **Data Persistence:** Client-side HTML5 `localStorage` (max cap 100 entries)
- **Mobile Companion:** Android (SDK 26–34, Java/Kotlin, OkHttp 4.12, Gson 2.10)

---

## Dataset & Model Performance

- **Dataset:** UCI Machine Learning Repository — SMS Spam Collection
- **Total Corpus Size:** 5,572 authentic SMS messages (4,825 legitimate ham, 747 spam)
- **Data Split:** 80% Training (4,457 messages) / 20% Testing (1,115 messages) stratified split
- **Baseline Test Accuracy:** **97.58% test accuracy on the UCI SMS Spam Collection baseline**
- **Evaluation Metrics on 1,115 Test Samples:**
  - Legitimate (`ham`): Precision `0.99`, Recall `0.98`, F1-Score `0.99`
  - Spam (`spam`): Precision `0.90`, Recall `0.92`, F1-Score `0.91`
  - Confusion Matrix: 951 True Negatives, 137 True Positives, 15 False Positives, 12 False Negatives

> **Important Academic Distinction:**  
> The 97.58% figure is the test accuracy on the general UCI SMS Spam Collection benchmark. It is not claimed as a dedicated phishing detection accuracy rate. Dedicated phishing protection is provided by the integration of our URL and social engineering heuristic engines.

---

## Quick Start & Execution

### 1. Start the Flask Backend:
Open PowerShell Terminal 1:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
& "venv\Scripts\python.exe" app.py
```
*Backend runs locally at: `http://127.0.0.1:5000/`*

### 2. Start the React Frontend:
Open PowerShell Terminal 2:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
npm run dev
```
*Frontend runs locally at: `http://localhost:5173/`*

---

## API Specification

### Endpoint: `POST /predict`
- **URL:** `http://127.0.0.1:5000/predict`
- **Headers:** `Content-Type: application/json`

#### Example Request:
```json
{
  "message": "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"
}
```

#### Example Response:
```json
{
  "confidence": 0.6864,
  "detected_urls": ["http://bit.ly/example"],
  "explanation": "The message was flagged because it contains urgent language, uses fear or threats regarding account status, requests account verification or sensitive credentials, impersonates a trusted entity or authority, and includes a suspicious shortened or unverified URL.",
  "indicators": ["Urgency", "Fear/Threat", "Account Verification", "Authority/Impersonation"],
  "label": "Phishing",
  "message": "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example",
  "prediction": "spam",
  "recommendation": "Do not click links, provide passwords, or share personal information.",
  "risk_level": "Critical Risk",
  "risk_score": 100,
  "social_engineering": {
    "account_verification": true,
    "authority_impersonation": true,
    "fear_threat": true,
    "reward": false,
    "urgency": true
  },
  "url_analysis": {
    "has_url": true,
    "reasons": ["Uses a known URL shortening service (bit.ly) which hides the real destination"],
    "suspicious_url": true
  }
}
```

---

## Real-Time Demo Instructions

1. Navigate to `http://localhost:5173/scan`.
2. Click the **"⚡ Real-Time Demo (Simulation)"** tab.
3. Select any simulation scenario (e.g., *"🚨 Banking Smishing"*, *"📦 Delivery Scam"*, or *"✓ Safe Meeting SMS"*).
4. Click **"⚡ Simulate Incoming Message"**.
5. The ingestion service automatically checks for duplicate messages within a 15-second window, dispatches the text to `POST /predict`, updates the evaluation report, and commits the result to history.

---

## Android Companion Setup Overview

The Android companion application source code is located under `phish guard/android/`.
- **Core Components:**
  - `SmsReceiver.kt`: Intercepts `android.provider.Telephony.SMS_RECEIVED`.
  - `DetectionService.kt`: Background worker executing asynchronous calls to the Flask API.
  - `NetworkConfig.java`: Configured for emulator loopback (`http://10.0.2.2:5000`).
- **Permissions:** `RECEIVE_SMS`, `INTERNET`, `POST_NOTIFICATIONS`.
- **Status Statement:**
  > *"Android SMS detection foundation has been implemented. Full end-to-end SMS interception and device validation require an Android Studio/SDK/device environment and should only be marked complete after successful testing."*

---

## Limitations

1. **Baseline Training Scope:** Trained on general SMS spam rather than exclusively modern smishing campaigns.
2. **False Positives/Negatives:** Promotional messages with urgency phrasing may receive elevated risk scores; novel zero-day phrasing with benign words may produce lower ML confidence.
3. **Static URL Heuristics:** Zero-resolution URL analysis cannot detect dynamic server-side redirects on unflagged domains without live network lookups.
4. **Platform Sandbox:** Web browsers cannot directly intercept mobile phone SMS; real-time web detection is limited to simulation.
5. **Linguistic Scope:** Text vectorization and keyword pattern dictionaries are currently optimized for English messages.

---

## Future Scope

1. Retrain on contemporary mobile smishing datasets incorporating multilingual messages.
2. Fine-tune lightweight transformer architectures (DistilBERT, MobileBERT) for deeper contextual semantics.
3. Integrate asynchronous live threat intelligence feeds (Google Safe Browsing, PhishTank, URLhaus) with local caching.
4. Quantize the model into TensorFlow Lite / ONNX Runtime for 100% offline on-device mobile classification.
5. Package the companion Android application for production distribution on the Google Play Store.
