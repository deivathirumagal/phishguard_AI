# PhishGuard AI — Final PPT Slide Content (15 Slides)

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Presentation Scope:** Final-Year Engineering Project Defense & Faculty Panel  
**Repository Path:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  

---

## SLIDE 1 — TITLE

### PhishGuard AI
**Real-Time Phishing Message Detection System**  
*A Hybrid Cyber Defense Framework Combining Machine Learning and Behavioral Heuristics*

- **Student Name:** `[Student Name]`
- **Register Number:** `[Register Number]`
- **Department:** `[Department of Computer Science & Engineering / Information Technology]`
- **Institution:** `[College / University Name]`
- **Project Supervisor:** `[Guide Name, Designation]`
- **Academic Year:** 2025–2026

---

## SLIDE 2 — INTRODUCTION

### The Threat of Mobile Phishing (Smishing)
- **What is Phishing?** A fraudulent social engineering attack where adversaries impersonate trusted entities to steal credentials, financial details, or personal data.
- **The Rise of Smishing:** SMS phishing has surged alongside mobile banking, digital payment apps, and two-factor authentication (2FA).
- **Social Engineering in Messaging:** Attackers exploit human cognitive biases—trust, curiosity, fear, and urgency—rather than software vulnerabilities.
- **The Need for Automated Assistance:**
  - High open rates: Over 90% of SMS messages are read within 3 minutes.
  - Mobile screens truncate URLs, making visual link inspection difficult.
  - Users need automated, real-time protection before clicking deceptive links or responding.

---

## SLIDE 3 — PROBLEM STATEMENT

### Why Suspicious Messages Fool Users
- **Limitations of Manual User Detection:**
  - **Artificial Urgency:** *"Act within 24 hours"* or *"Account suspended immediately"*.
  - **Coercive Threats:** Threats of account termination, legal action, or financial loss.
  - **Credential Harvesting:** Deceptive requests to *"verify account"*, *"confirm password"*, or *"update KYC"*.
  - **Fake Rewards & Prizes:** Lottery winnings, unearned gift cards, or cash bonuses.
  - **Brand Impersonation:** Spoofing reputable banks (Chase, HDFC), couriers (FedEx, UPS), or tax authorities.
  - **Suspicious & Obfuscated URLs:** Use of URL shorteners (`bit.ly`, `tinyurl`) and raw IP addresses to mask malicious destinations.
- **Limitations of Traditional Spam Filters:**
  - Keyword filters fail against concise, targeted smishing messages.
  - Black-box systems categorize messages without explaining *why* or advising *how* to respond safely.

---

## SLIDE 4 — OBJECTIVES

### Core Engineering & Research Goals
1. **Automated Message Analysis:** Process unstructured text from SMS, messaging apps, and notifications.
2. **Machine Learning Classification:** Train a baseline supervised model to predict legitimate vs. spam/phishing probability.
3. **Defensive URL Analysis:** Passively inspect embedded links for shorteners, raw IPs, and suspicious TLDs without resolving external servers.
4. **Social Engineering Detection:** Identify psychological manipulation patterns using compiled behavioral rules.
5. **Composite Risk Scoring:** Synthesize ML probabilities and heuristic penalties into a calibrated 0–100 risk score and 4-tier threat level.
6. **Transparent Explanations:** Provide human-readable rationales explaining why a message was flagged.
7. **Actionable Security Recommendations:** Deliver specific safety guidance tailored to the detected risk level.
8. **Real-Time Detection Architecture:** Build an ingestion architecture supporting web stream simulation and a native Android companion listener foundation.

---

## SLIDE 5 — SYSTEM ARCHITECTURE

### Multi-Layer Hybrid Detection Pipeline

```text
Incoming Message
       ↓
Message Detection
       ↓
Preprocessing
       ↓
NLP + TF-IDF
       ↓
Logistic Regression (ML)  +  URL Analysis  +  Social Engineering Analysis
       ↓                            ↓                   ↓
       +------------------------------------+
                         ↓
                  Risk Assessment (0–100)
                         ↓
                     Explanation
                         ↓
                   Security Alert
                         ↓
                History / Dashboard
```

*Architectural Principle:* URL analysis and social engineering detection run in parallel with machine learning inference. Their findings directly contribute to the **Risk Assessment** rather than acting as a strict sequential ML pipeline.

---

## SLIDE 6 — DATASET

### Benchmark Training Corpus
- **Dataset Name:** UCI Machine Learning Repository — SMS Spam Collection
- **Corpus Characteristics:** A benchmark, public dataset of authentic mobile SMS messages categorized as legitimate (ham) or spam.
- **Total Corpus Size:** 5,572 messages
- **Class Distribution:**
  - **Legitimate (Ham):** 4,825 messages (~86.60%)
  - **Spam:** 747 messages (~13.40%)
- **Data Partitioning (80/20 Stratified Split):**
  - **Training Set:** 4,457 messages (3,860 ham, 597 spam)
  - **Testing Set:** 1,115 messages (965 ham, 150 spam)
- **Important Academic Clarification:**
  > *"This dataset provides the SMS spam/legitimate baseline for the project."*  
  *(It is an authentic SMS spam corpus, not a dedicated phishing dataset, which is why PhishGuard AI supplements it with dedicated URL and social engineering heuristic engines).*

---

## SLIDE 7 — MACHINE LEARNING PIPELINE

### Text Classification Workflow

```text
Raw Text
   ↓
Preprocessing (Lowercase normalization, whitespace cleaning, URL preservation)
   ↓
TF-IDF Feature Extraction (N-gram statistical weighting of word importance)
   ↓
Logistic Regression (L2-regularized linear classifier outputting class probabilities)
   ↓
Classification Output: Legitimate (Ham) / Phishing (Spam / Escalated Threat)
```

- **Feature Representation:** TF-IDF converts text into numerical feature vectors, down-weighting common words ("the", "is") and amplifying rare discriminative words ("urgent", "verify").
- **Classification Role:** The underlying dataset is spam/legitimate; the project integrates additional phishing-risk heuristics to evaluate smishing threats accurately.

---

## SLIDE 8 — MODEL PERFORMANCE

### Verified Baseline Evaluation Results

*Evaluated on the 1,115 unseen test messages of the UCI SMS Spam Collection:*

| Metric | Overall Baseline | Legitimate (`ham`) Class | Spam (`spam`) Class |
|---|:---:|:---:|:---:|
| **Accuracy** | **97.58%** | — | — |
| **Precision** | — | **0.99** (0.9875) | **0.90** (0.9013) |
| **Recall** | — | **0.98** (0.9845) | **0.92** (0.9195) |
| **F1-Score** | — | **0.99** (0.9860) | **0.91** (0.9103) |

**Confusion Matrix (1,115 Test Samples):**
- **True Negatives (TN):** 951 (Legitimate correctly classified)
- **True Positives (TP):** 137 (Spam correctly classified)
- **False Positives (FP):** 15 (Legitimate incorrectly flagged)
- **False Negatives (FN):** 12 (Spam missed by baseline model)

> **CRITICAL DISPLAY REQUIREMENT:**  
> **"97.58% test accuracy on the UCI SMS Spam Collection baseline."**  
> *(Never describe this as "97.58% phishing detection accuracy" because the training corpus represents general SMS spam).*

---

## SLIDE 9 — URL & SOCIAL ENGINEERING ANALYSIS

### Parallel Deterministic Defensive Heuristics

#### 1. Defensive URL Analysis Engine
- **Passive Inspection Policy:** PhishGuard **never** resolves DNS, pings, or connects to extracted URLs, ensuring user privacy and zero malware risk.
- **Implemented Checks:**
  - **URL Detection:** Regex extraction of embedded `http://`, `https://`, or `www.` links.
  - **Shortened URL Detection:** Flags known shortening services (`bit.ly`, `tinyurl.com`, `t.co`, `is.gd`) used to hide true destinations.
  - **Suspicious URL Identification:** Flags raw numeric IP hosts (`http://192.168.1.1`), high-risk TLDs (`.xyz`, `.top`), and excessive subdomains.
  - *Note:* Operates via local heuristics; no external reputation databases or WHOIS queries are used.

#### 2. Social Engineering Detection Engine
- Pattern-matching rules identifying 5 cognitive manipulation tactics:
  - **Urgency:** *"immediately"*, *"within 24 hours"*, *"act now"*, *"urgent"*.
  - **Fear & Threat:** *"account suspended"*, *"unauthorized charge"*, *"legal action"*.
  - **Account Verification:** *"verify account"*, *"confirm password"*, *"update KYC"*.
  - **Authority Impersonation:** Claims from recognizable entities (Chase, FedEx, Wells Fargo).
  - **Reward & Prize Lures:** *"won cash reward"*, *"claim prize"*, *"free gift"*.

---

## SLIDE 10 — RISK ASSESSMENT & ALERT SYSTEM

### Composite 0–100 Scoring & 4-Tier Scale
- **Additive Formula:**
  $$\text{Risk Score} = \min(100, \text{Base ML} + \text{URL Weight} + \text{Social Engineering Weight} + \text{Synergy Bonuses})$$
- **Synergy Bonus:** Suspicious URLs occurring alongside urgency or verification requests add $+10$ to $+15$ penalty points.

#### The 4 Risk Tiers:
| Score Range | Threat Tier | Final Label | Security Alert Action |
|:---:|:---:|:---:|:---:|
| **0 – 29** | `Low Risk` | `Legitimate` | Suppressed (Clean state) |
| **30 – 59** | `Medium Risk` | `Suspicious` / `Phishing` | Cautionary guidance |
| **60 – 79** | `High Risk` | `Phishing` | **Triggered** (Pulsing Red) |
| **80 – 100** | `Critical Risk` | `Phishing` | **Triggered** (Pulsing Red) |

- **Output Elements:** Composite Risk Score, Risk Level, Detected Indicators, Human-Readable Explanation, Actionable Security Recommendation, and Pulsing Red Alert.

---

## SLIDE 11 — APPLICATION INTERFACE

### React 19 / Vite User Interface

*Key application views built with responsive Vanilla CSS:*

1. **Scan Message View (`/scan`):**
   - Manual input textarea with 5 faculty demo presets for 1-click testing.
   - Visual Detection Workflow Pipeline banner.
   - Executive Verdict Summary visible first at the top of the evaluation report.
   - 8 detailed inspection cards (AI Verdict, Risk Meter, Confidence, Indicators, URL Analysis, Social Engineering, Explanation, Recommendation).
2. **Real-Time Simulation View (`/scan` tab):**
   - Ingestion stream simulator with 15-second deduplication cache.
3. **Security Dashboard (`/dashboard`):**
   - Live telemetry cards (Total, Legitimate, Suspicious, Phishing counts) and threat distribution progress bar computed from stored history.
4. **Scan History View (`/history`):**
   - LocalStorage audit trail with instant text search, category filters, and 1-click scan reload.
5. **Security Alert Banner:**
   - High-contrast, pulsing red alert banner rendering critical safety directives.

*(Slide Visual Recommendation: Place screenshots of Scan View, Dashboard, and Alert Banner here).*

---

## SLIDE 12 — SAMPLE RESULTS

### Verified Individual Test Cases

#### Example A: Legitimate Personal Message
- **Message Text:** `"Hey, are we still meeting for lunch today?"`
- **Known Result:**
  - Classification: `Legitimate` (Model prediction: `ham`)
  - Model Confidence: `93.35%` (Confidence for this specific sample)
  - Risk Score: `5 / 100` (`Low Risk`)
  - Indicators: `0 Detected` | URL: `None` | Social Engineering: `Clean`
  - Security Alert: Suppressed (Clean state)

#### Example B: Urgent Banking Phishing Attack
- **Message Text:** `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`
- **Known Result:**
  - Classification: `Phishing` (Model prediction: `spam`)
  - Model Confidence: `68.64%` (Confidence for this specific sample)
  - Risk Score: `100 / 100` (`Critical Risk`)
  - Indicators: `Urgency`, `Fear/Threat`, `Account Verification`, `Authority/Impersonation`
  - URL Analysis: Flagged `true` (Known shortener `bit.ly` masking destination)
  - Security Alert: **TRIGGERED** (Critical safety directive displayed)

> **IMPORTANT DISTINCTION:**  
> These confidence values (`93.35%` and `68.64%`) are **individual example predictions** output by the sigmoid function for those specific messages, **not** the overall model accuracy.

---

## SLIDE 13 — REAL-TIME DETECTION & ANDROID FOUNDATION

### Ingestion Architecture & Platform Boundaries

#### 1. Web Real-Time Simulation
- **Platform Limitation:** Web browsers operate in an OS security sandbox and **cannot** directly intercept phone SMS or system notifications.
- **Implementation:** An interactive simulation tab exercises PhishGuard's background ingestion service (`processIncomingMessage()`) with a 15-second deduplication cache to showcase automated stream processing.

#### 2. Android Companion Foundation
- **Platform Role:** Provides the native mobile listener architecture.
- **Implemented Components:**
  - `SmsReceiver.kt`: `BroadcastReceiver` listening for `android.provider.Telephony.SMS_RECEIVED`.
  - `DetectionService.kt`: Background coroutine worker invoking the Flask API.
  - `NotificationSystem`: Dispatches high-priority system alerts.
  - `DuplicateFilter`: Prevents repeated alert spamming.
- **Testing Status Statement:**
  > *"Android end-to-end device validation is only marked complete if confirmed by the testing report."*  
  *(The source code is implemented under `phish guard/android/`, while live device execution depends on an Android Studio/SDK host environment).*

---

## SLIDE 14 — LIMITATIONS & FUTURE SCOPE

### Project Constraints & Engineering Roadmap

#### Current Limitations:
1. **SMS Spam Baseline Dataset:** Model trained on general SMS spam rather than a dedicated modern smishing corpus.
2. **False Positives / Negatives:** Legitimate promotional messages with urgency phrasing can receive elevated scores; novel phrasing may produce low ML confidence.
3. **Heuristic URL Analysis:** Static analysis without live DNS or WHOIS reputation lookups cannot detect dynamic server-side redirects on unflagged domains.
4. **Browser SMS Boundary:** Web browsers cannot intercept mobile SMS; web real-time feature is a simulation.
5. **Android Environment Dependency:** Full device validation requires an Android Studio/SDK/device environment.

#### Future Enhancements:
1. **Phishing-Specific Datasets:** Retrain on contemporary mobile smishing datasets.
2. **Transformer-Based NLP:** Integrate lightweight transformer models (DistilBERT, MobileBERT).
3. **Multilingual Models:** Train cross-lingual models (XLM-RoBERTa) for regional language phishing.
4. **URL & Domain Intelligence:** Connect live reputation APIs (Google Safe Browsing, PhishTank, URLhaus).
5. **Stronger Android Integration:** On-device model execution via TensorFlow Lite / ONNX Runtime.
6. **Continuous Retraining:** Pipeline for periodic model updates with newly discovered smishing samples.

---

## SLIDE 15 — CONCLUSION

### Summary of Achievements
- **Multi-Layer Defense:** PhishGuard AI proves that combining statistical Machine Learning (TF-IDF + Logistic Regression) with parallel deterministic heuristics (URL parsing + Social Engineering rules) provides defense-in-depth against smishing.
- **Explainable & Actionable:** Rather than acting as a black box, the system delivers an intuitive 0–100 risk score, identifies specific threat indicators, and provides actionable guidance.
- **Complete End-to-End System:**
  - Verified Flask REST backend with sub-15ms latency.
  - Polished, responsive React web interface with manual scanning, demo presets, real-time simulation, audit history, and dashboard telemetry.
  - Native Android companion architecture foundation for mobile SMS interception.
- **Realistic Security Posture:** No claim of "100% perfect detection"—PhishGuard AI provides a practical, robust, and transparent defense-in-depth framework for mobile messaging security.

---

# Thank You!

**Questions & Discussion**
