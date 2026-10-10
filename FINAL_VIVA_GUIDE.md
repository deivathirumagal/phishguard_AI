# Final Viva Guide – PhishGuard AI (50 Essential Questions & Answers)

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Document Purpose:** Comprehensive viva defense preparation guide for final-year college examination panel.  
**Tone:** Beginner-friendly, technically precise, honest, and grounded in the actual codebase.

---

## Part 1: Basic Project Questions

### 1. What is PhishGuard AI?
**Answer:** PhishGuard AI is an explainable, multi-layered cyber defense system designed to detect SMS phishing (smishing) messages. It combines statistical machine learning (TF-IDF + Logistic Regression) with parallel deterministic heuristic engines for URL analysis and social engineering detection.

### 2. What problem does it solve?
**Answer:** Mobile users frequently receive deceptive SMS messages containing fake delivery alerts, banking suspensions, or lottery claims designed to steal credentials. Traditional spam filters often fail to explain why a message is flagged or miss zero-day lures. PhishGuard AI detects these threats, provides an explainable 0–100 risk score, and gives users actionable safety recommendations.

### 3. Why did you choose this project?
**Answer:** Smishing attacks have surged due to mobile banking and e-commerce. Because SMS lacks built-in sender verification or visual security certificates like web browsers have, mobile users are particularly vulnerable. We wanted to build a practical, low-latency, defense-in-depth system that protects users before they click malicious links.

### 4. What is phishing?
**Answer:** Phishing is a social engineering cyberattack where an attacker impersonates a trustworthy entity (like a bank, government agency, or company) via digital communications to trick victims into divulging sensitive data such as passwords, credit card numbers, or personal identity details.

### 5. What is SMS phishing / smishing?
**Answer:** Smishing is phishing conducted specifically through Short Message Service (SMS) text messages. Attackers exploit the high open rate and trust associated with SMS to deliver malicious URLs or phone numbers that prompt immediate user action.

### 6. How does the system work?
**Answer:** When an SMS message is submitted:
1. The message text is sent to our Flask backend via `POST /predict`.
2. The ML model converts the text into TF-IDF n-gram vectors and computes spam/ham probability using Logistic Regression.
3. Concurrently, heuristic engines extract URLs (checking for shortening services and raw IPs) and scan for psychological manipulation keywords (urgency, fear, verification, etc.).
4. The composite risk engine blends these factors into an explainable 0–100 score and assigns a risk tier (Low, Medium, High, Critical).
5. The frontend displays the result, alerts the user, and logs the scan to history.

### 7. What are the major modules?
**Answer:**
1. **Frontend Web UI:** React 19 single-page app (Manual Scan, Real-Time Simulation, Dashboard, History, About).
2. **Flask REST API:** Lightweight backend hosting endpoints `GET /` and `POST /predict`.
3. **Machine Learning Classifier:** Pre-trained TF-IDF vectorizer and Logistic Regression model.
4. **Heuristic Analysis Engines:** URL inspection and 5-vector social engineering detection.
5. **Risk Scoring Engine:** Clamped 0–100 mathematical risk aggregator.
6. **Android Companion Foundation:** Native Android Java module using `SMS_RECEIVED` broadcast receiver.

### 8. What technologies did you use?
**Answer:**
- **Frontend:** React 19, Vite, Vanilla CSS, Lucide React icons.
- **Backend:** Python 3, Flask, Flask-CORS.
- **Machine Learning:** scikit-learn (`LogisticRegression`, `TfidfVectorizer`), joblib.
- **Mobile Foundation:** Android (Java), AndroidX, BroadcastReceiver.
- **Data Persistence:** Browser `localStorage` API.

### 9. Why did you use Python?
**Answer:** Python is the industry standard for machine learning and natural language processing. It provides robust, optimized libraries like `scikit-learn` and lightweight web micro-frameworks like `Flask`, allowing rapid model deployment with minimal overhead.

### 10. Why did you use React?
**Answer:** React enables a reactive, component-based user interface. Its virtual DOM allows instant UI updates (e.g., updating risk gauges, charts, and floating alert modals) without reloading the page, providing a modern and seamless user experience.

---

## Part 2: Machine Learning Questions

### 11. Which dataset did you use?
**Answer:** We used the benchmark **UCI SMS Spam Collection** dataset, a publicly available corpus of labeled SMS messages widely used for mobile messaging research.

### 12. How many messages are in the dataset?
**Answer:** The dataset contains **5,572 labeled messages**:
- **4,825 Ham** (legitimate messages, ~86.6%)
- **747 Spam** (unsolicited / fraudulent messages, ~13.4%)

### 13. What preprocessing is performed?
**Answer:**
1. Text normalization: Conversion to lowercase and whitespace stripping.
2. Tokenization & Feature Extraction: `TfidfVectorizer` converts raw text into word n-grams, applying sublinear term-frequency scaling and removing common English stop words.

### 14. What is TF-IDF?
**Answer:** TF-IDF stands for **Term Frequency-Inverse Document Frequency**. It is a statistical numerical statistic that reflects how important a word is to a message in a collection:
- **TF (Term Frequency):** Measures how frequently a word occurs in a specific message.
- **IDF (Inverse Document Frequency):** Diminishes the weight of words that occur very frequently across all messages (like "the", "is") and increases the weight of rare, informative words (like "urgent", "suspended", "winner").

### 15. Why use TF-IDF?
**Answer:** For short SMS messages, TF-IDF provides a concise, high-quality numerical representation of text vocabulary without the heavy computational overhead or large memory footprint of transformer-based embeddings, allowing inference in under 15 milliseconds.

### 16. Why Logistic Regression?
**Answer:**
1. **Low Latency:** Inference completes in milliseconds, making it ideal for real-time mobile and edge applications.
2. **High Interpretability:** It outputs well-calibrated class probabilities (between 0.0 and 1.0) rather than an opaque decision.
3. **Regularization:** L2 regularization prevents overfitting on rare tokens.
4. **Strong Baseline Performance:** Achieved 97.58% test accuracy on the benchmark SMS corpus.

### 17. What is training data?
**Answer:** Training data is the portion of the dataset used to train the machine learning algorithm to learn patterns and associations between word features and target labels (`ham` vs. `spam`). We used an **80% split (4,457 messages)**.

### 18. What is testing data?
**Answer:** Testing data is a held-out set of data that the model has never seen during training. It is used to independently evaluate the model's generalization ability. We used a **20% split (1,115 messages)**.

### 19. What is accuracy?
**Answer:** Accuracy is the ratio of correctly predicted instances to the total number of instances evaluated:
$$\text{Accuracy} = \frac{\text{True Positives} + \text{True Negatives}}{\text{Total Predictions}}$$

### 20. What was the test accuracy?
**Answer:** **97.58% test accuracy on the UCI SMS Spam Collection baseline** (1,088 correct predictions out of 1,115 unseen test messages).

### 21. Is the 97.58% accuracy specifically phishing accuracy?
**Answer:** **No.** It is crucial to state this accurately: **97.58% is the baseline test accuracy on the general UCI SMS Spam Collection**, which distinguishes general SMS spam (including promotions, marketing, and scams) from ham. Because general spam is not exclusively phishing, our system adds secondary heuristic layers (URL analysis and social engineering heuristics) specifically designed to detect smishing tactics.

### 22. What are the limitations of the dataset?
**Answer:**
1. **Age:** The UCI dataset was compiled primarily from 2011–2012 SMS data; modern smishing campaigns use newer lures (e.g., cryptocurrency, package customs fees, 2FA prompt intercepts).
2. **Class Imbalance:** 86.6% ham vs. 13.4% spam.
3. **Language:** Exclusively English text.

### 23. What would you do to create a more phishing-specific dataset?
**Answer:** We would aggregate modern smishing reports from threat intelligence feeds like PhishTank, the Anti-Phishing Working Group (APWG), and public crowdsourced scam registries, annotating them with granular labels such as link obfuscation, brand impersonation, and lure type.

---

## Part 3: Backend Questions

### 24. What API endpoints are used?
**Answer:**
1. `GET /`: Health check endpoint returning `{"service": "PhishGuard AI API", "status": "online"}`.
2. `POST /predict`: Primary threat analysis endpoint that accepts a message payload and returns classification, risk score, heuristics, and recommendations.

### 25. What does POST /predict do?
**Answer:** It receives a JSON payload `{"message": "<text>"}`, runs the TF-IDF and Logistic Regression pipeline, executes regex URL extraction and social engineering analysis, computes the 0–100 risk score, generates a natural language explanation, and returns the full JSON response.

### 26. What input does it accept?
**Answer:** A JSON object with a single required string field:
```json
{
  "message": "Your text here"
}
```

### 27. What output does it return?
**Answer:** A structured JSON object containing 12 fields: `message`, `prediction` (ham/spam), `label` (Legitimate/Suspicious/Phishing), `confidence`, `risk_score` (0–100), `risk_level` (Low/Medium/High/Critical), `detected_urls`, `url_analysis`, `social_engineering`, `indicators`, `explanation`, and `recommendation`.

### 28. How does Flask communicate with React?
**Answer:** Via standard HTTP REST calls over JSON. The React frontend uses an Axios/fetch service (`src/services/api.js`) targeting `http://127.0.0.1:5000`. Flask uses `flask_cors.CORS(app)` to allow cross-origin requests from `http://localhost:5173`.

### 29. What happens if the backend is unavailable?
**Answer:** The React frontend detects the connection failure:
1. The navbar status pill changes to red: **"Backend: Offline"**.
2. If a scan is attempted, a graceful error alert is shown: *"Unable to connect to PhishGuard AI backend. Please ensure the Flask server is running."*
3. The UI does not crash.

---

## Part 4: Risk Analysis Questions

### 30. How is the risk score calculated?
**Answer:** It uses an additive, clamped formula in `backend/app.py`:
1. **Base ML Score:** +5 for ham; $30 + \text{int}(\text{confidence} \times 10)$ for spam (adds 35–40).
2. **URL Analysis:** +25 for suspicious/shortened URLs; +5 for normal URLs.
3. **Social Engineering:** Fear (+15), Account Verification (+15), Urgency (+10), Reward (+15), Authority (+10).
4. **Synergy Bonus:** +10 if a suspicious URL co-occurs with urgency, fear, or verification.
5. **Clamping:** Strictly clamped between 0 and 100 using `max(0, min(100, score))`.

### 31. What do the four risk levels mean?
**Answer:**
- **0 – 29 (Low Risk):** Benign message with no significant threat indicators. Safe to interact with.
- **30 – 59 (Medium Risk):** Contains mild indicators (e.g. a link or mild urgency). Exercise caution.
- **60 – 79 (High Risk):** Multiple suspicious indicators (e.g. financial reward or unknown shortened link). Do not click links.
- **80 – 100 (Critical Risk):** High-confidence smishing attack combining psychological pressure and suspicious links. Block sender immediately.

### 32. What indicators are checked?
**Answer:**
- **URL Indicators:** Shortened URLs (bit.ly, tinyurl), raw IP addresses, suspicious TLDs.
- **Behavioral Indicators:** Urgency, Fear/Threat, Account Verification, Authority Impersonation, Reward/Lottery lures.

### 33. How are URLs analyzed?
**Answer:** The backend extracts links using regular expressions matching HTTP/HTTPS and domain patterns. It then inspects the domain name against a list of known URL shortening services (e.g., bit.ly, tinyurl.com, is.gd, t.co) and checks whether the host is a raw IP address. It does this purely through passive, local heuristics without making live external network queries.

### 34. What is social engineering?
**Answer:** Social engineering is the psychological manipulation of individuals into performing actions or divulging confidential information by exploiting human cognitive biases such as fear, trust, greed, or urgency.

### 35. Which social engineering indicators are detected?
**Answer:**
1. **Urgency:** Artificial deadlines ("immediately", "expires in 24 hours").
2. **Fear/Threat:** Account penalties or legal action ("suspended", "locked", "blocked").
3. **Account Verification:** Credential harvesting requests ("verify your account", "confirm identity").
4. **Authority/Impersonation:** Pretending to be an institution ("bank", "IRS", "FedEx", "security department").
5. **Reward:** Unsolicited prize lures ("congratulations", "you won", "cash prize").

### 36. Why can a message with moderate ML confidence still receive a high risk score?
**Answer:** Because of defense-in-depth! If a clever attacker crafts a novel message that evades the statistical vocabulary of the ML model (resulting in low or moderate spam confidence), but includes a shortened `bit.ly` link and asks the user to `"verify your account"`, the heuristic layer adds +25 (URL) + 15 (Verification) + 10 (Synergy) = 50 points, escalating the message into Medium or High Risk. This prevents single points of failure.

---

## Part 5: Real-Time Questions

### 37. How does real-time detection work?
**Answer:**
- In the **Web Application:** It works via an interactive **simulation** where a background timer streams incoming message payloads into the scan pipeline, immediately analyzing them and popping up alerts.
- In the **Android Architecture:** It works via a system `BroadcastReceiver` listening for `SMS_RECEIVED`, which extracts the SMS payload the moment the cell tower delivers it to the device and sends it to the API.

### 38. Can the web browser automatically read phone SMS?
**Answer:** **No.** Modern web browsers operate inside a strict security sandbox and have no API or operating system permission to access a user's cellular hardware or read incoming SMS messages.

### 39. What is the current web real-time implementation?
**Answer:** It is an interactive **simulation** (`src/services/realtimeDetectionService.js`) that periodically feeds realistic incoming messages into the detection engine to demonstrate how an automated background monitor intercepts, scores, and raises security alerts.

### 40. What is the Android component intended to do?
**Answer:** The Android companion module is designed to run in the background on mobile devices. When an SMS arrives, `SmsReceiver` intercepts the broadcast, calls the Flask API, and if a threat is detected, displays a native heads-up security notification before the user opens the default messaging app.

### 41. Why is Android required for actual phone SMS interception?
**Answer:** Android provides the `RECEIVE_SMS` system permission and the `android.provider.Telephony.SMS_RECEIVED` broadcast intent. Only native operating system applications with user-granted telephony permissions can read raw incoming cellular SMS messages.

---

## Part 6: Security & Privacy Questions

### 42. Does the system store passwords?
**Answer:** **No.** PhishGuard AI never requests, collects, or stores passwords.

### 43. Does it ask users for OTPs?
**Answer:** **No.** PhishGuard AI never asks for One-Time Passwords or two-factor authentication codes. In fact, its recommendation engine explicitly instructs users *never* to share OTPs.

### 44. What personal permissions does the Android component request?
**Answer:** Only four necessary permissions in `AndroidManifest.xml`:
1. `RECEIVE_SMS` (to inspect incoming messages)
2. `INTERNET` (to communicate with the backend API)
3. `ACCESS_NETWORK_STATE` (to check connectivity)
4. `POST_NOTIFICATIONS` (to display security alerts on Android 13+)
It does **not** request contacts, location, camera, or storage permissions.

### 45. How does the system warn users?
**Answer:**
- On the web UI: Through color-coded risk badges, a prominent threat banner with clear advice, and a floating dismissible alert modal (`RealTimeAlert.jsx`) for high/critical threats.
- On Android: Through a high-priority heads-up notification with a red warning badge.

### 46. What should a user do when a phishing alert appears?
**Answer:** The system recommends:
1. Do not click any links in the message.
2. Do not reply or call phone numbers mentioned in the text.
3. Do not provide passwords or OTPs.
4. Block the sender and delete the message.

---

## Part 7: Limitation & Future Scope Questions

### 47. Can the system detect every phishing message?
**Answer:** **No system can detect 100% of phishing attacks.** Zero-day attacks with completely novel phrasing, obfuscated leetspeak, or legitimate compromised domains can sometimes evade static patterns or statistical models.

### 48. Can the system guarantee 100% accuracy?
**Answer:** **No.** In cybersecurity and machine learning, claiming 100% accuracy is technically impossible and dishonest. Threat landscapes evolve constantly. PhishGuard AI provides defense-in-depth to minimize false negatives and false positives, not an infallible guarantee.

### 49. What are the current limitations?
**Answer:**
1. The ML model was trained on the general UCI SMS Spam Collection benchmark, not an exclusively smishing dataset.
2. The heuristic analyzers use deterministic regex keywords and do not capture obfuscated leetspeak.
3. The URL analyzer operates offline and does not query live external reputation databases.
4. The web application is a simulation; Android device testing was not verified on hardware.

### 50. What improvements could be made in the future?
**Answer:**
1. Fine-tuning a compact Transformer language model like **DistilBERT** or **MobileBERT** for contextual semantic understanding.
2. Integrating live threat reputation feeds like **Google Safe Browsing** and **PhishTank**.
3. Compiling the ML model to **TensorFlow Lite / ONNX** to run 100% on-device on Android without needing a network API call.
4. Expanding heuristics to support multilingual SMS messages.
