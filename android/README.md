# PhishGuard AI — Android Real-Time SMS Listener Companion

The **PhishGuard AI Android Companion** is a native mobile application engineered to intercept incoming SMS messages in real time using the Android Telephony broadcast system, dispatch them to the existing PhishGuard AI Flask backend (`POST /predict`), evaluate threats using the multi-layer NLP & heuristic engines, and alert the user with high-priority security warnings when phishing or smishing attacks are detected.

---

## 1. Architectural Role & Platform Boundaries

### Why an Android Companion is Required
Modern mobile and desktop web browsers (Chrome, Safari, Firefox, Edge) operate within strict OS-level security sandboxes. **A standard web browser cannot directly intercept incoming SMS messages or system notifications.** 

To achieve end-to-end real-time protection:
1. The **Android Companion App** acts as the platform-specific listener that receives incoming SMS broadcasts at the OS level.
2. The **Flask AI Backend** performs the multi-layer NLP inference, heuristic analysis, and risk scoring.
3. The **React Web Application** provides the centralized security operations dashboard, manual scanning tools, and audit history.

---

## 2. Inbound SMS Processing Pipeline

```
Incoming SMS Broadcast (android.provider.Telephony.SMS_RECEIVED)
                           │
                           ▼
                  [ SmsReceiver.java ]
  - Checks if protection is active (user toggle)
  - Reassembles multipart SMS segments
  - Extracts sender address & full message text
                           │
                           ▼
                [ DuplicateFilter.java ]
  - Checks 15-second deduplication cache
  - Discards carrier duplicate broadcasts
                           │
                           ▼
              [ PhishGuardApiClient.java ]
  - Asynchronous HTTP POST to http://10.0.2.2:5000/predict
  - Payload: { "message": "<SMS text>" }
                           │
                           ▼
             [ Flask Backend (app.py) ]
  - TF-IDF vectorizer + Logistic Regression model
  - Defensive URL heuristics & shortening detection
  - 5-category social engineering detection
  - Risk score calculation (0–100) & risk level
                           │
                           ▼
            [ SecurityAlertManager.java ]
  - If Phishing / High Risk / Critical Risk:
      • Fires Android Heads-Up Notification (NotificationChannel)
      • Shows in-app Security Warning Banner
      • Displays Safety Directive:
        "⚠️ Do not click suspicious links or provide passwords, OTPs, or financial information."
  - If Legitimate:
      • Suppresses phishing alerts
      • Logs to Recent Scans with Safe Badge (✓)
```

---

## 3. Network Configuration & Host Setup

### A. Android Emulator (Recommended for Development)
- The Android Emulator runs in a virtual network.
- **`127.0.0.1` inside the emulator refers to the emulator itself, NOT your PC!**
- Android provides a special loopback address: **`http://10.0.2.2:5000`**, which directly routes to `127.0.0.1:5000` on your host development machine.
- The app defaults to `http://10.0.2.2:5000`.

### B. Physical Android Device (Over Wi-Fi)
1. Connect your Android phone and your development PC to the **same Wi-Fi network**.
2. Find your PC's local LAN IP address:
   - On Windows: Run `ipconfig` in PowerShell/CMD (look for IPv4 Address under your Wi-Fi adapter, e.g., `192.168.1.150`).
3. Ensure Flask is accessible from your LAN:
   - In `backend/app.py`, set `app.run(host="0.0.0.0", port=5000)`.
   - Ensure your Windows Defender Firewall permits incoming connections on port 5000.
4. In the PhishGuard Android app:
   - Tap **"Change Host"** on the main screen.
   - Enter `http://192.168.1.150:5000` and tap **Save**.
   - Tap **"Test Link"** to verify connection.

---

## 4. Permissions & Privacy Guarantees

| Permission | Purpose | Privacy Justification |
| :--- | :--- | :--- |
| `android.permission.RECEIVE_SMS` | Intercepts incoming SMS broadcasts | Only incoming messages are inspected. The app **never** requests `READ_SMS` or `WRITE_SMS` to access existing messages in storage. |
| `android.permission.INTERNET` | Reaches Flask `/predict` API | Necessary to send message text to the backend engine for classification. |
| `android.permission.ACCESS_NETWORK_STATE` | Checks Wi-Fi / data connection | Prevents crashes when network is offline. |
| `android.permission.POST_NOTIFICATIONS` | Displays heads-up threat warnings | Required on Android 13+ (API 33+) to alert users when a smishing attack arrives. |

**Zero Storage Reading:** The app does not request access to contacts, storage, camera, or location.

---

## 5. How to Run & Test the Android App

### Method 1: Using Android Studio
1. Launch **Android Studio**.
2. Select **File → Open...** and choose the `phish guard/android` folder.
3. Allow Gradle to sync dependencies (`OkHttp`, `Gson`, `Material`, `AndroidX`).
4. Select a virtual device (e.g. `Pixel 7 - API 34`) and click **Run 'app'** (`Shift + F10`).
5. Upon launch:
   - Grant SMS and Notification permissions when prompted.
   - Check the **Backend Connection** indicator (should show `● Connected`).

### Method 2: Testing with In-App Simulation Buttons
The app includes built-in test buttons:
- **`✓ Safe SMS`**: Sends `"Hey, are we still meeting for lunch today?"` through the pipeline. Result: Logged as Legitimate (Low Risk), no alarm.
- **`🚨 Phish SMS`**: Sends `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`. Result: Triggers heads-up notification and in-app threat warning card.

### Method 3: Testing Real Incoming SMS via Emulator
1. With the emulator running, click the **... (Extended controls)** icon on the emulator sidebar.
2. Select the **Phone** tab.
3. In the **SMS message** section:
   - Enter Sender Number: `+1 555-0199`
   - Enter Message:
     ```
     URGENT: Your Chase account has been locked. Verify immediately at http://bit.ly/chase-verify
     ```
   - Click **Send Message**.
4. The emulator receives the SMS, triggers `SmsReceiver`, contacts Flask, and immediately displays the PhishGuard security alert!
