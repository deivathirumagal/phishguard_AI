# PhishGuard AI — Final College Demonstration Script

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Estimated Demo Time:** 5 to 7 Minutes  
**Audience:** Faculty Examination Panel & External Evaluators  

---

## Demonstration Overview & Timing

| Step | Topic | Target Time | Key Objective |
|---|---|---|---|
| **1** | Introduction | 0:00 – 0:30 (30s) | Welcome panel, state project name, vision, and core defense mission. |
| **2** | Explain the Problem | 0:30 – 1:00 (30s) | Explain smishing, human vulnerability, and why standalone filters fail. |
| **3** | Show Architecture & Pipeline | 1:00 – 1:45 (45s) | Walk through the hybrid multi-layer detection pipeline banner. |
| **4** | Demonstrate Legitimate Message | 1:45 – 2:30 (45s) | Show clean SMS processing (DEMO 1 or DEMO 5), low risk, no alert. |
| **5** | Demonstrate Phishing Message | 2:30 – 3:30 (60s) | Show banking attack (DEMO 2), critical risk, red alert, explanation. |
| **6** | Demonstrate URL & Social Engineering | 3:30 – 4:15 (45s) | Highlight delivery scam (DEMO 3) where URL shortener + urgency escalate risk. |
| **7** | Demonstrate Risk Score & Explanation | 4:15 – 4:45 (30s) | Explain composite 0–100 risk score, 4-tier gauge, and actionable guidance. |
| **8** | Demonstrate History & Dashboard | 4:45 – 5:30 (45s) | Show live telemetry, threat distribution breakdown, search/filter audit trail. |
| **9** | Explain Android Real-Time Foundation | 5:30 – 6:00 (30s) | Clarify browser sandbox boundary and explain Android companion architecture. |
| **10** | Conclusion & Viva Handover | 6:00 – 6:30 (30s) | Summarize achievements, defense-in-depth advantage, invite questions. |

---

## Detailed Step-by-Step Script

---

### Step 1: Introduction (30 seconds)

* **What I Click:**  
  Start on the **Home Page** (`http://localhost:5173/`).
* **What I Type:**  
  Nothing.
* **What Should Appear:**  
  The PhishGuard AI homepage with the hero header: *"Intelligent Multi-Layer Phishing & Smishing Detection System"*, feature badges, and the "+ Scan Message" navigation button.
* **What I Should Say:**  
  > *"Good morning, respected professors and external panel members.  
  > My final-year project is **PhishGuard AI – Real-Time Phishing Message Detection System**.  
  > In today's digital landscape, SMS phishing, or **smishing**, has become one of the fastest-growing cyber threats. Attackers exploit psychological urgency and deceptive links to compromise accounts and steal sensitive credentials.  
  > PhishGuard AI provides an intelligent, hybrid defense system combining Machine Learning, defensive URL heuristics, and behavioral social engineering analysis to evaluate incoming messages passively and explainably."*

---

### Step 2: Explain the Problem (30 seconds)

* **What I Click:**  
  Click **"Scan Message"** in the navigation bar or the **"⚡ Quick Scan"** button.
* **What I Type:**  
  Nothing yet.
* **What Should Appear:**  
  The Scan Page opens displaying the **Detection Workflow Pipeline** banner, the **Manual Message Input** panel with 5 predefined Demo Presets, and the awaiting result card.
* **What I Should Say:**  
  > *"Traditional spam filters rely solely on keyword blacklists or basic spam classifiers. However, modern phishing attacks use evasive tactics: shortened URLs, brand spoofing, and artificial urgency.  
  > If a model relies purely on bag-of-words or simple spam labels, legitimate-sounding delivery or banking alerts can slip through undetected, or safe messages might get blocked.  
  > PhishGuard AI solves this by introducing a **defense-in-depth hybrid architecture** where Machine Learning is supplemented by deterministic heuristic engines."*

---

### Step 3: Show Architecture & Pipeline (45 seconds)

* **What I Click:**  
  Point cursor to the **Detection Workflow Pipeline** banner at the top of the Scan Page.
* **What I Type:**  
  Nothing.
* **What Should Appear:**  
  The interactive workflow banner:  
  `Incoming Message → Message Preprocessing → TF-IDF Feature Extraction → Logistic Regression Classification → URL + Social Engineering Analysis → Risk Score (0–100) → Explanation → Security Alert`  
  Subtitle: *"ML Classification + URL/Social Engineering Analysis → Risk Assessment"*
* **What I Should Say:**  
  > *"Here on the Scan page, you can see our complete detection pipeline:  
  > 1. An incoming message is first received and cleaned during **Preprocessing**.  
  > 2. We extract n-gram textual features using **TF-IDF Vectorization**.  
  > 3. Our baseline classifier, a **Logistic Regression** model trained on the benchmark UCI SMS Spam Collection dataset, generates statistical probabilities.  
  > 4. Concurrently, our engine executes defensive **URL Analysis** without resolving external links, and runs **Social Engineering Detection** targeting psychological triggers.  
  > 5. All analytical signals feed into our composite **Risk Scoring Engine**, producing an explainable 0 to 100 risk score and an actionable security alert."*

---

### Step 4: Demonstrate Legitimate Message (45 seconds)

* **What I Click:**  
  Click the preset button: **"DEMO 1 — Legitimate"**  
  Then click the blue **"🛡️ Scan Message"** button.
* **What I Type:**  
  Preset loads: `"Hey, are we still meeting for lunch today?"`
* **What Should Appear:**  
  - Loading spinner briefly appears.  
  - Result panel displays:
    - **Executive Verdict:** `Legitimate` (Green), Risk Score: `0/100`, Risk Level: `Low Risk`.
    - **No Security Warning Alert** (clean state).
    - Confidence: high certainty for ham/legitimate.
    - Phishing Indicators: `0 Detected` / `"No specific phishing indicators detected"`.
    - URL Analysis: `"No URL Detected"`.
    - Social Engineering: All 5 categories clean (`✗ Urgency not detected`, etc.).
    - Recommendation: Safe personal communication.
* **What I Should Say:**  
  > *"Let's test Scenario 1: A normal personal message: 'Hey, are we still meeting for lunch today?'.  
  > When I click 'Scan Message', the frontend sends an HTTP POST request to our Flask backend `/predict` endpoint.  
  > Within milliseconds, the backend evaluates the message:  
  > The ML classifier identifies standard conversational tokens, no suspicious URLs or urgency patterns are found, and the composite risk score is 0 out of 100.  
  > Notice that no disruptive security alert is triggered, confirming a seamless user experience for legitimate messages."*

---

### Step 5: Demonstrate Phishing Message (1 minute)

* **What I Click:**  
  Click the preset button: **"DEMO 2 — Banking Phishing"**  
  Then click **"🛡️ Scan Message"**.
* **What I Type:**  
  Preset loads: `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`
* **What Should Appear:**  
  - Result card pulses red (`risk-danger`).  
  - **Prominent Red Security Alert:**  
    `🚨 CRITICAL PHISHING ALERT DETECTED`  
    `Threat Level: Critical Risk | Risk Score: 85/100`  
  - **Executive Verdict Summary:**  
    - Classification: `Phishing`  
    - Risk Score: `85/100` (Critical Risk)  
    - Primary Reason: Explains detected urgency, account suspension threat, and suspicious shortened link.  
    - Action: *"Do NOT click the link or provide any personal details."*  
  - Indicators: Urgency, Fear/Threat, Account Verification, Suspicious Shortened URL (`bit.ly`).
* **What I Should Say:**  
  > *"Now let us test Scenario 2: A classic smishing attack: 'URGENT! Your bank account has been suspended. Verify your account immediately by clicking bit.ly...'.  
  > Immediately, PhishGuard AI flags this as a **Critical Phishing Threat** with a Risk Score of 85 out of 100.  
  > Notice three key defensive responses:  
  > First, a high-visibility real-time **Security Alert banner** warns the user before they can interact with the message.  
  > Second, the **Executive Summary** at the very top explains exactly why it was detected and tells the user: do not click and contact the official bank helpline directly.  
  > Third, in the detailed breakdown below, the system flags the `bit.ly` URL shortening evasion tactic and identifies three social engineering vectors: Urgency, Fear/Threat, and Account Verification."*

---

### Step 6: Demonstrate URL & Social Engineering Analysis (45 seconds)

* **What I Click:**  
  Click **"DEMO 3 — Delivery Scam"**  
  Then click **"🛡️ Scan Message"**.
* **What I Type:**  
  Preset loads: `"FedEx: Your package is waiting. Pay the customs fee immediately at http://bit.ly/example"`
* **What Should Appear:**  
  - Result card shows `Phishing` / `Medium Risk` (Score: 50/100).  
  - Scroll down slightly to highlight:
    - **Card 5 (URL Analysis):**  
      `URL Detected: Yes`, `Suspicious URL: Yes`, `Detected URL: http://bit.ly/example`.  
      Reason: *"Uses URL shortener (bit.ly) which hides the destination domain."*
    - **Card 6 (Social Engineering):**  
      `✓ Urgency detected`, `✓ Authority/impersonation detected` (FedEx).
* **What I Should Say:**  
  > *"Scenario 3 demonstrates the true power of our hybrid engine.  
  > Delivery scam messages often use benign words like 'package' or 'waiting' that might trick a naive classifier.  
  > Here, our TF-IDF model initially scored it near the decision boundary. However, our secondary defensive layers stepped in:  
  > In Card 5, our **URL Analysis** passively identified the `bit.ly` link shortener, flagging that the actual destination is deliberately masked.  
  > In Card 6, our **Social Engineering Engine** identified brand impersonation of 'FedEx' combined with an artificial urgency prompt to pay customs fees.  
  > The composite risk engine escalated the risk score to 50/100 and classified the message as Phishing, protecting the user where standalone ML would have been uncertain."*

---

### Step 7: Demonstrate Risk Score & Explanation (30 seconds)

* **What I Click:**  
  Click **"DEMO 4 — Reward Scam"** and click **"🛡️ Scan Message"**.
* **What I Type:**  
  Preset loads: `"Congratulations! You have won a cash reward. Claim your prize now at http://bit.ly/example"`
* **What Should Appear:**  
  - Verdict: `Phishing` (Score: 50/100).  
  - Highlight **Card 2 (Risk Score Analysis)** showing the 4-tier visual scale:
    - `0–29 Low Risk`
    - `30–59 Medium Risk` (Active)
    - `60–79 High Risk`
    - `80–100 Critical Risk`
  - Highlight **Card 7 (Why Was This Detected?)** and **Card 8 (Security Recommendation)**.
* **What I Should Say:**  
  > *"In Scenario 4, we test a Lottery/Reward lure.  
  > Notice Card 2: PhishGuard features a transparent 4-tier risk scale: Low (0–29), Medium (30–59), High (60–79), and Critical (80–100).  
  > In Card 7 and Card 8, our system provides explainability. Rather than acting as an uninterpretable black box, PhishGuard AI explicitly details that reward baiting and an obfuscated link were detected, accompanied by clear, user-centric safety recommendations."*

---

### Step 8: Demonstrate History & Dashboard (45 seconds)

* **What I Click:**  
  1. Click **"Dashboard"** in the navigation bar.  
  2. Then click **"Scan History"** in the navigation bar.
* **What I Type:**  
  On the History page, type `"FedEx"` into the search bar, then click the **"🚨 Phishing"** filter tab.
* **What Should Appear:**  
  - **Dashboard:**  
    - Live metric cards showing Total Messages Scanned, Legitimate, Suspicious, and Phishing counts.  
    - Threat Distribution segmented bar reflecting real percentages.  
    - Recent Activity table matching our live scans.  
  - **History:**  
    - Search bar filters instant matches for "FedEx".  
    - Filter tabs isolate Phishing vs. Legitimate records.  
    - Timestamp, message snippet, classification badge, risk score, and "Reload" button.
* **What I Should Say:**  
  > *"Every message scanned during this session is committed to our local audit trail.  
  > Here on the **Dashboard**, all telemetry is calculated from our actual scans—no hard-coded or fabricated metrics. We see the exact threat distribution and real-time posture.  
  > Moving to **Scan History**, security analysts or end users can search past messages, filter by threat tier, inspect timestamps, or reload any past scan directly back into the engine with one click."*

---

### Step 9: Explain Android Real-Time Foundation (30 seconds)

* **What I Click:**  
  Click **"Scan Message"** → Click the **"⚡ Real-Time Demo (Simulation)"** tab.
* **What I Type:**  
  Nothing.
* **What Should Appear:**  
  The simulation interface displays the **Platform Limitation Notice**:  
  *"Standard web browsers operate inside an OS security sandbox and cannot directly intercept phone SMS or system notifications."*  
  Below are simulation preset cards and the simulated incoming SMS trigger button.
* **What I Should Say:**  
  > *"An important technical distinction for our project:  
  > A web browser operates in a strict security sandbox and **cannot** directly intercept phone SMS or system notifications.  
  > To demonstrate how automated streaming works in the web UI, this tab simulates an incoming message arriving at our ingestion service.  
  > For true mobile deployment, our companion **Android module** implements a native `BroadcastReceiver` listening for `SMS_RECEIVED`. When an SMS arrives on the device, the Android service extracts the body and forwards it to our Flask API, triggering an Android system notification if phishing is detected."*

---

### Step 10: Conclusion & Viva Handover (30 seconds)

* **What I Click:**  
  Click **"How It Works"** in the navigation bar to display the architecture page.
* **What I Type:**  
  Nothing.
* **What Should Appear:**  
  The About / How It Works page displaying the verified ML facts:  
  - Dataset: UCI SMS Spam Collection (5,572 messages: 4,825 ham, 747 spam).  
  - 80/20 Stratified Split (4,457 train / 1,115 test).  
  - 97.58% test accuracy on the UCI SMS Spam Collection baseline.  
  - Dual defense layer breakdown (URL heuristics + Social Engineering).
* **What I Should Say:**  
  > *"In conclusion, PhishGuard AI successfully addresses the critical threat of smishing through a multi-layered defense model.  
  > By combining statistical machine learning with deterministic URL heuristics and social engineering behavioral analysis, we eliminate single points of failure and deliver fast, explainable, and reliable threat protection.  
  > Thank you for your time. I am now ready to answer questions from the panel."*
