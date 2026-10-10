# PhishGuard AI — Final Viva Questions & Answers

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Format:** 45 High-Yield Questions with Short, Clear, Beginner-Friendly Answers  
**Scope:** Final-Year College Examination Panel & External Viva  

---

## 1. PROJECT QUESTIONS

### 1. What is PhishGuard AI?
**Answer:**  
PhishGuard AI is an intelligent cyber defense system designed to detect phishing messages (smishing). It uses a hybrid approach combining Natural Language Processing, Machine Learning, defensive URL heuristics, and social engineering analysis to give users an explainable risk score and security advice.

### 2. What problem does it solve?
**Answer:**  
It protects users from deceptive messages that try to steal passwords, bank accounts, or personal data. Because attackers use urgency and shortened links to trick users, PhishGuard AI automatically analyzes messages before the user clicks or responds.

### 3. Why did you choose phishing detection?
**Answer:**  
SMS phishing (smishing) has exploded with mobile banking and smartphone usage. Most people open SMS messages within minutes, making them easy targets for social engineering attacks that bypass traditional network firewalls.

### 4. What are the main modules of the project?
**Answer:**  
1. **Frontend:** React web application with scan interface, dashboard, and history.
2. **Backend API:** Python Flask server processing detection requests.
3. **ML Classifier:** TF-IDF vectorizer + Logistic Regression model.
4. **URL Analysis Engine:** Passive regex and heuristic checker for deceptive links.
5. **Social Engineering Engine:** Behavioral pattern matcher for psychological triggers.
6. **Risk Scoring Engine:** Composite 0–100 risk score and 4-tier risk level calculator.
7. **Android Companion Foundation:** Native Android listener using `SMS_RECEIVED`.

---

## 2. MACHINE LEARNING QUESTIONS

### 5. What is machine learning?
**Answer:**  
Machine learning is a subset of artificial intelligence where algorithms learn patterns from historical data to make predictions on new, unseen data without being explicitly programmed for every rule.

### 6. Why did you choose Logistic Regression?
**Answer:**  
1. It is fast and lightweight, providing sub-15ms predictions suitable for real-time mobile use.
2. It outputs calibrated class probabilities (`predict_proba`) between 0 and 1 that feed directly into our risk score.
3. It is highly interpretable, meaning we can inspect which words contribute to spam or ham.

### 7. What is TF-IDF?
**Answer:**  
TF-IDF stands for *Term Frequency-Inverse Document Frequency*. It converts text into numbers by counting how often a word appears in a message (TF) while penalizing common words like "the" or "is" and rewarding rare, meaningful words like "urgent" or "suspended" (IDF).

### 8. Why can't machine learning take raw text directly?
**Answer:**  
Mathematical models and algorithms can only compute numbers, matrices, and vectors. Raw strings must be converted into numerical feature vectors through vectorization techniques like TF-IDF before classification.

### 9. What is training data?
**Answer:**  
Training data is the portion of the dataset (80% / 4,457 messages in our project) used by the algorithm to learn the relationships between word features and labels (spam vs. ham).

### 10. What is testing data?
**Answer:**  
Testing data is the held-out portion of the dataset (20% / 1,115 messages in our project) that the model never saw during training, used to evaluate how well the model generalizes to new messages.

### 11. What is accuracy?
**Answer:**  
Accuracy is the ratio of correctly predicted messages (both legitimate and spam) to the total number of messages tested:
$$\text{Accuracy} = \frac{\text{True Positives} + \text{True Negatives}}{\text{Total Samples}}$$

### 12. What are precision and recall?
**Answer:**  
- **Precision:** Of all messages the model flagged as spam, what percentage was actually spam? (High precision means few false alarms).
- **Recall:** Of all actual spam messages in the dataset, what percentage did the model successfully catch? (High recall means few missed attacks).

### 13. What is the F1-score?
**Answer:**  
The F1-score is the harmonic mean of precision and recall:
$$\text{F1} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$
It gives a balanced evaluation when classes are imbalanced, as in SMS datasets where legitimate messages far outnumber spam.

### 14. What does 97.58% represent in your project?
**Answer:**  
It represents the test accuracy of our baseline Logistic Regression model on the 1,115 unseen test messages of the UCI SMS Spam Collection dataset.

### 15. Is 97.58% specifically phishing detection accuracy?
**Answer:**  
**No.** It is the baseline test accuracy on the general UCI SMS Spam Collection dataset (spam vs. ham). We deliberately do not call it "phishing accuracy" because the dataset contains general spam alongside phishing. Our hybrid URL and social engineering engines provide the specialized phishing protection.

### 16. What is overfitting?
**Answer:**  
Overfitting occurs when a model memorizes the training data too closely, performing exceptionally well on training samples but poorly on new, unseen data. We avoided overfitting by using regularized Logistic Regression and verifying performance on a held-out test split.

### 17. What are false positives?
**Answer:**  
A false positive occurs when a legitimate, safe message is incorrectly classified as spam or phishing (e.g., an authentic bank notification or promotional sale flagged as an attack).

### 18. What are false negatives?
**Answer:**  
A false negative occurs when a malicious phishing message slips past the model and is incorrectly classified as legitimate. This is the most dangerous failure in cyber defense.

---

## 3. NATURAL LANGUAGE PROCESSING (NLP) QUESTIONS

### 19. What is NLP?
**Answer:**  
Natural Language Processing (NLP) is the field of computer science focused on enabling computers to read, analyze, and extract meaning from human languages.

### 20. What preprocessing is performed in your system?
**Answer:**  
1. Lowercasing all characters so "URGENT" and "urgent" are treated identically.
2. Stripping non-printable ASCII noise and extraneous whitespace.
3. Preserving URL structures and specific punctuation patterns needed for heuristic analysis.

### 21. Why is text preprocessing necessary?
**Answer:**  
Without preprocessing, "Bank", "bank", and "BANK" would be treated as three completely different features, diluting the model's statistical learning and degrading accuracy.

### 22. What features are extracted from the text?
**Answer:**  
1. **N-gram word tokens** weighted by TF-IDF values.
2. **URL indicators:** presence of URLs, shorteners, raw IPs, suspicious TLDs.
3. **Behavioral keywords:** urgency words, threat words, credential verification prompts, brand names, and reward terms.

---

## 4. PHISHING & SOCIAL ENGINEERING QUESTIONS

### 23. What is phishing?
**Answer:**  
Phishing is a fraudulent attempt to steal sensitive personal information or credentials by masquerading as a trustworthy entity in electronic communications.

### 24. What is smishing?
**Answer:**  
Smishing is specifically **SMS Phishing**—phishing attacks delivered through Short Message Service (SMS) text messages on mobile phones.

### 25. What is the difference between spam and phishing?
**Answer:**  
- **Spam:** Unsolicited bulk messages, usually harmless advertising or marketing.
- **Phishing:** Deceptive, criminal attacks designed specifically to steal credentials, money, or install malware. All smishing is technically spam, but not all spam is phishing.

### 26. What is social engineering?
**Answer:**  
Social engineering is the psychological manipulation of people into performing actions or revealing confidential information, exploiting cognitive biases like trust, fear, and curiosity rather than software flaws.

### 27. Why is urgency considered suspicious?
**Answer:**  
Legitimate organizations rarely demand immediate action within minutes or hours. Attackers use phrases like "act immediately" or "within 24 hours" to rush victims into making mistakes before they have time to think or verify.

### 28. Why are shortened URLs suspicious in messages?
**Answer:**  
URL shorteners like `bit.ly` or `tinyurl.com` hide the true destination domain from the user, preventing them from seeing where the link actually leads before clicking.

### 29. What is brand impersonation?
**Answer:**  
Brand impersonation is when an attacker uses the name, logo, or terminology of a well-known company (e.g., Chase, FedEx, Amazon) to establish false trust and trick the victim into believing the message is official.

---

## 5. SYSTEM ARCHITECTURE & IMPLEMENTATION QUESTIONS

### 30. How does the Flask API work?
**Answer:**  
The Flask backend exposes a REST endpoint: `POST /predict`. It receives a JSON object `{"message": "..."}`, passes the text to the preprocessing, TF-IDF, ML model, URL, and social engineering functions, and returns a JSON response with predictions, risk scores, and explanations.

### 31. How does the React frontend communicate with Flask?
**Answer:**  
The React frontend uses the browser's asynchronous `fetch()` API to send an HTTP POST request with a JSON body to `http://127.0.0.1:5000/predict`. It parses the returned JSON and updates the UI state.

### 32. What happens step-by-step when a message is scanned?
**Answer:**  
1. User enters text or clicks a demo preset and clicks "Scan Message".
2. React dispatches `POST /predict` to Flask.
3. Flask runs text preprocessing and TF-IDF vectorization.
4. Logistic Regression computes spam probability.
5. In parallel, URL and social engineering heuristic engines analyze the message.
6. The risk engine combines all signals into a 0–100 score and assigns a risk tier.
7. An explanation and recommendation are generated.
8. React displays the executive summary, alert banner, and detailed breakdown cards, then saves the result to `localStorage`.

### 33. How is the risk score generated?
**Answer:**  
It uses an additive formula bounded between 0 and 100:
$$\text{Risk Score} = \min(100, \text{Base ML} + \text{URL Penalties} + \text{Social Engineering Penalties} + \text{Synergy Bonuses})$$
A suspicious link with urgency or verification adds bonus penalty points.

### 34. How are security alerts triggered?
**Answer:**  
An alert triggers if the final label is `Phishing`, the risk tier is `High Risk` or `Critical Risk`, or the risk score is $\ge 60$. It is strictly suppressed for clean, low-risk legitimate messages.

### 35. How is history stored?
**Answer:**  
History is persisted locally in the browser using HTML5 `localStorage` under the key `phishguard_scan_history`. It stores up to 100 scan objects with timestamps, messages, classifications, and risk scores.

### 36. How does the dashboard obtain its statistics?
**Answer:**  
The dashboard reads the scan records directly from `localStorage` and dynamically computes total scans, legitimate counts, suspicious counts, phishing counts, and percentage distribution. It does not use fake or hard-coded statistics.

---

## 6. ANDROID COMPANION & REAL-TIME QUESTIONS

### 37. How can Android receive SMS messages?
**Answer:**  
Android broadcasts system events when an SMS arrives. Applications declare the `RECEIVE_SMS` permission and register a `BroadcastReceiver` to intercept the incoming message intent.

### 38. What is `SMS_RECEIVED` in Android?
**Answer:**  
`android.provider.Telephony.SMS_RECEIVED` is a system broadcast action sent by the Android OS when a new SMS message is received by the device telephony stack.

### 39. Can a web browser directly read phone SMS?
**Answer:**  
**No.** Web browsers run in a strict security sandbox and cannot access the mobile operating system's SMS database or telephony hardware. That is why our web feature is honestly labeled as a **Simulation**, while native interception is handled by the Android companion module.

### 40. What is the current status of the Android module?
**Answer:**  
The native Android companion architecture is fully implemented in Kotlin/Java under `phish guard/android/`. It includes the `SmsReceiver`, `DetectionService`, API network client, and notification channel. Actual end-to-end device testing depends on having Android Studio, the Android SDK, and an emulator/device environment configured.

### 41. How does the Android app communicate with Flask?
**Answer:**  
It uses an HTTP client (OkHttp/Retrofit) to make an asynchronous POST request to the Flask server. In an Android emulator, it connects to the host machine via `http://10.0.2.2:5000/predict`.

---

## 7. LIMITATIONS & FUTURE SCOPE QUESTIONS

### 42. What are the main limitations of the project?
**Answer:**  
1. Baseline model trained on general SMS spam rather than modern smishing corpuses.
2. URL analysis uses static heuristics without live DNS or WHOIS reputation lookups.
3. Web browser cannot intercept phone SMS directly.
4. Language support is currently limited to English.

### 43. Why isn't the model 100% perfect?
**Answer:**  
No machine learning model in cybersecurity can achieve 100% accuracy. Attackers constantly invent new phrasing, obfuscations, and evasion tactics (adversarial attacks). Claiming 100% accuracy would be scientifically dishonest.

### 44. Why did you use the UCI SMS dataset instead of a dedicated phishing dataset?
**Answer:**  
The UCI SMS Spam Collection is the most widely validated, publicly accessible academic benchmark for SMS text classification. Because dedicated mobile smishing datasets are scarce and often proprietary, we used the UCI corpus as our baseline text classifier and built custom URL and social engineering heuristic engines to provide dedicated phishing defense.

### 45. What would you improve in the future?
**Answer:**  
1. Fine-tune a lightweight transformer model like DistilBERT for contextual language understanding.
2. Connect to live threat intelligence APIs (Google Safe Browsing, PhishTank) with caching.
3. Port the ML model to TensorFlow Lite for 100% offline on-device inference on Android.
4. Add multilingual support for regional language phishing attacks.
