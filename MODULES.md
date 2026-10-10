# PhishGuard AI — Module Specifications
**Detailed Module-by-Module Technical Breakdown**

---

## Module 1: Message Detection & Input Ingestion

### Purpose
Provides user and system entry points for receiving raw message content, performing preliminary syntax validation, and managing ingestion modes (manual scanning vs. automated real-time simulation).

### Input
- Raw user text pasted into the web scanner textarea.
- Simulated incoming message text selected from preset scenarios.
- Raw SMS broadcast payloads intercepted by the Android companion.

### Processing
1. Checks for non-null, non-empty text strings.
2. Strips surrounding whitespace and checks message length.
3. Consults the **Deduplication Cache**: checks if an identical message was processed within the previous 15 seconds (`DEDUPLICATION_WINDOW_MS = 15000`).
4. If a duplicate is detected, terminates the pipeline early to conserve network resources and prevent alert spam.
5. In manual web mode, dispatches directly via `fetch()`. In simulation mode, routes through `processIncomingMessage()`.

### Output
- Validated message payload dispatched to `POST /predict`.
- Or duplicate warning notice: *"⏱️ Duplicate message skipped: This identical message was processed within the last 15 seconds."*

---

## Module 2: Data Preprocessing & Cleaning

### Purpose
Normalizes inconsistent, noisy text into a standardized format suitable for NLP tokenization, eliminating superficial differences caused by casing and irregular spacing.

### Input
- Raw message string (e.g., `"  URGENT!  Your Account   has been LOCKED!!  "`).

### Processing
1. Type verification (ensures input is safely cast to a string).
2. Case folding: Converts all characters to lowercase using `.lower()`.
3. Whitespace normalization: Replaces multiple consecutive whitespace characters (spaces, tabs, newlines) with a single ASCII space using regex `\s+`.
4. Trimming: Strips leading and trailing whitespace using `.strip()`.

### Output
- Clean, normalized text string (e.g., `"urgent! your account has been locked!!"`).

---

## Module 3: NLP & TF-IDF Feature Extraction

### Purpose
Transforms arbitrary-length natural language text into fixed-dimensional numerical feature vectors representing word importance relative to the corpus.

### Input
- Cleaned message string.

### Processing
1. **Tokenization:** Breaks the character sequence into individual word tokens.
2. **Stop Word Removal:** Filters out high-frequency, low-entropy English words (e.g., `"the"`, `"is"`, `"at"`).
3. **N-Gram Generation:** Extracts both unigrams (single words like `"account"`) and bigrams (two-word sequences like `"verify account"` or `"click here"`) within `ngram_range=(1, 2)`.
4. **TF-IDF Weighting:** Computes the product of Term Frequency ($TF$) and Inverse Document Frequency ($IDF$):
   $$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1$$
5. **Dimension Bounding:** Maps vectors into a vocabulary constrained to the top 5,000 most significant features (`max_features=5000`).

### Output
- Sparse numerical feature vector of shape `(1, 5000)`.

---

## Module 4: AI Machine Learning Classification

### Purpose
Executes statistical classification inference to evaluate whether the linguistic style of the message matches known spam/malicious patterns or legitimate personal messaging.

### Input
- 5,000-dimensional TF-IDF feature vector.

### Processing
1. Feeds the vector into a trained **Logistic Regression** model:
   $$z = \mathbf{w}^T \mathbf{x} + b$$
2. Calculates posterior class probabilities using the Sigmoid (logistic) function:
   $$P(y = \text{spam} \mid \mathbf{x}) = \frac{1}{1 + e^{-z}}$$
3. Applies balanced class weights (`class_weight='balanced'`) during training to compensate for the natural dataset imbalance (86.6% legitimate vs. 13.4% spam).
4. Produces the preliminary prediction: `"ham"` (legitimate) or `"spam"` (suspicious/malicious).

### Output
- Preliminary label: `"ham"` or `"spam"`.
- Continuous probability/confidence score (e.g., `0.9335` for legitimate, `0.6864` for spam).

---

## Module 5: Defensive URL Analysis

### Purpose
Detects and analyzes hyperlinked targets within the message text using passive, zero-resolution heuristics to protect user privacy and prevent trigger callbacks.

### Input
- Cleaned message text.

### Processing
1. **URL Extraction:** Identifies URLs using regex `(?:https?://|www\.)[^\s<>"']+`.
2. **Host Parsing:** Extracts hostname and Top-Level Domain (TLD) using `urllib.parse.urlparse`.
3. **Shortener Detection:** Checks against a curated registry of known URL shortening domains (`bit.ly`, `tinyurl.com`, `t.co`, `goo.gl`, `ow.ly`, `is.gd`, `buff.ly`, `adf.ly`, `cutt.ly`, `rb.gy`, `shorturl.at`).
4. **Suspicious TLD Check:** Flags domains utilizing TLDs frequently abused in bulk attacks (`.xyz`, `.top`, `.work`, `.click`, `.buzz`, `.tk`, `.ml`, `.ga`, `.cf`, `.gq`, `.loan`, `.fit`, `.surf`).
5. **IP Address Detection:** Detects numeric IPv4 host addresses (e.g., `http://192.168.1.1/login`) used to bypass domain reputation systems.
6. **Zero-Resolution Privacy Guarantee:** Never executes DNS lookups or HTTP requests against extracted URLs.

### Output
- `detected_urls`: List of extracted URL strings.
- `url_analysis`: Object containing `has_url` (boolean), `suspicious_url` (boolean), and `reasons` (array of explanation strings).

---

## Module 6: Social Engineering Heuristic Analysis

### Purpose
Identifies psychological manipulation tactics commonly deployed by cybercriminals to coerce immediate, uncritical victim compliance.

### Input
- Cleaned message text.

### Processing
Evaluates regular expression pattern sets across five distinct manipulation categories:
1. **Urgency:** Detects artificial time pressure (`urgent`, `immediately`, `act now`, `within 24 hours`, `limited time`, `hurry`).
2. **Fear & Threat:** Identifies threats to security or assets (`suspended`, `blocked`, `unauthorized`, `compromised`, `illegal`, `arrest`, `lawsuit`).
3. **Account Verification:** Identifies credential harvest attempts (`verify your account`, `confirm your identity`, `update your password`, `login to verify`, `kyc update`).
4. **Authority & Impersonation:** Detects institutional impersonation (`bank`, `irs`, `police`, `fedex`, `paypal`, `customer service`, `official notification`).
5. **Financial Reward:** Identifies greed/lure bait (`winner`, `lottery`, `congratulations`, `free gift`, `claim your prize`, `cash bonus`).

### Output
- `social_engineering`: Dictionary mapping each of the 5 categories to a boolean flag (`true`/`false`).
- `indicators`: List of active human-readable indicator names (e.g., `["Urgency", "Fear/Threat", "Account Verification"]`).

---

## Module 7: Risk Score Engine & Explanation Generator

### Purpose
Synthesizes evidence from the ML model, URL heuristics, and social engineering indicators into a transparent, bounded composite risk score (0–100) and plain-language explanation.

### Input
- ML prediction and confidence.
- URL analysis results.
- Social engineering indicators.

### Processing
1. **Base Score Calculation:**
   - If ML predicts `"spam"`: Base score = $\min(70, \max(35, \text{int}(\text{confidence} \times 70)))$.
   - If ML predicts `"ham"`: Base score = $\max(5, \text{int}((1 - \text{confidence}) \times 25))$.
2. **URL Penalties:**
   - Suspicious shortened URL: $+25$ points.
   - General URL in message: $+10$ points.
3. **Social Engineering Penalties:**
   - $+12$ points per active social engineering indicator (up to $+40$ max).
4. **Bounding & Risk Tier Mapping:**
   - Clamped to $[0, 100]$ integer range.
   - **0–14:** *Safe* (Green)
   - **15–29:** *Low Risk* (Emerald)
   - **30–59:** *Medium Risk* (Amber)
   - **60–84:** *High Risk* (Orange/Red)
   - **85–100:** *Critical Risk* (Crimson)
5. **Final Label Decision:**
   - If score $\ge 60$ or (spam + suspicious URL) or (spam + $\ge 2$ SE indicators): `"Phishing"`.
   - Else if score $\ge 30$ or any suspicious factor: `"Suspicious"`.
   - Else: `"Legitimate"`.
6. **Explanation Synthesis:** Constructs plain-language sentences detailing exact reasons why the message was flagged.

### Output
- `risk_score`: Integer between 0 and 100.
- `risk_level`: String (`"Safe"`, `"Low Risk"`, `"Medium Risk"`, `"High Risk"`, or `"Critical Risk"`).
- `label`: String (`"Legitimate"`, `"Suspicious"`, or `"Phishing"`).
- `explanation`: Detailed plain-language rationale.
- `recommendation`: Contextual defensive guidance.

---

## Module 8: Security Alert & User Interface

### Purpose
Renders real-time visual alerts and structured risk reports to communicate threat levels immediately and clearly to the user.

### Input
- Complete JSON prediction response.

### Processing
1. Evaluates alert condition: `label === "Phishing"` OR `risk_level === "High Risk" || risk_level === "Critical Risk"` OR `risk_score >= 60`.
2. If threat detected, renders `<RealTimeAlert />` component:
   - Danger glowing border animation (`critical-alert` / `high-alert`).
   - Shield alert badge: `⚡ REAL-TIME SECURITY INTERCEPT`.
   - Threat metrics row (Verdict, Risk Score, Risk Level, Confidence).
   - Detection Analysis and Security Recommendations.
   - **Mandatory Safety Directive:**
     > *"⚠️ CRITICAL SAFETY DIRECTIVE: Do not click suspicious links. Do not provide passwords, OTPs, or personal financial information."*
3. Renders the 8 detailed inspection cards in the evaluation report.

### Output
- Visual security banner and interactive 8-card inspection panel in the DOM.

---

## Module 9: Scan History & Audit Trail

### Purpose
Maintains a client-side audit log of all analyzed messages, enabling users and security analysts to review past evaluations without transmitting data to an external database.

### Input
- Prediction result objects from manual scans or real-time simulation.

### Processing
1. Implemented in [`src/utils/historyStorage.js`](file:///c:/Users/hp/OneDrive/Desktop/project/phish%20guard/src/utils/historyStorage.js).
2. Generates unique record ID (`scan_<timestamp>_<random>`) and human-readable timestamps.
3. Prepends the newest scan to the existing history array in `localStorage` under key `phishguard_scan_history`.
4. Caps storage at the most recent 100 scans to maintain lightweight browser memory usage.
5. Provides filtering, text search, and deletion capabilities.

### Output
- Persistent array of scan history records accessible across all pages.

---

## Module 10: Analytics Dashboard

### Purpose
Visualizes aggregate threat metrics, detection distributions, and system health to provide high-level security situational awareness.

### Input
- Audit history array retrieved via `getScanHistory()`.

### Processing
1. Calculates aggregate statistics via `getDashboardStats()`:
   - Total Scans performed.
   - Total Phishing threats detected.
   - Total Legitimate messages verified.
   - Total Suspicious messages flagged.
   - Current overall system threat level (derived from the most recent scan).
2. Calculates percentage distribution of threat classifications.
3. Renders visual distribution bar and recent scan audit table.

### Output
- Dashboard view (`/dashboard`) displaying metric summary cards, visual threat meter, and quick-action shortcuts.

---

## Module 11: Android Companion SMS Listener

### Purpose
Provides platform-level background SMS broadcast interception on Android devices, bridging the mobile OS security gap that prevents web browsers from accessing cellular messages.

### Input
- Cellular SMS broadcast intent (`android.provider.Telephony.SMS_RECEIVED`).

### Processing
1. **`SmsReceiver.java`:** Intercepts broadcast with priority 999; extracts originating phone number and reassembles multipart message segments.
2. **`DuplicateFilter.java`:** Discards identical SMS messages arriving within 15 seconds.
3. **`PhishGuardApiClient.java`:** Dispatches asynchronous HTTP POST to `http://10.0.2.2:5000/predict` (emulator) or LAN IP (physical phone).
4. **`SecurityAlertManager.java`:** If a threat is confirmed, builds and fires a high-priority Android `NotificationChannel` alert with vibration, red warning accents, and the safety directive.
5. **`MainActivity.java`:** Displays live engine status, backend connectivity indicator, in-app threat cards, and recent SMS audit log.

### Output
- Android system heads-up notification and in-app security alert on mobile device.
