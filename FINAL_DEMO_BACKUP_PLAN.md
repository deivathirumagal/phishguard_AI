# Final Live Demo Backup & Troubleshooting Plan – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Purpose:** Rapid, practical troubleshooting steps for viva examiners and presenters during unexpected live demonstration issues.  
**Rule:** Use only lightweight, local, and immediate solutions that match the existing project. Do NOT attempt large dependency reinstalls or framework upgrades right before or during the viva!

---

## Quick Diagnostic Checklist

| Issue | Quick Symptom | Immediate 10-Second Fix |
| :--- | :--- | :--- |
| **1. Flask does not start** | Port 5000 in use or venv inactive | Kill occupying PID on port 5000, start via `venv\Scripts\python.exe app.py`. |
| **2. Frontend does not start** | Port 5173 busy | Vite automatically tries `http://localhost:5174/`. Open that URL. |
| **3. API connection fails** | Red "Backend: Offline" pill | Verify Flask is running on port 5000; check terminal output. |
| **4. Prediction fails (400/500)**| Red error alert in UI | Ensure message box is not empty; use preset button instead. |
| **5. Browser tab hangs/fails** | Frozen tab / stale scripts | Open a fresh browser window in Incognito/Private mode. |
| **6. Real-time demo fails** | Stream does not start | Click "Stop Stream", refresh page, click "Start Live Simulation". |
| **7. History is empty** | No past scans visible | Click and run 2–3 preset buttons in Scan to populate history immediately. |

---

## Detailed Contingency Procedures

---

### Contingency 1: If Flask Does Not Start
**Symptoms:** Terminal shows `Address already in use` or python exits immediately.

**Immediate Fix:**
1. Open PowerShell and find the process occupying port 5000:
   ```powershell
   netstat -ano | findstr :5000
   ```
2. If a PID (e.g., `12345`) appears in the rightmost column, kill it:
   ```powershell
   taskkill /F /PID 12345
   ```
3. Restart Flask using the project's exact virtual environment:
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
   & "venv\Scripts\python.exe" app.py
   ```
4. Verify backend responds by opening `http://127.0.0.1:5000/` in your browser (should show `{"service": "PhishGuard AI API", "status": "online"}`).

---

### Contingency 2: If Frontend Does Not Start
**Symptoms:** `npm run dev` fails with `port already in use` or exits.

**Immediate Fix:**
1. If port 5173 is occupied, Vite will usually display:
   ```text
   Port 5173 is in use, trying another one...
   ➜  Local:   http://localhost:5174/
   ```
   Simply open `http://localhost:5174/` in your browser!
2. If node processes are stuck, kill lingering node processes:
   ```powershell
   taskkill /F /IM node.exe
   ```
3. Restart frontend:
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
   npm run dev
   ```

---

### Contingency 3: If API Connection Fails (Red "Backend: Offline" Badge)
**Symptoms:** The navbar shows a red pill saying **"Backend: Offline"**, or the scan button says *"Unable to connect to PhishGuard AI backend"*.

**Immediate Fix:**
1. Check Terminal 1 to ensure Flask is still active and listening on `http://127.0.0.1:5000`.
2. Test the connection directly in PowerShell without touching the browser:
   ```powershell
   Invoke-RestMethod -Uri "http://127.0.0.1:5000/" -Method Get
   ```
3. If it returns `{"service": "PhishGuard AI API", "status": "online"}`, refresh the browser page (`Ctrl + F5`).
4. If CORS error is suspected, verify that Flask was started from `backend/app.py` (which includes `CORS(app)`).

---

### Contingency 4: If Prediction Fails (Error Alert Displayed)
**Symptoms:** Clicking "Analyze Message" displays an error alert: *"Message is required"* or *"Failed to analyze message"*.

**Immediate Fix:**
1. **Empty input:** If the input is blank or whitespace, the backend intentionally returns HTTP 400. Explain this to the examiner as proper input validation!
2. **Use Presets:** Instead of typing manually, click one of the pre-configured preset buttons under the text area (e.g. **"Bank Account Suspension"** or **"Casual Lunch"**) and click "Analyze Message".

---

### Contingency 5: If the Browser Tab Freezes or Fails
**Symptoms:** UI elements do not respond to clicks, or old cached code is showing.

**Immediate Fix:**
1. Press `Ctrl + Shift + N` (or `Ctrl + Shift + P` in Firefox) to open a clean **Incognito / Private Browsing Window**.
2. Navigate directly to `http://localhost:5173/scan`.
3. An incognito window completely bypasses browser cache, stale service workers, and broken cookies.

---

### Contingency 6: If Real-Time Demo Fails or Stalls
**Symptoms:** Messages do not appear in the Real-Time Stream feed.

**Immediate Fix:**
1. Click **"Stop Stream"** if the button is active.
2. Hard refresh the page (`Ctrl + R`).
3. Click the **"Real-Time Stream"** tab again and click **"Start Live Simulation"**.
4. The service will restart the event loop and stream verified incoming mobile payloads.

---

### Contingency 7: If History / Dashboard is Empty
**Symptoms:** You just opened an incognito window or cleared browser data, so the History page shows *"No scan history yet"* and Dashboard counts are 0.

**Immediate Fix:**
1. Do not panic! This is normal for a fresh browser session.
2. Go to **Scan Messages** $\rightarrow$ **Manual Scan**.
3. Quickly click and analyze 3 preset buttons:
   - Preset 1: Casual Lunch (adds Legitimate record)
   - Preset 2: Bank Suspension (adds Critical Phishing record)
   - Preset 3: Delivery Fee (adds Medium Risk record)
4. Within 15 seconds, your History and Dashboard will be fully populated with realistic live data!

---

## Golden Viva Rule
If something unexpected happens during the presentation, remain calm, state what occurred technically (e.g., *"The port was momentarily busy, let me restart the service"*), and execute the 10-second fix. Examiners respect poise, quick diagnosis, and technical troubleshooting far more than a scripted presentation!
