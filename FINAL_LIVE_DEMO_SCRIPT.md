# PhishGuard AI — Final Live Demonstration Script

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Format:** 19-Step Exact Sequential Live Demonstration Script  
**Audience:** Faculty Examination Panel & External Evaluators  

---

## Pre-Demo Checklist

1. **Terminal 1 (Flask Backend):**
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
   & ".\venv\Scripts\Activate.ps1"
   python app.py
   ```
   *Verify output displays: `Running on http://127.0.0.1:5000`*

2. **Terminal 2 (React Frontend):**
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
   npm run dev
   ```
   *Verify output displays: `Local: http://localhost:5173/`*

3. **Browser Window:**
   Open Google Chrome or Microsoft Edge to `http://localhost:5173/`.

---

## 19-Step Live Demonstration Sequence

---

### Step 1: Start Flask Backend
- **What I Click / Type in Terminal 1:**
  ```powershell
  cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
  & ".\venv\Scripts\Activate.ps1"
  python app.py
  ```
- **What Should Appear in Terminal 1:**
  Flask initializes and displays:
  `* Serving Flask app 'app'`  
  `* Running on http://127.0.0.1:5000`
- **What I Should Say:**
  > *"I am starting our Python Flask REST backend server. It loads our trained Logistic Regression model and TF-IDF vectorizer and begins listening for incoming detection requests on port 5000."*

---

### Step 2: Start React Frontend
- **What I Click / Type in Terminal 2:**
  ```powershell
  cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
  npm run dev
  ```
- **What Should Appear in Terminal 2:**
  Vite compiles the frontend in under 300ms and outputs:
  `VITE v8.2.1 ready in 250 ms`  
  `➜ Local: http://localhost:5173/`
- **What I Should Say:**
  > *"Next, I launch our React frontend using the Vite development server on port 5173. The frontend is built with React 19 and custom responsive CSS."*

---

### Step 3: Open Application
- **What I Click:**
  Open browser and navigate to `http://localhost:5173/`.
- **What I Type:**
  None.
- **What Should Appear:**
  The PhishGuard AI home page renders with the top navigation bar (Home, Dashboard, Scan Message, Scan History, How It Works, Quick Scan) and the hero section explaining the multi-layer defense engine.
- **What I Should Say:**
  > *"Here is the PhishGuard AI web application. From the navigation bar, users can access the Scanner, view the Security Dashboard, search Scan History, or review the system architecture."*

---

### Step 4: Show Scan Page
- **What I Click:**
  Click **"Scan Message"** in the navigation bar.
- **What I Type:**
  None.
- **What Should Appear:**
  The Scan Message page opens showing:
  1. The **Detection Workflow Pipeline** banner: *"ML Classification + URL/Social Engineering Analysis → Risk Assessment"*.
  2. The **Manual Scan** tab with a message textarea.
  3. Five predefined **Faculty Demo Presets** (DEMO 1 to DEMO 5).
  4. The awaiting message card on the right.
- **What I Should Say:**
  > *"This is our primary message scanning interface. At the top, you can see our complete detection pipeline banner. On the left is the manual input area, and on the right is the dynamic evaluation report. To make demonstration seamless, we have built-in five faculty demo presets that route through our actual backend."*

---

### Step 5: Scan Legitimate Message
- **What I Click:**
  Click the preset button: **"DEMO 1 — Legitimate"**  
  Then click the blue **"🛡️ Scan Message"** button.
- **What I Type:**
  Preset loads automatically: `"Hey, are we still meeting for lunch today?"`
- **What Should Appear:**
  A brief loading animation (`"Analyzing message..."`), followed immediately by the green-themed evaluation report.
- **What I Should Say:**
  > *"First, I will test a benign personal SMS: 'Hey, are we still meeting for lunch today?'. When I click 'Scan Message', an asynchronous POST request is dispatched to our Flask backend."*

---

### Step 6: Explain Low Risk Result
- **What I Click:**
  Point cursor to the **Executive Verdict Summary** at the top of the result panel.
- **What I Type:**
  None.
- **What Should Appear:**
  - Executive Verdict: `Legitimate`
  - Composite Risk Score: `5/100` (`Low Risk`)
  - Primary Reason: *"No major phishing indicators were detected."*
  - Recommended Action: *"No immediate phishing indicators detected, but remain cautious."*
  - **No disruptive red alert banner** is displayed.
- **What I Should Say:**
  > *"Notice the result: The message is classified as Legitimate with a Low Risk score of only 5 out of 100. Our system generates a clear reason and safety advice. Because this is a safe message, no disruptive security warning is shown, ensuring a smooth experience for ordinary communication."*

---

### Step 7: Scan Phishing Message
- **What I Click:**
  Click the preset button: **"DEMO 2 — Banking Phishing"**  
  Then click **"🛡️ Scan Message"**.
- **What I Type:**
  Preset loads automatically: `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`
- **What Should Appear:**
  The evaluation report immediately updates with a red theme (`risk-danger`) and a pulsing red alert banner at the top.
- **What I Should Say:**
  > *"Now let us test an active smishing attack: 'URGENT! Your bank account has been suspended. Verify your account immediately by clicking bit.ly...'. When I scan this message, our hybrid engine immediately detects multiple threat vectors."*

---

### Step 8: Show Classification
- **What I Click:**
  Point cursor to **Card 1: AI Detection Result**.
- **What I Type:**
  None.
- **What Should Appear:**
  - Status pill: `Phishing` (Red)
  - Classification title: `Phishing`
  - Model Category: `Spam / Malicious`
  - Risk Level: `Critical Risk`
- **What I Should Say:**
  > *"In Card 1, the AI classification verdict is Phishing, categorized as Spam/Malicious with a Critical Risk rating."*

---

### Step 9: Show Risk Score
- **What I Click:**
  Point cursor to **Card 2: Risk Score Analysis**.
- **What I Type:**
  None.
- **What Should Appear:**
  - Risk score: `100/100`
  - The 4-tier gauge highlights the **Critical Risk (80–100)** badge.
  - The progress meter is filled to 100% in red with the marker tag pointing to `100/100`.
- **What I Should Say:**
  > *"In Card 2, you can see our composite Risk Score: 100 out of 100. The visual meter shows the score placed in the highest tier: Critical Risk. This score is calculated by combining model confidence with penalties for shortened links and urgency."*

---

### Step 10: Show URL Analysis
- **What I Click:**
  Scroll down slightly and point to **Card 5: URL Analysis**.
- **What I Type:**
  None.
- **What Should Appear:**
  - Status pill: `⚠️ Suspicious Link Detected`
  - URL Detected: `Yes` | Suspicious URL: `Yes`
  - Detected URL: `http://bit.ly/example`
  - Reason: *"Uses a known URL shortening service (bit.ly) which hides the real destination"*
- **What I Should Say:**
  > *"In Card 5, our URL analysis engine identified the link `http://bit.ly/example`. Without connecting to the link, our heuristic parser flagged that it uses a URL shortening service that conceals the true destination domain from the victim."*

---

### Step 11: Show Social Engineering Indicators
- **What I Click:**
  Point to **Card 4 (Phishing Indicators)** and **Card 6 (Social Engineering Analysis)**.
- **What I Type:**
  None.
- **What Should Appear:**
  - Card 4 tags: `⚠️ Urgency`, `⚠️ Fear/Threat`, `⚠️ Account Verification`, `⚠️ Authority/Impersonation`.
  - Card 6 checklist:
    - `✓ Urgency detected`
    - `✓ Fear/threat detected`
    - `✓ Account verification detected`
    - `✓ Authority/impersonation detected`
    - `✗ Reward language not detected`
- **What I Should Say:**
  > *"In Cards 4 and 6, our social engineering engine flagged four distinct psychological manipulation vectors: artificial urgency, fear of account suspension, account verification prompts, and authority impersonation. Each indicator is clearly highlighted in the checklist."*

---

### Step 12: Show Security Warning
- **What I Click:**
  Scroll back up to the **Real-Time Security Alert** banner and **Card 8 (Security Recommendation)**.
- **What I Type:**
  None.
- **What Should Appear:**
  - Pulsing Red Security Alert:  
    `🚨 CRITICAL PHISHING ALERT DETECTED`  
    `Threat Level: Critical Risk | Risk Score: 100/100`  
    Directive: *"Do not click links, provide passwords, or share personal information."*
- **What I Should Say:**
  > *"Here is the security alert that warns the user immediately. It gives a clear, non-technical safety directive: 'Do not click links, provide passwords, or share personal information. Contact your bank using their official phone number or website'."*

---

### Step 13: Open History
- **What I Click:**
  Click **"Scan History"** in the top navigation bar.  
  Type `"bank"` into the search box, then click the **"🚨 Phishing"** filter tab.
- **What I Type:**
  `bank`
- **What Should Appear:**
  - The History table filters instantly to show the banking smishing scan.
  - Shows timestamp, message snippet, `Phishing` status badge, risk score `100/100`, and a blue **"Reload"** button.
- **What I Should Say:**
  > *"Moving to the Scan History page, every message analyzed is stored in the browser's local storage. Users and analysts can filter by threat category, search for specific keywords like 'bank', and click 'Reload' to re-inspect any historical message."*

---

### Step 14: Open Dashboard
- **What I Click:**
  Click **"Dashboard"** in the top navigation bar.
- **What I Type:**
  None.
- **What Should Appear:**
  - Metric Cards:
    - Total Messages Scanned (e.g., `2` or more)
    - Legitimate Messages (`1`)
    - Suspicious Messages (`0`)
    - Phishing Detected (`1`)
  - Threat Distribution progress bar showing exact percentages.
  - Recent Activity table showing the latest scans.
- **What I Should Say:**
  > *"On the Security Dashboard, all telemetry is calculated live from our actual scan history. There are zero fabricated or hard-coded statistics. We see the exact breakdown of legitimate vs. phishing messages and the overall threat posture."*

---

### Step 15: Open Real-Time Demo Tab
- **What I Click:**
  Click **"Scan Message"** in the navigation bar, then click the **"⚡ Real-Time Demo (Simulation)"** tab.
- **What I Type:**
  None.
- **What Should Appear:**
  The simulation interface opens, displaying the **Platform Limitation Notice**:
  *"Standard web browsers operate inside an OS security sandbox and cannot directly intercept phone SMS or system notifications. This interactive simulator exercises PhishGuard's automated ingestion foundation..."*
- **What I Should Say:**
  > *"Now let us look at our real-time detection feature. As clearly stated in this platform notice, standard web browsers operate in an OS sandbox and cannot directly read a phone's SMS. Therefore, this tab provides an interactive simulation of our background ingestion stream."*

---

### Step 16: Simulate Phishing Message
- **What I Click:**
  Click the simulation preset: **"🚨 Banking Smishing"**  
  Then click **"⚡ Simulate Incoming Message"**.
- **What I Type:**
  None (preset auto-loads).
- **What Should Appear:**
  Loading indicator displays `"Intercepting & Analyzing..."` for a fraction of a second.
- **What I Should Say:**
  > *"I select the simulated incoming message: 'URGENT: Your Chase checking account has been locked...' and click 'Simulate Incoming Message'. This triggers our automated background ingestion service."*

---

### Step 17: Show Resulting Alert
- **What I Click:**
  Point to the resulting red security alert banner.
- **What I Type:**
  None.
- **What Should Appear:**
  The evaluation report appears with the `RealTimeAlert` badge marked as a Real-Time Incoming Alert with Critical Risk.
- **What I Should Say:**
  > *"The service automatically passed the incoming stream to `POST /predict`, filtered duplicates, calculated a Critical Risk score of 95/100, and immediately rendered a real-time security alert."*

---

### Step 18: Explain Android Foundation
- **What I Click:**
  Point to the **"Android Listener Ready"** badge on the simulation tab.
- **What I Type:**
  None.
- **What Should Appear:**
  The badge and architecture text.
- **What I Should Say:**
  > *"For true mobile deployment, our companion Android module implements a native BroadcastReceiver that listens for the Android `SMS_RECEIVED` system broadcast. When an SMS arrives on the device, the Android service extracts the message body, calls our Flask backend, and triggers a system heads-up notification. Actual end-to-end device testing of the Android companion requires an Android Studio and SDK environment."*

---

### Step 19: Finish with Limitations & Future Scope
- **What I Click:**
  Click **"How It Works"** in the navigation bar to return to the methodology page.
- **What I Type:**
  None.
- **What Should Appear:**
  The About page showing the verified dataset facts (5,572 messages, 80/20 split, 97.58% test accuracy on UCI SMS baseline).
- **What I Should Say:**
  > *"To conclude: PhishGuard AI provides a practical, multi-layered cyber defense system. While our baseline model achieved 97.58% test accuracy on the UCI SMS benchmark, our hybrid URL and social engineering heuristic engines ensure we detect targeted phishing attacks that standalone models miss. In the future, we plan to integrate transformer models like DistilBERT and live threat intelligence APIs.  
  > Thank you, professors. That concludes the live demonstration, and I am now ready for your questions."*
