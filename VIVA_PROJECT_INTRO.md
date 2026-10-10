# PhishGuard AI — Project Introductions & Defense Speech

**Project Title:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Purpose:** Rehearsal scripts for opening the final-year viva defense and presentation.  
**Tone:** Natural, confident, structured, and technically grounded.

---

## 1. The 30-Second Elevator Pitch (Quick Summary)

> *"Good morning/afternoon, respected examiners.  
> My project is **PhishGuard AI**, an explainable, multi-layered cyber defense system designed to protect mobile and web users from SMS phishing attacks—also known as smishing.  
> Instead of relying only on a machine learning model, PhishGuard AI combines a statistical ML baseline (achieving 97.58% test accuracy on the benchmark UCI SMS dataset) with parallel deterministic heuristic engines for URL obfuscation and behavioral social engineering tactics. It provides an explainable 0 to 100 risk score, identifies exact threat indicators, and delivers actionable security guidance to keep users safe."*

---

## 2. The 1-Minute Standard Introduction (Recommended for Viva Opening)

> *"Respected panel members,  
> Mobile messaging has become the primary communication channel worldwide, but it has also become the primary attack surface for cybercriminals. SMS phishing—or smishing—exploits human cognitive biases using artificial urgency, fear, and shortened links to steal banking credentials and personal data.  
> 
> To combat this, I developed **PhishGuard AI**. Our system adopts a **defense-in-depth architecture**:  
> 1. **Machine Learning Layer:** We use TF-IDF feature extraction with regularized Logistic Regression trained on the benchmark UCI SMS Spam Collection (5,572 messages), achieving 97.58% test accuracy on that baseline.  
> 2. **Heuristic Layers:** In parallel, deterministic engines analyze URLs for link-shortening services and detect 5 cognitive social engineering tactics such as urgency, fear, and credential verification.  
> 3. **Composite Risk Engine:** The system blends these factors into a transparent 0 to 100 risk score across four clear severity tiers (Low, Medium, High, and Critical), providing users with instant safety advice.  
> 
> The platform features a responsive React 19 web interface with manual scanning, real-time message stream simulation, persistent audit history, and live telemetry, alongside an Android companion foundation using the `SMS_RECEIVED` system broadcast."*

---

## 3. The 2-Minute Comprehensive Introduction (For Detailed Presentation)

> *"Respected panel,  
> 
> **Problem Statement:**  
> SMS messages have a 98% open rate, yet SMS lacks built-in sender verification or visual security indicators like SSL certificates. Attackers exploit this gap through smishing—sending deceptive messages pretending to be banks, postal couriers, or government agencies. Traditional spam filters often act as uninterpretable black boxes and fail to explain why a message is flagged or miss zero-day lures.  
> 
> **Objectives:**  
> Our objective was to engineer a fast, explainable, and multi-layered defense system that:  
> - Evaluates incoming messages in real time with near-zero latency.  
> - Combines statistical machine learning with deterministic threat heuristics to eliminate single points of failure.  
> - Provides an explainable 0 to 100 risk score and actionable safety recommendations.  
> - Logs persistent audit trails and live telemetry for security visibility.  
> 
> **Methodology:**  
> We built a modular, decoupled architecture:  
> - **Frontend:** Developed in React 19 with Vite, offering an interactive scan console, a real-time message stream simulation, and persistent local storage.  
> - **Backend:** A lightweight Python Flask REST API hosting endpoints `GET /` and `POST /predict`.  
> - **Detection Pipeline:** When a message arrives, the backend vectorizes the text using TF-IDF and classifies it using regularized Logistic Regression. Concurrently, our passive URL analyzer inspects links for shortening services like `bit.ly`, and our behavioral engine flags psychological manipulation patterns.  
> - **Scoring:** The composite engine blends the ML probability, URL penalties, social engineering flags, and cross-vector synergy bonuses into a clamped 0 to 100 score.  
> 
> **Results & Performance:**  
> The baseline classifier achieved **97.58% test accuracy on the UCI SMS Spam Collection baseline** (1,115 held-out test messages). Our heuristic layers successfully escalate evasive lures—such as delivery scams—into actionable security alerts.  
> 
> **Limitations & Future Scope:**  
> The baseline model was trained on general SMS spam, and the web app operates as a simulation due to browser sandboxing. For future work, we aim to fine-tune compact transformers like DistilBERT and deploy full on-device ONNX inference on Android.  
> 
> Thank you, and I am pleased to demonstrate the live application."*

---

## 4. Structured Defense Reference Sheet

| Heading | Key Viva Points to State Clearly |
| :--- | :--- |
| **Problem Statement** | Proliferation of deceptive SMS phishing (smishing) exploiting urgency and link shorteners without sender verification or explainability. |
| **Objectives** | 1. Hybrid defense (ML + heuristics). <br> 2. Explainable 0–100 risk score. <br> 3. Real-time alert simulation. <br> 4. Persistent audit trail & telemetry. |
| **Methodology** | Decoupled client-server architecture: React 19 frontend communicating via JSON REST (`POST /predict`) with Python Flask backend running TF-IDF, Logistic Regression, URL heuristics, and social engineering analyzers. |
| **Results** | 97.58% test accuracy on the UCI SMS Spam Collection baseline (80/20 stratified split: 4,457 train / 1,115 test). Sub-20ms inference latency. |
| **Limitations** | 1. General SMS spam training corpus. <br> 2. Deterministic regex does not detect leetspeak. <br> 3. Browser sandbox prevents direct phone SMS reading. <br> 4. Android tested at source-level foundation. |
| **Future Scope** | 1. Fine-tune DistilBERT / MobileBERT. <br> 2. Integrate Google Safe Browsing / PhishTank APIs. <br> 3. On-device ONNX/TFLite mobile inference. <br> 4. Multilingual SMS detection. |
