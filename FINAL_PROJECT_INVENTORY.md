# Final Project Inventory – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Project Root:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  
**Audit Date:** September 20, 2026  
**Auditor:** Automated Final Pre-Submission Audit  

---

## Inventory Status Legend
- **WORKING**: Code is fully implemented, dependencies resolved, and verified through live automated or manual testing.
- **PRESENT**: Source files exist and are verified structurally, but not independently executed as a standalone module.
- **PARTIALLY TESTED**: Tested under simulated conditions or unit tests, but not end-to-end on target hardware (e.g. physical Android device).
- **NOT TESTED**: File exists but has not been exercised during testing runs.
- **UNUSED/LEGACY**: File is obsolete, backup, or replaced by newer implementation.

---

## 1. Frontend Files (`src/`)

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Frontend Core | `src/main.jsx` | React entry point, mounts App component to DOM | **WORKING** |
| Frontend Core | `src/App.jsx` | Root application component, React Router routing configuration | **WORKING** |
| Frontend Core | `src/index.css` | Global design system styles, CSS custom properties, utility classes | **WORKING** |
| Frontend Core | `src/App.css` | Component-level layout and animation rules | **WORKING** |
| Frontend Component | `src/Components/Navbar.jsx` | Responsive navigation bar with links, status pill, and mobile toggle | **WORKING** |
| Frontend Component | `src/Components/Footer.jsx` | Footer component with copyright, system version, and links | **WORKING** |
| Frontend Component | `src/Components/RealTimeAlert.jsx` | Floating dismissible alert modal for real-time detected threats | **WORKING** |
| Frontend Component | `src/Components/StatCard.jsx` | Reusable metric/stat display card with icon, value, and trend | **WORKING** |
| Frontend Component | `src/Components/RiskBadge.jsx` | Color-coded risk tier badge (Low, Medium, High, Critical) | **WORKING** |
| Frontend Page | `src/Pages/Home.jsx` | Landing page highlighting project features, architecture, and CTA buttons | **WORKING** |
| Frontend Page | `src/Pages/ScanMessage.jsx` | Core interactive scan interface: Manual Scan, Real-Time Simulation, Preset Library | **WORKING** |
| Frontend Page | `src/Pages/Dashboard.jsx` | Live telemetry dashboard with statistical aggregates, chart visualizations, metrics | **WORKING** |
| Frontend Page | `src/Pages/History.jsx` | Persistent audit log of all scans with search, filter by risk, export, clear | **WORKING** |
| Frontend Page | `src/Pages/About.jsx` | Academic project overview, ML architecture, dataset facts, team, limitations | **WORKING** |
| Frontend Page | `src/Pages/Auth.jsx` | Authentication page (Login/Register mock interface for user sessions) | **WORKING** |
| Frontend Service | `src/services/api.js` | Axios/fetch client communicating with Flask backend `/predict` and `/` | **WORKING** |
| Frontend Service | `src/services/realtimeDetectionService.js` | Background simulation service generating/polling incoming messages for analysis | **WORKING** |
| Frontend Utility | `src/utils/historyStorage.js` | LocalStorage persistence layer for scan records, dashboard statistics, CRUD | **WORKING** |

---

## 2. Backend Files (`backend/`)

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Backend Application | `backend/app.py` | Flask REST API entry point, `/` health check, `/predict` endpoint, risk engine, heuristic analyzers | **WORKING** |
| Backend Training | `backend/train_model.py` | Standalone script for training Logistic Regression on UCI SMS Spam Collection | **WORKING** |
| Backend Dependencies | `backend/requirements.txt` | Python package dependencies (Flask, scikit-learn, joblib, etc.) | **WORKING** |
| Backend Environment | `backend/venv/` | Python virtual environment with installed dependencies | **WORKING** |

---

## 3. Machine Learning & Model Files

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Model Artifact | `backend/model/phishing_model.pkl` | Trained scikit-learn `LogisticRegression` model file | **WORKING** |
| Model Artifact | `backend/model/tfidf_vectorizer.pkl` | Fitted `TfidfVectorizer` (vocabulary and inverse document frequencies) | **WORKING** |
| Model Artifact (Root Copy) | `model/phishing_model.pkl` | Root replica of trained Logistic Regression model | **PRESENT** |
| Model Artifact (Root Copy) | `model/tfidf_vectorizer.pkl` | Root replica of fitted TF-IDF vectorizer | **PRESENT** |

---

## 4. Dataset Files

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Dataset | `backend/dataset/SMSSpamCollection` | Benchmark UCI SMS Spam Collection dataset (5,572 labeled messages) | **WORKING** |
| Dataset (Root Copy) | `dataset/SMSSpamCollection` | Root replica of the UCI SMS Spam Collection dataset | **PRESENT** |

---

## 5. Android Companion Files (`android/`)

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Android Manifest | `android/app/src/main/AndroidManifest.xml` | App manifest defining permissions (`RECEIVE_SMS`, `INTERNET`, `ACCESS_NETWORK_STATE`, `POST_NOTIFICATIONS`) and receivers | **PRESENT** |
| Android Activity | `android/app/src/main/java/com/phishguard/MainActivity.java` | Main Android UI activity displaying status, toggle, and connection info | **PRESENT** |
| Android Receiver | `android/app/src/main/java/com/phishguard/receiver/SmsReceiver.java` | BroadcastReceiver listening for `android.provider.Telephony.SMS_RECEIVED` | **PRESENT** |
| Android Service | `android/app/src/main/java/com/phishguard/service/DetectionService.java` | Service orchestrating API dispatch and security alert routing | **PRESENT** |
| Android Network | `android/app/src/main/java/com/phishguard/network/PhishGuardApiClient.java` | HTTP client communicating with Flask backend `/predict` endpoint | **PRESENT** |
| Android Network | `android/app/src/main/java/com/phishguard/network/NetworkConfig.java` | Backend endpoint configuration (defaults to `http://10.0.2.2:5000`) | **PRESENT** |
| Android Alert | `android/app/src/main/java/com/phishguard/alert/SecurityAlertManager.java` | Notification manager building high-priority warning notifications on device | **PRESENT** |
| Android Utility | `android/app/src/main/java/com/phishguard/util/DuplicateFilter.java` | In-memory cache preventing duplicate processing of identical SMS messages | **PRESENT** |
| Android Build | `android/build.gradle` | Top-level project Gradle build script | **PRESENT** |
| Android Build | `android/app/build.gradle` | App-module Gradle build script with dependencies (Retrofit, OkHttp) | **PRESENT** |
| Android Config | `android/settings.gradle` | Gradle project name and module inclusion settings | **PRESENT** |
| Android Config | `android/gradle.properties` | JVM configuration and AndroidX enablement flags | **PRESENT** |
| Android Wrapper | `android/gradlew`, `android/gradlew.bat` | Gradle wrapper executable scripts | **PRESENT** |
| Android Resources | `android/app/src/main/res/` | Layout XMLs, strings, colors, drawables for mobile UI | **PRESENT** |

*Note on Android:* Source-level foundation inspected; end-to-end Android device validation not performed due to absence of local Android SDK/emulator in the test environment.

---

## 6. Configuration & Package Files

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Package Config | `package.json` | Node.js project manifest, dependencies, and build scripts | **WORKING** |
| Lockfile | `package-lock.json` | Pinned npm dependency tree | **WORKING** |
| Bundler Config | `vite.config.js` | Vite bundler configuration with `@vitejs/plugin-react` | **WORKING** |
| HTML Root | `index.html` | Application HTML entry point template | **WORKING** |

---

## 7. Documentation Files

| Category | Path | Purpose | Status |
| :--- | :--- | :--- | :--- |
| Documentation | `README.md` | Primary project overview, setup commands, architecture, viva points | **WORKING** |
| Documentation | `ML_DOCUMENTATION.md` | In-depth machine learning report, hyperparameters, evaluation metrics | **WORKING** |
| Documentation | `FINAL_PROJECT_REPORT.md` | Comprehensive academic project report matching standard university format | **WORKING** |
| Documentation | `FINAL_PRESENTATION.md` | Complete slide-by-slide presentation deck | **WORKING** |
| Documentation | `FINAL_PRESENTATION_SPEAKER_NOTES.md` | Speaker notes and viva defense talking points for each slide | **WORKING** |
| Documentation | `FINAL_VIVA_QUESTIONS.md` | 30 comprehensive viva questions and expert answers | **WORKING** |
| Documentation | `FINAL_LIVE_DEMO_SCRIPT.md` | Step-by-step live demonstration script with exact user actions | **WORKING** |
| Documentation | `FINAL_TEST_REPORT.md` | Complete verification results across all unit and integration tests | **WORKING** |
| Documentation | `FINAL_SUBMISSION_CHECKLIST.md` | Pre-submission verification checklist | **WORKING** |
| Documentation | `FINAL_PROJECT_SUMMARY.md` | Executive summary of project facts, architecture, and metrics | **WORKING** |
| Documentation | `EXAMINER_TRICK_QUESTIONS.md` | Guide to defending against challenging examiner inquiries | **WORKING** |
| Documentation | `REQUIREMENTS_TRACEABILITY.md` | Matrix mapping user requirements to code implementations | **WORKING** |

---

## 8. Summary of Inventory

- **Total Frontend Components & Pages:** 14 files — All **WORKING**
- **Total Backend Services & Scripts:** 4 files/dirs — All **WORKING**
- **Total Machine Learning Artifacts:** 4 files — **WORKING** / **PRESENT**
- **Total Dataset Artifacts:** 2 files — **WORKING** / **PRESENT**
- **Total Android Foundation Files:** 14 files — **PRESENT** (Source-level foundation inspected)
- **Total Documentation Files:** 12+ files — **WORKING**
- **Overall Inventory Status:** Complete, verified, zero missing files.
