# PhishGuard AI – Real-Time Phishing Message Detection System

## Project Description

**PhishGuard AI** is a defense-in-depth cybersecurity platform engineered to protect users from SMS phishing (smishing) attacks in real time. The system combines statistical machine learning with deterministic URL analysis and behavioral social engineering heuristics to deliver fast, explainable, and multi-layered threat detection. It provides an explainable **0 to 100 Risk Score**, categorizes threats into four risk tiers (Low, Medium, High, Critical), highlights exact attack indicators, and gives actionable security recommendations to safeguard users from malicious lures.

---

## Main Features

1. **Hybrid Threat Detection Engine:** Combines TF-IDF feature extraction and Logistic Regression classification with parallel deterministic heuristic analyzers for URL obfuscation and psychological manipulation.
2. **Explainable 0–100 Risk Score:** Clamped composite scoring with four severity tiers:
   - `0 – 29`: Low Risk (Safe)
   - `30 – 59`: Medium Risk (Caution)
   - `60 – 79`: High Risk (Warning)
   - `80 – 100`: Critical Risk (Severe Threat)
3. **Deterministic URL Analysis:** Extracts URLs, detects IP-based links, flags URL shortening services (e.g., bit.ly, tinyurl), and detects suspicious top-level domains without requiring external network lookups.
4. **Behavioral Social Engineering Detection:** Identifies 5 cognitive exploitation vectors:
   - *Urgency* (artificial time pressure)
   - *Fear / Threat* (account closure or penalties)
   - *Account Verification* (credential harvesting lures)
   - *Authority / Impersonation* (fake banks, postal services, or agencies)
   - *Reward / Financial Lures* (fake lotteries or cash prizes)
5. **Interactive Web Application:** Built with React 19 and Vite, featuring Manual Scan, Real-Time Message Stream Simulation, Threat Preset Library, and Floating Alert Modals.
6. **Persistent Audit History & Telemetry Dashboard:** All scans are permanently logged to browser storage with search, risk filters, and live aggregated security telemetry.
7. **Android Mobile Companion Foundation:** Native Android architecture utilizing `SMS_RECEIVED` system broadcasts, background inspection services, and high-priority device notifications.

---

## Technology Stack

- **Frontend:** React 19, Vite, Vanilla CSS Design System, Lucide React icons, React Router DOM
- **Backend:** Python 3.9+, Flask, Flask-CORS
- **Machine Learning:** scikit-learn (`LogisticRegression`), `TfidfVectorizer`, joblib
- **Mobile Module:** Native Android (Java), AndroidX, BroadcastReceiver architecture
- **Data Persistence:** LocalStorage API for client-side audit trails and telemetry aggregates

---

## Project Structure

```text
PhishGuard_AI/
│
├── README.md                   # Main project overview and setup guide
│
├── frontend/                   # React 19 Single Page Application
│   ├── src/                    # Source components, pages, services, utilities
│   ├── index.html              # HTML entry point
│   ├── package.json            # Node.js dependencies
│   └── vite.config.js          # Vite bundler configuration
│
├── backend/                    # Python Flask REST API
│   ├── app.py                  # API routes (/ and /predict), risk engine, heuristics
│   ├── train_model.py          # ML training and evaluation pipeline
│   ├── requirements.txt        # Python package requirements
│   ├── model/                  # Serialized ML model and TF-IDF vectorizer
│   └── dataset/                # UCI SMS Spam Collection benchmark dataset
│
├── dataset/                    # Benchmark training corpus copy
│   └── SMSSpamCollection
│
├── model/                      # Serialized ML artifacts copy
│   ├── phishing_model.pkl
│   └── tfidf_vectorizer.pkl
│
├── android/                    # Android companion module source foundation
│   ├── app/src/main/           # AndroidManifest.xml, Java sources, resources
│   └── build.gradle            # Gradle build scripts
│
├── documentation/              # Complete university project documentation suite
│   ├── FINAL_PROJECT_REPORT.md
│   ├── PROJECT_ABSTRACT.md
│   ├── ACKNOWLEDGEMENT.md
│   ├── FINAL_PRESENTATION.md
│   ├── FINAL_VIVA_QUESTIONS.md
│   ├── FINAL_RUN_GUIDE.md
│   ├── API_DOCUMENTATION.md
│   └── ...
│
└── demo/                       # Live demonstration assets and scripts
    ├── demo_messages.json
    ├── FINAL_5_MINUTE_DEMO_CHECKLIST.md
    └── FINAL_LIVE_DEMO_SCRIPT.md
```

---

## Requirements

- **Node.js:** v18.0.0 or later (npm included)
- **Python:** Python 3.9 to 3.12 with `venv`
- **Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox
- **OS:** Windows 10/11, macOS, or Linux

---

## Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```powershell
   cd "backend"
   ```

2. If creating a new virtual environment:
   ```powershell
   python -m venv venv
   & "venv\Scripts\Activate.ps1"
   pip install -r requirements.txt
   ```

3. Start the Flask backend server:
   ```powershell
   & "venv\Scripts\python.exe" app.py
   ```
   *(Server starts on `http://127.0.0.1:5000`)*.

---

## Frontend Setup

1. Open a second terminal window and navigate to the `frontend` directory:
   ```powershell
   cd "frontend"
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   npm run dev
   ```
   *(Access the web app at `http://localhost:5173/`)*.

---

## Build

To validate or create a production-ready client bundle:
```powershell
npm run build
```
*(Outputs optimized, minified assets to the `dist/` directory)*.

---

## API

### `GET /`
Health check endpoint. Returns:
```json
{
  "service": "PhishGuard AI API",
  "status": "online"
}
```

### `POST /predict`
Analyzes an SMS message for phishing indicators and risk scoring.

**Request Payload:**
```json
{
  "message": "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"
}
```

**Response Structure:**
```json
{
  "confidence": 0.6864,
  "detected_urls": [
    "http://bit.ly/example"
  ],
  "explanation": "The message was flagged because it contains urgent language, uses fear or threats regarding account status, requests account verification or sensitive credentials, impersonates a trusted entity or authority, and includes a suspicious shortened or unverified URL.",
  "indicators": [
    "Urgency",
    "Fear/Threat",
    "Account Verification",
    "Authority/Impersonation"
  ],
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
    "reasons": [
      "Uses a known URL shortening service (bit.ly) which hides the real destination"
    ],
    "suspicious_url": true
  }
}
```

---

## ML Information

- **Dataset:** UCI SMS Spam Collection
- **Messages:** 5,572 (4,825 Ham, 747 Spam)
- **Train/Test Split:** 80/20 Stratified Split (4,457 train / 1,115 test)
- **Model:** Logistic Regression (`scikit-learn`)
- **Features:** TF-IDF Vectorizer (`TfidfVectorizer`)
- **Baseline Test Accuracy:** **97.58% test accuracy on the UCI SMS Spam Collection baseline.**

> [!NOTE]
> The 97.58% figure is strictly the baseline test accuracy on the UCI SMS Spam Collection benchmark. It is not claimed as a dedicated phishing-only accuracy rate because the training corpus represents general SMS spam. Dedicated phishing detection is achieved through the integration of our URL and social engineering heuristic engines.

---

## Real-Time Feature

The web application's **Real-Time Stream** tab provides an interactive **simulation of incoming mobile messages**. It demonstrates how an automated background monitoring agent ingests incoming message payloads, dispatches them to the `/predict` API, computes risk scores, displays high-priority floating alerts, and logs events to history.

*Note:* Standard web browsers operate within a security sandbox and cannot directly intercept phone SMS messages. Direct SMS interception requires the native Android companion module.

---

## Android

The `android/` directory contains the source-level foundation for an Android companion application:
- **`SmsReceiver.java`**: Listens for the `android.provider.Telephony.SMS_RECEIVED` system broadcast.
- **`DetectionService.java`**: Extracts SMS body and sender, invokes the detection client asynchronously.
- **`PhishGuardApiClient.java`**: Transmits message payloads to the Flask API endpoint (`http://10.0.2.2:5000/predict`).
- **`SecurityAlertManager.java`**: Dispatches high-priority Android notifications with warning badges and actionable security advice.
- **`DuplicateFilter.java`**: In-memory cache preventing duplicate analysis of multi-part SMS messages.

*Status:* Source-level foundation inspected and verified; end-to-end Android device validation was not performed due to local environment constraints (missing Android SDK/emulator).

---

## Limitations

1. **Benchmark Domain:** The baseline ML classifier was trained on the UCI SMS Spam Collection (5,572 messages). While it captures general spam patterns, specialized smishing lures rely heavily on the secondary heuristic layers.
2. **Deterministic Heuristics:** Regex-based patterns capture defined keywords and shortener domains, but may not recognize heavily obfuscated text (e.g., leetspeak) or unlisted zero-day link shorteners.
3. **No External Threat Intelligence:** To preserve offline usability and near-zero latency, the system does not perform external live WHOIS queries, DNS lookups, or third-party reputation lookups.
4. **Android Device Execution:** The Android module is structured as an architectural proof-of-concept; live device deployment was not verified.

---

## Future Scope

1. **Transformer Language Models:** Fine-tuning compact transformer models (e.g., DistilBERT or MobileBERT) for contextual semantic understanding.
2. **External Threat Feeds:** Integrating Google Safe Browsing and PhishTank APIs via asynchronous backend workers.
3. **Full Native Mobile App:** Completing Android Google Play deployment and iOS companion application with local on-device ONNX/TFLite inference.
4. **Enterprise Telemetry:** Centralized cloud dashboard with SIEM integration for organizational mobile threat intelligence.
