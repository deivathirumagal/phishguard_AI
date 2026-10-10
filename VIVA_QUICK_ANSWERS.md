# PhishGuard AI — Viva Quick Answers (21 Core Questions)

This reference document provides concise, technically accurate answers for the **final college viva defense**. All answers strictly reflect the actual implementation in PhishGuard AI.

---

### 1. What is phishing?
**Answer:**  
Phishing is a social engineering cyber attack where adversaries pose as legitimate organizations or trusted individuals to deceive victims into revealing sensitive information, such as passwords, banking credentials, or credit card numbers, or downloading malicious payloads. When executed over SMS, it is specifically termed **smishing**.

---

### 2. Why is phishing dangerous?
**Answer:**  
Phishing bypasses traditional network firewalls by targeting the human element rather than software vulnerabilities. Because people frequently trust SMS notifications on their mobile devices and act quickly, a single successful phishing attack can lead to account takeover, identity theft, unauthorized financial transfers, and corporate data breaches.

---

### 3. What problem does PhishGuard AI solve?
**Answer:**  
PhishGuard AI protects mobile and web users from deceptive messages by providing an automated, real-time detection pipeline. Instead of relying solely on keyword filters or blacklists that attackers easily evade, it uses a **hybrid defense engine** combining Natural Language Processing, statistical Machine Learning, passive URL heuristics, and social engineering behavioral analysis to deliver an explainable risk assessment.

---

### 4. Why use NLP (Natural Language Processing)?
**Answer:**  
NLP enables computers to understand, interpret, and extract semantic patterns from unstructured human language. Attackers constantly vary their wording (e.g., using synonyms like "verify", "update", "reactivate", or inserting urgency). NLP transforms raw text into structured numerical representations that capture linguistic patterns indicative of fraud.

---

### 5. What is TF-IDF?
**Answer:**  
**TF-IDF** stands for *Term Frequency-Inverse Document Frequency*. It is a statistical numerical feature extraction technique:
- **Term Frequency (TF):** Measures how frequently a word occurs in a specific message.
- **Inverse Document Frequency (IDF):** Penalizes common words across the entire dataset (such as "the", "is", "at") and elevates rare, discriminative words (such as "urgent", "suspended", "won", "verify").  
In our project, `TfidfVectorizer` converts message text into a high-dimensional sparse vector for model inference.

---

### 6. Why use Logistic Regression?
**Answer:**  
Logistic Regression was chosen as the baseline classifier because:
1. **High Interpretability:** Model weights correspond directly to positive (spam) or negative (ham) word associations.
2. **Calibrated Probabilities:** It produces continuous probability estimates (`predict_proba`) between 0 and 1, which feed directly into our risk scoring engine.
3. **Ultra-Low Latency:** In real-time message detection, inference takes under 5 milliseconds with minimal CPU and memory footprint, making it ideal for mobile/companion environments.

---

### 7. What dataset was used?
**Answer:**  
The baseline model was trained on the benchmark **UCI SMS Spam Collection dataset**, a public, curated corpus of authentic SMS messages tagged as legitimate (ham) or spam.

---

### 8. How large is the dataset?
**Answer:**  
The dataset contains **5,572 authentic SMS messages**:
- **4,825 legitimate (ham) messages** (~86.6%)
- **747 spam/smishing messages** (~13.4%)  
The model used an **80% / 20% stratified split**:
- **Training set:** 4,457 messages (3,860 ham, 597 spam)
- **Testing set:** 1,115 messages (965 ham, 150 spam)

---

### 9. What was the test accuracy?
**Answer:**  
The baseline test accuracy is **97.58%** on the 1,115 unseen test messages of the UCI SMS Spam Collection. On the test set, it achieved:
- Spam Precision: `90.13%`, Recall: `91.95%`, F1-Score: `91.03%`
- Confusion Matrix: 951 True Negatives, 137 True Positives, 15 False Positives, 12 False Negatives.

---

### 10. Is 97.58% specifically phishing accuracy?
**Answer:**  
**No.** It is crucial to state this accurately: **97.58% is the baseline test accuracy on the general UCI SMS Spam Collection dataset**, which distinguishes general SMS spam from legitimate messages. Because spam includes general marketing, promotions, and scams alongside phishing, our project implements specialized secondary layers—**URL analysis and social engineering heuristics**—specifically tailored to capture smishing tactics.

---

### 11. How is a URL analyzed?
**Answer:**  
URLs are extracted using regular expressions and analyzed **passively and defensively without visiting, pinging, or resolving the link**:
1. **Shortener Detection:** Checks against known URL shortener domains (e.g., `bit.ly`, `tinyurl.com`, `t.co`) that obfuscate destination domains.
2. **Raw IP Address:** Flags numeric IPv4/IPv6 host addresses (e.g., `http://192.168.1.1`).
3. **Excessive Subdomains:** Identifies deeply nested subdomains used to mimic legitimate brands.
4. **Suspicious TLDs:** Flags high-risk top-level domains frequently abused by phishing campaigns (`.xyz`, `.top`, `.tk`, `.work`, `.buzz`, `.club`).
5. **Credential Obfuscation:** Checks for `@` symbols in the authority segment used to spoof hostnames.

---

### 12. What is social engineering?
**Answer:**  
Social engineering is the psychological manipulation of individuals into performing actions or divulging confidential information. Rather than hacking code, attackers exploit human cognitive vulnerabilities such as fear, trust, greed, or curiosity. PhishGuard AI detects five specific social engineering patterns:
1. **Urgency:** "Immediately", "within 24 hours", "act now".
2. **Fear & Threat:** "Account suspended", "legal action", "unauthorized access".
3. **Account Verification:** "Verify your identity", "confirm password", "update KYC".
4. **Authority Impersonation:** Impersonating banks (HDFC, Chase), delivery services (FedEx, UPS), or tax authorities.
5. **Reward & Prize Lures:** "Won a lottery", "claim your gift", "cash bonus".

---

### 13. How is the risk score calculated?
**Answer:**  
The risk score is a composite **0 to 100** score calculated using an additive formula:
$$\text{Risk Score} = \min(100, \text{Base ML Score} + \text{URL Weight} + \text{Social Engineering Weight} + \text{Synergy Bonuses})$$
- **Base ML Score:** Model spam probability scaled to 0–40 points.
- **URL Analysis:** Suspicious URL shorteners or raw IPs add up to 25 points.
- **Social Engineering:** Triggered behavioral categories add 10–20 points.
- **Synergy Bonus:** If a suspicious URL is combined with urgency or verification language, an extra 15-point penalty is applied.  
The final score maps into four tiers: **Low (0–29)**, **Medium (30–59)**, **High (60–79)**, and **Critical (80–100)**.

---

### 14. What is the difference between spam and phishing?
**Answer:**  
- **Spam:** Unsolicited bulk messages typically promoting products, commercial advertising, or unwanted content. While annoying, spam is usually not directly seeking to steal credentials.
- **Phishing:** A targeted, fraudulent attack specifically crafted to deceive the victim into surrendering credentials, financial data, or downloading malware. All smishing is technically unsolicited (spam), but not all spam is phishing.

---

### 15. Why can the SMS model produce false positives or false negatives?
**Answer:**  
- **False Positives:** Legitimate promotional messages from authentic companies often use words like "offer", "discount", or "urgent sale", which overlap with spam tokens.
- **False Negatives:** Attackers may craft brief messages without obvious spam keywords (e.g., "FedEx: Your package is waiting. Check here: link"), which appear benign to an n-gram model.  
**How we mitigate this:** Our hybrid engine uses URL heuristics and social engineering triggers to catch false negatives, while keeping benign messages low-risk.

---

### 16. How does the real-time demo work?
**Answer:**  
The web application features a **Real-Time Simulation** tab that demonstrates automated ingestion:
1. An incoming message arrives at the ingestion handler `processIncomingMessage()`.
2. The service checks a 15-second deduplication cache to ignore duplicate spam bursts.
3. The message is dispatched asynchronously to `POST /predict`.
4. The response triggers a real-time visual alert and automatically persists the record to the local audit trail and dashboard.

---

### 17. Can a browser directly read phone SMS?
**Answer:**  
**No.** Web browsers operate within a strict OS-level sandbox and do not have access to the mobile operating system's telephony stack, SMS database, or system notifications for security and privacy reasons. That is why the web feature is transparently labeled as a **Simulation**, while mobile interception is delegated to our native Android companion module.

---

### 18. How does Android receive SMS?
**Answer:**  
In Android, the system emits an **ordered broadcast** with the action `android.provider.Telephony.SMS_RECEIVED` when an SMS arrives. Our companion app registers a native `SmsReceiver` (a `BroadcastReceiver`) with the `RECEIVE_SMS` permission. When triggered, it extracts the SMS PDU using `Telephony.Sms.Intents.getMessagesFromIntent(intent)` and forwards the message body to a background `DetectionService` that calls the Flask API.

---

### 19. What happens when a phishing SMS is detected?
**Answer:**  
1. The backend returns a classification of `Phishing` with a high/critical risk score and explanation.
2. In the web interface, a high-visibility, pulsing red **Security Alert Banner** is rendered at the top of the report with specific instructions (e.g., "Do NOT click the link", "Contact official institution").
3. In the Android companion module, the background service posts a high-priority heads-up system notification warning the user before they can open the default SMS app.

---

### 20. What are the limitations of the current system?
**Answer:**  
1. **Static URL Inspection Only:** We evaluate URL strings via heuristics; we do not perform live DNS lookups, domain WHOIS age verification, or third-party blacklist checks (e.g., VirusTotal/Google Safe Browsing).
2. **Baseline Dataset Scope:** The UCI dataset reflects SMS spam rather than exclusively modern smishing campaigns.
3. **Language Support:** The current NLP vectorizer and keyword lists are optimized for English text.
4. **Offline Mobile Requirement:** The Android app currently requires network connectivity to reach the Flask backend API.

---

### 21. What are possible future improvements?
**Answer:**  
1. **On-Device Mobile Inference:** Quantize the ML model into TensorFlow Lite or ONNX Runtime to perform 100% offline classification on the phone without an external API.
2. **Deep Learning / Transformer Models:** Fine-tune a lightweight BERT model (e.g., MobileBERT or DistilBERT) to better capture conversational semantics and context.
3. **Live Threat Intelligence Integration:** Incorporate real-time threat intelligence feeds (Google Safe Browsing API, PhishTank, URLhaus) with caching.
4. **Multilingual Support:** Train cross-lingual models (e.g., XLM-RoBERTa) to detect phishing in regional languages.
