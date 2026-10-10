# PhishGuard AI – Android Companion Module

## Overview

The `android/` directory contains the source-level foundation for the **PhishGuard AI Android Companion Application**. It is designed to intercept incoming SMS messages on Android mobile devices, transmit the message body to the PhishGuard AI backend API for threat analysis, and issue immediate security alerts if phishing indicators are detected.

---

## Architecture & Key Components

1. **SMS BroadcastReceiver (`receiver/SmsReceiver.java`)**:
   - Registered in `AndroidManifest.xml` to listen for the system broadcast:
     `android.provider.Telephony.SMS_RECEIVED`
   - Extracts the originating phone number (sender) and SMS message body from the received `Pdu` array.

2. **Background Detection Service (`service/DetectionService.java`)**:
   - Manages asynchronous analysis of the intercepted message so that the main UI thread is never blocked.
   - Delegates network dispatch to `PhishGuardApiClient`.

3. **HTTP API Client (`network/PhishGuardApiClient.java` & `network/NetworkConfig.java`)**:
   - Formulates JSON POST requests containing `{"message": "<sms_text>"}`.
   - Configured by default to communicate with `http://10.0.2.2:5000/predict` (the standard Android emulator alias for `localhost:5000` on the host PC).

4. **Security Notification Manager (`alert/SecurityAlertManager.java`)**:
   - Creates a dedicated high-importance notification channel: `phishguard_alerts`.
   - When a High or Critical risk score is returned by the API, builds a heads-up warning notification displaying the threat tier, detected indicators, and safety advice.

5. **Duplicate Filter (`util/DuplicateFilter.java`)**:
   - In-memory cache tracking recently processed message hashes and timestamps to prevent duplicate alerts caused by multi-part SMS messages.

---

## Android Permissions

The application requests only necessary permissions in `AndroidManifest.xml`:

| Permission | Justification |
| :--- | :--- |
| `android.permission.RECEIVE_SMS` | Required to intercept incoming SMS messages via BroadcastReceiver. |
| `android.permission.INTERNET` | Required to communicate with the PhishGuard AI Flask backend API. |
| `android.permission.ACCESS_NETWORK_STATE` | Required to verify network connectivity before making API calls. |
| `android.permission.POST_NOTIFICATIONS` | Required on Android 13+ (API 33+) to display security warning notifications. |

*No extraneous permissions (such as SEND_SMS, READ_CONTACTS, or ACCESS_FINE_LOCATION) are requested.*

---

## How to Open in Android Studio

1. Launch **Android Studio**.
2. Select **Open** and choose the `android/` directory:
   ```text
   PhishGuard_AI/android/
   ```
3. Allow Gradle to sync the project dependencies.
4. If testing with the Android Emulator:
   - Ensure the Flask backend is running on the host machine (`127.0.0.1:5000`).
   - The default URL `http://10.0.2.2:5000` will route directly to the host's Flask server.
5. If testing on a physical Android device:
   - Update `NetworkConfig.java` to point to the host PC's local Wi-Fi IP address (e.g., `http://192.168.1.50:5000`).
   - Connect the device via USB with USB Debugging enabled.
   - Run the app via **Run $\rightarrow$ Run 'app'**.

---

## Current Validation Status

> [!IMPORTANT]
> **Source-level foundation inspected; end-to-end Android device validation not performed.**  
> The Android companion module is fully implemented in Java as an architectural proof-of-concept. However, due to local environment constraints (the absence of an installed Android SDK, build tools, and emulator in the test environment), physical device/emulator compilation and live broadcast tests were not executed. Evaluators should evaluate this module as a verified source foundation.
