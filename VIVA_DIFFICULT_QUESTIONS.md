# PhishGuard AI — Difficult Viva Questions & Answers

This document provides honest, technically defensible, and academically rigorous answers to 15 challenging questions commonly posed by external examiners during final-year project defenses.

---

### Q1. "Your dataset is spam detection. Why are you calling the project phishing detection?"
**Answer:**  
*"That is a perceptive and completely valid observation, sir/ma'am. We acknowledge that the UCI SMS Spam Collection is a general SMS spam/ham dataset, and we explicitly state in our documentation that it provides the baseline text classifier for the project.  
However, PhishGuard AI is not merely the machine learning model. In our architecture, the ML model handles general lexical spam filtering, while two dedicated secondary layers—our **defensive URL heuristic engine** (which catches shortened and obfuscated links) and our **social engineering rule engine** (which detects urgency, credential verification, and brand impersonation)—specifically target smishing attack vectors.  
It is the synthesis of the ML model with these specialized heuristic layers in our composite Risk Engine that makes PhishGuard AI a dedicated phishing detection system."*

---

### Q2. "If the model only knows ham and spam, how can it detect phishing?"
**Answer:**  
*"The ML model alone outputs probabilities for general spam vs. ham. However, in our system, the ML output is only one input into the composite Risk Engine.  
When an incoming message is evaluated:  
1. If the ML model classifies it as spam with high confidence, that sets a high base risk score.  
2. If the message also contains an obfuscated `bit.ly` link, the URL engine adds $+25$ points.  
3. If it contains 'verify account' or 'account suspended', the social engineering engine adds $+15$ to $+30$ points.  
4. The synergy bonus adds another $+10$ to $+15$ points, escalating the final verdict to Phishing with Critical Risk.  
Even if the ML model outputs a borderline prediction (as in our delivery scam test case), the heuristic layers escalate the final classification to Phishing."*

---

### Q3. "Does 97.58% mean your system detects 97.58% of phishing messages?"
**Answer:**  
*"No, sir/ma'am. That would be a misleading claim, and we explicitly avoid it in Slide 8 and our reports.  
The 97.58% figure is strictly the baseline test accuracy achieved on the 1,115 held-out test messages of the UCI SMS Spam Collection benchmark.  
In real-world cybersecurity, adversaries continuously alter phrasing, register novel domains, and employ evasion tactics that are not present in a static academic dataset. Real-world smishing capture rates depend on the synergy of both our ML classifier and our defensive heuristic layers."*

---

### Q4. "Why didn't you use BERT or a transformer?"
**Answer:**  
*"We evaluated transformer models during our architectural design, but chose Logistic Regression paired with TF-IDF for three deliberate engineering reasons:  
1. **Inference Latency:** A real-time mobile message detection system must evaluate messages in milliseconds. Logistic Regression executes in under 5 milliseconds on CPU, whereas BERT requires hundreds of milliseconds and significant battery consumption on mobile hardware.  
2. **Resource Footprint:** A BERT model requires hundreds of megabytes of RAM and storage, making it impractical for lightweight on-device mobile companion integration. Our model and vectorizer together occupy less than 2 megabytes.  
3. **High Baseline Accuracy:** For short SMS messages where vocabulary is concise, Logistic Regression with L2 regularization achieved 97.58% test accuracy, providing an optimal trade-off between performance and speed. We have included fine-tuning DistilBERT in our future scope."*

---

### Q5. "Why didn't you use a deep-learning model like an LSTM or CNN?"
**Answer:**  
*"Deep learning models like LSTMs and CNNs excel when there are complex sequential dependencies across long paragraphs or documents. However, SMS messages have an average length of only 15 to 30 words.  
On short text, recurrent networks often overfit due to the limited number of tokens and require significantly more training data and computational overhead. Linear models with TF-IDF n-grams capture keyword co-occurrences effectively, offer full interpretability through model weights, and run with negligible latency."*

---

### Q6. "What happens when a legitimate bank message is flagged as phishing (false positive)?"
**Answer:**  
*"This is an inherent challenge in cybersecurity because legitimate bank alerts often use urgent language (e.g., 'Urgent: Fraud alert on your card').  
In PhishGuard AI, an official message with urgent wording may receive an elevated Medium or High risk score. However, our system's actionable recommendation is designed specifically to mitigate this:  
Our alert does not say 'Delete this message'. Instead, it instructs the user: *'Do not click links in this message. Contact your bank directly using the verified customer service number on the back of your card or via their official mobile app.'*  
Even if the alert was triggered by a legitimate message, verifying through official channels protects the user without disrupting banking operations."*

---

### Q7. "Can a phishing message contain no URL at all? Can your system detect it?"
**Answer:**  
*"Yes, absolutely. Attackers frequently send smishing messages that instruct victims to call a fraudulent phone number or reply via SMS (e.g., tech support scams or fake tax refunds).  
In that scenario:  
1. The URL analysis engine accurately detects `has_url: false` and adds 0 URL penalty points.  
2. The TF-IDF model evaluates the vocabulary for fraud patterns.  
3. The social engineering engine flags urgency, fear, or authority impersonation.  
If an attacker writes 'URGENT: Call IRS support immediately regarding your tax refund', the urgency and authority triggers still flag the message and assign a Medium or High risk score."*

---

### Q8. "Can a normal, non-shortened URL be suspicious?"
**Answer:**  
*"Yes. Attackers frequently register deceptive full domains using suspicious top-level domains (e.g., `secure-chase-update.xyz` or `paypal-login.top`), or use raw numeric IP addresses (e.g., `http://192.168.1.1/login`), or create deeply nested subdomains to mimic legitimate brands.  
Our URL heuristic engine explicitly checks for numeric IP hosts, high-risk TLDs (`.xyz`, `.top`, `.tk`, `.buzz`, `.work`), and excessive subdomains, flagging them even if no URL shortener was used."*

---

### Q9. "Can a shortened URL always be considered malicious? Aren't you causing false positives?"
**Answer:**  
*"You are completely correct that many legitimate companies use `bit.ly` or `tinyurl` to save character limits in marketing text messages.  
That is why our system **never** classifies a message as Phishing based solely on a shortened link. A shortened link adds only 25 points to the risk score, which keeps the message within the 'Low Risk' (0–29) or lower 'Medium Risk' tier.  
It is only when that shortened link is combined with high-risk social engineering triggers—such as 'your account is suspended' or 'verify your password'—that the synergy bonus elevates the score to High or Critical Risk."*

---

### Q10. "What happens if the Flask backend server is unavailable or down?"
**Answer:**  
*"Our React frontend is engineered with defensive network error handling. If `fetch('http://127.0.0.1:5000/predict')` fails or times out:  
1. The client catches the network exception gracefully.  
2. The loading spinner is dismissed immediately.  
3. An inline error banner is rendered: *'Unable to connect to PhishGuard AI backend. Please make sure the Flask server is running.'*  
The user interface does not crash, previous scan history stored in `localStorage` remains fully accessible, and the user can retry once the backend is restored."*

---

### Q11. "Can a web browser directly read incoming phone SMS?"
**Answer:**  
*"No, sir/ma'am. Web browsers operate inside a strict OS security sandbox and have zero access to mobile telephony APIs, incoming SMS broadcasts, or device notifications. Claiming a web browser could do that would be technically incorrect.  
That is why our web application transparently labels that feature as a **Simulation** to demonstrate the automated ingestion pipeline.  
For native mobile interception, we developed an **Android companion module** that uses an Android `BroadcastReceiver` listening for `SMS_RECEIVED`."*

---

### Q12. "Is the Android companion application fully tested end-to-end?"
**Answer:**  
*"The Android companion source code—including the `SmsReceiver`, `DetectionService`, API network client, and notification channel—is fully implemented under `phish guard/android/`.  
However, as documented in our testing report, our host testing environment lacked the Android SDK, JDK, and emulator tools in the system PATH. Therefore, we honestly report that live end-to-end device testing depends on an Android Studio/SDK/device environment, rather than fabricating a false test pass."*

---

### Q13. "What causes false positives in your system?"
**Answer:**  
*"False positives primarily occur when legitimate promotional or transactional messages use aggressive marketing language. For example, an authentic e-commerce flash sale message saying 'URGENT: 50% discount expires in 2 hours! Click bit.ly/sale' triggers both the urgency keyword rule and the URL shortener check, resulting in an elevated risk score despite being legitimate marketing."*

---

### Q14. "What causes false negatives in your system?"
**Answer:**  
*"False negatives occur when an attacker crafts a highly novel smishing message using benign conversational words without obvious urgency triggers, paired with a full URL on a newly registered reputable domain (e.g., a `.com` domain) that has not yet been flagged by shortener or TLD heuristics. In such cases, the TF-IDF model and heuristic rules may assign a Low Risk score."*

---

### Q15. "How would you improve the project if you had 3 more months?"
**Answer:**  
*"With additional time, we would prioritize three major enhancements:  
1. **On-Device Inference:** Quantize the model to TensorFlow Lite and embed it directly into the Android app so it performs 100% offline classification without requiring a network call to Flask.  
2. **Contextual NLP:** Fine-tune a lightweight transformer model like DistilBERT on a modern smishing dataset to better understand contextual sentence semantics.  
3. **Live Threat Intelligence:** Connect our URL engine to asynchronous live reputation APIs like Google Safe Browsing and PhishTank with local caching to catch zero-day phishing domains."*
