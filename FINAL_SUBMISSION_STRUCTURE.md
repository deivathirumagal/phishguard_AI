# Final Submission Structure & Directory Mapping – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Current Root:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  
**Document Date:** September 20, 2026  

---

## 1. Overview & Reorganization Policy

> [!IMPORTANT]
> **No Physical Reorganization Required:** To prevent breaking existing hardcoded paths, active dev servers, IDE settings, and test scripts, the project files remain in their current functional locations. This document maps the **Actual Current Directory Structure** to the **Ideal Academic Submission Structure** expected by university evaluation panels.

---

## 2. Ideal Academic Submission Layout

```text
PhishGuard_AI/
│
├── frontend/                   # User Interface (React 19, Vite, CSS design system)
│   ├── src/
│   │   ├── Components/         # Reusable UI widgets (Navbar, Footer, Alert, Badges)
│   │   ├── Pages/              # Main routes (Home, Scan, Dashboard, History, About)
│   │   ├── services/           # API and Real-Time simulation connectors
│   │   └── utils/              # History persistence & local telemetry storage
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Core REST API & Threat Engine (Flask, Python)
│   ├── app.py                  # API endpoints, risk scoring, URL/social heuristics
│   ├── train_model.py          # ML training pipeline script
│   ├── requirements.txt        # Python dependency manifest
│   ├── model/                  # Serialized ML artifacts
│   │   ├── phishing_model.pkl
│   │   └── tfidf_vectorizer.pkl
│   └── dataset/                # Benchmark SMS training corpus
│       └── SMSSpamCollection
│
├── android/                    # Android Companion Module (Java, Gradle)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/phishguard/
│   │   │   └── res/
│   │   └── build.gradle
│   └── build.gradle
│
├── documentation/              # Academic reports, presentation decks, viva guides
│   ├── FINAL_PROJECT_REPORT.md
│   ├── FINAL_PRESENTATION.md
│   ├── FINAL_VIVA_QUESTIONS.md
│   ├── ML_DOCUMENTATION.md
│   ├── RISK_SCORING_AUDIT.md
│   └── SOCIAL_ENGINEERING_AUDIT.md
│
├── demo/                       # Demo guides, test cases, live checklists
│   ├── FINAL_RUN_GUIDE.md
│   ├── FINAL_5_MINUTE_DEMO_CHECKLIST.md
│   └── FINAL_LIVE_DEMO_SCRIPT.md
│
└── README.md                   # Primary project landing and quick-start guide
```

---

## 3. Structural Mapping: Current Path $\rightarrow$ Ideal Category

| Current File / Folder Path | Ideal Academic Subdirectory | Role in System |
| :--- | :--- | :--- |
| `src/` | `frontend/src/` | React 19 UI component hierarchy |
| `index.html` | `frontend/index.html` | Single Page Application entry |
| `vite.config.js` | `frontend/vite.config.js` | Vite bundler build config |
| `package.json` | `frontend/package.json` | Node.js manifest & scripts |
| `backend/app.py` | `backend/app.py` | Flask API & risk scoring engine |
| `backend/train_model.py` | `backend/train_model.py` | Model training & evaluation script |
| `backend/requirements.txt` | `backend/requirements.txt` | Python package requirements |
| `backend/model/*.pkl` | `backend/model/` (or `model/`) | Trained ML weights & TF-IDF matrix |
| `backend/dataset/SMSSpamCollection` | `backend/dataset/` (or `dataset/`) | UCI benchmark dataset (5,572 samples) |
| `android/` | `android/` | Android companion Java source foundation |
| `FINAL_PROJECT_REPORT.md` | `documentation/FINAL_PROJECT_REPORT.md` | University thesis / capstone report |
| `FINAL_PRESENTATION.md` | `documentation/FINAL_PRESENTATION.md` | Final viva presentation slide deck |
| `FINAL_VIVA_QUESTIONS.md` | `documentation/FINAL_VIVA_QUESTIONS.md` | Comprehensive viva defense questions |
| `ML_DOCUMENTATION.md` | `documentation/ML_DOCUMENTATION.md` | Technical ML evaluation & confusion matrix |
| `RISK_SCORING_AUDIT.md` | `documentation/RISK_SCORING_AUDIT.md` | Mathematical audit of risk formulas |
| `SOCIAL_ENGINEERING_AUDIT.md` | `documentation/SOCIAL_ENGINEERING_AUDIT.md` | Behavioral heuristic audit report |
| `FINAL_RUN_GUIDE.md` | `demo/FINAL_RUN_GUIDE.md` | Step-by-step execution manual |
| `FINAL_5_MINUTE_DEMO_CHECKLIST.md`| `demo/FINAL_5_MINUTE_DEMO_CHECKLIST.md`| Quick reference live demo card |
| `README.md` | `README.md` | Top-level project documentation |

---

## 4. Key Takeaway for Evaluators

The repository has been maintained as a unified monolithic workspace where the frontend and backend operate cohesively in parallel terminal sessions. All functional code, model artifacts, datasets, and academic documentation are fully in place and verified.
