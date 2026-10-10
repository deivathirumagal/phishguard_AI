# PhishGuard AI — Final Presentation Deck Content
**15-Slide Presentation Structure for Final-Year Project Evaluation**

---

### Slide 1: Title Slide
- **Project Title:** PhishGuard AI: Multi-Layer SMS Phishing & Social Engineering Detection Engine
- **Subtitle:** An Explainable Machine Learning and Mobile Listener Defense System
- **Domain:** Cybersecurity / Applied Artificial Intelligence / Mobile Security
- **Presenter:** Final-Year Engineering Project Team
- **Academic Year:** 2025–2026
- *Visual Suggestion:* PhishGuard AI shield logo with cyber-dark theme accents.

---

### Slide 2: Problem Statement
- **Surge in Smishing:** Mobile text messaging has become the top attack vector for credential theft, OTP harvesting, and banking fraud.
- **Failures of Static Blocklists:** Attackers use dynamic URL shorteners and disposable domains that evade traditional blacklists.
- **Opaque Black-Box Classifiers:** Existing AI solutions provide binary predictions without explaining *why* a message is dangerous.
- **Browser Sandboxing:** Standard web browsers cannot monitor mobile SMS broadcasts directly, creating an architectural protection gap.
- *Visual Suggestion:* Graphic contrasting modern SMS smishing lures against traditional email spam.

---

### Slide 3: Project Objectives
- **Multi-Layer Defense:** Combine statistical NLP, passive URL heuristics, and deterministic social engineering rules into one engine.
- **Explainable Cybersecurity:** Provide human-readable explanations and transparent 0–100 risk scoring instead of opaque probabilities.
- **Privacy-First Inspection:** Perform passive URL parsing without visiting links, ensuring zero external data leakage.
- **Dual-Platform Architecture:** Implement an interactive web operations dashboard paired with a native Android SMS listener foundation.
- *Visual Suggestion:* 4-pillar objective diagram (Accuracy, Explainability, Privacy, Cross-Platform).

---

### Slide 4: Existing Systems vs. PhishGuard AI
- **Keyword Filters:** Easily bypassed via subtle rephrasing, leetspeak, or homoglyphs.
- **Pure ML Models:** Prone to false positives and unable to detect newly registered shortened URLs.
- **DNS Blocklists:** Reactive; domains are typically blocked only after victims have already been compromised.
- **PhishGuard Advantage:** Hybrid multi-evidence fusion combines the generalization of ML with the precision of deterministic heuristics.
- *Visual Suggestion:* Feature comparison matrix table comparing PhishGuard AI with conventional SMS filters.

---

### Slide 5: Proposed System Architecture
- **Layer 1 — Statistical Machine Learning:** TF-IDF vectorizer + balanced Logistic Regression model.
- **Layer 2 — Defensive URL Heuristics:** Identifies URL shorteners (`bit.ly`, `tinyurl.com`), suspicious TLDs, and raw IP hosts.
- **Layer 3 — Social Engineering Analysis:** Identifies urgency, fear, account verification, authority impersonation, and reward language.
- **Layer 4 — Transparent Risk Scoring:** Synthesizes multi-source evidence into a bounded 0–100 risk score with 5 risk tiers.
- *Visual Suggestion:* Multi-layer defense stack diagram illustrating evidence aggregation into the final verdict.

---

### Slide 6: End-to-End System Architecture
- **Client Tier:** React Web Application (Manual Scan & Simulation) + Android Companion (Native `SmsReceiver`).
- **API Tier:** Python Flask REST API (`POST /predict` and `GET /`).
- **Defense Tier:** Pipeline orchestrating preprocessing, TF-IDF, Logistic Regression, URL analysis, and social engineering rules.
- **Storage Tier:** Privacy-preserving client-side audit history (`localStorage` / `SharedPreferences`) with zero cloud database dependency.
- *Visual Suggestion:* System Architecture diagram from [`SYSTEM_ARCHITECTURE.md`](file:///c:/Users/hp/OneDrive/Desktop/project/phish%20guard/SYSTEM_ARCHITECTURE.md).

---

### Slide 7: Dataset & Preprocessing Pipeline
- **Dataset:** Benchmark UCI SMS Spam Collection consisting of 5,572 real-world SMS messages.
- **Class Distribution:** 4,825 legitimate messages (86.60%) vs. 747 spam/malicious messages (13.40%).
- **Standardized Preprocessing:** String type validation, lowercase conversion, whitespace normalization (`\s+`), and edge trimming.
- **Stratified Split:** 80% training set (4,457 messages) and 20% test set (1,115 messages), maintaining exact class ratios.
- *Visual Suggestion:* Dataset pie chart showing the 86.6% vs 13.4% class distribution.

---

### Slide 8: NLP Feature Extraction & Machine Learning
- **TF-IDF Vectorization:** Evaluates term significance while penalizing universally common words.
- **Unigram & Bigram Features (`ngram_range=(1, 2)`):** Captures critical compound phrases (e.g., `"verify account"`, `"click here"`).
- **Dimension Bounding:** Vocabulary constrained to top 5,000 most informative features (`max_features=5000`).
- **Logistic Regression Classifier:** Configured with `class_weight='balanced'` to prevent bias toward the majority class and maximize threat recall.
- *Visual Suggestion:* Equation slide showing TF-IDF formula and Sigmoid activation function.

---

### Slide 9: URL & Social Engineering Analysis Engines
- **Zero-Resolution URL Parsing:** Regex-based link extraction and domain decomposition using `urllib.parse`.
- **Shortener Detection:** Curated registry of known shorteners (`bit.ly`, `tinyurl.com`, `t.co`, etc.) that conceal actual targets.
- **5 Social Engineering Vectors:**
  1. *Urgency* (`"act now"`, `"within 24 hours"`)
  2. *Fear & Threat* (`"account suspended"`, `"unauthorized"`)
  3. *Account Verification* (`"verify credentials"`, `"update KYC"`)
  4. *Authority Impersonation* (`"Bank"`, `"IRS"`, `"Police"`)
  5. *Reward Lures* (`"lottery winner"`, `"claim prize"`)
- *Visual Suggestion:* Side-by-side infographic showing URL heuristic checks and social engineering trigger keywords.

---

### Slide 10: Composite Risk Scoring & Security Directives
- **Transparent 0–100 Formulation:** Base score from ML confidence + URL penalties (+25) + Social Engineering penalties (+12 per vector).
- **5-Tier Risk Classification:**
  - `0–14`: Safe | `15–29`: Low Risk | `30–59`: Medium Risk | `60–84`: High Risk | `85–100`: Critical Risk.
- **Actionable Safety Directives:**
  > *"⚠️ CRITICAL SAFETY DIRECTIVE: Do not click suspicious links or provide passwords, OTPs, or financial information."*
- *Visual Suggestion:* 5-tier colored risk meter graphic (Green → Emerald → Amber → Orange → Red).

---

### Slide 11: Web Application User Experience
- **Modern Cyber-Dark Interface:** Built with React 19, Vite, and custom CSS design tokens.
- **8-Card Inspection Breakdown:** Granular display of verdict, risk score, URLs, heuristics, and recommendations.
- **Interactive Ingestion Simulator:** Safe environment demonstrating real-time message processing with platform limitation notices.
- **Security Operations Dashboard:** Live metrics tracking scan volume, threat distributions, and recent audit logs.
- *Visual Suggestion:* Screenshot of the 8-card Evaluation Report and Dashboard from the React web app.

---

### Slide 12: Android Companion Real-Time SMS Listener
- **Native Android Listener:** Uses `SmsReceiver` (Priority 999) for `android.provider.Telephony.SMS_RECEIVED`.
- **Deduplication Filter:** 15-second in-memory cache suppressing duplicate carrier broadcasts.
- **Asynchronous Network Bridge:** Connects to `http://10.0.2.2:5000/predict` on emulator or LAN IP on physical devices.
- **High-Priority Heads-Up Notifications:** `NotificationChannel` with sound, vibration, and safety directives.
- *Visual Suggestion:* Android companion architecture diagram showing SMS broadcast interception to notification.

---

### Slide 13: Experimental Results & Testing
- **Model Accuracy on Benchmark:** **97.58%** on unseen 1,115-sample test set.
- **Spam/Threat Metrics:** Precision = **90.13%**, Recall = **91.95%**, F1-Score = **91.03%**.
- **Confusion Matrix:** 951 True Negatives, 137 True Positives, 15 False Positives, 12 False Negatives.
- **Pipeline Latency:** End-to-end classification completed in under 15 milliseconds.
- *Visual Suggestion:* Confusion Matrix graphic and bar chart of Precision, Recall, and F1-score.

---

### Slide 14: Limitations & Future Scope
- **Current Limitations:**
  - Trained on general SMS spam baseline rather than an exclusively modern smishing corpus.
  - Passive URL analysis does not resolve dynamic HTTP redirection chains.
  - Development deployment uses HTTP; production requires HTTPS.
- **Future Enhancements:**
  - Lightweight Transformer integration (DistilBERT / MobileBERT) for contextual understanding.
  - On-device mobile inference using TensorFlow Lite (TFLite) for offline zero-network protection.
  - Multilingual smishing detection for non-English messaging.
- *Visual Suggestion:* Roadmap timeline showing Phase 1 (Current), Phase 2 (TFLite), Phase 3 (Enterprise).

---

### Slide 15: Conclusion & Key Takeaways
- **Demonstrated Success:** Successfully developed an explainable, multi-layer SMS phishing detection engine.
- **Hybrid Innovation:** Proved that combining statistical NLP with deterministic URL and social engineering rules outperforms standalone models.
- **Technical Honesty:** Clearly differentiated between web browser sandboxing and native Android OS listeners.
- **Academic & Practical Impact:** Delivers a functional, user-friendly cybersecurity tool that actively educates and protects non-technical users.
- *Visual Suggestion:* Final summary slide with PhishGuard AI shield, GitHub repository link, and Q&A invitation.
