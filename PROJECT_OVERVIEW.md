# PhishGuard AI — Project Overview
**Final-Year Engineering Project Documentation**

---

## 1. Project Title
**PhishGuard AI: An Intelligent Multi-Layer SMS Phishing & Social Engineering Detection System**

---

## 2. Problem Statement
Mobile messaging (SMS, chat applications, and mobile alerts) has become a primary attack vector for cybercriminals conducting **Smishing (SMS Phishing)** and social engineering attacks. 

Traditional mobile security mechanisms suffer from severe limitations:
1. **Static Blacklists:** Ineffective against ephemeral, freshly registered domains, bulletproof hosting, and URL shortening services (`bit.ly`, `tinyurl.com`).
2. **Keyword Filtering:** High false-positive rates; easily bypassed through leetspeak, homoglyphs, or subtle rephrasing.
3. **Pure Machine Learning Classifiers:** Black-box models often lack transparency, cannot explain *why* a message was flagged, and fail to provide actionable defensive guidance to non-technical users.
4. **Mobile OS Sandbox Restrictions:** Web browsers cannot natively inspect incoming SMS broadcasts, leaving users unprotected during mobile message ingestion.

There is a critical need for a **hybrid, explainable, multi-layer defense engine** that combines statistical NLP inference, defensive URL heuristics, social engineering intent analysis, and transparent risk scoring, accessible via both an interactive security dashboard and an Android companion listener.

---

## 3. Proposed Solution
PhishGuard AI introduces a **defense-in-depth architecture** that evaluates incoming messages across three complementary layers:

1. **Natural Language Processing (NLP) & Machine Learning:** A TF-IDF vectorizer and balanced Logistic Regression classifier trained to detect statistical text patterns common in unsolicited and deceptive messages.
2. **Defensive URL Heuristic Engine:** A passive inspection layer that detects URL shorteners, suspicious Top-Level Domains (TLDs), IP-based hosts, and deceptive subdomain structures without resolving or visiting the target links.
3. **Rule-Based Social Engineering Detection:** A deterministic pattern matcher identifying five psychological manipulation vectors: *Urgency*, *Fear/Threat*, *Account Verification*, *Authority Impersonation*, and *Financial Rewards*.
4. **Composite Risk Scoring Engine:** Combines evidence from all three layers into a transparent `0–100` score mapped to five risk levels (*Safe*, *Low*, *Medium*, *High*, *Critical*).
5. **Explainable AI & Actionable Directives:** Generates plain-language detection rationales and explicit safety instructions (e.g., *"⚠️ Do not click suspicious links or provide passwords, OTPs, or financial information"*).
6. **Dual-Platform Ingestion:** A full-featured React web interface with real-time ingestion simulation, paired with a native Android companion listener foundation.

---

## 4. Project Objectives
- **High-Accuracy Detection:** Achieve >95% baseline classification accuracy while maintaining balanced precision and recall.
- **Explainable Cybersecurity:** Provide human-readable explanations rather than opaque numeric probabilities.
- **Passive Defensive URL Inspection:** Analyze links safely using regular expressions and heuristics without network resolution or privacy compromise.
- **Zero-Storage Privacy Architecture:** Ensure messages are analyzed transiently in memory without permanent cloud storage of personal messages.
- **Platform Separation & Honesty:** Acknowledge mobile OS security sandboxes while designing a realistic Android broadcast listener companion.
- **Auditable Security Operations:** Maintain a local, searchable audit trail of scans with dynamic dashboard analytics.

---

## 5. Key Features
- **8-Card Detailed Inspection Panel:**
  1. AI Model Verdict & Confidence Score
  2. Risk Score Visual Meter (0–100 scale)
  3. Risk Tier Badge (Safe, Low, Medium, High, Critical)
  4. Extracted URLs & Passive Target Breakdown
  5. URL Security Analysis (Shorteners, TLDs, IP hosts)
  6. Social Engineering Checklist (5 manipulation vectors)
  7. Plain-Language Detection Rationale
  8. Actionable Security Recommendations
- **Real-Time Security Alert:** High-visibility heads-up warning banner with danger glow for high/critical threats.
- **Duplicate Prevention Cache:** In-memory 15-second deduplication window preventing duplicate processing and alert fatigue.
- **Local Audit Trail:** Client-side persistence (`localStorage` on web, `SharedPreferences` on Android) without external database dependencies.
- **Security Operations Dashboard:** Live analytics tracking scan volume, threat distribution, risk level averages, and quick scan triggers.
- **Android Companion Listener:** Dedicated Android module featuring `SmsReceiver`, `NotificationChannel` alerts, and configurable backend bridge.

---

## 6. Technologies Used

### Frontend (Web Application)
- **Framework:** React 19 (Vite build tool)
- **Routing:** React Router DOM v7
- **Styling:** Vanilla CSS (Custom design system with cybersecurity dark palette, responsive flex/grid layouts, micro-animations)
- **State & Storage:** React Hooks (`useState`, `useEffect`), Web `localStorage` API

### Backend (REST API & AI Engine)
- **Language & Runtime:** Python 3.13
- **Web Framework:** Flask 3.1, Flask-CORS
- **Machine Learning & NLP:** scikit-learn (`TfidfVectorizer`, `LogisticRegression`), joblib
- **Data Manipulation:** pandas, numpy
- **Pattern Matching:** Python standard library `re`, `urllib.parse`

### Android Companion Module
- **Platform:** Android 8.0+ (API 26 to API 34)
- **Language:** Java 8 / 17
- **Architecture:** Android BroadcastReceiver + Background Service Coordinator
- **Networking:** OkHttp 4.12.0, Google Gson 2.10.1
- **UI Components:** AndroidX AppCompat, Material Design Components 1.11.0, RecyclerView, CardView

---

## 7. System Architecture Summary

```
                  [ USER / CLIENT INTERFACES ]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
    [ React Web App ]                   [ Android Companion ]
    - Manual Scan Input                 - SmsReceiver (SMS_RECEIVED)
    - Real-Time Simulation              - DuplicateFilter (15s cache)
    - Local Audit Trail                 - SecurityAlertManager
    - Analytics Dashboard               - Background HTTP Bridge
            │                                     │
            └──────────────────┬──────────────────┘
                               │ HTTP POST /predict
                               ▼
                 [ FLASK REST API (app.py) ]
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
  [ ML Engine ]       [ URL Heuristics ]    [ Social Engineering ]
  - Clean Text        - Shorteners          - Urgency Patterns
  - TF-IDF (1,2-gram) - Suspicious TLDs     - Fear/Threat Patterns
  - Logistic Reg.     - IP Host Parsing     - Account Verification
  - Probability       - Passive Checks      - Authority/Reward
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
               [ COMPOSITE RISK SCORE ENGINE ]
              (0–100 Bounded Scoring Algorithm)
                               │
                               ▼
               [ EXPLANATION & ADVICE ENGINE ]
                               │
                               ▼
               [ STRUCTURED JSON API RESPONSE ]
```

---

## 8. Real-Time Detection Architecture

### Web Browser Reality vs. Platform Listener
A critical architectural principle of PhishGuard AI is **technical honesty**:
- Standard web browsers run inside a sandboxed security model that strictly prohibits web pages from intercepting incoming SMS, phone calls, or OS notifications.
- The web application provides an **Automated Ingestion Simulation** exercising the exact same processing pipeline.
- The **Android Companion App** acts as the authentic platform listener utilizing `android.provider.Telephony.SMS_RECEIVED`.

---

## 9. Project Limitations
1. **Baseline Dataset Scope:** The underlying ML model was trained on the UCI SMS Spam Collection (5,572 messages). While effective for general unsolicited and deceptive messaging, it is an SMS spam/legitimate baseline rather than a dedicated modern banking smishing corpus.
2. **Passive Heuristics:** The system deliberately avoids resolving URLs or executing DNS lookups to protect user privacy and prevent trigger callbacks to attackers. Consequently, newly registered non-shortened domains might evade heuristic rules.
3. **Local Development Host:** The default Flask deployment runs on `127.0.0.1:5000` (or `10.0.2.2:5000` in Android emulator). Production readiness requires a reverse proxy (Nginx), WSGI server (Gunicorn), and TLS/HTTPS encryption.

---

## 10. Future Enhancements
- **Transformer/BERT Integration:** Evaluate lightweight distilled transformers (e.g., DistilBERT or MobileBERT) for contextual semantic understanding.
- **Multilingual Smishing Defense:** Expand regex patterns and training data to detect phishing in regional languages (Hindi, Spanish, French).
- **On-Device Mobile Inference:** Convert the trained model to TensorFlow Lite (TFLite) or ONNX Runtime for offline, zero-network classification directly on Android devices.
- **Threat Intelligence Feeds:** Integrate privacy-preserving, local bloom filter lookups of known malicious domain feeds (e.g., OpenPhish, PhishTank).
