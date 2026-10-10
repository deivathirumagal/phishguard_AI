# Final Run & Demonstration Guide – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Document Type:** Final Evaluator & Viva Demonstration Run Guide  
**Date:** September 20, 2026  

---

## 1. System Requirements
- **Operating System:** Windows 10/11, macOS, or Linux
- **Node.js:** v18.0.0 or later (includes npm)
- **Python:** Python 3.9 to 3.12 with `venv`
- **Modern Web Browser:** Google Chrome, Microsoft Edge, or Mozilla Firefox

---

## 2. Step-by-Step Execution Sequence

### STEP 1: Open First PowerShell Terminal (Backend)
Launch Windows PowerShell (or your preferred terminal).

---

### STEP 2: Start the Python Flask Backend
Navigate to the `backend` directory and start Flask with its virtual environment:

```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
& "venv\Scripts\python.exe" app.py
```

**Expected Terminal Output:**
```text
 * Serving Flask app 'app'
 * Debug mode: off
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```
*(Leave this terminal window running in the background).*

---

### STEP 3: Open Second PowerShell Terminal (Frontend)
Launch a second Windows PowerShell terminal window.

---

### STEP 4: Start the React Frontend Dev Server
Navigate to the project root and start the Vite dev server:

```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
npm run dev
```

**Expected Terminal Output:**
```text
  VITE v8.2.1  ready in ~200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### STEP 5: Open the Local Vite URL
Open your web browser and navigate to:
```text
http://localhost:5173/
```
Verify that the **PhishGuard AI** landing page loads with the green **"Backend: Online"** indicator in the navigation bar.

---

### STEP 6: Open the Scan Page
Click **"Scan Messages"** in the top navigation bar or the **"Start Scanning Now"** button on the home page.

---

### STEP 7: Test Legitimate Message (Safe Case)
1. In the **Manual Scan** tab, paste the following message:
   ```text
   Hey, are we still meeting for lunch today?
   ```
2. Click **"Analyze Message"**.
3. **Verify Result:**
   - Classification: `Legitimate` (Green badge)
   - Risk Score: `5 / 100` (`Low Risk`)
   - Indicators: `None`
   - Explanation: *"No major phishing indicators were detected."*

---

### STEP 8: Test Phishing Message (Critical Threat Case)
1. Clear the input box and paste this credential-harvesting smishing message:
   ```text
   URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example
   ```
2. Click **"Analyze Message"**.
3. **Verify Result:**
   - Classification: `Phishing` (Red badge)
   - Risk Score: `100 / 100` (`Critical Risk`)
   - ML Model Prediction: `spam`

---

### STEP 9: Show URL & Social Engineering Analysis
Point out the detailed threat breakdown cards below the main result:
- **URL Analysis Card:** Shows `http://bit.ly/example` flagged as a known URL shortening service.
- **Social Engineering Card:** Shows 4 active indicators detected:
  - `Urgency`
  - `Fear/Threat`
  - `Account Verification`
  - `Authority/Impersonation`
- **Recommendation:** *"Do not click links, provide passwords, or share personal information."*

---

### STEP 10: Show Security Alert Banner
Notice the high-priority **Critical Risk Alert Banner** displayed across the top of the scan results:
- Highlights the immediate danger.
- Provides one-click action to copy recommendations or safely discard the threat.

---

### STEP 11: Show Audit History
1. Click **"History"** in the navigation bar.
2. Observe that both of your recent scans are permanently logged with timestamps, risk tiers, and extracted indicators.
3. Demonstrate the **Search Bar** (type `"bank"` to filter).
4. Demonstrate the **Risk Filter** (select `"Critical Risk"`).

---

### STEP 12: Show Analytics Dashboard
1. Click **"Dashboard"** in the navigation bar.
2. Point out the live telemetry metrics:
   - **Total Scanned Messages**
   - **Threat Detection Breakdown** (Phishing vs. Legitimate counts)
   - **Average Threat Risk Score**
   - **Top Social Engineering Tactics Breakdown**

---

### STEP 13: Show Real-Time Simulation
1. Return to **"Scan Messages"** and select the **"Real-Time Stream"** tab.
2. Click **"Start Live Simulation"**.
3. Watch the simulated incoming mobile message feed arrive in real time.
4. When a phishing message arrives:
   - The floating **Real-Time Security Alert Modal** pops up.
   - The message is automatically analyzed, scored, and logged to History and Dashboard.
5. Click **"Stop Stream"** to pause.

---

## 3. Troubleshooting & Quick Fixes

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Backend: Offline" (Red pill in navbar)** | Flask server not started or on wrong port | Ensure Step 2 terminal is running and listening on `http://127.0.0.1:5000`. |
| **CORS Error in Browser Console** | Missing Flask-CORS headers | `backend/app.py` already includes `CORS(app)`. Restart backend server if needed. |
| **Port 5000 Already in Use** | Ghost Python process | In PowerShell, run: `Get-Process python \| Stop-Process -Force`, then restart `app.py`. |
| **Port 5173 Already in Use** | Previous Vite dev server | Vite will automatically switch to `http://localhost:5174/`. Open that URL instead. |
| **History not persisting** | Browser in strict incognito mode | Normal browsing mode supports standard `localStorage` persistence. |
