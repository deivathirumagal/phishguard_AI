# PhishGuard AI — List of Tables

The following tables are incorporated into the final project report, summarizing the quantitative metrics, requirements, architecture, and testing results of the project:

---

### Table 1 — Technology Stack
| Layer | Technology | Version / Specification | Role in Project |
|---|---|---|---|
| Frontend | React | v19.x (Vite v8.2.1) | Interactive user interface, component hierarchy, local state |
| Routing | React Router DOM | v7.x | Client-side page navigation (`/scan`, `/dashboard`, etc.) |
| Styling | Vanilla CSS | Custom responsive styles | Cyber security dark-mode theme, micro-animations |
| Backend | Python / Flask | Python 3.13 / Flask 3.1 | REST API server, request validation, pipeline coordination |
| Machine Learning | scikit-learn | v1.5+ | TF-IDF feature extraction, regularized Logistic Regression |
| Persistence | HTML5 localStorage | Browser API | Client-side audit trail and dashboard telemetry storage |
| Mobile Companion | Android | SDK 26–34 (Java/Kotlin) | Native `SMS_RECEIVED` telephony broadcast listener foundation |

---

### Table 2 — Dataset Distribution
| Category | Label | Message Count | Percentage |
|---|:---:|:---:|:---:|
| Legitimate Messages | `ham` | 4,825 | 86.60% |
| Spam Messages | `spam` | 747 | 13.40% |
| **Total Corpus** | — | **5,572** | **100.00%** |

---

### Table 3 — Train / Test Partitioning
| Dataset Subset | Ratio | Ham Messages | Spam Messages | Total Messages |
|---|:---:|:---:|:---:|:---:|
| **Training Set** | 80% (Stratified) | 3,860 | 597 | 4,457 |
| **Testing Set** | 20% (Stratified) | 965 | 150 | 1,115 |
| **Total** | 100% | 4,825 | 747 | 5,572 |

---

### Table 4 — Classification Metrics on Benchmark Test Set
| Metric | Overall Model | Legitimate (`ham`) Class | Spam (`spam`) Class |
|---|:---:|:---:|:---:|
| **Accuracy** | **97.58%** | — | — |
| **Precision** | — | **0.99** (0.9875) | **0.90** (0.9013) |
| **Recall** | — | **0.98** (0.9845) | **0.92** (0.9195) |
| **F1-Score** | — | **0.99** (0.9860) | **0.91** (0.9103) |

*Note: Verified on 1,115 unseen test messages. True Negatives: 951, True Positives: 137, False Positives: 15, False Negatives: 12.*

---

### Table 5 — Composite Risk Levels & Scoring Thresholds
| Risk Score Range | Threat Tier | Final Label | Typical Characteristics | Security Alert Action |
|:---:|:---:|:---:|:---|:---:|
| **0 – 29** | `Low Risk` | `Legitimate` | Clean personal/transactional text, no suspicious links or urgency | Suppressed |
| **30 – 59** | `Medium Risk` | `Suspicious` / `Phishing` | Promotional wording, borderline ML score, or isolated URL shortener | Cautionary guidance |
| **60 – 79** | `High Risk` | `Phishing` | Shortened link with urgency or verification prompts | **Triggered** (Pulsing Red) |
| **80 – 100** | `Critical Risk` | `Phishing` | Banking/courier impersonation, shortened link, urgency, threat of loss | **Triggered** (Pulsing Red) |

---

### Table 6 — Functional Requirements Summary
| Requirement ID | Description | Component | Status |
|:---:|:---|:---|:---:|
| **FR-01** | Accept raw message strings from multiple sources | Frontend / API | IMPLEMENTED |
| **FR-02** | Clean and normalize text casing and whitespace | Preprocessor | IMPLEMENTED |
| **FR-03** | Transform text to numerical TF-IDF feature vectors | `TfidfVectorizer` | IMPLEMENTED |
| **FR-04** | Output statistical class probabilities | `LogisticRegression` | IMPLEMENTED |
| **FR-05** | Passively parse URLs for shorteners and raw IPs | URL Heuristic Engine | IMPLEMENTED |
| **FR-06** | Identify 5 behavioral social engineering patterns | Rule Engine | IMPLEMENTED |
| **FR-07** | Compute composite 0–100 risk score and tier | Risk Engine | IMPLEMENTED |
| **FR-08** | Generate human-readable explanations | Explainability Engine | IMPLEMENTED |
| **FR-09** | Display pulsing red alert for high-risk threats | `RealTimeAlert.jsx` | IMPLEMENTED |
| **FR-10** | Persist audit log and compute live dashboard metrics | `localStorage` / Dashboard | IMPLEMENTED |

---

### Table 7 — Comprehensive Test Cases & Results
| Test ID | Test Description | Input Condition | Expected Result | Actual Result | Status |
|:---:|:---|:---|:---|:---|:---:|
| **BE-01** | Backend Health Check | `GET /` | HTTP 200 OK | `{"status": "online"}` | **PASS** |
| **BE-02** | Legitimate SMS Scan | `"Hey, are we still meeting..."` | `Legitimate`, Score $\le 29$ | Score `5`, `Low Risk` | **PASS** |
| **BE-03** | Banking Phishing Scan | `"URGENT! Your bank account..."` | `Phishing`, Score $\ge 80$ | Score `100`, `Critical Risk` | **PASS** |
| **BE-04** | Delivery Fee Scam | `"FedEx: Your package is..."` | `Phishing`, URL flagged | Score `50`, `Medium Risk` | **PASS** |
| **BE-06** | Empty String Handling | `""` | HTTP 400 Bad Request | HTTP 400 Bad Request | **PASS** |
| **FE-01** | Vite Production Build | `npm run build` | Exit code 0 | Compiled in 179ms | **PASS** |
| **FE-02** | Application Routes | 7 defined routes | All routes resolve | All routes functional | **PASS** |
| **RT-05** | Ingestion Deduplication | Repeat message in 15s | Suppress duplicate | Duplicate skipped warning | **PASS** |
| **AND-01**| Android Device Test | Live SMS on device/emulator | Intercept and notify | Tooling unavailable on host | **NOT TESTED** |

---

### Table 8 — Sample Detection Results Comparison
| Parameter | Scenario A: Legitimate Personal SMS | Scenario B: Banking Phishing Attack |
|---|:---|:---|
| **Input Message** | *"Hey, are we still meeting for lunch today?"* | *"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"* |
| **ML Model Prediction** | `ham` | `spam` |
| **Model Confidence** | `93.35%` (Confidence for this sample) | `68.64%` (Confidence for this sample) |
| **Final Classification** | `Legitimate` | `Phishing` |
| **Composite Risk Score** | `5 / 100` | `100 / 100` |
| **Assigned Risk Tier** | `Low Risk` | `Critical Risk` |
| **URL Analysis** | No URL detected | Flagged: Known shortener (`bit.ly`) masking destination |
| **Social Engineering** | Clean (0 indicators) | 4 Indicators: Urgency, Fear/Threat, Account Verification, Authority |
| **Security Alert Banner** | Suppressed (Clean state) | **TRIGGERED** (High-visibility pulsing red alert) |
| **User Recommendation** | *"No immediate phishing indicators detected, but remain cautious."* | *"Do not click links, provide passwords, or share personal information."* |

---

### Table 9 — Project Limitations & Impact Analysis
| Limitation Area | Description | System Impact | Mitigation / Future Work |
|---|---|---|---|
| **Dataset Scope** | Trained on UCI SMS Spam Collection | Reflects general spam rather than modern smishing | Secondary URL & behavioral heuristics catch evasive attacks |
| **Static Heuristics** | No live DNS, WHOIS, or HTTP resolution | Cannot detect dynamic server-side redirects | Prioritizes user safety; connect live APIs in future scope |
| **Browser Sandbox** | Browsers cannot access telephony hardware | Web real-time feature is a simulation | Native Android companion handles device interception |
| **Android Testing** | Host machine lacks Android SDK in PATH | End-to-end device testing not run on host | Full companion source code provided and documented |
| **Language Scope** | Vectorizer and keywords are in English | Non-English phishing receives lower ML confidence | Language-agnostic URL heuristics still apply; add XLM-RoBERTa |
