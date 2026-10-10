# PhishGuard AI — Final Project Summary

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Category:** Cyber Security / Applied Machine Learning / Mobile Security  
**Academic Milestone:** Final-Year Engineering Capstone Project  
**Repository Path:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  

---

## 1. Executive Summary / Abstract
With the rapid proliferation of mobile banking, digital payments, and multi-factor authentication, SMS phishing—commonly known as **smishing**—has emerged as one of the most critical threats targeting end users. Traditional security solutions, including basic spam filters and static blacklists, often fail against short, carefully crafted messages that leverage cognitive manipulation (urgency, fear, curiosity) alongside deceptive link obfuscation (URL shorteners, raw IP hosts).

**PhishGuard AI** is an intelligent, multi-layered cyber defense system designed to evaluate incoming mobile and web messages passively, accurately, and explainably. The system integrates a statistical Machine Learning baseline (TF-IDF vectorization and Logistic Regression) with parallel deterministic heuristic layers (defensive URL analysis and behavioral social engineering detection). Rather than operating as an uninterpretable black box, PhishGuard AI synthesizes all analytical signals into an intuitive 0–100 risk score and 4-tier threat classification, accompanied by clear human-readable explanations and actionable security recommendations. The platform features a responsive React web interface with real-time simulation capabilities, persistent local audit history, live telemetry dashboards, and an Android companion architecture foundation for native mobile SMS interception.

---

## 2. Problem Statement
1. **The Human Vulnerability Factor:** Attackers weaponize psychological triggers—such as account suspension threats, urgent deadlines, and fake lottery rewards—that prompt immediate action before users can exercise skepticism.
2. **Evasion of Traditional Spam Filters:** Modern smishing messages are concise and closely mimic authentic transactional notifications from banks or courier services, bypassing naive bag-of-words spam filters.
3. **Link Obfuscation Tactics:** Attackers routinely utilize URL shortening services (e.g., `bit.ly`, `tinyurl`) and suspicious top-level domains (e.g., `.xyz`, `.top`) to conceal the true destination of malicious links.
4. **Lack of Explainability:** Conventional security tools rarely explain *why* a message was flagged or advise users on *how* to respond safely, leaving non-technical users confused.

---

## 3. Project Objectives
- **Multi-Layer Message Inspection:** Develop an automated system capable of analyzing unstructured text from SMS, chat, or email.
- **Machine Learning Classification:** Train and deploy a baseline statistical classifier to estimate spam vs. ham probability with high precision and low latency.
- **Defensive, Passive URL Analysis:** Inspect embedded URLs statically for shorteners, raw IP hosts, and anomalous structures without resolving or connecting to target servers.
- **Social Engineering Detection:** Compile and evaluate behavioral patterns covering urgency, fear, account verification, authority impersonation, and reward lures.
- **Composite Risk Scoring Engine:** Combine ML confidence, heuristic penalties, and synergy bonuses into a calibrated 0–100 risk score.
- **Explainable Output & Actionable Guidance:** Deliver transparent rationales and practical safety directives tailored to the threat tier.
- **Real-Time Architecture Foundation:** Build an interactive real-time simulation on the web and establish the native Android companion listener foundation using `SMS_RECEIVED`.

---

## 4. Technology Stack (Actual Present Technologies)

### Frontend Layer:
- **Framework:** React 19 (React Router DOM v7)
- **Build Tool:** Vite v8.2.1 / Rolldown
- **Styling:** Custom Vanilla CSS (Dark mode cyber aesthetics, zero external CSS frameworks)
- **Language:** JavaScript (ES6+)

### Backend Layer:
- **Runtime:** Python 3.13
- **Web Framework:** Flask 3.1
- **CORS Handling:** Flask-CORS
- **Serialization:** Joblib

### Machine Learning & NLP:
- **Library:** scikit-learn
- **Feature Extractor:** `TfidfVectorizer` (n-gram word weighting)
- **Classifier:** `LogisticRegression` (L2 regularization, calibrated `predict_proba`)

### Data Persistence:
- **Client Storage:** HTML5 `localStorage` (max cap 100 entries, zero remote database tracking for user privacy)

### Mobile Companion Foundation:
- **Platform:** Android (Min SDK 26, Target SDK 34)
- **Languages:** Java / Kotlin foundation
- **Networking:** OkHttp / Gson
- **Telephony API:** `android.provider.Telephony.SMS_RECEIVED` BroadcastReceiver

---

## 5. Dataset & ML Baseline

### Training Corpus:
- **Dataset:** UCI Machine Learning Repository — SMS Spam Collection
- **Total Corpus Size:** 5,572 authentic SMS messages
  - **Legitimate (Ham):** 4,825 messages (~86.6%)
  - **Spam:** 747 messages (~13.4%)
- **Data Split:** 80% Training (4,457 messages) / 20% Testing (1,115 messages) with stratified sampling.

### Verified Baseline Performance:
- **Overall Baseline Test Accuracy:** **97.58%** on 1,115 held-out test messages.
- **Legitimate (Ham) Class:** Precision `0.99`, Recall `0.98`, F1-Score `0.99`
- **Spam Class:** Precision `0.90`, Recall `0.92`, F1-Score `0.91`
- **Confusion Matrix:** 951 True Negatives, 137 True Positives, 15 False Positives, 12 False Negatives.

> **Academic Accuracy Statement:**  
> The 97.58% figure is strictly the baseline test accuracy on the general UCI SMS Spam Collection dataset. It is not claimed as a dedicated phishing detection accuracy rate. Dedicated phishing protection is provided by the integration of our URL and social engineering heuristic engines.

---

## 6. System Architecture

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

## 7. Key Features & Modules

1. **Executive Verdict Summary:** Displays the 5 most critical answers (Classification, Risk Score, Risk Level, Reason, Recommended Action) prominently at the top of the evaluation report.
2. **8 Delineated Inspection Cards:** AI Detection, 4-tier visual risk meter, model confidence, phishing indicators, URL heuristic analysis, social engineering checklist, explanation, and recommendation.
3. **Faculty Demo Mode:** Five built-in demonstration presets (Legitimate, Banking Phishing, Delivery Scam, Reward Scam, Safe Meeting) that route through the actual `/predict` backend.
4. **Defensive URL Heuristics:** Zero-resolution link inspection checking for known shorteners (`bit.ly`, `tinyurl`), raw IP hosts, suspicious TLDs, and excessive subdomains.
5. **Social Engineering Rule Engine:** Real-time detection across five psychological categories: Urgency, Fear/Threat, Account Verification, Authority Impersonation, and Reward Lures.
6. **Security Alert Banner:** High-visibility pulsing red alert banner triggered on Phishing or High/Critical risk scores, suppressed for safe messages.
7. **Security Dashboard:** Live telemetry aggregating total scans, threat counts, and visual threat distribution percentages directly from actual scans.
8. **Scan History & Audit Trail:** LocalStorage-backed audit log with real-time text search, category filters, and 1-click scan reloading.
9. **Real-Time Simulation Tab:** Interactive demonstration of automated stream ingestion with a 15-second deduplication cache.
10. **Android Companion Foundation:** Native Android broadcast receiver inspecting `SMS_RECEIVED` to forward incoming messages to the backend API.

---

## 8. Testing & Validation Results

- **Backend & API Validation:** All 6 backend test cases passed, including health checks, legitimate personal messages, banking phishing, delivery scams, safe notices, and empty payload error handling.
- **Frontend Build Validation:** Vite production build compiles in under 300ms with exit code 0.
- **Security & Error Resilience:**
  - 15-second cache successfully suppresses duplicate spam bursts.
  - Client handles backend connection failures gracefully without crashing.
  - Zero DNS queries or web requests are made to extracted URLs.
  - Zero sensitive credentials or API keys stored in client code.

---

## 9. Limitations & Real-World Constraints

1. **Baseline Corpus Scope:** Trained on general SMS spam rather than exclusively modern smishing campaigns.
2. **Static URL Analysis:** Cannot detect dynamic server-side redirects on unflagged, newly registered domains without live lookups.
3. **Platform Sandbox:** Web browsers cannot directly intercept mobile phone SMS; mobile protection requires the native Android companion.
4. **Host Android Tooling:** Full end-to-end device testing of the Android companion requires an Android Studio/SDK/device environment.
5. **Language Scope:** Currently optimized for English text.

---

## 10. Future Roadmap

1. **Deep Learning NLP:** Fine-tune lightweight transformer models (DistilBERT, MobileBERT) for deeper contextual semantics.
2. **Live Threat Intelligence:** Integrate Google Safe Browsing, PhishTank, and URLhaus APIs with local caching.
3. **On-Device Inference:** Port the model to TensorFlow Lite / ONNX Runtime for 100% offline Android classification without external API dependency.
4. **Multilingual Phishing Defense:** Train cross-lingual models (XLM-RoBERTa) to identify smishing in regional and mixed languages.
5. **Production Deployment:** Deploy backend on a production WSGI server (Gunicorn/Nginx) with HTTPS encryption.

---

## 11. Viva Defense Quick Pitch (30-Second Introduction)

> *"PhishGuard AI is an intelligent, multi-layered cyber defense system designed to protect mobile and web users from smishing attacks. By combining statistical machine learning—achieving 97.58% test accuracy on the UCI SMS Spam baseline—with deterministic URL heuristics and social engineering behavioral analysis, PhishGuard AI eliminates single points of failure. It delivers an explainable 0 to 100 risk score, identifies specific threat indicators, and provides actionable safety guidance to stop users from falling victim to deceptive messages."*
