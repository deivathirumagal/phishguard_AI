# PhishGuard AI — 7-Minute Final Presentation Speech

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Estimated Time:** 6 to 7 Minutes (approximately 1,000 spoken words at 140 wpm)  
**Tone:** Confident, natural, technically sound, and accessible for a final-year viva  

---

### [0:00 – 0:30] SLIDE 1: TITLE SLIDE

*"Good morning, respected members of the examination panel and professors.  
My name is [Student Name], and today I am pleased to present my final-year engineering project: **PhishGuard AI – Real-Time Phishing Message Detection System**, developed under the guidance of [Guide Name].  
Our project focuses on protecting mobile and messaging users from deceptive SMS phishing attacks through a multi-layered hybrid defense framework that combines machine learning with behavioral heuristics."*

---

### [0:30 – 1:00] SLIDE 2: INTRODUCTION

*"To understand why this project is important, let us look at the threat of mobile phishing—often called **smishing**.  
Phishing is a social engineering attack where an adversary pretends to be a trusted entity—like your bank or a courier company—to trick you into sharing passwords, OTPs, or financial details.  
Today, text messaging has become the main channel for banking alerts and authentication.  
Over 90% of SMS messages are read within three minutes.  
Because mobile screens are small and often hide the full website address, ordinary users can easily be fooled.  
PhishGuard AI provides an automated assistant that inspects messages in real-time before users click dangerous links or give away sensitive credentials."*

---

### [1:00 – 1:30] SLIDE 3: PROBLEM STATEMENT

*"Why is it so hard for users to recognize suspicious messages?  
Attackers do not attack software bugs; they attack human psychology.  
They create artificial urgency—saying your account will be suspended within 24 hours.  
They create fear, or they promise fake lottery rewards.  
They also impersonate well-known brands like Chase, HDFC, or FedEx.  
On top of that, they hide where their links actually go by using URL shorteners like bit.ly.  
Traditional spam filters look for basic keywords, so they often miss short, carefully written smishing texts.  
And when existing filters do block a message, they act like black boxes—they never explain why the message was suspicious or what the user should do next."*

---

### [1:30 – 2:00] SLIDE 4: OBJECTIVES

*"To solve these problems, we set clear engineering objectives:  
First, build an automated system to analyze unstructured text messages.  
Second, use machine learning to classify messages as legitimate or phishing.  
Third, inspect links passively without visiting the malicious website.  
Fourth, detect social engineering tricks like urgency and fear.  
Fifth, combine all of these signals into an easy-to-understand 0 to 100 risk score with clear risk levels.  
Sixth, explain the results in plain English and give actionable safety advice.  
And finally, establish an architecture that supports real-time stream simulation and mobile Android integration."*

---

### [2:00 – 2:45] SLIDE 5: SYSTEM ARCHITECTURE

*"Here is our overall system architecture.  
When an incoming message arrives—either typed into our web scanner or received by our Android companion—it is sent to our Python Flask backend via a REST API.  
The text is first cleaned during preprocessing.  
Then, it goes into TF-IDF vectorization, which feeds into our Logistic Regression classifier.  
At the very same time, our engine runs two parallel checks: a defensive URL analysis to check for shortened or raw IP links, and a social engineering analysis to check for psychological triggers.  
All of these signals feed directly into our Risk Assessment Engine.  
The engine computes a composite score from 0 to 100, assigns a risk tier, generates a human-readable explanation, and triggers a security alert if the message is dangerous.  
Finally, the scan is saved to our local audit history for dashboard analytics."*

---

### [2:45 – 3:15] SLIDE 6: DATASET

*"For training our baseline model, we used the benchmark **UCI SMS Spam Collection dataset**.  
It contains 5,572 authentic SMS messages: 4,825 legitimate ham messages and 747 spam messages.  
We split the data using an 80% training and 20% testing stratified split, giving us 4,457 messages for training and 1,115 messages for testing.  
I want to clarify an important academic point: this dataset provides the SMS spam/legitimate baseline for the project.  
It is an authentic SMS spam dataset, not a dedicated phishing dataset.  
That is precisely why we designed additional URL and social engineering heuristic engines to catch targeted smishing attacks that general spam models might miss."*

---

### [3:15 – 3:45] SLIDE 7: MACHINE LEARNING PIPELINE

*"Our machine learning pipeline is straightforward:  
First, preprocessing converts all characters to lowercase and cleans extra spaces, while carefully preserving URL structures.  
Next, **TF-IDF converts the message into numerical features so that the machine-learning model can work with the text.**  
TF-IDF down-weights common words like 'the' and 'is', and gives higher weights to rare, important words like 'urgent', 'suspended', and 'verify'.  
These features are fed into a Logistic Regression classifier with L2 regularization.  
Logistic Regression was chosen because it calculates calibrated probabilities and runs inference in under 5 milliseconds, making it ideal for real-time mobile use."*

---

### [3:45 – 4:30] SLIDE 8: MODEL PERFORMANCE

*"Here are the verified baseline results on the 1,115 unseen test messages.  
Our model achieved **97.58% test accuracy on the UCI SMS Spam Collection baseline**.  
For legitimate messages, it achieved a precision of 0.99, a recall of 0.98, and an F1-score of 0.99.  
For spam messages, it achieved a precision of 0.90, a recall of 0.92, and an F1-score of 0.91.  
In the confusion matrix, out of 1,115 test samples, the model correctly identified 951 legitimate messages and 137 spam messages, with only 15 false positives and 12 false negatives.  
Importantly, we report this strictly as 97.58% test accuracy on the SMS spam baseline, not as a blanket phishing accuracy claim, because real-world smishing evaluation requires our hybrid heuristic layers."*

---

### [4:30 – 5:00] SLIDE 9: URL & SOCIAL ENGINEERING ANALYSIS

*"Next, let us look at our parallel heuristic defense layers.  
Our defensive URL engine extracts links and checks for known URL shorteners like bit.ly or tinyurl that hide where a link leads.  
It also checks for raw numeric IP addresses, high-risk domain extensions like .xyz, and suspicious subdomains.  
Crucially, **we never visit, ping, or connect to the link**, which keeps the user completely safe.  
At the same time, our social engineering engine checks for five manipulation patterns: urgency, fear of account suspension, credential verification requests, authority impersonation like banks or courier services, and fake reward lures.  
These rules run independently and feed directly into the risk score."*

---

### [5:00 – 5:30] SLIDE 10: RISK ASSESSMENT & ALERT SYSTEM

*"To make the output clear, our Risk Engine calculates a composite score from 0 to 100.  
It combines the base machine learning score, penalties for suspicious links, penalties for social engineering triggers, and a synergy bonus if a shortened link appears alongside urgency words.  
We map this score into four clear tiers:  
0 to 29 is Low Risk for clean messages.  
30 to 59 is Medium Risk for borderline messages.  
60 to 79 is High Risk.  
And 80 to 100 is Critical Risk.  
Whenever a message is classified as Phishing or scores 60 and above, a pulsing red security alert banner appears with clear safety directives: do not click links and do not share passwords."*

---

### [5:30 – 6:00] SLIDE 11: APPLICATION INTERFACE

*"Our frontend is built with React 19 and custom responsive CSS.  
On the Scan page, users can type or paste any message, or pick from five faculty demo presets for 1-click testing.  
The most important information—the classification, risk score, risk level, reason, and recommended action—is displayed right at the top in the Executive Verdict Summary.  
Below that, eight detailed cards explain the AI detection, confidence, indicators, URL analysis, and social engineering breakdown.  
Users can also visit the Security Dashboard to see live threat distribution statistics, or use the History page to search and reload past scans stored in their browser's local storage."*

---

### [6:00 – 6:30] SLIDE 12: SAMPLE RESULTS

*"Here are two verified real-world examples.  
In Example A, a normal personal message: 'Hey, are we still meeting for lunch today?'.  
The system outputs Legitimate, a 93.35% model confidence for this sample, and a Low Risk score of 5 out of 100, with no alert.  
In Example B, an urgent banking attack: 'URGENT! Your bank account has been suspended. Verify your account immediately by clicking bit.ly...'.  
Here, the model confidence is 68.64% for this specific sample.  
Our heuristic engine flags the bit.ly link and all four social engineering indicators.  
The composite risk score jumps to 100 out of 100—Critical Risk—and triggers a prominent red alert.  
These confidence numbers are individual sample predictions, not overall system accuracy."*

---

### [6:30 – 7:00] SLIDE 13: REAL-TIME & ANDROID FOUNDATION

*"Regarding real-time detection, web browsers operate in an OS security sandbox and cannot directly intercept phone SMS.  
Therefore, in the web application, we provide an interactive **Real-Time Simulation** tab that demonstrates automated ingestion with a 15-second deduplication filter.  
For native mobile deployment, we implemented an **Android companion module**.  
It uses an Android BroadcastReceiver listening for `SMS_RECEIVED`.  
When an SMS arrives, a background service calls our Flask API and displays a system heads-up notification.  
As clearly stated in our report, full end-to-end device validation of the Android companion requires an Android Studio and device environment."*

---

### [7:00 – 7:30] SLIDES 14 & 15: LIMITATIONS, FUTURE SCOPE & CONCLUSION

*"Like any engineering project, we have known limitations: our baseline model was trained on general SMS spam; URL analysis uses static heuristics without live WHOIS lookups; and browsers cannot directly read mobile SMS.  
In the future, we plan to retrain on contemporary smishing datasets, integrate transformer models like DistilBERT, connect to live threat intelligence APIs like Google Safe Browsing, and package the Android app for offline on-device inference using TensorFlow Lite.  

In conclusion, PhishGuard AI demonstrates that combining statistical Machine Learning with deterministic heuristics provides a practical, explainable, and robust defense against SMS phishing.  
We do not claim 100% perfect detection, but PhishGuard AI empowers users to recognize and avoid deceptive messages before interacting with them.  

Thank you for your time and attention. I am now ready for your questions."*
