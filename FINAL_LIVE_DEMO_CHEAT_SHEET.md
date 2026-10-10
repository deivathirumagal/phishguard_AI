# Final Live Demo Cheat Sheet – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Audience:** College Examination Panel / Faculty Evaluators  
**Execution Order:** Exact sequential steps for the live demonstration  

---

## Pre-Demo Quick Check
- [ ] Terminal 1 open for Flask Backend
- [ ] Terminal 2 open for React Frontend
- [ ] Browser open to `http://localhost:5173/`

---

## Step-by-Step Live Demonstration Sequence

### STEP 1: Start Backend
In Terminal 1:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
& "venv\Scripts\python.exe" app.py
```
- **What to say:** *"First, we start our Python Flask backend. It loads our trained Logistic Regression model and TF-IDF vectorizer and listens on port 5000."*
- **Verify:** Terminal shows `Running on http://127.0.0.1:5000`.

---

### STEP 2: Start Frontend
In Terminal 2:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
npm run dev
```
- **What to say:** *"Next, we launch our React 19 frontend development server using Vite on port 5173."*
- **Verify:** Terminal shows `Local: http://localhost:5173/`.

---

### STEP 3: Open Scan Page
1. In your browser, open: `http://localhost:5173/`
2. Point out the green **"Backend: Online"** indicator in the navigation bar.
3. Click **"Scan Messages"** in the navigation bar.
- **What to say:** *"The navigation bar actively monitors backend health. We now navigate to the Scan Messages console, which offers both manual scanning and real-time simulation."*

---

### STEP 4: Demonstrate Legitimate Message (Safe Baseline)
1. In the **Manual Scan** tab, paste:
   ```text
   Hey, are we still meeting for lunch today?
   ```
2. Click **"Analyze Message"**.
3. **What to point out on screen:**
   - **Classification:** `Legitimate` (Green badge)
   - **Risk Score:** `5 / 100` (`Low Risk`)
   - **Confidence:** High probability (~93%) for the benign class.
   - **Explanation:** *"No major phishing indicators were detected."*
   - **Indicators:** Zero threat tags detected.
- **What to say:** *"For everyday personal communications, the ML model correctly identifies benign text, our heuristics find zero threat indicators, and the system produces a safe Low Risk score of 5 without false alarms."*

---

### STEP 5: Demonstrate Phishing Message (Critical Threat)
1. Clear the text area and paste:
   ```text
   URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example
   ```
2. Click **"Analyze Message"**.
3. **What to point out on screen:**
   - **Classification:** `Phishing` (Red badge)
   - **Risk Score:** `100 / 100` (`Critical Risk`)
   - **Pulsing Alert Banner:** Highlights critical danger.
   - **URL Analysis Card:** Flags `http://bit.ly/example` as a known shortening service hiding the real destination (+25 pts).
   - **Social Engineering Indicators:** Flags 4 active psychological vectors:
     - `Urgency`
     - `Fear/Threat`
     - `Account Verification`
     - `Authority/Impersonation`
   - **Recommendation:** *"Do not click links, provide passwords, or share personal information."*
- **What to say:** *"This smishing attack triggers every layer of defense: the ML model flags spam, the URL engine identifies the bit.ly shortener, and the behavioral engine detects urgency, fear, credential verification, and authority impersonation. The composite score reaches 100, immediately warning the user not to interact."*

---

### STEP 6: Show Real-Time Simulation
1. Click the **"Real-Time Stream"** tab on the Scan page.
2. Click **"Start Live Simulation"**.
3. Allow 2–3 simulated mobile messages to stream in.
4. When the banking threat arrives:
   - Point out the floating **Real-Time Security Alert Modal** (`RealTimeAlert.jsx`).
   - Show that it pops up with high-priority warnings and safety actions.
5. Click **"Stop Stream"**.
- **What to say:** *"In our Real-Time Stream tab, we simulate an incoming mobile SMS feed. As messages arrive, our background service automatically inspects each payload, updates telemetry, and triggers floating alert modals for critical threats."*

---

### STEP 7: Show History
1. Click **"History"** in the navigation bar.
2. Show that both the legitimate and phishing scans are logged with exact timestamps and risk tags.
3. Test the **Search Bar**: type `"bank"` to filter.
4. Test the **Risk Filter**: select `"Critical Risk"`.
- **What to say:** *"All scans are permanently logged to an audit trail in local storage. Security analysts can search by keyword or filter by risk tier to audit threat activity."*

---

### STEP 8: Show Dashboard
1. Click **"Dashboard"** in the navigation bar.
2. Point out the live telemetry metrics:
   - **Total Scans Completed**
   - **Threat Distribution** (Safe vs. Suspicious vs. Phishing breakdown)
   - **Average Threat Risk Score**
   - **Top Social Engineering Tactics Breakdown** (Urgency, Fear, Verification)
- **What to say:** *"The Dashboard aggregates live organizational telemetry, visualizing threat distribution and highlighting the most frequent manipulation tactics encountered."*

---

### STEP 9: Briefly Explain Android Integration
1. Navigate to the **About** page or open `android/` source code.
2. Point out:
   - `SmsReceiver.java`: Intercepts `android.provider.Telephony.SMS_RECEIVED`.
   - `DetectionService.java`: Calls `POST /predict` asynchronously.
   - `SecurityAlertManager.java`: Dispatches heads-up notifications.
- **What to say:** *"For mobile devices, we architected an Android companion module that intercepts SMS at the operating system level using a BroadcastReceiver. While the web interface is a simulation due to browser sandboxing, the Android module provides the foundation for native on-device protection."*

---

## 3 Golden Rules for Demo Success
1. **Speak with Confidence:** You built and verified every component; you know how it works.
2. **Be Honest About Boundaries:** Distinguish clearly between the SMS spam baseline and phishing heuristics, and between the web simulation and native Android SMS interception.
3. **Keep the Pace Steady:** Follow Steps 1 through 9 smoothly without rushing.
