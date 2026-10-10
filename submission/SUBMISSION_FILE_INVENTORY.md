# PhishGuard AI – Submission Package File Inventory

**Package Name:** `PhishGuard_AI_Final_Submission.zip`  
**Root Folder Inside Archive:** `PhishGuard_AI/`  
**Generated Date:** September 20, 2026  

---

## 1. Top-Level Files

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `README.md` | Markdown | Main project landing page, architecture overview, setup instructions | No (Documentation) |
| `SUBMISSION_FILE_INVENTORY.md` | Markdown | Complete package inventory and execution requirements | No (Documentation) |

---

## 2. Frontend Application (`frontend/`)

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `frontend/package.json` | JSON | Node.js project manifest, dependencies, and build scripts | **Yes** |
| `frontend/package-lock.json` | JSON | Pinned npm dependency lockfile | **Yes** |
| `frontend/vite.config.js` | JavaScript | Vite build bundler configuration with React plugin | **Yes** |
| `frontend/index.html` | HTML | Application HTML entry point template | **Yes** |
| `frontend/README.md` | Markdown | Frontend-specific architecture and execution guide | No (Documentation) |
| `frontend/src/main.jsx` | JavaScript | React 19 DOM mount point | **Yes** |
| `frontend/src/App.jsx` | JavaScript | Root application component and React Router configuration | **Yes** |
| `frontend/src/index.css` | CSS | Global design system styles and CSS variables | **Yes** |
| `frontend/src/App.css` | CSS | Component layout and transition styling | **Yes** |
| `frontend/src/Components/Navbar.jsx` | JavaScript | Navigation bar with live backend status indicator | **Yes** |
| `frontend/src/Components/Footer.jsx` | JavaScript | Footer component with copyright and version info | **Yes** |
| `frontend/src/Components/RealTimeAlert.jsx` | JavaScript | Floating modal alert for high-priority detected threats | **Yes** |
| `frontend/src/Components/StatCard.jsx` | JavaScript | Reusable telemetry card for dashboard metrics | **Yes** |
| `frontend/src/Components/RiskBadge.jsx` | JavaScript | Color-coded risk tier badge (Low, Med, High, Crit) | **Yes** |
| `frontend/src/Pages/Home.jsx` | JavaScript | Landing page introducing architecture and features | **Yes** |
| `frontend/src/Pages/ScanMessage.jsx` | JavaScript | Core scan interface (Manual, Real-Time stream, presets) | **Yes** |
| `frontend/src/Pages/Dashboard.jsx` | JavaScript | Live telemetry dashboard with statistical aggregates | **Yes** |
| `frontend/src/Pages/History.jsx` | JavaScript | Scan audit trail with keyword search and risk filter | **Yes** |
| `frontend/src/Pages/About.jsx` | JavaScript | Academic information, ML facts, and limitations screen | **Yes** |
| `frontend/src/Pages/Auth.jsx` | JavaScript | Mock authentication interface for security analysts | **Yes** |
| `frontend/src/services/api.js` | JavaScript | Axios/fetch client connecting to Flask `/predict` & `/` | **Yes** |
| `frontend/src/services/realtimeDetectionService.js`| JavaScript | Simulated incoming mobile message stream generator | **Yes** |
| `frontend/src/utils/historyStorage.js` | JavaScript | LocalStorage persistence utility for scan results | **Yes** |

---

## 3. Backend Application (`backend/`)

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `backend/app.py` | Python | Flask API server, `/predict`, risk scoring, and heuristics | **Yes** |
| `backend/train_model.py` | Python | Standalone ML training script for Logistic Regression | **Yes** |
| `backend/requirements.txt` | Text | Pinned Python dependency manifest | **Yes** |
| `backend/README.md` | Markdown | Backend-specific architecture and API guide | No (Documentation) |
| `backend/model/phishing_model.pkl` | Binary | Trained scikit-learn Logistic Regression classifier | **Yes** |
| `backend/model/tfidf_vectorizer.pkl` | Binary | Fitted TF-IDF vectorizer vocabulary & IDF matrix | **Yes** |
| `backend/dataset/SMSSpamCollection` | Data | UCI SMS Spam Collection benchmark dataset (5,572 items) | **Yes** |

---

## 4. Standalone Dataset & Model Directories

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `dataset/SMSSpamCollection` | Data | UCI SMS Spam Collection benchmark dataset | **Yes** |
| `model/phishing_model.pkl` | Binary | Trained Logistic Regression classifier | **Yes** |
| `model/tfidf_vectorizer.pkl` | Binary | Fitted TF-IDF vectorizer | **Yes** |

---

## 5. Android Companion Module (`android/`)

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `android/README.md` | Markdown | Android architecture, permissions, and setup instructions | No (Documentation) |
| `android/build.gradle` | Gradle | Project-level Gradle build configuration | **Yes** (For Android) |
| `android/settings.gradle` | Gradle | Gradle project settings | **Yes** (For Android) |
| `android/gradle.properties` | Properties | AndroidX enablement and JVM options | **Yes** (For Android) |
| `android/gradlew` & `gradlew.bat` | Script | Gradle wrapper executable scripts | **Yes** (For Android) |
| `android/app/build.gradle` | Gradle | App module dependencies (Retrofit, OkHttp, AndroidX) | **Yes** (For Android) |
| `android/app/src/main/AndroidManifest.xml` | XML | App permissions (`RECEIVE_SMS`, `INTERNET`) & components | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/MainActivity.java` | Java | Main mobile status activity | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/receiver/SmsReceiver.java` | Java | BroadcastReceiver for `SMS_RECEIVED` | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/service/DetectionService.java` | Java | Asynchronous threat inspection service | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/network/PhishGuardApiClient.java` | Java | Retrofit/OkHttp client to `/predict` | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/network/NetworkConfig.java` | Java | API base URL configuration (`10.0.2.2:5000`) | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/alert/SecurityAlertManager.java` | Java | High-priority security notification builder | **Yes** (For Android) |
| `android/app/src/main/java/com/phishguard/util/DuplicateFilter.java` | Java | In-memory cache preventing duplicate alerts | **Yes** (For Android) |
| `android/app/src/main/res/` | Directory | Android layout XMLs, colors, drawables, and strings | **Yes** (For Android) |

---

## 6. University Documentation Suite (`documentation/`)

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `documentation/FINAL_PROJECT_REPORT.md` | Markdown | Comprehensive university project report (thesis format) | No (Documentation) |
| `documentation/PROJECT_ABSTRACT.md` | Markdown | Concise formal abstract | No (Documentation) |
| `documentation/ACKNOWLEDGEMENT.md` | Markdown | Formal project acknowledgement | No (Documentation) |
| `documentation/FINAL_PRESENTATION.md` | Markdown | Complete presentation slide deck | No (Documentation) |
| `documentation/FINAL_PRESENTATION_SPEAKER_NOTES.md` | Markdown | Slide-by-slide speaker notes and defense talking points | No (Documentation) |
| `documentation/FINAL_VIVA_QUESTIONS.md` | Markdown | 30 comprehensive viva questions with expert answers | No (Documentation) |
| `documentation/FINAL_RUN_GUIDE.md` | Markdown | Step-by-step evaluator run manual | No (Documentation) |
| `documentation/FINAL_SUBMISSION_CHECKLIST.md` | Markdown | Pre-submission verification checklist | No (Documentation) |
| `documentation/FINAL_AUDIT_REPORT.md` | Markdown | Formal pre-submission audit report | No (Documentation) |
| `documentation/API_DOCUMENTATION.md` | Markdown | REST API schema, request/response examples | No (Documentation) |
| `documentation/RISK_SCORING_AUDIT.md` | Markdown | Mathematical verification of the 0–100 risk score | No (Documentation) |
| `documentation/SOCIAL_ENGINEERING_AUDIT.md`| Markdown | Behavioral heuristic verification across 5 vectors | No (Documentation) |
| `documentation/DOCUMENTATION_CONSISTENCY_REPORT.md` | Markdown | Audit report verifying data consistency | No (Documentation) |
| `documentation/PROJECT_STRUCTURE.md` | Markdown | Directory mapping and architectural explanation | No (Documentation) |
| `documentation/SUBMISSION_NOTES.md` | Markdown | Notes on excluded dev files and environment setup | No (Documentation) |

---

## 7. Live Demonstration Assets (`demo/`)

| Path | Type | Purpose | Required for Execution? |
| :--- | :--- | :--- | :---: |
| `demo/demo_messages.json` | JSON | Verified test cases across benign, suspicious, and smishing | No (Demo Asset) |
| `demo/FINAL_5_MINUTE_DEMO_CHECKLIST.md` | Markdown | 5-minute timed viva demonstration sequence | No (Demo Asset) |
| `demo/FINAL_LIVE_DEMO_SCRIPT.md` | Markdown | Comprehensive spoken demo script | No (Demo Asset) |
| `demo/DEMO_BACKUP_PLAN.md` | Markdown | Technical contingency and recovery guide | No (Demo Asset) |
