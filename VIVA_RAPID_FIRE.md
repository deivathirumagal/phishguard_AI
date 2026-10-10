# PhishGuard AI — Viva Rapid Fire Sheet (27 Core Questions)

This sheet provides concise, 1- to 2-sentence answers for rapid-fire viva questioning during the final-year project examination.

---

### 1. What is phishing?
Phishing is a social engineering attack where an adversary poses as a legitimate organization to deceive users into surrendering confidential credentials, financial details, or personal data.

### 2. What is smishing?
Smishing is specifically SMS phishing—phishing attacks conducted through Short Message Service (SMS) text messages on mobile phones.

### 3. What is NLP?
Natural Language Processing (NLP) is a field of computer science that enables algorithms to read, preprocess, analyze, and extract meaningful features from human language text.

### 4. What is TF-IDF?
TF-IDF (Term Frequency-Inverse Document Frequency) is a numerical vectorization technique that converts text into numbers by balancing how often a word appears in a message against how rare it is across the entire dataset.

### 5. What is Logistic Regression?
Logistic Regression is a supervised linear classification algorithm that uses the sigmoid function to map feature weights to calibrated class probabilities between 0 and 1.

### 6. Why Logistic Regression?
We chose Logistic Regression because it executes inference in under 5 milliseconds with minimal memory footprint and outputs well-calibrated probabilities that feed directly into our risk score.

### 7. What dataset did you use?
We used the benchmark UCI Machine Learning Repository SMS Spam Collection dataset.

### 8. Why this dataset?
It is the most widely recognized, publicly validated academic benchmark for SMS text classification, providing authentic mobile messages categorized as legitimate (ham) or spam.

### 9. How many messages are in the dataset?
The dataset contains 5,572 authentic SMS messages: 4,825 legitimate ham messages (86.6%) and 747 spam messages (13.4%).

### 10. What is accuracy?
Accuracy is the percentage of all predictions (both legitimate and spam) that were correctly classified out of the total number of tested samples.

### 11. What is precision?
Precision is the percentage of messages flagged as spam that were actually spam, measuring the system's ability to avoid false alarms.

### 12. What is recall?
Recall is the percentage of all actual spam messages in the dataset that the model successfully caught, measuring the system's ability to avoid missed threats.

### 13. What is the F1-score?
The F1-score is the harmonic mean of precision and recall, providing a balanced performance metric on imbalanced datasets where legitimate messages outnumber spam.

### 14. What is your model's accuracy?
Our baseline Logistic Regression model achieved 97.58% test accuracy on the 1,115 unseen test messages of the UCI SMS Spam Collection benchmark.

### 15. Is that 97.58% specifically phishing detection accuracy?
No, it is the baseline test accuracy on the general UCI SMS Spam Collection dataset; dedicated phishing protection is provided by our integrated URL and social engineering heuristic engines.

### 16. What is URL analysis in your project?
It is a defensive, zero-resolution heuristic parser that passively checks message links for URL shorteners, raw IP addresses, and suspicious TLDs without visiting or resolving the target website.

### 17. What is social engineering in your project?
It is a rule-based behavioral engine that flags five psychological manipulation tactics: artificial urgency, fear/threats, account verification requests, authority impersonation, and fake reward lures.

### 18. What is the risk score?
It is an explainable composite score from 0 to 100 calculated by combining ML model confidence, URL heuristic penalties, social engineering flags, and synergy bonuses across four risk tiers.

### 19. Why use rule-based indicators alongside machine learning?
Rule-based heuristics provide deterministic defense-in-depth, ensuring known link shorteners and high-risk keywords are caught even if a concise message produces borderline ML confidence.

### 20. How does Flask work here?
Flask acts as our Python REST API backend, hosting the `/predict` endpoint that receives incoming message JSON, coordinates the hybrid detection pipeline, and returns structured analytical results.

### 21. How does React communicate with Flask?
The React frontend uses asynchronous HTTP `fetch()` requests to send a JSON payload `{"message": "..."}` to the Flask `/predict` endpoint and renders the returned JSON data in the UI.

### 22. How is history stored?
Scan records are stored locally in the user's browser using HTML5 `localStorage` (capped at 100 entries), preserving user privacy without sending personal messages to a remote database.

### 23. How does the security alert work?
A pulsing high-contrast red alert banner triggers automatically whenever a message is classified as Phishing or achieves a High or Critical risk score ($\ge 60$), providing immediate safety directives.

### 24. Can browser applications directly read phone SMS?
No, web browsers operate inside an operating system security sandbox and cannot directly access mobile SMS databases or phone telephony broadcasts.

### 25. How does Android receive SMS?
Android emits an `android.provider.Telephony.SMS_RECEIVED` system broadcast when a text arrives, which our companion app intercepts using a registered native `BroadcastReceiver`.

### 26. What are the main limitations of the project?
The baseline model was trained on general SMS spam rather than modern smishing; URL analysis is heuristic without live WHOIS lookups; and browsers cannot directly intercept mobile SMS.

### 27. What is the future scope?
Future improvements include retraining on contemporary multilingual smishing datasets, fine-tuning lightweight transformer models like DistilBERT, connecting live threat intelligence APIs, and running on-device inference on Android via TensorFlow Lite.
