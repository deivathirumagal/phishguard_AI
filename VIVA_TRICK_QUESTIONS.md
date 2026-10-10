# Viva Trick Questions & Defense Guide – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Purpose:** Guide to defending against challenging, probing, and trap questions from university viva examiners.  
**Structure for Each Question:**
- **Short Answer:** Quick, confident, direct response (5–10 seconds).
- **Technically Accurate Explanation:** In-depth justification demonstrating deep conceptual understanding.
- **What NOT to Claim:** Critical pitfalls, exaggerations, or false claims to avoid at all costs.

---

### Q1. "Your model has 97.58% accuracy. Does that mean it detects phishing with 97.58% accuracy?"
- **Short Answer:** No, sir/ma'am. 97.58% is strictly the test accuracy achieved on the general UCI SMS Spam Collection benchmark dataset.
- **Technically Accurate Explanation:** The UCI SMS dataset is a benchmark for classifying general SMS messages as either legitimate ("ham") or unsolicited ("spam"). While spam includes financial fraud and smishing, it also contains general marketing and advertisements. Therefore, 97.58% measures the model's ability to distinguish spam from ham on that corpus. To detect specialized phishing, our system layers secondary deterministic heuristics—specifically URL link analysis and social engineering pattern matching—on top of the ML baseline.
- **What NOT to Claim:** Do NOT say: *"Yes, our system detects 97.58% of all phishing attacks in the real world."*

---

### Q2. "Can your website actually read incoming SMS from my phone right now?"
- **Short Answer:** No. Web browsers cannot intercept phone SMS due to operating system sandboxing. The web application features an interactive simulation.
- **Technically Accurate Explanation:** Web browsers run in a secure, isolated sandbox without access to telephony hardware or system broadcasts. Intercepting real incoming SMS messages requires native OS-level telephony permissions (`RECEIVE_SMS`), which is why we architected the native Android companion module using a `BroadcastReceiver`. The web interface demonstrates how an automated background monitor would process incoming streams.
- **What NOT to Claim:** Do NOT claim the website connects directly to cellular towers or reads SMS through browser APIs.

---

### Q3. "Does your URL analyzer check whether a website is currently malicious on the Internet?"
- **Short Answer:** No. Our URL analyzer uses deterministic structural heuristics locally; it does not query live external reputation databases.
- **Technically Accurate Explanation:** The URL analyzer extracts URLs using regular expressions and inspects structural risk indicators: whether the link uses a known URL shortener (e.g., bit.ly, tinyurl.com) that conceals the true destination, whether it uses a raw IP address instead of a domain name, or whether it uses suspicious TLDs. This provides instant, offline, zero-latency detection without depending on third-party network APIs.
- **What NOT to Claim:** Do NOT claim you perform live WHOIS lookups, DNS lookups, or queries to Google Safe Browsing / VirusTotal unless those APIs are implemented in the code.

---

### Q4. "Is Logistic Regression an AI model? Isn't it just a statistical formula?"
- **Short Answer:** Yes, Logistic Regression is a foundational supervised machine learning model.
- **Technically Accurate Explanation:** While grounded in classical statistics, in machine learning and AI, Logistic Regression is a linear classification model that learns optimal weight parameters from training data via gradient descent or numerical optimization (like L-BFGS). It minimizes log-loss to predict conditional class probabilities $P(Y=1|X)$. In applied AI, selecting an interpretable, low-latency algorithm that fits the problem constraints is standard engineering practice.
- **What NOT to Claim:** Do NOT pretend Logistic Regression is a deep neural network or "generative AI".

---

### Q5. "Why not use Deep Learning like LSTM or BERT?"
- **Short Answer:** For short SMS messages, Logistic Regression with TF-IDF provides optimal latency (< 15 ms), high interpretability, and low resource overhead while achieving 97.58% baseline accuracy.
- **Technically Accurate Explanation:** SMS messages average only 10 to 30 words. Deep learning models like LSTMs or large Transformers (e.g. BERT) require significant computational resources, GPU acceleration, and substantial memory footprints, leading to inference latencies of 200–800 ms. Logistic Regression with TF-IDF provides near-zero latency, operates efficiently on low-power mobile devices, and avoids overfitting on concise texts. We have identified fine-tuning compact models like DistilBERT or MobileBERT as future scope.
- **What NOT to Claim:** Do NOT say: *"Deep learning is worse"* or *"Transformers don't work for NLP."* Explain it as an engineering trade-off between latency, resource constraints, and accuracy.

---

### Q6. "What if a phishing message contains no links at all?"
- **Short Answer:** The message is still analyzed by the ML classifier and the social engineering heuristics engine.
- **Technically Accurate Explanation:** Smishing attacks often use telephone numbers or prompt direct SMS replies (e.g., *"Text YES to claim your prize"* or *"Call 1-800-XXX immediately"*). In these cases, the URL score is 0, but the social engineering heuristics flag the urgency, fear, or reward indicators, and the ML classifier evaluates the lexical content, assigning an appropriate Medium or High risk score.
- **What NOT to Claim:** Do NOT claim the system only detects link-based phishing.

---

### Q7. "What happens if an attacker uses leetspeak, like 'v3r1fy' or 'b@nk'?"
- **Short Answer:** Highly obfuscated leetspeak is a known limitation of static keyword matching, though the ML model may still catch surrounding vocabulary.
- **Technically Accurate Explanation:** Our deterministic regex heuristics look for defined English keyword patterns. While common variations are included, deliberate leetspeak or character substitutions can evade static keyword regexes if not explicitly mapped. However, the TF-IDF and Logistic Regression layer evaluates the entire message context and character n-grams, which helps mitigate evasion. Handling advanced character obfuscation is part of our future scope using subword tokenization.
- **What NOT to Claim:** Do NOT claim your regexes catch every possible leetspeak permutation.

---

### Q8. "What is the difference between spam and phishing?"
- **Short Answer:** Spam is unsolicited bulk messaging; phishing is a malicious attack specifically intended to deceive the victim into surrendering sensitive data or credentials.
- **Technically Accurate Explanation:** All phishing messages sent in bulk can be considered spam, but not all spam is phishing. Spam includes legitimate marketing, product advertisements, and newsletters sent without consent. Phishing specifically employs social engineering lures (urgency, impersonation, fear) and deceptive links to steal identity or financial assets.
- **What NOT to Claim:** Do NOT say spam and phishing are the exact same thing.

---

### Q9. "If a message is labeled 'ham' by the ML model, can it still be flagged as Phishing?"
- **Short Answer:** Yes! This is a core strength of our hybrid defense-in-depth architecture.
- **Technically Accurate Explanation:** In our test case with `"FedEx: Your package is waiting. Pay the customs fee immediately at http://bit.ly/example"`, the ML model classified the text as `ham` because "FedEx", "package", and "waiting" appeared normal in the older dataset. However, our heuristic engines detected the shortened `bit.ly` URL (+25 pts) and urgent language (+10 pts) plus synergy bonus (+10 pts), escalating the risk score to 50 (Medium Risk) and flagging the label as Phishing. This demonstrates how heuristics prevent single points of failure.
- **What NOT to Claim:** Do NOT claim the ML model never makes classification errors.

---

### Q10. "Did you test the Android app on a physical Android phone?"
- **Short Answer:** The Android app is a verified source-level architectural foundation; physical device and emulator execution were not conducted in the current environment.
- **Technically Accurate Explanation:** The complete Android companion module has been implemented in Java (`SmsReceiver`, `DetectionService`, `PhishGuardApiClient`, `SecurityAlertManager`) and the `AndroidManifest.xml` permissions are configured. However, due to the absence of an Android SDK and emulator on the development workstation, live on-device testing was not performed. The module represents a verified architectural foundation ready for deployment in Android Studio.
- **What NOT to Claim:** Do NOT claim you tested it on an emulator or real device if you did not.

---

### Q11. "Why did you split the dataset 80/20 instead of 70/30 or 90/10?"
- **Short Answer:** An 80/20 stratified split is standard practice for datasets of this size, providing 4,457 training samples and 1,115 test samples.
- **Technically Accurate Explanation:** With 5,572 samples, an 80/20 split ensures that the minority spam class (747 samples) has sufficient representation in both training (598 samples) and testing (149 samples). Stratification guarantees that both splits maintain the exact 86.6% to 13.4% class ratio, preventing evaluation bias.
- **What NOT to Claim:** Do NOT claim 80/20 is a mathematical law; state that it is an established empirical standard.

---

### Q12. "What is the baseline accuracy if a naive classifier just predicts 'ham' every time?"
- **Short Answer:** Approximately 86.6%.
- **Technically Accurate Explanation:** Because 4,825 out of 5,572 messages (86.59%) are ham, a naive majority-class classifier that blindly guesses "ham" for every input would achieve ~86.6% accuracy. Our model's 97.58% test accuracy represents an 11-percentage-point improvement over the naive baseline and, crucially, achieves high precision (0.90) and recall (0.90) on the minority spam class.
- **What NOT to Claim:** Do NOT pretend that 86.6% is zero performance; acknowledge class imbalance.

---

### Q13. "What if the user's internet is disconnected?"
- **Short Answer:** The current system operates 100% locally on `localhost` without needing external internet access.
- **Technically Accurate Explanation:** Both the React frontend (`localhost:5173`) and the Flask backend (`127.0.0.1:5000`) run locally on the user's machine. The pre-trained model and TF-IDF vectorizer are loaded from disk (`.pkl` files), and heuristics run locally. No connection to the public internet is needed.
- **What NOT to Claim:** Do NOT claim it requires cloud servers or Wi-Fi to function.

---

### Q14. "What happens if an attacker sends an empty message or a 10,000-word essay?"
- **Short Answer:** The backend validates inputs: empty messages return HTTP 400 Bad Request, and long messages are safely truncated or vectorized without crashing.
- **Technically Accurate Explanation:** `backend/app.py` checks `if not text: return jsonify({"error": "Message is required"}), 400`. For large texts, `TfidfVectorizer` processes tokens within its vocabulary bounds, and regex engines execute in linear time $O(n)$, preventing server denial of service.
- **What NOT to Claim:** Do NOT claim the system has no input validation.

---

### Q15. "Why did you use localStorage instead of a database like MySQL or MongoDB?"
- **Short Answer:** For a privacy-first client application, `localStorage` provides lightweight, persistent, and zero-configuration local storage directly in the user's browser.
- **Technically Accurate Explanation:** PhishGuard AI is designed as a privacy-preserving tool where the user's private message history remains on their own device rather than being stored on a central server. `localStorage` allows audit logging, keyword search, and telemetry calculation without requiring database administration or exposing user communications to centralized data breaches.
- **What NOT to Claim:** Do NOT claim `localStorage` is suitable for multi-user enterprise servers.

---

### Q16. "Can an attacker bypass your URL shortener check by using their own custom domain?"
- **Short Answer:** Yes, if an attacker registers a private domain and uses it as a custom shortener not in our regex list, the shortener heuristic will not trigger.
- **Technically Accurate Explanation:** Our shortener heuristic checks against common public URL shortening domains (`bit.ly`, `tinyurl.com`, `is.gd`, `t.co`, etc.). A custom shortener on a private domain will be treated as a regular URL (+5 pts instead of +25 pts). However, the ML model and social engineering heuristics still inspect the message text, which can still flag the threat.
- **What NOT to Claim:** Do NOT claim your regex catches every private URL shortener in existence.

---

### Q17. "What is the difference between Precision and Recall in phishing detection?"
- **Short Answer:** Precision measures how many flagged messages were actually phishing; Recall measures how many of all actual phishing messages were successfully caught.
- **Technically Accurate Explanation:** 
  - **Precision:** $\frac{TP}{TP + FP}$. High precision means very few false alarms (legitimate messages wrongly blocked).
  - **Recall:** $\frac{TP}{TP + FN}$. High recall means very few missed threats (phishing messages slipping through).
  In security, we strive for high recall to stop threats, but maintain high precision so users do not experience alert fatigue.
- **What NOT to Claim:** Do NOT confuse precision with recall.

---

### Q18. "Why does a message with no suspicious words but a shortened link still get 40 or 50 points?"
- **Short Answer:** Because link obfuscation itself is inherently risky in mobile SMS.
- **Technically Accurate Explanation:** Legitimate organizations rarely use shortened URLs like `bit.ly` in SMS communications because shorteners conceal the true destination hostname. Even if the text appears harmless, an obscured destination is a classic delivery mechanism for drive-by malware or credential harvesters. Assigning a Medium Risk score alerts the user to verify the link before clicking.
- **What NOT to Claim:** Do NOT claim that all shortened links are guaranteed to be malicious.

---

### Q19. "How did you prevent duplicate alerts in the real-time simulation and Android module?"
- **Short Answer:** Using a duplicate filtering cache that tracks recently processed message hashes and timestamps.
- **Technically Accurate Explanation:** In mobile environments, multi-part SMS messages or repeated broadcasts can cause duplicate triggers. The `DuplicateFilter` computes a hash of the sender and message body, storing it with a timestamp. If an identical message arrives within a defined time window (e.g. 10 seconds), it is ignored to prevent alert spam.
- **What NOT to Claim:** Do NOT say duplicate protection happens by magic.

---

### Q20. "If you had 3 more months on this project, what is the single most impactful feature you would add?"
- **Short Answer:** Integrating an on-device compact transformer (DistilBERT/MobileBERT) via TensorFlow Lite and pairing it with asynchronous Google Safe Browsing API checks.
- **Technically Accurate Explanation:** Replacing static regex heuristics with a fine-tuned lightweight transformer would allow contextual understanding of subtle psychological lures and leetspeak. Combining this with live cloud threat feeds for newly registered domains would provide full-spectrum protection against both novel linguistic phrasing and zero-day malicious domains.
- **What NOT to Claim:** Do NOT say the project is already 100% complete and has nothing left to improve. Examiners love hearing mature, realistic roadmaps!
