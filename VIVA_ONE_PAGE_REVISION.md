# PhishGuard AI — 5-Minute One-Page Viva Revision Sheet

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Quick Reference:** Everything you need to review 5 minutes before your viva!

---

| Core Concept | Fact to State to Examiners |
| :--- | :--- |
| **Project Name** | PhishGuard AI – Real-Time Phishing Message Detection System |
| **The Problem** | SMS phishing (smishing) attacks use urgency and link shorteners to steal banking credentials; SMS lacks SSL certificates or sender verification. |
| **The Solution** | A defense-in-depth hybrid platform combining statistical ML with deterministic URL and social engineering heuristic engines. |
| **Frontend** | React 19, Vite, Vanilla CSS design system, Lucide React icons, LocalStorage persistence. |
| **Backend** | Python 3, Flask, Flask-CORS REST API on `http://127.0.0.1:5000`. |
| **ML Algorithm** | Logistic Regression with L2 regularization (`scikit-learn`). |
| **Feature Extraction** | `TfidfVectorizer` with sublinear term-frequency scaling and n-gram vocabulary mapping. |
| **Dataset** | Benchmark **UCI SMS Spam Collection** dataset. |
| **Dataset Size** | **5,572 messages** total: **4,825 Ham** (86.6%) and **747 Spam** (13.4%). |
| **Train/Test Split** | **80/20 Stratified Split**: 4,457 training messages and 1,115 test messages. |
| **Baseline Accuracy** | **"97.58% test accuracy on the UCI SMS Spam Collection baseline."** *(Never say "97.58% phishing accuracy").* |
| **API Endpoints** | `GET /` (health check); `POST /predict` with payload `{"message": "<text>"}` returning 12 structured fields. |
| **Risk Levels** | **0–29:** Low Risk \| **30–59:** Medium Risk \| **60–79:** High Risk \| **80–100:** Critical Risk (strictly clamped to $[0, 100]$). |
| **URL Analysis** | Passive regex inspection detecting URL shorteners (`bit.ly`, `tinyurl.com`), raw IP addresses, and suspicious TLDs (+25 risk pts). Zero external network calls. |
| **Social Engineering** | Regex pattern matching for 5 cognitive manipulation tactics: **Urgency** (+10), **Fear/Threat** (+15), **Account Verification** (+15), **Authority Impersonation** (+10), and **Reward** (+15). |
| **Real-Time Feature** | **Web Simulation** (`src/services/realtimeDetectionService.js`) generating simulated mobile streams. Browser sandboxing prevents direct cellular SMS reading. |
| **Android Role** | Native Android companion module foundation (`SmsReceiver.java`) using `android.provider.Telephony.SMS_RECEIVED` broadcast for mobile OS-level interception. |
| **Major Limitation** | Trained on general SMS spam rather than dedicated modern smishing; static regex does not capture obfuscated leetspeak. |
| **Future Scope** | Fine-tune compact transformers (**DistilBERT / MobileBERT**) and integrate cloud threat feeds (**Google Safe Browsing** / **PhishTank**). |

---

## 3 Critical Golden Rules to Remember

1. **Accuracy Phrasing:** Always say *"97.58% test accuracy on the UCI SMS Spam Collection baseline."* Never claim 100% detection or that 97.58% is a phishing-only accuracy.
2. **Real-Time Phrasing:** Always say *"The web application provides a real-time detection simulation. Actual phone SMS interception requires the Android integration."*
3. **Defense-in-Depth:** If asked why both ML and heuristics are needed, answer: *"To eliminate single points of failure! If an evasive message slips past the ML vocabulary, the URL shortener and credential verification heuristics still catch it."*
