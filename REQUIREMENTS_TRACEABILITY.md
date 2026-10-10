# PhishGuard AI — Requirements Traceability Matrix

This document tracks all functional and system requirements against their actual implementation artifacts, verification evidence, and operational status.

---

## Traceability Matrix

| Requirement | Implementation Component | Verification Evidence / Test ID | Operational Status |
|---|---|---|:---:|
| **Message Scanning** | `src/Pages/ScanMessage.jsx`, `backend/app.py` | Verified via Manual Scan tab, faculty demo presets, and Test BE-02/BE-03 | **IMPLEMENTED** |
| **Message Preprocessing** | `backend/app.py:preprocess_text()` | Verified in test suites: lowercase conversion, whitespace normalization, URL preservation | **IMPLEMENTED** |
| **TF-IDF Feature Extraction** | `backend/tfidf_vectorizer.pkl`, scikit-learn `TfidfVectorizer` | Verified in training pipeline (`train_model.py`) and API execution | **IMPLEMENTED** |
| **ML Classification** | `backend/phishing_model.pkl`, scikit-learn `LogisticRegression` | 97.58% test accuracy on 1,115 test samples (Test BE-02/BE-03) | **IMPLEMENTED** |
| **Defensive URL Analysis** | `backend/app.py:analyze_urls()` | Tests URL-01 to URL-05: detected shorteners (`bit.ly`), raw IP hosts, high-risk TLDs without network resolution | **IMPLEMENTED** |
| **Social Engineering Detection** | `backend/app.py:analyze_social_engineering()` | Tests SE-01 to SE-05: verified urgency, fear/threat, verification, authority, and reward rules | **IMPLEMENTED** |
| **Composite Risk Scoring** | `backend/app.py:calculate_risk_score()` | Verified across all 4 tiers (0–29 Low, 30–59 Medium, 60–79 High, 80–100 Critical) with synergy bonuses | **IMPLEMENTED** |
| **Explanation Generation** | `backend/app.py:generate_explanation()` | Dynamic rationales and actionable security recommendations generated in all test responses | **IMPLEMENTED** |
| **Security Alert System** | `src/Components/RealTimeAlert.jsx` | Verified: pulsing red alert activates on Phishing / High / Critical, suppressed on clean Legitimate | **IMPLEMENTED** |
| **Scan History Persistence** | `src/utils/historyStorage.js`, `src/Pages/History.jsx` | HTML5 `localStorage` audit log with instant text search, category filters, and reload capability | **IMPLEMENTED** |
| **Security Dashboard Telemetry** | `src/Pages/Dashboard.jsx` | Dynamic computation of total scans, threat counts, and threat distribution progress bar from live data | **IMPLEMENTED** |
| **Real-Time Web Simulation** | `src/services/realtimeDetectionService.js`, `ScanMessage.jsx` | Tests RT-01 to RT-05: simulated stream ingestion with 15-second deduplication cache | **IMPLEMENTED** |
| **Android Companion Foundation** | `android/app/src/main/java/com/phishguard/ai/` | Source code inspected (`SmsReceiver.kt`, `DetectionService.kt`, `AndroidManifest.xml`). End-to-end device testing depends on Android Studio/SDK/device environment | **PARTIALLY IMPLEMENTED** |

---

## Status Classification Key:
- **IMPLEMENTED:** Fully realized in code, executed, and verified by passing test cases.
- **PARTIALLY IMPLEMENTED:** Architecture and source code complete; live environment/device execution pending external host tooling (e.g., Android SDK/device).
- **NOT TESTED:** Implementation could not be verified in the current headless testing environment.
