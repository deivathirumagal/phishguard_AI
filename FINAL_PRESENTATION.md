# PhishGuard AI — Final Presentation Slides

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Presentation Format:** 15 Slides for Final-Year Project Defense  
**Repository Root:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  

---

## SLIDE 1 — TITLE

### PhishGuard AI
**Real-Time Phishing Message Detection System**

*A Multi-Layer Hybrid Cyber Defense System for SMS & Messaging Protection*

- **Presented by:** `[Student Name]`
- **Register Number:** `[Register Number]`
- **Department:** `[Department of Computer Science & Engineering / Information Technology]`
- **College:** `[College / University Name]`
- **Project Guide:** `[Guide Name, Designation]`
- **Academic Year:** 2025–2026

---

## SLIDE 2 — INTRODUCTION

### The Threat of Mobile Phishing (Smishing)
- **What is Phishing?** A social engineering cyber attack where attackers pose as trusted organizations to deceive users into disclosing confidential credentials, OTPs, or financial details.
- **The Rise of Smishing:** SMS phishing has surged as smartphones become the primary endpoint for banking, multi-factor authentication (MFA), and online transactions.
- **Why Automated Defense is Critical:**
  - High message open rates: Over 90% of SMS messages are read within 3 minutes.
  - Smaller mobile displays and hidden browser address bars make visual link verification difficult for regular users.
  - Automated detection is essential to evaluate messages in real-time before users click deceptive links or respond.
- **PhishGuard AI Mission:** Deliver an explainable, multi-layer defensive engine combining machine learning and heuristic analysis to identify threats passively and protect users.

---

## SLIDE 3 — PROBLEM STATEMENT

### The Human Vulnerability & Filter Evasion Problem
- **Limitations of Manual User Detection:**
  - Attackers intentionally weaponize psychological triggers that bypass human skepticism:
    - **Artificial Urgency:** *"Act within 24 hours"* or *"Immediate action required"*.
    - **Fear & Threats:** *"Your bank account has been suspended"*, *"Legal notice issued"*.
    - **Credential Harvesting:** *"Verify your identity"*, *"Confirm your password"*.
    - **Prize & Reward Lures:** *"Congratulations! You have won a cash reward"*.
    - **Brand Impersonation:** Spoofing reputable banks, postal couriers (FedEx, UPS), or tax authorities.
    - **Deceptive Links:** Using URL shorteners (`bit.ly`, `tinyurl`) and suspicious TLDs (`.xyz`, `.top`) to mask actual malicious destinations.
- **Limitations of Traditional Spam Filters:**
  - Standalone keyword blacklists or generic spam filters fail against brief, carefully crafted smishing messages.
  - Traditional systems act as uninterpretable "black boxes" without explaining why a message was flagged or guiding the user on safe actions.

---

## SLIDE 4 — PROJECT OBJECTIVES

### Core Engineering & Research Goals
1. **Detect Suspicious Messages:** Build a fast, passive message analysis engine capable of processing unstructured SMS, chat, or email text.
2. **Machine Learning Classification:** Train a statistical baseline classifier using TF-IDF and Logistic Regression to evaluate spam vs. ham probability.
3. **Defensive URL Analysis:** Implement a passive heuristic parser to flag shortened URLs, raw IP addresses, and suspicious domains without resolving external links.
4. **Social Engineering Identification:** Detect psychological manipulation vectors (urgency, fear, credential requests, impersonation, rewards) using pattern-matching rules.
5. **Composite Risk Scoring:** Synthesize ML probabilities and heuristic penalties into an explainable 0–100 risk score and 4-tier threat level.
6. **Explainable Output & Security Guidance:** Provide transparent rationales for detections and actionable security recommendations for end users.
7. **Real-Time Architecture Support:** Establish an ingestion architecture supporting real-time simulation on the web and a native Android companion listener foundation.

---

## SLIDE 5 — SYSTEM ARCHITECTURE

### Multi-Layer Hybrid Detection Pipeline

```text
               +-------------------------------------------+
               |        1. User / Incoming Message         |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |     2. Client Layer: Web / Android        |
               |  - React Web UI (Manual / Simulation)     |
               |  - Android Companion (SmsReceiver)        |
               +-------------------------------------------+
                                     |  HTTP POST /predict
                                     v
               +-------------------------------------------+
               |          3. Flask REST Backend            |
               |  - JSON validation & route handling       |
               +-------------------------------------------+
                                     |
                 +-------------------+-------------------+
                 |                                       |
                 v                                       v
   +---------------------------+           +---------------------------+
   |  4. Preprocessing & NLP   |           |  7. URL Heuristics Engine |
   |  - Normalization & regex  |           |  - Shorteners / Raw IPs   |
   +---------------------------+           +---------------------------+
                 |                                       |
                 v                                       |
   +---------------------------+                         |
   |  5. TF-IDF Feature Vector |                         |
   |  - N-gram statistical map |                         |
   +---------------------------+                         |
                 |                                       |
                 v                                       v
   +---------------------------+           +---------------------------+
   |  6. Logistic Regression   |           | 8. Social Engineering     |
   |  - Probability estimation |           |  - 5 psychological lures  |
   +---------------------------+           +---------------------------+
                 |                                       |
                 +-------------------+-------------------+
                                     |
                                     v
               +-------------------------------------------+
               |          9. Composite Risk Engine         |
               |  - Additive score (0–100)                 |
               |  - 4-Tier classification (Low to Critical)|
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |         10. Explainability Engine         |
               |  - Deterministic rationale generation     |
               |  - Actionable security recommendation     |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |          11. Security Alert System        |
               |  - Web: Pulsing Red Alert Banner          |
               |  - Android: System Heads-Up Notification  |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |        12. Local Audit Trail & Telemetry  |
               |  - Browser localStorage audit persistence |
               |  - Real-time Dashboard & History filters  |
               +-------------------------------------------+
```

*Key Architectural Note:* URL and social engineering analyses run in parallel with ML inference. Their findings feed directly into the **Risk Engine** rather than acting as a strict, sequential ML pipeline.

---

## SLIDE 6 — DATASET

### Benchmark Training Corpus
- **Dataset Name:** UCI Machine Learning Repository — SMS Spam Collection
- **Corpus Characteristics:** A benchmark, public dataset of authentic mobile SMS messages categorized as legitimate (ham) or spam.
- **Total Dataset Size:** 5,572 messages
- **Class Distribution:**
  - **Legitimate (Ham):** 4,825 messages (~86.6%)
  - **Spam:** 747 messages (~13.4%)
- **Data Partitioning:**
  - **Split Ratio:** 80% Training / 20% Testing (Stratified Split)
  - **Training Set:** 4,457 messages (3,860 ham, 597 spam)
  - **Testing Set:** 1,115 messages (965 ham, 150 spam)
- **Important Academic Distinction:**
  - This is an authentic **SMS spam/legitimate baseline dataset**.
  - It is **NOT** a dedicated, phishing-only dataset.
  - It serves as our project's baseline text classifier, which is why PhishGuard AI supplements it with dedicated URL heuristics and social engineering analysis to catch targeted smishing.

---

## SLIDE 7 — MACHINE LEARNING PIPELINE

### Text Classification Workflow
1. **Text Preprocessing:**
   - Case normalization (lowercase conversion) to ensure lexical consistency.
   - Punctuation and whitespace normalization while carefully preserving URL structures.
2. **Feature Extraction (TF-IDF Vectorizer):**
   - Transforms unstructured text into a high-dimensional sparse numerical vector.
   - **Term Frequency (TF):** Measures the prevalence of words in an individual message.
   - **Inverse Document Frequency (IDF):** Discounts ubiquitous common stopwords ("the", "is", "at") and amplifies rare, discriminative terms ("urgent", "suspended", "verify").
3. **Classification Model (Logistic Regression):**
   - Supervised linear model with L2 regularization.
   - Calculates the dot product of feature weights and input TF-IDF vectors passed through the sigmoid function:
     $$P(\text{spam} \mid x) = \frac{1}{1 + e^{-(\mathbf{w}^T \mathbf{x} + b)}}$$
   - Outputs calibrated class probabilities (`predict_proba`) between 0 and 1.
4. **Classification Classes:**
   - `Legitimate` (Ham)
   - `Phishing` (Spam / Escalated Threat)

---

## SLIDE 8 — MODEL PERFORMANCE

### Verified Baseline Evaluation Results

*Evaluated on the 1,115 unseen test messages of the UCI SMS Spam Collection:*

| Metric | Overall Baseline | Legitimate (Ham) Class | Spam Class |
|---|:---:|:---:|:---:|
| **Accuracy** | **97.58%** | — | — |
| **Precision** | — | **0.99** (0.9875) | **0.90** (0.9013) |
| **Recall** | — | **0.98** (0.9845) | **0.92** (0.9195) |
| **F1-Score** | — | **0.99** (0.9860) | **0.91** (0.9103) |

**Confusion Matrix on 1,115 Test Samples:**
- **True Negatives (TN):** 951 (Legitimate correctly identified)
- **True Positives (TP):** 137 (Spam correctly identified)
- **False Positives (FP):** 15 (Legitimate flagged as spam)
- **False Negatives (FN):** 12 (Spam missed by baseline model)

> **CRITICAL ACADEMIC DISTINCTION:**  
> We report this as: **"97.58% test accuracy on the UCI SMS Spam Collection baseline."**  
> We do **NOT** claim *"97.58% phishing detection accuracy"*. Because the training corpus is general SMS spam, real-world smishing evaluation requires our hybrid heuristics to eliminate false negatives.

---

## SLIDE 9 — URL & SOCIAL ENGINEERING ANALYSIS

### Parallel Deterministic Defensive Heuristics

#### 1. Defensive URL Analysis Engine
- **Passive Inspection Policy:** PhishGuard **never** resolves DNS, pings, or fetches target URLs, ensuring zero victim tracking or malware exposure.
- **Implemented Heuristics:**
  - **URL Shortener Detection:** Flags redirection providers (`bit.ly`, `tinyurl.com`, `t.co`, `is.gd`) used to mask true destinations.
  - **Raw IP Address Hosts:** Identifies numeric IPv4/IPv6 links (e.g., `http://192.168.1.1/login`).
  - **High-Risk TLDs:** Flags extensions frequently abused in smishing (`.xyz`, `.top`, `.tk`, `.work`, `.buzz`).
  - **Excessive Subdomains & Spoofing:** Identifies brand mimicry and `@` credential injection.
  - *Note:* Operates entirely via local regex and heuristics; no external reputation databases or WHOIS queries are used.

#### 2. Social Engineering Detection Engine
- Identifies psychological triggers using compiled regex patterns:
  - **Urgency:** *"immediately"*, *"within 24 hours"*, *"act now"*, *"expires"*.
  - **Fear & Threat:** *"account suspended"*, *"unauthorized access"*, *"legal action"*.
  - **Account Verification:** *"verify account"*, *"confirm password"*, *"update KYC"*.
  - **Authority Impersonation:** Impersonating banks (HDFC, Chase), delivery couriers (FedEx), or government agencies.
  - **Reward / Prize Lures:** *"won cash reward"*, *"claim prize"*, *"free gift"*.

---

## SLIDE 10 — RISK SCORING & ALERT SYSTEM

### Composite 0–100 Scoring & 4-Tier Scale
- **Additive Formulation:**
  $$\text{Risk Score} = \min(100, \text{Base ML Score} + \text{URL Penalty} + \text{Social Engineering Penalty} + \text{Synergy Bonuses})$$
- **Weight Distribution:**
  - **Base ML Contribution:** 5 (ham) or $30 + \text{int}(\text{confidence} \times 10)$ (spam).
  - **URL Penalty:** $+25$ points for shortened or raw IP URLs.
  - **Social Engineering Penalties:** $+10$ to $+15$ points per triggered behavioral category.
  - **Synergy Bonus:** $+10$ to $+15$ bonus points when a suspicious link occurs alongside urgency or verification requests.

#### 4-Tier Risk Scale:
1. **0–29 (Low Risk):** Clean personal or transactional messages (`Legitimate`).
2. **30–59 (Medium Risk):** Borderline messages or promotional content with heuristic flags (`Suspicious` / escalated `Phishing`).
3. **60–79 (High Risk):** Significant smishing indicators (`Phishing`).
4. **80–100 (Critical Risk):** High-severity attacks combining urgency, credential harvesting, and suspicious links (`Phishing`).

- **Security Alert:** A prominent, pulsing red alert banner triggers for any message classified as `Phishing` or scoring $\ge 60$, delivering immediate safety directives.

---

## SLIDE 11 — APPLICATION & USER INTERFACE

### React / Vite Frontend Implementation

*The web application is built with React 19 and custom responsive CSS:*

1. **Scan Message Page (`/scan`):**
   - **Manual Scan Tab:** Textarea with 5 predefined faculty demo presets for 1-click loading and scanning.
   - **Visual Pipeline Banner:** Displays the 8-stage detection flow.
   - **Executive Verdict Summary (Visible First):** Immediately presents Classification, Risk Score, Risk Level, Reason, and Recommended Action.
   - **8 Delineated Breakdown Cards:** AI Detection, Risk Score meter, Model Confidence, Phishing Indicators, URL Analysis, Social Engineering checklist, Explanation, Recommendation.
   - **7-Step "How It Works" Section:** Explains the architecture for viva review.
2. **Dashboard (`/dashboard`):**
   - Telemetry computed dynamically from actual scan history: Total Scans, Legitimate, Suspicious, Phishing counts.
   - Threat distribution progress bar.
   - Recent scan activity feed.
3. **Scan History (`/history`):**
   - Persistent `localStorage` audit trail.
   - Real-time search by message content.
   - Category filtering (All, Phishing, Suspicious, Legitimate) and 1-click reload back into scanner.

*Screens to Capture for Slides:*
- `ScanMessage.jsx` (Scan Page with Executive Verdict & 8 Cards)
- `Dashboard.jsx` (Metrics & Threat Distribution)
- `History.jsx` (Audit Trail & Search/Filter)

---

## SLIDE 12 — REAL-TIME DETECTION ARCHITECTURE

### Realistic Implementation & Platform Boundaries

#### 1. Web Real-Time Simulation
- **Platform Limitation:** Web browsers operate inside a strict security sandbox and **cannot** directly access mobile SMS databases or phone notifications.
- **Implementation:** The web application features an interactive **Real-Time Simulation** tab with an automated ingestion service (`processIncomingMessage()`) and a 15-second deduplication cache to showcase real-time ingestion.

#### 2. Android Companion Module Foundation
- **Platform Role:** Android provides the platform-specific listener foundation.
- **Implementation:**
  - Registered `BroadcastReceiver` listening for `android.provider.Telephony.SMS_RECEIVED`.
  - Background `DetectionService` extracts incoming SMS body and dispatches an asynchronous HTTP POST request to the Flask backend (`http://10.0.2.2:5000/predict`).
  - Posts high-priority Android system heads-up notifications if phishing is detected.
- **Important Testing Status Note:**
  > *"Actual Android end-to-end SMS testing depends on an Android Studio/SDK/device environment."*  
  > (The Android source foundation is fully implemented under `phish guard/android/`, while live host verification was constrained by missing SDK tools on the testing machine.)

---

## SLIDE 13 — SAMPLE VERIFIED RESULTS

### Comparative Case Studies

#### Scenario A: Legitimate Personal Message
- **Input:** `"Hey, are we still meeting for lunch today?"`
- **Classification:** `Legitimate` (Model prediction: `ham`)
- **Model Confidence:** `93.35%` (Confidence for this sample)
- **Risk Score:** `5/100` (`Low Risk`)
- **Indicators:** `0 Detected` | URL: `None` | Social Engineering: `Clean`
- **Security Alert:** Suppressed (Clean state)
- **Recommendation:** *"No immediate phishing indicators detected, but remain cautious."*

#### Scenario B: Urgent Banking Smishing Attack
- **Input:** `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`
- **Classification:** `Phishing` (Model prediction: `spam`)
- **Model Confidence:** `68.64%` (Statistical certainty for this specific sample, **not** overall system accuracy)
- **Risk Score:** `100/100` (`Critical Risk`)
- **Indicators:** `Urgency`, `Fear/Threat`, `Account Verification`, `Authority/Impersonation`
- **URL Analysis:** Flagged `true` — Known URL shortener (`bit.ly`) masking true destination.
- **Security Alert:** **TRIGGERED** — High-visibility red alert banner.
- **Recommendation:** *"Do not click links, provide passwords, or share personal information."*

---

## SLIDE 14 — LIMITATIONS & FUTURE SCOPE

### Project Constraints & Roadmap

#### Current Limitations:
1. **Baseline Dataset Scope:** Model trained on general SMS spam/ham rather than exclusively modern smishing datasets.
2. **False Positives / Negatives:** Legitimate promotional SMS with "urgent offers" can be flagged; novel zero-day phrasing may produce low ML confidence.
3. **Browser Telephony Boundary:** Web browsers cannot intercept mobile SMS; mobile deployment requires native Android installation.
4. **Environment Dependency:** Android end-to-end SMS testing depends on an Android Studio/SDK/device environment.
5. **Static Heuristic URL Analysis:** Does not perform live DNS lookups, domain age WHOIS queries, or third-party blacklist checks.
6. **Language Scope:** Currently optimized for English text.

#### Future Enhancements:
1. **Phishing-Specific Datasets:** Retrain on modern mobile smishing corpuses and adversarial attack datasets.
2. **Transformer NLP Models:** Integrate lightweight BERT models (DistilBERT, MobileBERT) for contextual linguistic embeddings.
3. **Live Threat Intelligence:** Connect to Google Safe Browsing, PhishTank, and URLhaus APIs with caching.
4. **Multilingual Support:** Implement cross-lingual models (XLM-RoBERTa) for regional language phishing detection.
5. **On-Device Inference:** Port the model to TensorFlow Lite / ONNX Runtime for 100% offline Android classification.

---

## SLIDE 15 — CONCLUSION

### Summary of Achievements
- **Multi-Layer Defense:** PhishGuard AI proves that combining statistical Machine Learning (TF-IDF + Logistic Regression) with deterministic heuristics (URL parsing + Social Engineering rules) significantly outperforms standalone spam filters.
- **Explainable & Actionable:** Rather than acting as a black box, the system delivers an intuitive 0–100 risk score, identifies specific threat indicators, and provides actionable guidance.
- **Complete End-to-End System:**
  - Verified Flask REST backend with sub-15ms latency.
  - Polished, responsive React web interface with manual scanning, real-time simulation, audit history, and dashboard telemetry.
  - Native Android companion architecture foundation for mobile SMS interception.
- **Realistic Security Posture:** No claim of "100% perfect detection"—PhishGuard AI provides defense-in-depth to empower users to recognize and avoid deceptive messages before interacting with them.

---

*Thank you! We are now open for questions from the examination panel.*
