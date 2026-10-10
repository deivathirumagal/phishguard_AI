# PhishGuard AI — PPT Slide Design & Visual Guide

This guide provides slide-by-slide visual layout instructions, recommended diagrams, typography rules, and projector readability guidelines for preparing the **PhishGuard AI** presentation deck.

---

## General Design Standards

- **Theme / Palette:**
  - Background: Deep Navy / Cyber Dark (`#0a192f` or `#06101d`)
  - Primary Headers / Text: Clean White (`#f8fafc`)
  - Accent / Primary Focus: Electric Blue (`#38bdf8`)
  - Danger / Phishing Highlights: Vibrant Coral Red (`#ef4444`)
  - Safe / Legitimate Highlights: Emerald Green (`#10b981`)
  - Warning Highlights: Amber (`#f59e0b`)
- **Typography:**
  - Header Font: Inter, Roboto, or Montserrat (Bold, 32pt – 40pt)
  - Body / Bullets: Inter, Arial, or Open Sans (Regular/Medium, 18pt – 22pt)
  - Code / Tokens: JetBrains Mono or Consolas (14pt – 16pt)
- **Projector Readability Rule:** High contrast between text and background. No light gray text on dark backgrounds. Minimum 24pt for any key metric.

---

## Slide-by-Slide Visual Layout Guide

---

### SLIDE 1 — TITLE
- **Layout:** Centered Title Slide with Cyber Shield Logo at top.
- **Recommended Visual:** Stylized shield icon (`🛡️`) with glowing cyan accent ring.
- **Maximum Bullet Count:** 0 bullets (Title, Subtitle, and a 2-column metadata table for Student vs. Guide details).
- **Speaker Emphasis:** Set a confident, professional tone; introduce project title clearly.

---

### SLIDE 2 — INTRODUCTION
- **Layout:** Two-column split layout.
  - Left Column (40%): What is Smishing & Social Engineering (3 concise bullets).
  - Right Column (60%): Infographic card showing "Why SMS is Targeted" (90% open rate in 3 minutes, truncated mobile URLs).
- **Recommended Visual:** Smartphone mockup showing a deceptive SMS message bubble.
- **Maximum Bullet Count:** 4 short bullets total.
- **Speaker Emphasis:** Emphasize that SMS phishing is growing rapidly because mobile users trust text messages and cannot easily inspect links.

---

### SLIDE 3 — PROBLEM STATEMENT
- **Layout:** 2x3 Grid of Problem Cards.
  - Card 1: Urgency ("Act now!")
  - Card 2: Fear ("Account suspended")
  - Card 3: Credential Harvesting ("Verify login")
  - Card 4: Fake Rewards ("You won a prize")
  - Card 5: Brand Impersonation (Banks, FedEx)
  - Card 6: Shortened URLs (`bit.ly`)
- **Recommended Visual:** Warning icons inside subtle card containers.
- **Maximum Bullet Count:** 6 cards with 1 short sentence each.
- **Speaker Emphasis:** Attackers exploit human psychology and link obfuscation to bypass both human skepticism and traditional spam filters.

---

### SLIDE 4 — OBJECTIVES
- **Layout:** 2-Column numbered list (4 objectives per column) with light blue badge numbers (1 to 8).
- **Recommended Visual:** Minimalist checkmark or target icon.
- **Maximum Bullet Count:** 8 numbered items (keep each under 8 words).
- **Speaker Emphasis:** Emphasize that the goal is a **multi-layered, explainable defense**, not just a simple binary black-box classifier.

---

### SLIDE 5 — SYSTEM ARCHITECTURE
- **Layout:** Full-slide architectural flowchart.
- **Recommended Visual:** Clean flowchart showing:
  `Incoming Message` $\rightarrow$ `Client` $\rightarrow$ `Flask API` $\rightarrow$ `Preprocessing` $\rightarrow$ `[TF-IDF + Logistic Regression]` in parallel with `[URL Analysis + Social Engineering]` $\rightarrow$ `Risk Assessment` $\rightarrow$ `Explanation` $\rightarrow$ `Alert` $\rightarrow$ `History/Dashboard`.
- **Maximum Bullet Count:** 0 bullets (Flowchart diagram with 1 callout box explaining parallel heuristic execution).
- **Speaker Emphasis:** Point out that URL and social engineering analyses run in parallel and contribute directly to the Risk Engine.

---

### SLIDE 6 — DATASET
- **Layout:** Two-column layout with stat callout boxes.
  - Left Column: Dataset facts (UCI SMS Spam Collection, 5,572 messages, 80/20 split).
  - Right Column: 4 Stat Cards:
    - Card 1: **5,572** Total Messages
    - Card 2: **4,825** Legitimate (86.6%)
    - Card 3: **747** Spam (13.4%)
    - Card 4: **1,115** Test Samples
- **Recommended Visual:** Donut chart showing 86.6% Ham vs. 13.4% Spam.
- **Maximum Bullet Count:** 3 bullets + 4 stat cards.
- **Speaker Emphasis:** Clearly state: *"This dataset provides the SMS spam/legitimate baseline for the project."*

---

### SLIDE 7 — MACHINE LEARNING PIPELINE
- **Layout:** Horizontal 4-step pipeline cards.
  `Raw Text` $\rightarrow$ `Preprocessing` $\rightarrow$ `TF-IDF Vectorizer` $\rightarrow$ `Logistic Regression` $\rightarrow$ `Verdict`.
- **Recommended Visual:** Arrow-connected process cards with formula snippets ($\text{TF-IDF} = \text{TF} \times \text{IDF}$, Sigmoid curve).
- **Maximum Bullet Count:** 4 short bullet explanations under the cards.
- **Speaker Emphasis:** Explain that TF-IDF turns text into numbers, and Logistic Regression outputs calibrated probabilities in under 5 milliseconds.

---

### SLIDE 8 — MODEL PERFORMANCE
- **Layout:** Prominent Top Metric Banner + Comparison Table + Confusion Matrix Card.
  - Top Banner: **"97.58% test accuracy on the UCI SMS Spam Collection baseline"** (Large 28pt bold cyan).
  - Table: Precision, Recall, F1 for Legitimate (0.99, 0.98, 0.99) vs. Spam (0.90, 0.92, 0.91).
  - Confusion Matrix: $2 \times 2$ grid (951 TN, 137 TP, 15 FP, 12 FN).
- **Recommended Visual:** Styled clean table with green/blue score chips.
- **Maximum Bullet Count:** 2 takeaway bullets.
- **Speaker Emphasis:** Reiterate: *"We report 97.58% test accuracy on the UCI SMS baseline, not as a blanket phishing accuracy claim."*

---

### SLIDE 9 — URL & SOCIAL ENGINEERING ANALYSIS
- **Layout:** Split-card layout (Left: Defensive URL Engine; Right: Social Engineering Engine).
  - Left Card: Zero-resolution policy, shorteners (`bit.ly`), raw IP hosts, high-risk TLDs.
  - Right Card: 5 behavioral vectors (Urgency, Fear/Threat, Verification, Authority, Rewards).
- **Recommended Visual:** Regex pattern snippets and warning badges.
- **Maximum Bullet Count:** 4 bullets per card.
- **Speaker Emphasis:** Emphasize that URL analysis is 100% passive—no external web requests or DNS queries are made.

---

### SLIDE 10 — RISK ASSESSMENT & ALERT SYSTEM
- **Layout:** Horizontal 4-Tier Meter Graphic at top + Scoring Formula & Alert Card below.
  - Top Graphic: 4 colored tier blocks:
    - `0–29 Low Risk` (Green)
    - `30–59 Medium Risk` (Yellow/Amber)
    - `60–79 High Risk` (Orange)
    - `80–100 Critical Risk` (Red)
  - Bottom Left: Additive formula callout with synergy bonus ($+10$ to $+15$).
  - Bottom Right: Mockup of the pulsing red Security Alert banner.
- **Recommended Visual:** Tier gauge with pointer + Security Alert box mockup.
- **Maximum Bullet Count:** 4 concise bullets.
- **Speaker Emphasis:** Explain how the 4 tiers translate raw numbers into intuitive, actionable threat levels.

---

### SLIDE 11 — APPLICATION INTERFACE
- **Layout:** 3-Screenshot Showcase with descriptive captions.
  - Image 1: Scan Page with Executive Verdict Summary & 8 Cards.
  - Image 2: Security Dashboard with Threat Distribution Bar.
  - Image 3: Scan History with search and category filters.
- **Recommended Visual:** Real screenshots captured from `http://localhost:5173/`.
- **Maximum Bullet Count:** 3 captions (1 sentence per screenshot).
- **Speaker Emphasis:** Highlight that the most important answers (verdict, score, reason, action) are visible first at the top of the evaluation report.

---

### SLIDE 12 — SAMPLE RESULTS
- **Layout:** Side-by-side Case Study comparison.
  - Left Card (Green Border): Legitimate Message (`"Hey, are we still meeting..."`) $\rightarrow$ `Legitimate`, `93.35%` confidence, `5/100` (`Low Risk`), Alert suppressed.
  - Right Card (Red Border): Banking Phishing (`"URGENT! Your bank account..."`) $\rightarrow$ `Phishing`, `68.64%` confidence, `100/100` (`Critical Risk`), Alert triggered.
- **Recommended Visual:** Side-by-side mockups of the evaluation reports.
- **Maximum Bullet Count:** 4 comparison rows.
- **Speaker Emphasis:** Clarify that 93.35% and 68.64% are **individual example confidence scores**, not overall model accuracy.

---

### SLIDE 13 — REAL-TIME DETECTION & ANDROID FOUNDATION
- **Layout:** Two distinct architecture cards.
  - Card 1: Web Real-Time Simulation (Platform sandbox note, 15s deduplication cache).
  - Card 2: Android Companion Foundation (`SmsReceiver.kt`, `SMS_RECEIVED`, `DetectionService.kt`, system notifications).
- **Recommended Visual:** Web browser icon vs. Android mobile device icon.
- **Maximum Bullet Count:** 3 bullets per card.
- **Speaker Emphasis:** State clearly: *"Android end-to-end device validation is only marked complete if confirmed by the testing report."*

---

### SLIDE 14 — LIMITATIONS & FUTURE SCOPE
- **Layout:** Split-screen layout (Left: Current Limitations; Right: Future Enhancements).
  - Left: Baseline dataset scope, static URL heuristics, browser SMS boundary, Android environment dependency.
  - Right: Phishing-specific datasets, transformer models (DistilBERT), live threat intelligence APIs, on-device mobile execution.
- **Recommended Visual:** Two contrasting cards with light red and light blue accent borders.
- **Maximum Bullet Count:** 4 bullets on the left, 4 on the right.
- **Speaker Emphasis:** Acknowledging limitations demonstrates academic honesty and technical maturity.

---

### SLIDE 15 — CONCLUSION
- **Layout:** Centered Summary Card with final takeaway badges + "Thank You" banner.
  - 3 Core Takeaways: Multi-layer hybrid defense, explainable 0–100 risk scoring, practical end-to-end implementation.
  - Bottom: Large "Thank You! Questions & Discussion".
- **Recommended Visual:** Final shield icon with green checkmark.
- **Maximum Bullet Count:** 3 short summary bullets.
- **Speaker Emphasis:** End with confidence, thanking the panel and opening the floor for questions.
