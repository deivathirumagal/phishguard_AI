# Final 5-Minute Live Demonstration Checklist & Sequence – PhishGuard AI

**Time Allocation:** Exactly 5 minutes  
**Target Audience:** Final-Year Engineering Examination Panel / Viva Examiners  
**Project:** PhishGuard AI – Real-Time Phishing Message Detection System  

---

## Pre-Flight Readiness Checklist

Perform these checks 2 minutes before the faculty panel sits:

- [ ] **Backend running:** Flask API running in Terminal 1 on `http://127.0.0.1:5000`
- [ ] **Frontend running:** Vite dev server running in Terminal 2 on `http://localhost:5173/`
- [ ] **Scan page open:** Browser tab open to `http://localhost:5173/scan`
- [ ] **Legitimate example ready:** `"Hey, are we still meeting for lunch today?"` copied or in preset
- [ ] **Phishing example ready:** `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"` ready
- [ ] **URL example ready:** `"Click http://bit.ly/example to claim your refund"` ready
- [ ] **Alert ready:** Critical threat alert banner and floating alert modal functional
- [ ] **History ready:** History page has at least 1–2 test records visible
- [ ] **Dashboard ready:** Dashboard page shows live metrics and charts
- [ ] **Real-Time Demo ready:** Real-Time Stream tab responds to "Start Live Simulation"
- [ ] **Android explanation ready:** Clear talking point on SMS BroadcastReceiver foundation
- [ ] **Limitations ready:** Grounded explanation of SMS benchmark vs. smishing heuristics

---

## 5-Minute Demonstration Sequence

| Min : Sec | Step | What to Show on Screen | What to Say (Verbatim Talking Points) |
| :---: | :--- | :--- | :--- |
| **0:00 – 0:30** | **1. Introduction** | Home page (`/`) | *"Respected panel, mobile phishing—or smishing—is the fastest-growing attack vector today. PhishGuard AI is an explainable, multi-layered cyber defense system engineered to detect deceptive SMS threats in real time."* |
| **0:30 – 1:00** | **2. Architecture** | About page or Navbar status | *"Our system uses a hybrid defense-in-depth architecture: a statistical Machine Learning baseline combining TF-IDF with Logistic Regression, layered with parallel deterministic heuristic engines for URL obfuscation and social engineering tactics."* |
| **1:00 – 1:40** | **3. Legitimate Scan** | Manual Scan: paste lunch message $\rightarrow$ Analyze | *"First, we scan a normal conversation: 'Hey, are we still meeting for lunch today?'. The ML model predicts ham, our heuristics find zero indicators, resulting in a safe Low Risk score of 5."* |
| **1:40 – 2:30** | **4. Phishing Scan** | Manual Scan: paste bank suspension lure $\rightarrow$ Analyze | *"Now, we test an active smishing attack: 'URGENT! Your bank account has been suspended. Verify immediately...'. The system flags it as Critical Risk with a score of 100."* |
| **2:30 – 3:00** | **5. Explain Risk** | Point to 0–100 gauge & Risk Badge | *"The 0 to 100 risk score is completely explainable. It factors in base ML confidence, adds 25 points for the shortened bit.ly link, and adds points for urgency, fear, and credential verification."* |
| **3:00 – 3:30** | **6. Show URL & Social Engineering** | Scroll to URL and Social Engineering cards | *"Notice the granular breakdown: the URL engine identifies the bit.ly shortening service hiding the destination. The social engineering engine identifies four specific psychological manipulation tactics."* |
| **3:30 – 3:50** | **7. Show Alert** | Critical Risk banner | *"The interface immediately generates an actionable alert instructing the user: 'Do not click links, provide passwords, or share personal information'."* |
| **3:50 – 4:15** | **8. Show History & Dashboard** | Click History $\rightarrow$ Click Dashboard | *"All scans are permanently recorded in an audit trail with search and filter capabilities. The Dashboard aggregates organizational telemetry, tracking threat volumes and common attack vectors in real time."* |
| **4:15 – 4:35** | **9. Real-Time Simulation** | Scan page $\rightarrow$ Real-Time Stream $\rightarrow$ Start | *"In our Real-Time stream, we simulate an incoming mobile SMS feed. As messages arrive, the system automatically analyzes each payload, logs the telemetry, and triggers floating security alerts."* |
| **4:35 – 4:50** | **10. Android & Future Scope** | Show Android companion architecture | *"For native Android devices, we designed a companion module using the SMS_RECEIVED system broadcast. For future scope, we plan to fine-tune DistilBERT and integrate live threat feeds like Google Safe Browsing."* |
| **4:50 – 5:00** | **11. Conclusion** | Concluding slide / Home page | *"PhishGuard AI bridges the gap between opaque machine learning and explainable user defense. Thank you, and we are now ready for your questions."* |

---

## 3 Quick Answers for Tough Viva Inquiries

1. **"Why Logistic Regression over Deep Learning?"**
   > *"For short SMS messages, Logistic Regression with TF-IDF provides near-zero latency (< 15 ms), high interpretability, and low memory footprint suitable for mobile endpoints, while achieving 97.58% baseline accuracy."*

2. **"Does 97.58% mean 97.58% phishing detection rate?"**
   > *"No, sir/ma'am. 97.58% is strictly the test accuracy on the UCI SMS Spam Collection benchmark. Real-world smishing protection is achieved through our secondary heuristic layers."*

3. **"Is the web app intercepting real SMS messages?"**
   > *"The web application is an interactive simulation of an incoming mobile stream. Real mobile SMS interception requires the native Android companion service using the SMS_RECEIVED broadcast."*
