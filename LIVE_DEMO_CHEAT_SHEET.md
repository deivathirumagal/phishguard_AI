# PhishGuard AI — Live Demo Cheat Sheet

A quick-reference execution guide for demonstrating **PhishGuard AI** to the examination panel in 5–7 minutes.

---

## 1. Startup Commands

### Terminal 1 — Python Flask Backend:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
& "venv\Scripts\python.exe" app.py
```
*Wait for: `* Running on http://127.0.0.1:5000`*

### Terminal 2 — React Frontend:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
npm run dev
```
*Wait for: `➜ Local: http://localhost:5173/`*

---

## 2. Step-by-Step Demo Sequence

| Step | Action | What to Click / Type | Expected Output | What to Say |
|:---:|:---|:---|:---|:---|
| **1** | Open Terminal | Open PowerShell Terminal 1 | Shell ready | *"I am opening the terminal to start our backend service."* |
| **2** | Start Backend | Run backend command above | Server listening on port 5000 | *"Our Python Flask backend is running, loading the Logistic Regression model and TF-IDF vectorizer."* |
| **3** | Open 2nd Terminal | Open PowerShell Terminal 2 | Shell ready | *"Opening a second terminal for the frontend."* |
| **4** | Start Frontend | Run frontend command above | Vite ready on port 5173 | *"Launching our React 19 frontend using Vite."* |
| **5** | Open Browser | Navigate to `http://localhost:5173/` | PhishGuard AI Home Page | *"Here is the PhishGuard AI application."* |
| **6** | Open Scan Page | Click **"Scan Message"** in navbar | Scan Page with demo presets & pipeline | *"Navigating to the Scan Message page with our 8-stage pipeline banner."* |
| **7** | Scan Legitimate | Click **"DEMO 1 — Legitimate"** $\rightarrow$ Click **"🛡️ Scan Message"** | Preset loads: `"Hey, are we still meeting for lunch today?"` | *"Let's test a normal personal message."* |
| **8** | Explain Result | Point to Executive Verdict Summary | `Legitimate`, `5/100`, `Low Risk`, no alert | *"The system classifies it as Legitimate with a Low Risk score of 5/100. The security alert is suppressed."* |
| **9** | Scan Phishing | Click **"DEMO 2 — Banking Phishing"** $\rightarrow$ Click **"🛡️ Scan Message"** | Preset loads: `"URGENT! Your bank account has been suspended..."` | *"Now testing an urgent banking smishing attack."* |
| **10** | Explain Risk | Point to Executive Verdict Summary & Card 2 | `Phishing`, `100/100`, `Critical Risk` | *"Immediately, the system flags this as Critical Risk with a score of 100 out of 100."* |
| **11** | Show URL Analysis | Point to **Card 5: URL Analysis** | Flagged `true`: Known shortener (`bit.ly`) masking destination | *"Our URL engine passively identifies that bit.ly hides the real destination domain."* |
| **12** | Show Social Eng. | Point to **Card 4** & **Card 6** | Active flags: Urgency, Fear/Threat, Verification, Authority | *"Our behavioral engine detected four social engineering vectors: urgency, fear, verification, and authority impersonation."* |
| **13** | Show Alert | Point to pulsing red **Security Alert Banner** | High-contrast red alert with safety directives | *"The pulsing red alert gives the user immediate safety advice: do not click links or share passwords."* |
| **14** | Open History | Click **"Scan History"** in navbar $\rightarrow$ Type `"bank"` in search box | Filtered table showing banking attack with 1-click reload | *"Every scan is stored locally in the browser. Users can search and filter past records."* |
| **15** | Open Dashboard | Click **"Dashboard"** in navbar | Metric cards & Threat Distribution bar | *"The Dashboard computes real-time threat distribution directly from our actual scan history."* |
| **16** | Open Real-Time | Click **"Scan Message"** $\rightarrow$ Click **"⚡ Real-Time Demo (Simulation)"** tab | Simulation interface with platform limitation notice | *"Now let us look at our real-time ingestion foundation."* |
| **17** | Simulate Phishing | Click **"🚨 Banking Smishing"** $\rightarrow$ Click **"⚡ Simulate Incoming Message"** | Real-time incoming alert triggered | *"The simulation exercises automated stream ingestion with a 15-second deduplication filter."* |
| **18** | Explain Android | Point to **"Android Listener Ready"** badge | Architecture explanation | *"For true mobile deployment, our Android companion module uses a BroadcastReceiver listening for `SMS_RECEIVED`."* |
| **19** | Finish | Click **"How It Works"** in navbar | Dataset facts: 5,572 messages, 97.58% test accuracy | *"To conclude, PhishGuard AI combines ML with heuristics for defense-in-depth. Thank you!"* |

---

## 3. Approved Faculty Demo Presets

1. **DEMO 1 (Legitimate):** `"Hey, are we still meeting for lunch today?"` $\rightarrow$ `Legitimate`, `5/100`, `Low Risk`
2. **DEMO 2 (Banking Phishing):** `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"` $\rightarrow$ `Phishing`, `100/100`, `Critical Risk`
3. **DEMO 3 (Delivery Scam):** `"FedEx: Your package is waiting. Pay the customs fee immediately at http://bit.ly/example"` $\rightarrow$ `Phishing`, `50/100`, `Medium Risk` (Heuristic escalation)
4. **DEMO 4 (Reward Scam):** `"Congratulations! You have won a cash reward. Claim your prize now at http://bit.ly/example"` $\rightarrow$ `Phishing`, `50/100`, `Medium Risk`
5. **DEMO 5 (Safe Meeting):** `"Don't forget our project meeting at 4 PM tomorrow."` $\rightarrow$ `Legitimate`, `5/100`, `Low Risk`
