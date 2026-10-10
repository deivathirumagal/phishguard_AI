# PhishGuard AI — Live Demonstration Backup & Contingency Plan

This document provides exact technical recovery commands and procedures if any system component fails during the live college demonstration.

---

## Contingency Matrix

| Issue Scenario | Immediate Symptom | Exact Recovery Command / Action |
|---|---|---|
| **1. Backend Fails to Start** | Port 5000 in use or Python error | Check port PID and kill, then restart using virtual environment python executable |
| **2. Frontend Fails to Start** | Vite dev server hangs or port 5173 occupied | Run `npm run build` followed by `npx vite preview` |
| **3. API Connection Fails** | Frontend shows "Unable to connect" | Verify backend via PowerShell curl / node fetch; verify CORS |
| **4. Browser Automation Unavailable** | Headless browser testing tools missing | Explain honestly: automated browser testing tools not installed on host machine; demonstrate via live manual UI |
| **5. Scan History is Empty** | Dashboard shows 0 scans | Click DEMO 1 $\rightarrow$ Scan, then DEMO 2 $\rightarrow$ Scan (takes 10 seconds to populate) |
| **6. Android Cannot Build** | Missing Android SDK / Gradle in PATH | Show Kotlin source code in IDE and explain architecture; do NOT fake APK build |
| **7. Internet is Unavailable** | College Wi-Fi disconnects | No action needed: PhishGuard AI runs 100% locally on localhost without cloud dependencies |

---

## Detailed Technical Recovery Procedures

### 1. If Flask Backend Fails to Start
If port 5000 is occupied by a lingering process:
```powershell
# Find occupying PID
netstat -ano | findstr :5000

# Kill process (replace <PID> with the actual number)
taskkill /F /PID <PID>

# Start Flask directly
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
& "venv\Scripts\python.exe" app.py
```

### 2. If Frontend Fails to Start
If `npm run dev` hangs or throws a port conflict:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"

# Build production bundle and preview on fallback port
npm run build
npx vite preview --port 4173
```
*Navigate browser to `http://localhost:4173/`.*

### 3. If API Connection Fails
Test backend directly from PowerShell using Node.js fetch:
```powershell
cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
node -e "fetch('http://127.0.0.1:5000/predict', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message:'test'})}).then(r=>r.json()).then(d=>console.log(d))"
```
If this outputs a JSON response, the backend is working properly. Check the browser console (F12) for ad-blockers or proxy interference.

### 4. If Browser Automation is Unavailable
- **Honest Academic Statement:**  
  *"Headless browser testing tools (e.g., Playwright/Puppeteer) are not installed in this environment. As documented in our test report, we demonstrate all user flows live in the standard web browser."*

### 5. If Scan History & Dashboard are Empty
If the browser was opened in Incognito mode or `localStorage` was cleared:
1. Go to `http://localhost:5173/scan`.
2. Click **"DEMO 1 — Legitimate"** $\rightarrow$ Click **"🛡️ Scan Message"** (3 seconds).
3. Click **"DEMO 2 — Banking Phishing"** $\rightarrow$ Click **"🛡️ Scan Message"** (3 seconds).
4. Click **"DEMO 3 — Delivery Scam"** $\rightarrow$ Click **"🛡️ Scan Message"** (3 seconds).
5. Open **"Dashboard"** $\rightarrow$ Telemetry immediately reflects 3 messages with 33% Legitimate and 67% Phishing.

### 6. If Android Companion Cannot Build on Host
- **Honest Academic Statement:**  
  *"The native Android companion architecture is fully implemented in Kotlin under `phish guard/android/`. However, our presentation machine does not have the Android SDK or emulator configured in its PATH. Here is the native source code in the IDE showing `SmsReceiver.kt` listening for `SMS_RECEIVED` and `DetectionService.kt` calling our Flask API."*

### 7. If Internet is Unavailable
- PhishGuard AI is completely self-contained. The Flask backend, scikit-learn models, and React frontend communicate exclusively via local loopback (`http://127.0.0.1:5000` and `http://localhost:5173`).
- URL analysis is performed using static regex; **no live DNS queries or WHOIS calls are made**. The entire demonstration operates 100% offline.
