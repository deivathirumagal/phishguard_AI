# Final Viva Ready Checklist – PhishGuard AI

**Project Name:** PhishGuard AI – Real-Time Phishing Message Detection System  
**Prepared For:** Final-Year Engineering Examination Panel & Viva Defense  
**Date:** September 20, 2026  

---

## Complete Pre-Viva Readiness Checklist

Tick off each item as you rehearse:

- [ ] **Project introduction memorized:** Rehearsed the 30-second elevator pitch and 1-minute standard opening from [`VIVA_PROJECT_INTRO.md`](file:///C:/Users/hp/OneDrive/Desktop/project/phish%20guard/VIVA_PROJECT_INTRO.md).
- [ ] **Problem statement understood:** Can clearly articulate the dangers of SMS phishing (smishing), the lack of sender verification in SMS, and the limitations of black-box filters.
- [ ] **Architecture understood:** Can draw and explain the 9-stage pipeline from [`VIVA_ARCHITECTURE_EXPLANATION.md`](file:///C:/Users/hp/OneDrive/Desktop/project/phish%20guard/VIVA_ARCHITECTURE_EXPLANATION.md) (Client $\rightarrow$ Flask $\rightarrow$ TF-IDF $\rightarrow$ Logistic Regression $\rightarrow$ URL & Social Engineering Heuristics $\rightarrow$ Risk Engine $\rightarrow$ Alert $\rightarrow$ History).
- [ ] **Dataset understood:** Memorized exact figures: **UCI SMS Spam Collection**, **5,572 total messages**, **4,825 Ham (86.6%)**, **747 Spam (13.4%)**, **80/20 stratified split** (**4,457 train / 1,115 test**).
- [ ] **TF-IDF understood:** Can explain Term Frequency (word presence in message) vs. Inverse Document Frequency (penalizing common stop words like "the" and boosting rare tokens like "suspended").
- [ ] **Logistic Regression understood:** Can explain why it was chosen (sub-15ms latency, high interpretability, calibrated probabilities, low memory footprint).
- [ ] **97.58% metric correctly explained:** Will strictly state *"97.58% test accuracy on the UCI SMS Spam Collection baseline"*, never claiming 100% accuracy or that 97.58% is a phishing-specific rate.
- [ ] **Risk scoring understood:** Can explain the 0–100 additive clamped score across the 4 tiers (**0–29 Low**, **30–59 Medium**, **60–79 High**, **80–100 Critical**).
- [ ] **URL analysis understood:** Can explain passive regex extraction and shortening service detection (`bit.ly`, `tinyurl.com`), confirming zero external network calls.
- [ ] **Social engineering understood:** Can name the 5 cognitive manipulation vectors (**Urgency**, **Fear/Threat**, **Account Verification**, **Authority Impersonation**, **Reward**).
- [ ] **Real-time simulation limitation understood:** Will state clearly: *"The web application provides a real-time detection simulation. Actual phone SMS interception requires the Android integration."*
- [ ] **Android role understood:** Can explain `SmsReceiver.java`, the `android.provider.Telephony.SMS_RECEIVED` system broadcast, and that the Android companion module is a verified source-level foundation.
- [ ] **Manual demo rehearsed:** Rehearsed pasting the lunch message (`"Hey, are we still meeting for lunch today?"` $\rightarrow$ Score 5, Low Risk).
- [ ] **Phishing demo rehearsed:** Rehearsed pasting the bank message (`"URGENT! Your bank account has been suspended..."` $\rightarrow$ Score 100, Critical Risk, 4 indicators).
- [ ] **Dashboard demonstrated:** Can explain total scans, threat distribution breakdown, and average risk metrics.
- [ ] **History demonstrated:** Can demonstrate search by keyword (`"bank"`) and filtering by risk level (`"Critical Risk"`).
- [ ] **Backup plan understood:** Read [`FINAL_DEMO_BACKUP_PLAN.md`](file:///C:/Users/hp/OneDrive/Desktop/project/phish%20guard/FINAL_DEMO_BACKUP_PLAN.md) and know the 10-second fix for port 5000/5173 conflicts and empty inputs.
- [ ] **Limitations honestly explained:** Ready to discuss general SMS spam corpus, static regex boundaries, and lack of live WHOIS feeds.
- [ ] **Future scope understood:** Ready to propose fine-tuning **DistilBERT / MobileBERT**, integrating **Google Safe Browsing**, and deploying on-device **ONNX / TensorFlow Lite**.

---

## Rehearsal Status
- **Technical Knowledge:** Thoroughly documented and verified.
- **Application Code:** Verified and frozen; no functional modifications made.
- **Viva Readiness:** **READY FOR FACULTY DEFENSE & DEMONSTRATION.**
