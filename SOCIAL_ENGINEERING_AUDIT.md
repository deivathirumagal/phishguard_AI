# Social Engineering Heuristics Audit – PhishGuard AI

**System:** PhishGuard AI Social Engineering Detection Engine  
**Implementation File:** `backend/app.py` (`detect_social_engineering`)  
**Audit Date:** September 20, 2026  
**Status:** **VERIFIED**  

---

## 1. Engine Methodology & Boundary Scope

The Social Engineering Detection module inspects incoming SMS messages for psychological manipulation patterns frequently exploited in smishing campaigns.

### Implementation Architecture
- The module is implemented using **regular expression pattern matching** against curated lexicons representing 5 core cognitive attack vectors.
- Patterns are compiled with case-insensitivity (`re.IGNORECASE`).
- **Scope Clarification:** The engine uses deterministic lexical pattern matching; it does **NOT** use deep recurrent networks (LSTM), Transformer-based language models (BERT/GPT), or full syntactic dependency parsing. It operates efficiently with near-zero latency (< 2 ms) suitable for low-power mobile or edge environments.

---

## 2. Tested Social Engineering Indicators

| Indicator Category | Regex Trigger Keywords / Patterns | Risk Contribution | Tested Behavior |
| :--- | :--- | :--- | :--- |
| **Urgency** | `urgent`, `immediately`, `act now`, `expires`, `limited time`, `within 24 hours`, `final notice` | **+10 points** | Flags artificial time pressure intended to induce rash user action. |
| **Fear / Threat** | `suspended`, `locked`, `blocked`, `unauthorized`, `compromised`, `deactivated`, `legal action`, `arrest` | **+15 points** | Flags fear-inducing claims regarding account status, penalties, or law enforcement. |
| **Account Verification** | `verify your account`, `confirm identity`, `update details`, `login to`, `security update`, `validate` | **+15 points** | Flags credential harvesting lures directing the victim to verify credentials. |
| **Authority / Impersonation** | `bank`, `security department`, `customer support`, `irs`, `fedex`, `usps`, `official`, `helpdesk` | **+10 points** | Flags impersonation of recognized institutions, courier services, or official bodies. |
| **Reward / Financial Lure** | `congratulations`, `won`, `winner`, `free gift`, `cash prize`, `claim your`, `selected for`, `lottery` | **+15 points** | Flags classic scam lures promising unexpected financial gains or gifts. |

---

## 3. Empirical Verification Test Results

The following test messages were sent to `http://127.0.0.1:5000/predict` and verified:

### 1. Urgency Test
- **Input Text:** `"Act immediately or your account will be closed."`
- **Detected Indicators:** `["Urgency"]`
- **Boolean Flags:** `urgency: true`, `fear_threat: false`, `account_verification: false`, `authority_impersonation: false`, `reward: false`
- **Resulting Risk Score:** `15` (`Low Risk`)
- **Verification:** **PASSED**

### 2. Fear / Threat Test
- **Input Text:** `"Your account has been suspended."`
- **Detected Indicators:** `["Fear/Threat"]`
- **Boolean Flags:** `fear_threat: true`, others `false`
- **Resulting Risk Score:** `20` (`Low Risk`)
- **Verification:** **PASSED**

### 3. Account Verification Test
- **Input Text:** `"Verify your account immediately."`
- **Detected Indicators:** `["Urgency", "Account Verification"]`
- **Boolean Flags:** `account_verification: true`, `urgency: true`, others `false`
- **Resulting Risk Score:** `30` (`Medium Risk`)
- **Verification:** **PASSED** (Note: Triggers both verification and urgency heuristics)

### 4. Authority / Impersonation Test
- **Input Text:** `"Your bank security department requires verification."`
- **Detected Indicators:** `["Authority/Impersonation"]`
- **Boolean Flags:** `authority_impersonation: true`, others `false`
- **Resulting Risk Score:** `15` (`Low Risk`)
- **Verification:** **PASSED**

### 5. Reward / Financial Lure Test
- **Input Text:** `"You won a cash prize."`
- **Detected Indicators:** `["Reward"]`
- **Boolean Flags:** `reward: true`, others `false`
- **Resulting Risk Score:** `54` (`Medium Risk` – base spam confidence + 15 reward pts)
- **Verification:** **PASSED**

---

## 4. Synergy with URL Analysis

When an indicator from `{Urgency, Fear/Threat, Account Verification}` co-occurs with a **Suspicious URL** (e.g., bit.ly shortener or IP address), an additional **+10 synergy bonus** is applied.
This reflects the compounded real-world smishing risk where an attacker creates panic specifically to drive traffic to an unverified malicious link.

---

## 5. Limitations & Realistic Academic Boundary

1. **Deterministic Lexicon:** Variations, obfuscated leetspeak (e.g., `v3r1fy`), or novel phishing idioms outside the regex set may evade this layer if the statistical ML model does not catch them.
2. **Context Blindness:** A legitimate friend texting *"Hey, don't forget to verify your email for Netflix"* will trigger the verification heuristic. This is by design in a defensive system, resulting in low/medium alerts rather than silent passes.
3. **Language Scope:** Heuristics are currently calibrated for English SMS text.
