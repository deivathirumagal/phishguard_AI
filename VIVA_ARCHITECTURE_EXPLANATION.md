# PhishGuard AI — Technical Architecture & Pipeline Walkthrough

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Purpose:** Comprehensive technical defense guide explaining each stage of the end-to-end detection pipeline for final-year engineering viva examiners.  

---

## 1. End-to-End Pipeline Architecture Flowchart

```text
               +-------------------------------------------+
               |            1. Incoming Message            |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |           2. Message Detection            |
               |   - Web UI (Manual / Simulation)          |
               |   - Android (SMS_RECEIVED Broadcast)      |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |              3. Preprocessing             |
               |   - Normalization, strip, case folding    |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |               4. NLP / TF-IDF             |
               |   - TfidfVectorizer n-gram mapping        |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |         5. Logistic Regression            |
               |   - Supervised classification (ham/spam)  |
               +-------------------------------------------+
                                     |
                   +-----------------+-----------------+
                   |                                   |
                   v                                   v
+-----------------------------------+ +-----------------------------------+
|          6A. URL Analysis         | |   6B. Social Engineering Analysis |
| - Passive regex extraction        | | - 5 cognitive manipulation regexes|
| - Shorteners, IPs, suspicious TLDs| | - Urgency, Fear, Verify, Auth, Rew|
+-----------------------------------+ +-----------------------------------+
                   |                                   |
                   +-----------------+-----------------+
                                     |
                                     v
               +-------------------------------------------+
               |           7. Risk Score Engine            |
               |   - Mathematical weighting & clamping     |
               |   - 0–100 score across 4 risk tiers       |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |  8. Classification + Explanation + Alert  |
               |   - Dynamic explanation & recommendation  |
               |   - Color-coded badge & threat banner     |
               +-------------------------------------------+
                                     |
                                     v
               +-------------------------------------------+
               |           9. History / Dashboard          |
               |   - LocalStorage audit logging            |
               |   - Real-time telemetry calculations      |
               +-------------------------------------------+
```

---

## 2. Stage-by-Stage Input, Processing & Output Breakdown

---

### Stage 1: Incoming Message
- **Input:** Raw SMS text delivered via mobile cellular network or pasted into the web user interface.
- **Processing:** Raw string payload is received without prior filtering.
- **Output:** Raw text string (e.g., `"URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"`).

---

### Stage 2: Message Detection (Client Ingestion)
- **Input:** Raw text from the user or mobile system.
- **Processing:**
  - **Web Console:** User enters message in the Manual Scan input box or the Real-Time Stream generator emits a simulated mobile message event.
  - **Android Module:** `SmsReceiver.java` intercepts the `android.provider.Telephony.SMS_RECEIVED` system broadcast, extracts the PDU byte array, and constructs the message body.
  - Formulates an HTTP POST request targeting `http://127.0.0.1:5000/predict` (or `http://10.0.2.2:5000/predict` on the Android emulator) with payload `{"message": "<text>"}`.
- **Output:** Validated JSON POST request dispatched to Flask REST API.

---

### Stage 3: Preprocessing
- **Input:** JSON payload string from `POST /predict`.
- **Processing:**
  - Validates non-empty input (returns HTTP 400 if empty or whitespace).
  - Performs case normalization (converts characters to lowercase).
  - Strips leading/trailing whitespace and non-printable control characters while preserving URLs and key punctuation.
- **Output:** Cleaned, normalized text string ready for vectorization and regex inspection.

---

### Stage 4: NLP / TF-IDF Feature Extraction
- **Input:** Cleaned text string.
- **Processing:**
  - Passes text through the pre-fitted `TfidfVectorizer` (`tfidf_vectorizer.pkl`).
  - Computes **Term Frequency (TF)**: Frequency of words within the message with sublinear scaling.
  - Applies **Inverse Document Frequency (IDF)**: Weights words inversely proportional to their corpus frequency, discounting common stop words while emphasizing informative tokens (e.g., "suspended", "verify", "claim").
  - Maps words and n-grams to a sparse numerical feature vector matching the trained vocabulary dimension.
- **Output:** High-dimensional numerical TF-IDF feature vector.

---

### Stage 5: Logistic Regression Classification
- **Input:** Numerical TF-IDF feature vector.
- **Processing:**
  - Computes the dot product between feature weights and the TF-IDF vector, adding the bias term:
    $$z = \mathbf{w}^T \mathbf{x} + b$$
  - Passes $z$ through the sigmoid logistic function:
    $$P(\text{spam} \mid \mathbf{x}) = \frac{1}{1 + e^{-z}}$$
  - Compares probability against 0.5 threshold to predict binary class (`"ham"` vs. `"spam"`).
  - Computes class confidence score via `predict_proba`.
- **Output:** Statistical prediction (`"ham"` or `"spam"`) and confidence probability (e.g., `spam`, confidence: `0.6864`).

---

### Stage 6A: URL Analysis Engine (Parallel Heuristics)
- **Input:** Normalized message text.
- **Processing:**
  - Extracts URLs using regular expressions matching HTTP/HTTPS protocols and domain formats.
  - Inspects hostnames against a curated list of known public URL shortening domains (`bit.ly`, `tinyurl.com`, `is.gd`, `t.co`, `ow.ly`).
  - Detects raw numeric IPv4/IPv6 addresses used as hostnames.
  - Detects suspicious or high-risk top-level domains.
  - **Core Security Rule:** Operates completely offline without making outbound network requests or DNS resolutions.
- **Output:** Object containing `has_url` (boolean), `suspicious_url` (boolean), `detected_urls` (list), and `reasons` (human-readable explanation).

---

### Stage 6B: Social Engineering Analysis Engine (Parallel Heuristics)
- **Input:** Normalized message text.
- **Processing:**
  - Evaluates message text against 5 compiled regex pattern dictionaries targeting cognitive manipulation:
    1. **Urgency:** Detects artificial deadlines ("immediately", "urgent", "expires").
    2. **Fear / Threat:** Detects intimidation ("suspended", "locked", "blocked", "legal action").
    3. **Account Verification:** Detects credential harvesting ("verify your account", "confirm identity").
    4. **Authority / Impersonation:** Detects claimed institutional authority ("bank", "IRS", "FedEx", "security department").
    5. **Reward:** Detects unexpected financial lures ("congratulations", "cash prize", "lottery").
- **Output:** Object with 5 boolean flags and a list of active human-readable indicator tags.

---

### Stage 7: Composite Risk Score Engine
- **Input:** ML prediction & confidence, URL analysis results, and social engineering flags.
- **Processing:**
  - Evaluates additive mathematical scoring:
    - Base ML: +5 for ham; $30 + \text{int}(\text{confidence} \times 10)$ for spam (35–40 pts).
    - URL penalty: +25 for suspicious shorteners/IPs; +5 for normal URLs.
    - Social Engineering: Fear (+15), Verification (+15), Urgency (+10), Reward (+15), Authority (+10).
    - Synergy Bonus: +10 if suspicious URL co-occurs with urgency, fear, or verification.
  - Strictly clamps the composite total between 0 and 100: `max(0, min(100, score))`.
  - Assigns categorical risk tier:
    - `0 – 29`: Low Risk
    - `30 – 59`: Medium Risk
    - `60 – 79`: High Risk
    - `80 – 100`: Critical Risk
- **Output:** Bounded integer score (0–100) and risk tier string.

---

### Stage 8: Classification, Explanation & Alert Generation
- **Input:** Risk score, risk tier, detected indicators, and URL reasons.
- **Processing:**
  - Maps risk score to user-facing threat label (`"Legitimate"`, `"Suspicious"`, or `"Phishing"`).
  - Dynamically synthesizes a concise natural language explanation summarizing all detected factors.
  - Generates clear, actionable user recommendations (e.g., *"Do not click links, provide passwords, or share personal information"*).
  - Constructs the final JSON API response.
  - On the client: Renders risk score gauge, color-coded badges, threat breakdown cards, and triggers a pulsing alert banner (or floating modal `RealTimeAlert.jsx` for High/Critical threats).
- **Output:** Complete JSON response to client and high-visibility UI presentation.

---

### Stage 9: History & Dashboard Persistence
- **Input:** Complete scan result object with timestamp.
- **Processing:**
  - `src/utils/historyStorage.js` serializes the scan object and saves it to browser `localStorage`.
  - Increments organizational telemetry counters (total scans, threat counts, average risk score, manipulation vector frequencies).
  - Updates the `History` audit trail and refreshes visual charts in `Dashboard`.
- **Output:** Persistent, searchable audit trail and updated organizational analytics.

---

## 3. Key Architectural Strengths for Viva Defense

1. **Elimination of Single Points of Failure:** If an evasive message tricks the ML model into predicting `ham`, the URL and social engineering heuristic engines still catch the shortener and credential lure, escalating the threat.
2. **Sub-20ms Latency:** TF-IDF and Logistic Regression combined with compiled regexes operate in under 20 milliseconds, suitable for battery-constrained mobile phones.
3. **Total Explainability:** Unlike deep learning "black boxes" that output only an opaque probability, PhishGuard AI tells the user exactly *why* a message is dangerous and *what* specific steps to take.
