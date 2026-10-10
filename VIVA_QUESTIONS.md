# PhishGuard AI — Viva Voce & Oral Defense Preparation Guide
**35 Essential Questions & Authoritative Answers for Project Examination**

---

### Category 1: Cybersecurity & Threat Landscape

#### Q1: What is phishing, and specifically, what is smishing?
**Answer:** Phishing is a social engineering cyberattack where an attacker impersonates a trustworthy entity to deceive victims into revealing sensitive information (passwords, credit card numbers, OTPs) or downloading malware. **Smishing (SMS Phishing)** is a specific variant conducted via Short Message Service (SMS) text messages on mobile devices, exploiting the high trust and rapid open rates associated with text messaging.

#### Q2: Why did you choose SMS phishing detection as your final-year project?
**Answer:** Mobile messaging is now the primary attack vector for credential theft and financial fraud. While email has robust anti-spam filters, mobile messaging lacks standardized, real-time client-side protection. Attackers exploit mobile constraints—such as abbreviated screens, lack of URL previewing, and urgent contexts—making smishing both technically challenging and socially impactful to solve.

#### Q3: What are the primary attack vectors in modern smishing?
**Answer:** Modern smishing relies on three main vectors:
1. **Deceptive URLs:** Using URL shorteners (`bit.ly`) or lookalike domains to obscure fraudulent landing pages.
2. **Psychological Social Engineering:** Creating artificial urgency, fear of account suspension, or financial lures to bypass logical scrutiny.
3. **Institutional Impersonation:** Posing as banks, courier delivery services (FedEx/UPS), or government bodies (tax/IRS) to command trust.

#### Q4: Why are traditional static blacklists insufficient for smishing defense?
**Answer:** Attackers register disposable domains, rotate bulletproof hosting IP addresses, and generate dynamic shortened links within minutes. By the time a URL appears on a central blacklist (such as Google Safe Browsing or Spamhaus), the phishing campaign has typically concluded.

#### Q5: What is social engineering in the context of cybersecurity?
**Answer:** Social engineering is the psychological manipulation of individuals into performing actions or divulging confidential information. Rather than exploiting software vulnerabilities, it targets human cognitive vulnerabilities—such as compliance with authority, fear of loss, or urgency.

---

### Category 2: Machine Learning & Natural Language Processing

#### Q6: Why use machine learning instead of pure rule-based matching?
**Answer:** Rule-based matching is rigid; attackers easily bypass keyword filters using homoglyphs, intentional typos, or alternative phrasing. Machine learning models generalize patterns across word distributions and linguistic styles, identifying deceptive messaging even when specific keywords are altered.

#### Q7: What is Natural Language Processing (NLP)?
**Answer:** NLP is a subfield of artificial intelligence focused on enabling computers to understand, interpret, and manipulate human language. In PhishGuard AI, NLP is used for tokenization, stop word filtering, and vectorizing unstructured text into mathematical representations.

#### Q8: What is TF-IDF, and how does it work mathematically?
**Answer:** Term Frequency-Inverse Document Frequency (TF-IDF) evaluates how important a word is to a document within a corpus. Term Frequency ($\text{TF}$) measures how frequently a term appears in a message. Inverse Document Frequency ($\text{IDF}$) diminishes the weight of terms that occur very frequently across all messages (e.g., `"the"`, `"is"`) and amplifies unique, informative terms (e.g., `"suspended"`, `"verify"`). The product $\text{TF} \times \text{IDF}$ produces the final feature weight.

#### Q9: Why did you choose TF-IDF over simple Bag-of-Words (BoW)?
**Answer:** Bag-of-Words merely counts word frequencies, allowing common non-discriminative words to dominate the feature space. TF-IDF penalizes universally frequent words, allowing high-signal security indicators to stand out mathematically.

#### Q10: What is an n-gram, and why did you configure `ngram_range=(1, 2)`?
**Answer:** An n-gram is a contiguous sequence of $n$ items from a given sample of text. A unigram ($n=1$) is a single word (`"account"`), while a bigram ($n=2$) is a two-word pair (`"verify account"`). Configuring unigrams and bigrams allows the model to capture critical phrases where individual words might seem benign but together indicate phishing intent.

#### Q11: Why did you choose Logistic Regression over more complex models like Random Forest or Deep Neural Networks?
**Answer:** Logistic Regression provides four distinct advantages for this project:
1. **Low Latency:** Inference completes in under 5 milliseconds, making it ideal for real-time mobile and API detection.
2. **Probabilistic Output:** It naturally outputs well-calibrated probabilities via the Sigmoid function, which feed directly into our risk scoring engine.
3. **Interpretability:** Feature weights can be directly inspected to understand which words contribute positively or negatively to the classification.
4. **Lightweight Footprint:** The serialized model artifact is under 150 KB, suitable for edge or mobile deployment.

#### Q12: How does Logistic Regression make a prediction mathematically?
**Answer:** It computes a linear combination of input features: $z = \mathbf{w}^T \mathbf{x} + b$. It then applies the Sigmoid function $\sigma(z) = \frac{1}{1 + e^{-z}}$ to map $z$ to a probability between 0 and 1. If $P(y = 1 \mid \mathbf{x}) \ge 0.5$, the message is classified as spam/phishing; otherwise, it is classified as legitimate.

---

### Category 3: Model Evaluation & Performance Metrics

#### Q13: What dataset was used to train the model, and what is its size?
**Answer:** The model was trained on the benchmark **UCI SMS Spam Collection**, consisting of **5,572** authentic SMS messages (4,825 legitimate / `ham` and 747 spam/malicious / `spam`).

#### Q14: What is class imbalance, and how did it manifest in your dataset?
**Answer:** Class imbalance occurs when one class significantly outnumbers the other. In our dataset, legitimate messages comprise 86.60% of the data, while spam comprises only 13.40% (a 6.46:1 ratio). If left unaddressed, a naive model predicting all messages as legitimate would achieve 86.60% accuracy while failing completely at threat detection.

#### Q15: How did you solve the class imbalance problem during training?
**Answer:** We configured `class_weight='balanced'` in scikit-learn's Logistic Regression. This automatically assigns weights inversely proportional to class frequencies, heavily penalizing errors on the minority (spam) class and boosting recall on threats.

#### Q16: Why is accuracy alone an insufficient metric for phishing detection?
**Answer:** In imbalanced datasets, accuracy can be misleadingly high even if the model misses every single malicious message. In cybersecurity, the costs of False Positives (inconvenience) and False Negatives (compromised account) are asymmetric. Metrics such as Precision, Recall, and F1-Score are required to evaluate threat detection fidelity.

#### Q17: Define Precision, Recall, and F1-Score in the context of PhishGuard AI.
**Answer:**
- **Precision:** Out of all messages flagged as phishing, what percentage was actually phishing? (High precision = low false alarms). Our model achieves **90.13%**.
- **Recall:** Out of all actual phishing messages, what percentage did the model successfully catch? (High recall = low missed attacks). Our model achieves **91.95%**.
- **F1-Score:** The harmonic mean of precision and recall: $2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$. Our model achieves **91.03%**.

#### Q18: What was your overall model accuracy and test set distribution?
**Answer:** On the unseen 20% test split (1,115 messages: 966 ham, 149 spam), the model achieved an overall accuracy of **97.58%** (1,088 correct predictions out of 1,115).

#### Q19: What is the confusion matrix for your model?
**Answer:**
- **True Negatives (TN):** 951 legitimate messages correctly classified as `ham`.
- **False Positives (FP):** 15 legitimate messages incorrectly flagged as `spam`.
- **False Negatives (FN):** 12 spam messages missed as `ham`.
- **True Positives (TP):** 137 spam messages correctly detected as `spam`.

---

### Category 4: System Architecture & Defensive Heuristics

#### Q20: Why did you implement a "hybrid" architecture instead of relying purely on ML?
**Answer:** Pure ML models are susceptible to vocabulary drift, zero-day phrasing, and adversarial perturbations. Conversely, deterministic rules cannot generalize. By layering **defensive URL heuristics** and **5-category social engineering detection** on top of the statistical ML classifier, PhishGuard AI ensures that messages with dangerous URLs or psychological coercion are caught even if the ML classifier expresses low confidence.

#### Q21: How does the URL Analysis module inspect links without compromising privacy?
**Answer:** It performs **passive, zero-resolution analysis**. It extracts URLs using regex, parses domain components using `urllib.parse`, and checks against registries of known URL shorteners (`bit.ly`, `tinyurl.com`), suspicious TLDs (`.xyz`, `.tk`), and raw IP hosts. It **never** sends an HTTP request to or resolves the URL, ensuring the attacker cannot detect that the message was inspected.

#### Q22: How is the composite Risk Score (0–100) calculated?
**Answer:**
1. A base score is derived from the ML model's confidence ($35–70$ for spam, $5–25$ for ham).
2. URL penalties are added: $+25$ for shortened/suspicious URLs, $+10$ for general links.
3. Social engineering penalties are added: $+12$ points per active indicator (up to $+40$).
4. The final sum is bounded to $[0, 100]$ and mapped to one of 5 risk tiers (*Safe*, *Low Risk*, *Medium Risk*, *High Risk*, *Critical Risk*).

#### Q23: What are the 5 social engineering categories evaluated by PhishGuard AI?
**Answer:**
1. **Urgency:** Artificial deadlines coercing hasty action (`"urgent"`, `"act now"`).
2. **Fear/Threat:** Threats of financial or legal loss (`"account suspended"`, `"unauthorized"`).
3. **Account Verification:** Requests to validate credentials (`"verify your password"`, `"confirm KYC"`).
4. **Authority Impersonation:** Pretending to be an institution (`"Chase Bank"`, `"IRS"`, `"FedEx"`).
5. **Reward Language:** Greed lures (`"lottery winner"`, `"claim prize"`).

#### Q24: What is the purpose of the 15-second Deduplication Filter?
**Answer:** Cellular networks and multipart SMS retransmissions frequently trigger multiple broadcast intents for the same message. The in-memory cache drops identical messages arriving within 15 seconds, preventing redundant backend API calls, wasted CPU cycles, and repeated alert notifications.

---

### Category 5: Mobile Platform & Android Companion

#### Q25: Why can't a web browser directly intercept incoming phone SMS?
**Answer:** Modern mobile and desktop operating systems enforce strict application sandboxing. Web browsers run inside a sandboxed process with no access to cellular baseband telephony, incoming SMS broadcasts, or OS-level notification listeners. Any claim that a client-side JavaScript web app can intercept SMS directly is technically false.

#### Q26: How does the Android companion bridge this architectural gap?
**Answer:** The Android companion is a native app utilizing Android's telephony framework. It declares `android.permission.RECEIVE_SMS` and registers an `SmsReceiver` with priority `999` to intercept `android.provider.Telephony.SMS_RECEIVED` broadcasts. It extracts the message text and forwards it asynchronously to the Flask backend.

#### Q27: Why is `10.0.2.2:5000` used instead of `127.0.0.1:5000` in Android emulator testing?
**Answer:** In the Android emulator, `127.0.0.1` refers to the emulator's own virtual loopback interface. Android's virtual router assigns the special IP address `10.0.2.2` to represent the host development machine's `127.0.0.1`.

#### Q28: What is a `NotificationChannel`, and why is it required?
**Answer:** Introduced in Android 8.0 (API 26), `NotificationChannel` groups notifications by category, allowing users to customize behavior. PhishGuard AI creates a channel with `IMPORTANCE_HIGH` to display heads-up banners with sound and vibration when a critical phishing attack arrives.

#### Q29: What permissions does the Android app request, and what are the privacy justifications?
**Answer:**
- `RECEIVE_SMS`: Only for real-time broadcast interception. (Does NOT request `READ_SMS` to read existing stored messages).
- `INTERNET`: To send the message string to `/predict`.
- `ACCESS_NETWORK_STATE`: To verify network link health before dispatching requests.
- `POST_NOTIFICATIONS`: Required on Android 13+ (API 33+) to show threat alerts.

---

### Category 6: Project Limitations & Future Scope

#### Q30: What are the primary technical limitations of the current implementation?
**Answer:**
1. **Dataset Generalization:** Trained on general SMS spam rather than an exclusively modern smishing corpus.
2. **Passive Heuristics:** Zero-resolution URL analysis cannot detect malicious content hosted on reputable domains or dynamic redirection chains.
3. **Local Development Host:** The Flask backend currently runs in a development server environment on HTTP without TLS/HTTPS encryption.

#### Q31: How would you scale PhishGuard AI for production enterprise deployment?
**Answer:**
1. Deploy the Flask API behind a production WSGI server (Gunicorn) with an Nginx reverse proxy and SSL/TLS certificates.
2. Implement an on-device TFLite model inside the Android app to perform preliminary zero-latency inference offline without sending SMS data over the network.
3. Integrate privacy-preserving Bloom filters of verified malicious domain feeds (e.g., PhishTank, OpenPhish).

#### Q32: Could attackers evade your social engineering rules? How would you counter this?
**Answer:** Yes, attackers could rephrase messages to avoid specific trigger words. To counter this, future iterations would replace regex matching with zero-shot classification using distilled transformers (e.g., MobileBERT) trained on intent classification.

#### Q33: How does the system handle non-English or multilingual smishing?
**Answer:** The current model and regex patterns are optimized for English. Handling multilingual attacks would require multilingual datasets (e.g., mBERT or XLM-RoBERTa) and localized regex dictionaries.

#### Q34: What is the difference between client-side scan history and a cloud database?
**Answer:** PhishGuard AI stores audit records in client-side storage (`localStorage` on web, `SharedPreferences` on Android). This eliminates database maintenance overhead and enforces privacy by design—no personal SMS messages are ever stored on remote servers.

#### Q35: What is the single most unique innovation of PhishGuard AI compared to existing SMS blockers?
**Answer:** **Explainability and hybrid multi-evidence fusion**. While standard SMS blockers act as opaque binary filters that quietly delete messages, PhishGuard AI provides transparent 8-card inspection breakdowns, exact social engineering manipulation indicators, and actionable safety guidance that educates the user on *why* the message is dangerous.
