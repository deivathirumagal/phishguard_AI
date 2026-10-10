# PhishGuard AI — Live Demonstration Contingency & Backup Plan

This document outlines recovery procedures and technical contingencies for the **PhishGuard AI college demonstration and viva defense**. Follow these exact steps if any unexpected environment or execution issue arises during the presentation.

---

## Contingency Matrix Overview

| Scenario | Primary Cause | Immediate Recovery Action |
|---|---|---|
| **A. Flask backend does not start** | Python venv inactive, port 5000 busy, missing package | Kill occupying PID, activate venv, start `python app.py` |
| **B. Frontend does not start** | Port 5173 occupied, missing node_modules | Run `npm run dev` with fallback port or test `dist/` preview |
| **C. API connection fails** | CORS misconfiguration, backend offline, URL typo | Verify `http://127.0.0.1:5000/predict` via PowerShell curl/test script |
| **D. Browser demo fails** | Browser tab hung, stale cache, script error | Open new Incognito window, verify dev console (F12) |
| **E. Android cannot be built** | Host lacks Android SDK/JDK in PATH | Present native Android architecture code and explain emulator/device setup |
| **F. Internet is unavailable** | College Wi-Fi disconnect | System operates 100% locally on localhost; no internet required |
| **G. localStorage/history is empty** | New browser session or cleared storage | Run the 5 predefined demo presets to populate history within 30 seconds |

---

## Detailed Contingency Procedures

---

### A. If Flask Backend Does Not Start

#### Symptoms:
- Frontend displays: *"Unable to connect to PhishGuard AI backend. Please make sure the Flask server is running."*
- Terminal shows: `Address already in use` or `ModuleNotFoundError`.

#### Exact Recovery Steps:

1. **Check if Port 5000 is occupied:**
   ```powershell
   netstat -ano | findstr :5000
   ```
   If a PID is displayed (e.g., `12345`), kill the occupying process:
   ```powershell
   taskkill /F /PID 12345
   ```

2. **Start Flask using the project virtual environment:**
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"
   & ".\venv\Scripts\Activate.ps1"
   python app.py
   ```
   *Alternative direct execution without activating shell:*
   ```powershell
   & "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend\venv\Scripts\python.exe" "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend\app.py"
   ```

3. **Verify backend health in browser or PowerShell:**
   Open a browser tab to `http://127.0.0.1:5000/` or run:
   ```powershell
   Invoke-RestMethod -Uri "http://127.0.0.1:5000/predict" -Method Post -ContentType "application/json" -Body '{"message":"test"}'
   ```
   A valid JSON response confirming prediction confirms the backend is operational.

---

### B. If Frontend Does Not Start

#### Symptoms:
- `npm run dev` hangs or throws an error.
- Browser shows `ERR_CONNECTION_REFUSED` on `http://localhost:5173`.

#### Exact Recovery Steps:

1. **Restart Vite development server:**
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
   npm run dev
   ```
   If port 5173 is in use, Vite will automatically select `http://localhost:5174`. Check terminal output and open that URL.

2. **Fallback: Serve the verified production build:**
   If Vite dev server fails to compile, run the production preview:
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
   npm run build
   npx vite preview --port 4173
   ```
   Then navigate to `http://localhost:4173/`.

---

### C. If API Connection Fails

#### Symptoms:
- Clicking "Scan Message" shows an error banner or red network error in F12 Console.

#### Exact Recovery Steps:

1. **Check browser console (F12 → Console & Network tabs):**
   Look for `CORS error` or `net::ERR_CONNECTION_REFUSED`.

2. **Confirm backend CORS settings:**
   The backend in `app.py` has `CORS(app)` enabled across all routes. Ensure the frontend is calling:
   `http://127.0.0.1:5000/predict` (NOT `localhost:5000` or `10.0.2.2`).

3. **Validate backend directly via test script:**
   Run our scratch test script from PowerShell:
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"
   node test_backend_validation.js
   ```
   This tests all endpoints and logs exact response objects to pinpoint the failure.

---

### D. If Browser Demo Fails or UI Freezes

#### Symptoms:
- Clicking buttons causes no response; page appears frozen.

#### Exact Recovery Steps:

1. **Hard Refresh:**
   Press `Ctrl + F5` or `Ctrl + Shift + R` to bypass cached JavaScript bundles.

2. **Open Incognito / InPrivate Window:**
   Press `Ctrl + Shift + N` (Chrome/Edge) and navigate to `http://localhost:5173/scan`.
   This eliminates interference from third-party browser extensions (ad blockers, script shields).

3. **Check for Uncaught JavaScript Errors:**
   Press `F12` → Console. If an error is shown, reload the page or click "Clear" to reset React state.

---

### E. If Android Companion App Cannot Be Built on Demo Machine

#### Technical Context:
- The Android project source code is fully implemented under `phish guard/android/`.
- Building an Android APK requires the Android SDK, Gradle, and Java Development Kit (JDK 17+), which may not be configured on a faculty presentation laptop.

#### Honest Defense & Explanation for Faculty:

1. **Do NOT fabricate build results or pretend a live APK is running if the SDK is missing.**
2. **Open and explain the Android source structure directly in the IDE:**
   - **`SmsReceiver.kt`** (`android/app/src/main/java/com/phishguard/ai/receiver/SmsReceiver.kt`):
     Explain how Android intercepts incoming messages via `android.provider.Telephony.SMS_RECEIVED` using standard `Telephony.Sms.Intents.getMessagesFromIntent(intent)`.
   - **`DetectionService.kt`** (`android/app/src/main/java/com/phishguard/ai/service/DetectionService.kt`):
     Explain the background coroutine that calls the backend using OkHttp/Retrofit.
   - **`AndroidManifest.xml`**:
     Show declared permissions: `RECEIVE_SMS`, `READ_SMS`, `INTERNET`, `POST_NOTIFICATIONS`.
   - **Address Mapping Note:**
     Point out that inside an Android emulator, the host backend address must be `http://10.0.2.2:5000`, whereas on physical devices on the same Wi-Fi, it uses the host machine's LAN IP.
3. **Show the Web Simulation Tab:**
   Transition back to the browser: *"Because browsers sandbox SMS access, we built the Real-Time Demo simulation in the web app to demonstrate the exact same streaming ingestion pipeline."*

---

### F. If Internet Connection Is Unavailable

#### Context:
- College presentation halls frequently experience unstable or restricted Wi-Fi.

#### Architecture Guarantee:
- **PhishGuard AI operates 100% locally on localhost:**
  - Frontend runs on `http://localhost:5173`
  - Backend runs on `http://127.0.0.1:5000`
  - ML model (`phishing_model.pkl`) and TF-IDF vectorizer (`tfidf_vectorizer.pkl`) run entirely in-process using scikit-learn.
  - URL analysis uses static regex and heuristic parsing; **no external DNS queries or WHOIS lookups are made**.
  - History is preserved locally in browser `localStorage`.
- **Verdict:** PhishGuard AI has zero external runtime cloud dependencies and functions perfectly offline.

---

### G. If localStorage / Scan History Is Empty

#### Symptoms:
- Dashboard shows `0 Messages Scanned` and History displays *"No scan records found."*

#### Rapid 30-Second Recovery Sequence:

1. Navigate to `http://localhost:5173/scan`.
2. Click **"DEMO 1 — Legitimate"** → Click **"🛡️ Scan Message"** (2 seconds).
3. Click **"DEMO 2 — Banking Phishing"** → Click **"🛡️ Scan Message"** (2 seconds).
4. Click **"DEMO 3 — Delivery Scam"** → Click **"🛡️ Scan Message"** (2 seconds).
5. Click **"DEMO 4 — Reward Scam"** → Click **"🛡️ Scan Message"** (2 seconds).
6. Click **"DEMO 5 — Safe Message"** → Click **"🛡️ Scan Message"** (2 seconds).
7. Navigate to **Dashboard** (`/dashboard`):
   - Total Scans will immediately display `5`.
   - Legitimate count: `2`, Phishing count: `3`.
   - Threat distribution bar will show 40% Legitimate / 60% Phishing.
   - Recent Scans table will display all 5 entries with complete timestamps and risk tiers.
