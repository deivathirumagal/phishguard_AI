# Documentation Consistency Report – PhishGuard AI

**Project:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Audit Date:** September 20, 2026  
**Scope:** All project documentation files (`.md`) and in-app documentation screens  
**Status:** **CONSISTENT & VERIFIED**  

---

## 1. Verified Core Project Facts

| Fact Category | Verified Value | Compliance Status |
| :--- | :--- | :--- |
| **Project Title** | PhishGuard AI – Real-Time Phishing Message Detection System | **Consistent** across all documentation and headers |
| **Dataset Name** | UCI SMS Spam Collection benchmark dataset | **Consistent** across all technical docs and code |
| **Total Dataset Size** | 5,572 messages | **Consistent** |
| **Dataset Class Distribution** | 4,825 Ham (86.6%) / 747 Spam (13.4%) | **Consistent** |
| **Train/Test Split** | 80/20 Stratified Split (4,457 train / 1,115 test) | **Consistent** |
| **Machine Learning Model** | Logistic Regression (`scikit-learn`) | **Consistent** |
| **Feature Extraction** | TF-IDF Vectorizer (`TfidfVectorizer`) | **Consistent** |
| **Benchmark Metric** | "97.58% test accuracy on the UCI SMS Spam Collection baseline" | **Consistent** |
| **Risk Scoring Tiers** | 0–29 Low Risk, 30–59 Medium Risk, 60–79 High Risk, 80–100 Critical Risk | **Consistent** across backend and frontend |
| **Backend API Endpoints** | `GET /` (health check), `POST /predict` (threat analysis) | **Consistent** across services and guides |
| **Frontend Command** | `cd "C:\Users\hp\OneDrive\Desktop\project\phish guard"` followed by `npm run dev` | **Consistent** |
| **Backend Command** | `cd "C:\Users\hp\OneDrive\Desktop\project\phish guard\backend"` followed by `& "venv\Scripts\python.exe" app.py` | **Consistent** |
| **Real-Time Nature** | Web simulation of incoming messages; does NOT directly intercept phone SMS from browser | **Consistent** |
| **Android Status** | "Source-level foundation inspected; end-to-end Android device validation not performed." | **Consistent** |

---

## 2. Prohibited & Misleading Claims Audit

A comprehensive codebase grep was conducted across all files for prohibited or exaggerated claims:

| Prohibited Phrase | Occurrences Found | Action Taken |
| :--- | :--- | :--- |
| `"97.58% phishing accuracy"` | 0 | None needed (Rule strictly honored) |
| `"97.58% real-world phishing detection rate"` | 0 | None needed (Rule strictly honored) |
| `"100% phishing detection"` | 0 | None needed (Rule strictly honored) |
| `"perfect accuracy"` | 0 | None needed (Rule strictly honored) |
| Exaggerated external threat claims (e.g. "live WHOIS query", "Google Safe Browsing API") | 0 | None needed (Engine clearly described as deterministic heuristics) |

---

## 3. Discrepancy & Rectification Matrix

| File | Item Checked | Observation | Correct Wording / Action Taken |
| :--- | :--- | :--- | :--- |
| `src/Pages/About.jsx` | Accuracy phrasing | Achieving 97.58% test accuracy on the UCI SMS Spam Collection baseline | Verified compliant; emphasizes baseline distinction |
| `src/Pages/ScanMessage.jsx` | Dataset summary | 97.58% test accuracy on UCI SMS baseline | Verified compliant |
| `README.md` | Model description & Android disclaimer | Clear statement on SMS spam baseline and Android companion architecture | Verified compliant |
| `FINAL_PROJECT_REPORT.md` | Chapter 4 / 5 Metrics | Full confusion matrix (954 TN, 134 TP, 12 FP, 15 FN) on 1,115 test set | Verified compliant |
| `FINAL_VIVA_QUESTIONS.md` | Q14 & Q15 explanation | Explicit distinction between SMS spam baseline and real-world phishing detection | Verified compliant |

---

## 4. Academic Limitations & Future Scope Consistency

All technical documents consistently present the following boundaries:
1. **SMS vs. Phishing Dataset:** The UCI corpus represents general SMS spam. While it includes financial lures, true phishing requires secondary heuristic layers (URL analysis, social engineering) to catch zero-day attacks.
2. **Deterministic Heuristics:** Regex-based patterns do not account for complex syntactic mutations or obfuscated leetspeak.
3. **Android Device Testing:** Android companion code is structured as an architectural proof-of-concept; device-level validation was not performed due to local environment constraints (missing SDK/emulator).
4. **Future Scope:** Fine-tuning transformer models (DistilBERT/MobileBERT), integrating live threat feeds (Google Safe Browsing / PhishTank), and full Android Google Play deployment.
