# PhishGuard AI – Project Structure & Directory Mapping

This document provides a comprehensive map of the **PhishGuard AI** submission package, detailing the architectural role of each component and explaining how the clean submission layout corresponds to the working development project.

---

## 1. Submission Package Hierarchy

```text
PhishGuard_AI/
│
├── README.md                           # Main project entry point, setup instructions, and ML facts
│
├── frontend/                           # React 19 / Vite Single Page Application
│   ├── src/
│   │   ├── Components/                 # UI components (Navbar, Footer, RealTimeAlert, Badges)
│   │   ├── Pages/                      # Application routes (Home, Scan, Dashboard, History, About, Auth)
│   │   ├── services/                   # API client and real-time message stream simulation
│   │   ├── utils/                      # History persistence and local storage telemetry
│   │   ├── App.jsx                     # Root router component
│   │   ├── main.jsx                    # React DOM entry point
│   │   ├── index.css                   # Design system tokens and global styling
│   │   └── App.css                     # Component layout styling
│   ├── index.html                      # HTML entry template
│   ├── package.json                    # Node.js dependencies and scripts
│   ├── vite.config.js                  # Vite bundler configuration
│   └── README.md                       # Frontend-specific architecture documentation
│
├── backend/                            # Python Flask REST API
│   ├── app.py                          # Flask application, /predict endpoint, risk engine
│   ├── train_model.py                  # Standalone ML training script
│   ├── requirements.txt                # Python dependencies
│   ├── model/                          # Active serialized ML artifacts
│   │   ├── phishing_model.pkl          # Trained Logistic Regression model
│   │   └── tfidf_vectorizer.pkl        # Fitted TF-IDF vectorizer
│   ├── dataset/                        # Benchmark dataset used for training
│   │   └── SMSSpamCollection           # 5,572 labeled messages
│   └── README.md                       # Backend-specific architecture documentation
│
├── dataset/                            # Standalone benchmark dataset
│   └── SMSSpamCollection               # UCI SMS Spam Collection benchmark corpus
│
├── model/                              # Standalone serialized ML artifacts
│   ├── phishing_model.pkl              # Serialized Logistic Regression model
│   └── tfidf_vectorizer.pkl            # Serialized TF-IDF feature extractor
│
├── android/                            # Native Android Companion Module (Java)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml     # Permissions (RECEIVE_SMS, INTERNET) & component registrations
│   │   │   ├── java/com/phishguard/
│   │   │   │   ├── MainActivity.java   # Main mobile status activity
│   │   │   │   ├── receiver/           # SmsReceiver listening for SMS_RECEIVED broadcast
│   │   │   │   ├── service/            # Background detection service
│   │   │   │   ├── network/            # HTTP API client to Flask backend
│   │   │   │   ├── alert/              # Heads-up notification builder
│   │   │   │   └── util/               # Duplicate filtering cache
│   │   │   └── res/                    # Mobile layout XMLs and resources
│   │   └── build.gradle                # App-level Gradle build configuration
│   ├── build.gradle                    # Project-level Gradle build script
│   ├── settings.gradle                 # Gradle settings
│   ├── gradle.properties               # JVM and AndroidX flags
│   └── README.md                       # Android module documentation and setup instructions
│
├── documentation/                      # University Project Documentation Suite
│   ├── FINAL_PROJECT_REPORT.md         # Full capstone report (university thesis format)
│   ├── PROJECT_ABSTRACT.md             # Concise academic abstract
│   ├── ACKNOWLEDGEMENT.md              # Formal project acknowledgement
│   ├── FINAL_PRESENTATION.md           # Slide-by-slide presentation deck
│   ├── FINAL_PRESENTATION_SPEAKER_NOTES.md # Speaker notes and defense talking points
│   ├── FINAL_VIVA_QUESTIONS.md         # 30 comprehensive viva questions and expert answers
│   ├── FINAL_RUN_GUIDE.md              # Step-by-step evaluator run manual
│   ├── FINAL_SUBMISSION_CHECKLIST.md   # Pre-submission verification checklist
│   ├── FINAL_AUDIT_REPORT.md           # Formal pre-submission audit report
│   ├── API_DOCUMENTATION.md            # Detailed REST API specification
│   ├── RISK_SCORING_AUDIT.md           # Risk engine mathematical audit
│   ├── SOCIAL_ENGINEERING_AUDIT.md     # Heuristic detection audit
│   ├── DOCUMENTATION_CONSISTENCY_REPORT.md # Documentation consistency audit
│   ├── PROJECT_STRUCTURE.md            # This structural mapping document
│   └── SUBMISSION_NOTES.md             # Notes on excluded development files and restoration
│
└── demo/                               # Demonstration Scripts and Resources
    ├── demo_messages.json              # Verified test vectors (benign, suspicious, phishing)
    ├── FINAL_5_MINUTE_DEMO_CHECKLIST.md# 5-minute timed live demonstration sequence
    ├── FINAL_LIVE_DEMO_SCRIPT.md       # Detailed live presentation script
    └── DEMO_BACKUP_PLAN.md             # Live contingency and recovery guide
```

---

## 2. Component Roles in the Hybrid Architecture

1. **`frontend/`**: Delivers user-facing interactivity. Users can paste messages, pick presets, or run live simulations. It provides full transparency by rendering the 0–100 risk score and detailed threat factor breakdowns.
2. **`backend/`**: Serves as the core analytical engine. It receives text payloads, extracts lexical features via TF-IDF, performs Logistic Regression inference, runs deterministic regex heuristics for links and psychological lures, and computes the composite risk score.
3. **`dataset/` & `model/`**: Houses the empirical foundation of the machine learning layer. Contains the 5,572-sample UCI SMS Spam Collection benchmark and pre-trained `.pkl` artifacts.
4. **`android/`**: Demonstrates the mobile smishing defense architecture. Utilizes system-level broadcast receivers to inspect incoming text messages before the user opens them.
5. **`documentation/`**: Contains the complete academic submission paperwork, comprehensive thesis report, presentation deck, speaker notes, and viva preparation materials.
6. **`demo/`**: Provides ready-to-use demonstration assets to ensure seamless, glitch-free presentation before the evaluation panel.
