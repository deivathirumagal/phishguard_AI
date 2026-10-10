# PhishGuard AI — System Architecture
**Technical Specification & Architecture Design Document**

---

## 1. Architectural Overview
PhishGuard AI employs a decoupled, multi-tiered client-server architecture designed to separate message ingestion from defensive intelligence. The system consists of three primary subsystems:

1. **Frontend Presentation & Security Operations Subsystem:** A modern React Single Page Application (SPA) offering manual analysis, automated simulation, historical audit trails, and analytics.
2. **Backend Defense & Inference Subsystem:** A stateless Python Flask REST service encapsulating statistical machine learning, defensive URL parsing, social engineering pattern matching, and composite risk scoring.
3. **Android Mobile Companion Subsystem:** A native Android application leveraging OS-level telephony broadcast receivers to monitor and protect against inbound SMS phishing attacks.

---

## 2. Core Detection & Analysis Pipeline

The end-to-end processing pipeline executes synchronously upon message ingestion:

```
[ Incoming Raw Message ]
            │
            ▼
┌───────────────────────────────────────────────┐
│ 1. Message Ingestion & Validation             │
│ - Validate non-empty string                   │
│ - Check 15-second deduplication cache         │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 2. Text Preprocessing & Cleaning              │
│ - Lowercase conversion                        │
│ - Whitespace normalization                    │
│ - Stripping leading/trailing padding          │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 3. Natural Language Processing (TF-IDF)       │
│ - Tokenization & stop word removal            │
│ - Extraction of unigrams & bigrams (1, 2)     │
│ - Vectorization into 5,000-dimensional space  │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 4. Machine Learning Inference                 │
│ - Logistic Regression with balanced weights   │
│ - Probability estimation (Sigmoid activation) │
│ - Preliminary prediction: 'ham' or 'spam'     │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. Parallel Heuristic Inspections                            │
│ ┌─────────────────────────────┬────────────────────────────┐ │
│ │ URL Heuristic Engine        │ Social Engineering Engine  │ │
│ │ - Regex URL extraction      │ - Urgency language         │ │
│ │ - Shortener domain lookup   │ - Fear & threat patterns   │ │
│ │ - Suspicious TLD evaluation │ - Account verification     │ │
│ │ - IP-based host detection   │ - Authority impersonation  │ │
│ │                             │ - Reward & prize bait      │ │
│ └─────────────────────────────┴────────────────────────────┘ │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 6. Transparent Risk Scoring Engine            │
│ - Base score from ML confidence               │
│ - Additive penalties for URL anomalies       │
│ - Additive penalties for social engineering   │
│ - Bounding to [0, 100] integer scale          │
│ - Mapping to Risk Levels (Safe, Low, Med, High, Crit)│
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 7. Multi-Evidence Classification Verdict      │
│ - Final Label: 'Legitimate', 'Suspicious',    │
│   or 'Phishing'                               │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 8. Plain-Language Explanation & Directives    │
│ - Natural language synthesis of flagged traits│
│ - Actionable security guidance                │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 9. Security Alert & Audit Trail Update        │
│ - If Threat: Display prominent RealTimeAlert  │
│ - Commit record to client-side audit history  │
│ - Refresh Dashboard metrics in real time      │
└───────────────────────────────────────────────┘
```

---

## 3. Android Companion Architecture

Because web browsers cannot intercept mobile OS broadcasts, the Android companion serves as the dedicated mobile listener:

```
[ Inbound Cellular SMS ]
            │
            ▼
┌───────────────────────────────────────────────┐
│ 1. Android Telephony Subsystem                │
│ - Broadcasts android.provider.Telephony       │
│   .SMS_RECEIVED intent                        │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 2. SmsReceiver.java                           │
│ - Intercepts broadcast (Priority 999)         │
│ - Verifies user protection toggle is active   │
│ - Reassembles multi-part PDU segments         │
│ - Extracts sender originating address         │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 3. DuplicateFilter.java                       │
│ - Checks memory cache for identical text      │
│ - Enforces 15-second deduplication window     │
│ - Prevents duplicate network & alert spam     │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 4. DetectionService.java & ApiClient          │
│ - Serializes payload: {"message": "..."}      │
│ - Dispatches async HTTP POST to /predict      │
│ - Configured for 10.0.2.2:5000 (Emulator)     │
│   or LAN IP (Physical Device)                 │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 5. Flask AI Engine Processing                 │
│ - Performs ML inference, URL checks, SE rules │
│ - Returns structured JSON response            │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│ 6. SecurityAlertManager.java                  │
│ - Evaluates: isPhishingThreat()?              │
│ - IF THREAT:                                  │
│   • Creates NotificationChannel (HIGH IMP)    │
│   • Posts Heads-Up Notification               │
│   • Displays Risk Score & Safety Directive    │
│   • Updates In-App Alert Card                 │
│ - IF LEGITIMATE:                              │
│   • Suppresses notification                   │
│   • Appends to Recent Scans with Safe Badge   │
└───────────────────────────────────────────────┘
```

---

## 4. Subsystem Data Flow & Network Topology

### A. Local Development Environment
- **React Web App:** Running on `http://localhost:5173` (Vite dev server). Communicates directly with `http://127.0.0.1:5000` via browser `fetch()`.
- **Flask REST API:** Running on `http://127.0.0.1:5000` (Python Flask dev server). CORS enabled via `flask_cors`.
- **Android Emulator:** Runs on virtual network. Communicates with the host development machine via `http://10.0.2.2:5000`.
- **Physical Android Phone:** Runs on same local Wi-Fi. Communicates with PC's local LAN IP (e.g., `http://192.168.1.150:5000`).

### B. Network Security Configuration
Android 9.0+ (API 28+) strictly blocks unencrypted HTTP traffic by default. The companion application incorporates [`network_security_config.xml`](file:///c:/Users/hp/OneDrive/Desktop/project/phish%20guard/android/app/src/main/res/xml/network_security_config.xml):
```xml
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">127.0.0.1</domain>
    </domain-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

---

## 5. Data Contract Specifications

### Request Schema (`POST /predict`)
```json
{
  "message": "URGENT! Your bank account has been suspended. Verify immediately at http://bit.ly/example"
}
```

### Response Schema (`POST /predict`)
```json
{
  "message": "URGENT! Your bank account has been suspended. Verify immediately at http://bit.ly/example",
  "prediction": "spam",
  "label": "Phishing",
  "confidence": 0.6864,
  "risk_score": 100,
  "risk_level": "Critical Risk",
  "indicators": [
    "Urgency",
    "Fear/Threat",
    "Account Verification",
    "Authority/Impersonation"
  ],
  "detected_urls": [
    "http://bit.ly/example"
  ],
  "url_analysis": {
    "has_url": true,
    "suspicious_url": true,
    "reasons": [
      "Uses a known URL shortening service (bit.ly) which hides the real destination"
    ]
  },
  "social_engineering": {
    "urgency": true,
    "fear_threat": true,
    "account_verification": true,
    "authority_impersonation": true,
    "reward": false
  },
  "explanation": "The message was flagged because it contains urgent language, uses fear or threats regarding account status, requests account verification or sensitive credentials, impersonates a trusted entity or authority, and includes a suspicious shortened or unverified URL.",
  "recommendation": "Do not click links, provide passwords, or share personal information."
}
```
